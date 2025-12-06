/* eslint-disable react/prop-types */
import {
  Form,
  Input,
  Select,
  DatePicker,
  Button,
  InputNumber,
  Card,
  Descriptions,
  Statistic,
  Steps,
  message,
  Typography,
} from "antd";
import dayjs from "dayjs";
import {
  useCreateQuickOrder,
  usePriceCalculate,
} from "@/features/orders/orders.query";
import { createQuickOrderSchema } from "@/features/orders/orders.schema";
import { applyZodErrorsToForm } from "@/utils/formError";
import { useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { APIProvider } from "@vis.gl/react-google-maps";
import GoogleAddressPicker from "@/components/ui/GoogleAddressPicker";

// --- CASHFREE IMPORTS ---
import { load } from "@cashfreepayments/cashfree-js";
import {
  useCreatePaymentSession,
  useVerifyPaymentByPocketParcelId,
} from "@/features/payment/payment.query";

const { TextArea } = Input;
const { Text } = Typography;
const API_KEY = import.meta.env.VITE_APP_GOOGLE_API_KEY;

// --- INITIALIZE CASHFREE SDK ---
let cashfree;
const initializeCashfree = async () => {
  cashfree = await load({
    mode: "sandbox", // Change to "production" when ready
  });
};
initializeCashfree();

export default function CreateQuickOrder() {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  // State
  const [paymentDetails, setPaymentDetails] = useState({});
  const [summaryData, setSummaryData] = useState({});
  const [current, setCurrent] = useState(0);
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);

  // Payment Hooks
  const { mutateAsync: createPaymentSession } = useCreatePaymentSession();
  const { mutateAsync: verifyPayment } = useVerifyPaymentByPocketParcelId();

  // ---- 1. ORDER CREATION MUTATION ----
  const createOrderMutation = useCreateQuickOrder({
    onSuccess: async (response) => {
      console.log(response);
      console.log("response", response?.data?.data);
      // The API response should return the created Order ID
      const newOrderId = response?.data?.data?.id || response?.data?.order_id;

      if (!newOrderId) {
        message.error(
          "Order created but ID missing. Cannot proceed to payment."
        );
        return;
      }

      // Start Payment Flow
      await handlePaymentFlow(newOrderId);
    },
    onError: (err) => {
      message.error(err?.message || "Failed to create order");
    },
  });

  // Calculate price
  const calculatePriceMutation = usePriceCalculate({
    onSuccess: (data) => {
      setPaymentDetails(data?.data?.data);
      setCurrent(current + 1);
    },
  });

  // ---- 2. PAYMENT LOGIC (Integrated from your snippet) ----
  const handlePaymentFlow = async (orderId) => {
    if (!cashfree) {
      message.error("Payment SDK not loaded yet");
      return;
    }

    setIsProcessingPayment(true);

    try {
      const amountToPay = paymentDetails?.delivery_amount || 0;

      // A. Create Payment Session
      const sessionData = await createPaymentSession({
        // order_id: "3c9a3fd8-2e2f-42f2-8698-6506f4430c91",
        order_id: String(orderId),
        order_amount: amountToPay,
        currency: "INR",
        customer_details: {
          customer_id: summaryData.from_phone, // Using phone as ID or generate a unique one
          customer_phone: summaryData.from_phone,
          customer_name: summaryData.from_name,
          customer_email: "user@example.com", // Add email field to form if needed
        },
        // order_meta: {
        //   return_url: `${window.location.origin}/orders/verify?order_id=${orderId}`,
        //   payment_methods: "card,upi,app,netbanking", // Allow all methods
        // },
      });
      console.log("sessionData", sessionData);

      const paymentSessionId = sessionData?.payment_order?.payment_session_id;

      if (!paymentSessionId) {
        throw new Error("Failed to generate payment session");
      }

      // B. Open Cashfree Checkout
      const checkoutOptions = {
        paymentSessionId: paymentSessionId,
        redirectTarget: "_modal", // Keep user on page
      };

      cashfree.checkout(checkoutOptions).then((result) => {
        if (result.error) {
          console.error("Payment Error:", result.error);
          message.error(result.error.message || "Payment failed");
          setIsProcessingPayment(false);
        }
        console.log("result", result);
        if (result.paymentDetails) {
          console.log("Payment Completed", result.paymentDetails);

          // C. Verify Payment
          verifyPayment(orderId)
            .then(() => {
              message.success("Order placed and payment successful!");
              // form.resetFields();
              // navigate({ to: "/orders/first-mile" });
            })
            .catch(() => {
              message.warning(
                "Payment completed but verification failed. Please check order status."
              );
              // navigate({ to: "/orders/first-mile" });
            })
            .finally(() => {
              setIsProcessingPayment(false);
            });
        }
      });
    } catch (error) {
      console.error("Payment Flow Error:", error);
      message.error(error.message || "Payment initiation failed");
      setIsProcessingPayment(false);
    }
  };

  // ---- 3. FINAL SUBMIT HANDLER ----
  const handleFinish = () => {
    try {
      // Prepare payload from summaryData
      const payload = {
        ...summaryData,
        merchant_order_amount: 0,
        payment_mode: 6,
      };

      // Double check validation
      const parsedData = createQuickOrderSchema.parse(payload);

      // Create Order -> Triggers onSuccess -> Triggers Payment
      createOrderMutation.mutate(parsedData);
    } catch (err) {
      if (err.name === "ZodError") {
        applyZodErrorsToForm(form, err);
        message.error("Validation failed.");
      } else {
        message.error(err?.message || "Something went wrong");
      }
    }
  };

  // Navigation
  const next = async () => {
    try {
      const values = await form.validateFields();
      const payload = {
        ...values,
        pickup_time: dayjs(values.pickup_time).format("YYYY-MM-DD HH:mm:ss"),
        merchant_order_amount: 0,
        payment_mode: 6,
      };

      createQuickOrderSchema.parse(payload);
      setSummaryData(payload);

      const calculatePricePayload = {
        from_latitude: payload.from_latitude,
        from_longitude: payload.from_longitude,
        to_latitude: payload.to_latitude,
        to_longitude: payload.to_longitude,
        weight: payload.weight,
        date_time: dayjs(payload.pickup_time).format("YYYY-MM-DD HH:mm"),
      };
      calculatePriceMutation.mutate(calculatePricePayload);
    } catch (err) {
      console.log("err", err);
      if (err.name === "ZodError") {
        applyZodErrorsToForm(form, err);
        message.error("Fix the errors and try again.");
      } else if (err.errorFields) {
        message.error("Please fill all required fields");
      } else {
        message.error(err?.message || "Something went wrong");
      }
    }
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  const steps = [
    {
      title: "Order Details",
      content: (
        <div className="flex flex-col gap-4">
          {/* DESCRIPTION */}
          <Form.Item
            label="Order Description"
            name="description"
            rules={[{ required: true, message: "Enter order description" }]}
            className="mb-0"
          >
            <Input placeholder="e.g. Electronics - Mobile Phone" />
          </Form.Item>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* ===================== FROM SECTION ===================== */}
            <Card title="Pickup Details (From)" className="shadow-sm h-full">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4">
                <Form.Item name="from_latitude" hidden>
                  <Input />
                </Form.Item>
                <Form.Item name="from_longitude" hidden>
                  <Input />
                </Form.Item>

                <Form.Item
                  label="Name"
                  name="from_name"
                  rules={[{ required: true }]}
                >
                  <Input />
                </Form.Item>

                <Form.Item
                  label="Phone"
                  name="from_phone"
                  rules={[{ required: true, message: "Enter phone number" }]}
                >
                  <Input />
                </Form.Item>

                <Form.Item
                  label="House No."
                  name="from_house_number"
                  className="col-span-2 md:col-span-1"
                >
                  <Input />
                </Form.Item>

                <Form.Item
                  label="Address"
                  name="from_address"
                  rules={[{ required: true }]}
                  className="col-span-2 mb-0"
                >
                  <TextArea rows={3} />
                </Form.Item>

                <Form.Item
                  name="from_landmark"
                  label="Landmark"
                  className="col-span-2"
                >
                  <APIProvider
                    apiKey={API_KEY}
                    libraries={["places", "geocoding"]}
                  >
                    <GoogleAddressPicker
                      showMap={true}
                      onLocationSelect={(loc) => {
                        form.setFieldsValue({
                          from_latitude: loc.lat,
                          from_longitude: loc.lng,
                          from_landmark: loc.address,
                        });
                      }}
                    />
                  </APIProvider>
                </Form.Item>
              </div>
            </Card>

            {/* ===================== TO SECTION ===================== */}
            <Card title="Delivery Details (To)" className="shadow-sm h-full">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4">
                <Form.Item name="to_latitude" hidden>
                  <Input />
                </Form.Item>
                <Form.Item name="to_longitude" hidden>
                  <Input />
                </Form.Item>

                <Form.Item
                  label="Name"
                  name="to_name"
                  rules={[{ required: true }]}
                >
                  <Input />
                </Form.Item>

                <Form.Item
                  label="Phone"
                  name="to_phone"
                  rules={[{ required: true }]}
                >
                  <Input />
                </Form.Item>

                <Form.Item
                  label="House No."
                  name="to_house_number"
                  className="col-span-2 md:col-span-1"
                >
                  <Input />
                </Form.Item>

                <Form.Item
                  label="Address"
                  name="to_address"
                  rules={[{ required: true }]}
                  className="col-span-2 mb-0"
                >
                  <TextArea rows={3} />
                </Form.Item>

                <Form.Item
                  name="to_landmark"
                  label="Landmark"
                  className="col-span-2"
                >
                  <APIProvider
                    apiKey={API_KEY}
                    libraries={["places", "geocoding"]}
                  >
                    <GoogleAddressPicker
                      showMap={true}
                      onLocationSelect={(loc) => {
                        form.setFieldsValue({
                          to_latitude: loc.lat,
                          to_longitude: loc.lng,
                          to_landmark: loc.address,
                        });
                      }}
                    />
                  </APIProvider>
                </Form.Item>
              </div>
            </Card>
          </div>

          {/* ===================== OTHER DETAILS ===================== */}
          <Card title="Shipment Details" className="shadow-sm">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-6">
              <Form.Item
                label="Weight (kg)"
                name="weight"
                rules={[{ required: true }]}
              >
                <InputNumber className="w-full!" min={0} />
              </Form.Item>

              <Form.Item
                label="Pickup Time"
                name="pickup_time"
                rules={[{ required: true }]}
              >
                <DatePicker
                  showTime
                  format="DD-MM-YYYY HH:mm"
                  className="w-full!"
                />
              </Form.Item>

              <Form.Item
                label="Item Type"
                name="item_type"
                rules={[{ required: true }]}
              >
                <Select
                  options={[
                    { label: "Documents & Books", value: 1 },
                    { label: "Clothes & Accessories", value: 4 },
                    { label: "Electronic Items", value: 5 },
                    { label: "Cake", value: 44 },
                    { label: "Others", value: 38 },
                  ]}
                />
              </Form.Item>

              <Form.Item label="Promo Code" name="promo_code">
                <Input />
              </Form.Item>
            </div>
          </Card>
        </div>
      ),
    },
    {
      title: "Summary",
      content: (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Pickup Summary */}
            <Card
              size="small"
              title="Pickup From"
              className="shadow-sm border-t-4 border-t-blue-500"
            >
              <Descriptions column={1} size="small">
                <Descriptions.Item label="Name">
                  <Text strong>{summaryData.from_name}</Text>
                </Descriptions.Item>
                <Descriptions.Item label="Phone">
                  {summaryData.from_phone}
                </Descriptions.Item>
                <Descriptions.Item label="Address">
                  {summaryData.from_address}
                </Descriptions.Item>
              </Descriptions>
            </Card>

            {/* Delivery Summary */}
            <Card
              size="small"
              title="Deliver To"
              className="shadow-sm border-t-4 border-t-green-500"
            >
              <Descriptions column={1} size="small">
                <Descriptions.Item label="Name">
                  <Text strong>{summaryData.to_name}</Text>
                </Descriptions.Item>
                <Descriptions.Item label="Phone">
                  {summaryData.to_phone}
                </Descriptions.Item>
                <Descriptions.Item label="Address">
                  {summaryData.to_address}
                </Descriptions.Item>
              </Descriptions>
            </Card>
          </div>

          {/* Payment & Time Estimate */}
          <Card className="bg-blue-50 border-blue-100 shadow-md">
            <div className="flex flex-col md:flex-row justify-between items-center gap-6">
              <div className="flex gap-8">
                <Statistic
                  title="Estimated Time"
                  value={Math.round(
                    (Number(paymentDetails?.pickup_sla || 0) +
                      Number(paymentDetails?.assignment_sla || 0)) /
                      60
                  )}
                  suffix="mins"
                  valueStyle={{ fontSize: "1.25rem" }}
                />
              </div>

              <div className="text-right bg-white p-4 rounded-lg border border-blue-100 min-w-[200px]">
                <Statistic
                  title="Total Payable"
                  value={paymentDetails?.delivery_amount}
                  precision={2}
                  prefix="₹"
                  valueStyle={{ color: "#1677ff", fontWeight: "bold" }}
                />
              </div>
            </div>
          </Card>
        </div>
      ),
    },
  ];

  return (
    <div className="max-w-6xl mx-auto p-4 pb-24">
      <Steps
        current={current}
        onChange={setCurrent}
        items={steps.map((s) => ({ title: s.title }))}
        className="mb-8"
      />

      <Form
        layout="vertical"
        form={form}
        onFinish={handleFinish}
        initialValues={{ payment_mode: 6 }}
        disabled={createOrderMutation.isPending || isProcessingPayment}
      >
        <div className="mt-4">{steps[current]?.content}</div>

        <div className="flex justify-end gap-4 fixed bottom-0 left-0 right-0 bg-white p-4 border-t border-gray-200 z-50 shadow-lg">
          <div className="max-w-6xl mx-auto w-full flex justify-end gap-4">
            {current === 0 && (
              <Button onClick={() => navigate({ to: "/orders/first-mile" })}>
                Cancel
              </Button>
            )}
            {current > 0 && (
              <Button
                onClick={() => prev()}
                disabled={createOrderMutation.isPending || isProcessingPayment}
              >
                Previous
              </Button>
            )}
            {current < steps.length - 1 && (
              <Button type="primary" onClick={() => next()}>
                Proceed to Summary
              </Button>
            )}
            {current === steps.length - 1 && (
              <Button
                type="primary"
                htmlType="submit"
                loading={createOrderMutation.isPending || isProcessingPayment}
              >
                {isProcessingPayment
                  ? "Processing Payment..."
                  : "Confirm & Pay"}
              </Button>
            )}
          </div>
        </div>
      </Form>
    </div>
  );
}
