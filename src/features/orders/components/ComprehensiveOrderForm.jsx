import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { Form, Steps, message } from "antd";
import {
  EnvironmentOutlined,
  CodeSandboxOutlined,
  FileTextOutlined,
} from "@ant-design/icons";
import {
  useCalculatePriceOfOrder,
  useCheckServiceability,
  useCreateComprehensiveOrder,
  useGetDomesticRecommendation,
} from "@/features/orders/orders.query";
import ResponsiveButton from "@/components/ui/ResponsiveButton";
import BackButton from "@/components/ui/BackButton";
import {
  calculatePriceOfOrderSchema,
  createOrderSchema,
  orderRecommendationSchema,
} from "../orders.schema";
import LocationStep from "./steps/LocationStep";
import ShipmentStep from "./steps/ShipmentStep";
import SummaryStep from "./steps/SummaryStep";
import { useCreatePaymentSession } from "@/features/payment/payment.query";
import dayjs from "dayjs";
import { load } from "@cashfreepayments/cashfree-js";
import { verifyPayment } from "@/features/payment/payment.service";
import CourierPartnerSelector from "./steps/CourierPartnerSelector";
import { FaShippingFast } from "react-icons/fa";
let cashfree;

const initializeCashfree = async () => {
  cashfree = await load({
    mode: "sandbox",
  });
};

initializeCashfree();

const ComprehensiveOrderForm = () => {
  const [current, setCurrent] = useState(0);
  const [form] = Form.useForm();
  const [totalData, setTotalData] = useState({});
  const [summaryData, setSummaryData] = useState({});
  const [paymentSessionId, setPaymentSessionId] = useState(null);
  const [CashFreeOfferId, setCashFreeOfferId] = useState(null);
  const [recommendationData, setRecommendationData] = useState(null);
  const [carrierPartnerData, setCarrierPartnerData] = useState({
    carrier_partner: null,
    account_code: null,
  });
  // Payment Hooks
  const { mutateAsync: createPaymentSession } = useCreatePaymentSession();

  const { mutate: serviceabilityCheck, isPending: serviceabilityPending } =
    useCheckServiceability({
      onSuccess: (data) => {
        console.log("Serviceability Check Data:", data);
        setCurrent((prev) => prev + 1);
      },
      onError: (error) => {
        console.error("Serviceability Check Error:", error);
      },
    });

  // Recommendation
  const { mutate: recommendationMutate, isPending: isRecommendationPending } =
    useGetDomesticRecommendation({
      onSuccess: (data) => {
        console.log("Recommendation Data", data);
        setRecommendationData(data);
        setCurrent((prev) => prev + 1);
      },
    });

  // Calculate Price
  const { mutate: calculatePriceOfOrder, isPending: calculatePricePending } =
    useCalculatePriceOfOrder({
      onSuccess: (data) => {
        console.log("Calculate Price Data:", data);
        setSummaryData(data);
        setCurrent((prev) => prev + 1);
      },
      onError: (error) => {
        console.error("Calculate Price Error:", error);
      },
    });

  const next = async () => {
    try {
      // Validate fields for current step
      let fieldsToValidate = [];
      if (current === 0) {
        fieldsToValidate = [
          ["pickup_info", "pickup_name"],
          ["pickup_info", "pickup_phone"],
          ["pickup_info", "email"],
          ["pickup_info", "pickup_address"],
          ["pickup_info", "pickup_pincode"],
          ["pickup_info", "pickup_city"],
          ["pickup_info", "pickup_state"],
          ["pickup_info", "pickup_landmark"],
          ["pickup_info", "pickup_lat"],
          ["pickup_info", "pickup_long"],
          ["drop_info", "drop_name"],
          ["drop_info", "drop_phone"],
          ["drop_info", "drop_address"],
          ["drop_info", "drop_pincode"],
          ["drop_info", "drop_city"],
          ["drop_info", "drop_state"],
          ["drop_info", "drop_landmark"],
          ["drop_info", "drop_latitude"],
          ["drop_info", "drop_longitude"],
        ];
      } else if (current === 1) {
        fieldsToValidate = [
          ["shipment_details", "delivery_type"],
          // ["shipment_details", "courier_partner"],
          ["shipment_details", "length"],
          ["shipment_details", "breadth"],
          ["shipment_details", "height"],
          ["shipment_details", "weight"],
          ["shipment_details", "items"],
          ["shipment_details", "category_id"],
          ["shipment_details", "sub_category_id"],
          ["shipment_details", "item_ids"],
        ];
      }

      if (
        fieldsToValidate.length > 0 ||
        carrierPartnerData.account_code ||
        carrierPartnerData.carrier_partner
      ) {
        const values = await form.validateFields(fieldsToValidate);
        if (current === 0) {
          const payload = [
            {
              pickup_pincode: values.pickup_info.pickup_pincode,
              drop_pincode: values.drop_info.drop_pincode,
            },
          ];
          setTotalData((prev) => {
            return { ...prev, ...values };
          });

          serviceabilityCheck(payload);
        } else if (current === 1) {
          const newPayload = {
            pickup_pincode: totalData?.pickup_info?.pickup_pincode,
            drop_pincode: totalData?.drop_info?.drop_pincode,
            length: Number(values?.shipment_details?.length),
            breadth: Number(values?.shipment_details?.breadth),
            height: Number(values?.shipment_details?.height),
            weight: Number(values?.shipment_details?.weight),
            delivery_type: values?.shipment_details?.delivery_type,
            order_type: "PREPAID",
          };
          const newValidData = orderRecommendationSchema.parse(newPayload);
          recommendationMutate(newValidData);
          setTotalData((prev) => {
            return { ...prev, ...values };
          });
        } else if (current == 2) {
          const payload = {
            from_latitude: Number(totalData?.pickup_info?.pickup_lat),
            from_longitude: Number(totalData?.pickup_info?.pickup_long),
            courier_partner: totalData?.shipment_details?.courier_partner,
            is_cod: totalData?.shipment_details?.is_cod,
            insurance_opted: totalData?.shipment_details?.insurance_opted,
            to_pincode: totalData?.drop_info?.drop_pincode,
            length: Number(totalData?.shipment_details?.length),
            breadth: Number(totalData?.shipment_details?.breadth),
            height: Number(totalData?.shipment_details?.height),
            weight: Number(totalData?.shipment_details?.weight),
          };
          // console.log("values:", values);
          const validData = calculatePriceOfOrderSchema.parse(payload);
          calculatePriceOfOrder(validData);
          setTotalData((prev) => {
            return { ...prev, ...values };
          });
        } else {
          setCurrent(current + 1);
        }
      }
    } catch (error) {
      console.error("Validation failed:", error);
    }
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  const navigate = useNavigate();

  const { mutate: createOrder, isPending } = useCreateComprehensiveOrder({
    onSuccess: () => {
      const checkoutOptions = {
        paymentSessionId: paymentSessionId,
        redirectTarget: "_modal",
      };

      cashfree.checkout(checkoutOptions).then((result) => {
        if (result.error) {
          message.error(result.error.message || "Payment failed");
        }
        if (result.redirect) {
          console.log("Payment Redirect");
        }
        if (result.paymentDetails) {
          verifyPayment(CashFreeOfferId)
            .then(() => {
              message.success("Payment successful!");
              message.success("Order created successfully!");
              navigate({ to: "/orders" });
            })
            .catch(() => {
              message.error("Payment verification failed");
            });
        }
      });
    },
    onError: (error) => {
      console.error("Order creation failed:", error);
      message.error(error.message || "Failed to create order");
    },
  });

  const onFinish = async () => {
    try {
      const sessionData = await createPaymentSession({
        order_amount: summaryData.total_charge,
        customer_details: {
          customer_id: totalData.pickup_info.pickup_phone,
          customer_phone: totalData.pickup_info.pickup_phone,
          customer_name: totalData.pickup_info.pickup_name,
          customer_email: totalData.pickup_info.pickup_email,
        },
      });
      console.log("Session Data:", sessionData);

      if (!sessionData?.payment_order?.payment_session_id) {
        throw new Error("Failed to create payment session");
      }

      setPaymentSessionId(sessionData?.payment_order?.payment_session_id);
      const removeNullValues = (obj) => {
        if (obj === null || typeof obj !== "object") {
          return obj;
        }

        if (Array.isArray(obj)) {
          return obj
            .map(removeNullValues)
            .filter((item) => item !== null && item !== undefined);
        }

        const newObj = {};
        for (const key in obj) {
          if (Object.prototype.hasOwnProperty.call(obj, key)) {
            const value = obj[key];
            if (value !== null && value !== undefined) {
              const processedValue = removeNullValues(value);
              newObj[key] = processedValue;
            }
          }
        }
        return newObj;
      };

      const cleanedTotalData = removeNullValues(totalData);
      setCashFreeOfferId(sessionData?.payment_order?.cf_order_id);
      if (!paymentSessionId) {
        // Handle the case where paymentSessionId is not set
        message.error("Payment session not initiated. Please try again.");
        return;
      }

      const payload = {
        ...cleanedTotalData,
        shipment_details: {
          ...cleanedTotalData.shipment_details,
          order_type: "PREPAID",
          payment_id: sessionData?.payment_order?.cf_order_id,
          invoice_value: summaryData.total_charge,
          invoice_date: dayjs().format("DD-MM-YYYY"),
          cp_id: cleanedTotalData?.shipment_details?.courier_partner,
          courier_partner: carrierPartnerData?.carrier_partner,
          account_code: carrierPartnerData?.account_code,
          category_id: cleanedTotalData?.shipment_details?.category_id,
          item_ids: [cleanedTotalData?.shipment_details?.item_ids],
        },
      };

      // 1. Validate data against schema (optional but recommended)
      const validatedData = createOrderSchema.parse(payload);
      // 2. Call API
      createOrder(validatedData);
    } catch (error) {
      console.log("Error:", error);

      if (error.name === "ZodError") {
        // Handle validation errors if using Zod manually here
        console.error("Validation error:", error.errors);
        message.error("Please check your inputs.");
      } else {
        console.error("Submission error:", error);
      }
    }
  };

  const steps = [
    {
      title: "Locations",
      icon: <EnvironmentOutlined />,
      content: <LocationStep />,
    },
    {
      title: "Shipment",
      icon: <CodeSandboxOutlined />,
      content: <ShipmentStep />,
    },
    {
      title: "Carrier Partner",
      icon: <FaShippingFast />,
      content: (
        <CourierPartnerSelector
          data={recommendationData}
          value={carrierPartnerData?.account_code}
          onChange={(accountCode) => {
            const preferenceArray =
              recommendationData?.recommendations?.result?.[0]
                ?.preference_array || [];

            const selected = preferenceArray.find(
              (item) => item.account_code === accountCode
            );

            setCarrierPartnerData({
              carrier_partner: selected?.cp_id,
              account_code: selected?.account_code,
            });
          }}
        />
      ),
    },
    {
      title: "Summary",
      icon: <FileTextOutlined />,
      content: <SummaryStep summaryData={summaryData} />,
    },
  ];

  return (
    <div className="w-full flex flex-col gap-3">
      <Steps
        onChange={(e) => setCurrent(e)}
        current={current}
        items={steps}
        className="mb-8"
        size="small"
      />

      <Form form={form} layout="vertical" onFinish={onFinish}>
        <div className="mb-8">{steps[current]?.content}</div>

        <div className="flex justify-end gap-4 sticky bottom-0 bg-white p-4 border-t border-gray-300 z-10 shadow-md -mx-3 -mb-6 rounded-b-lg">
          {current > 0 && (
            <Form.Item className="mb-0!">
              <ResponsiveButton onClick={() => prev()}>
                Previous
              </ResponsiveButton>
            </Form.Item>
          )}
          {current === 0 && <BackButton navigateTo="/orders">Back</BackButton>}
          {current < steps.length - 1 && (
            <Form.Item className="mb-0!">
              <ResponsiveButton
                loading={
                  serviceabilityPending ||
                  calculatePricePending ||
                  isRecommendationPending
                }
                type="primary"
                onClick={() => next()}
              >
                Next
              </ResponsiveButton>
            </Form.Item>
          )}
          {current === steps.length - 1 && (
            <Form.Item className="mb-0!">
              <ResponsiveButton
                type="primary"
                htmlType="submit"
                loading={isPending}
              >
                Create Order & Pay
              </ResponsiveButton>
            </Form.Item>
          )}
        </div>
      </Form>
    </div>
  );
};

export default ComprehensiveOrderForm;
