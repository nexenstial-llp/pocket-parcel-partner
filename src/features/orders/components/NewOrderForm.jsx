import { useState } from "react";
import {
  Form,
  Steps,
  Button,
  Card,
  Typography,
  message,
  InputNumber,
  Row,
  Col,
  Select,
  Space,
} from "antd";
import { EnvironmentOutlined, CodeSandboxOutlined } from "@ant-design/icons";
import AddressSelectorModal from "./AddressSelectorModal";
import ResponsiveButton from "@/components/ui/ResponsiveButton";
import BackButton from "@/components/ui/BackButton";
import {
  useCalculatePriceOfOrder,
  useCheckServiceability,
  useCreateComprehensiveOrder,
  useGetDomesticRecommendation,
} from "@/features/orders/orders.query";
import {
  calculatePriceOfOrderSchema,
  createOrderSchema,
  orderRecommendationSchema,
} from "../orders.schema";
import VisualSelector from "./VisualSelector";
import ResponsiveCard from "@/components/ui/cards/ResponsiveCard";
import CourierPartnerSelector from "./CourierPartnerSelector";
import SummaryStep from "./steps/SummaryStep";
import { load } from "@cashfreepayments/cashfree-js";
import {
  createPaymentSession,
  verifyPayment,
} from "@/features/payment/payment.service";
import dayjs from "dayjs";
import { FaShippingFast } from "react-icons/fa";
import { RiBillLine } from "react-icons/ri";
import PaymentSuccessModal from "./PaymentSuccessModal";
import { useUrlParams } from "@/hooks/useUrlParams";
import { Radio } from "antd";
import PaginatedSelect from "@/components/ui/PaginatedSelect";
let cashfree;

const initializeCashfree = async () => {
  cashfree = await load({
    mode: "sandbox",
  });
};

initializeCashfree();
const { Text } = Typography;

const deliveryTypeOptions = [
  { label: "Forward", value: "FORWARD" },
  { label: "Reverse", value: "REVERSE" },
];
const NewOrderForm = () => {
  const { params, setParams } = useUrlParams();
  const { pickup_type = "warehouse" } = params;
  const [current, setCurrent] = useState(0);
  const [form] = Form.useForm();
  //   const navigate = useNavigate();
  // Watch fields for dependent selects
  const category_id = Form.useWatch(["shipment_details", "category_id"], form);
  const sub_category_id = Form.useWatch(
    ["shipment_details", "sub_category_id"],
    form
  );
  const [summaryData, setSummaryData] = useState({});

  const length = Form.useWatch(["shipment_details", "length"], form);
  const breadth = Form.useWatch(["shipment_details", "breadth"], form);
  const height = Form.useWatch(["shipment_details", "height"], form);
  const weight = Form.useWatch(["shipment_details", "weight"], form);

  const volumetricWeight = (length * breadth * height) / 5000 || 0;

  const finalWeight =
    weight > volumetricWeight ? weight : volumetricWeight || 0;
  // State for Address Selection
  const [pickupAddress, setPickupAddress] = useState(null);
  const [dropAddress, setDropAddress] = useState(null);
  const [isPickupModalOpen, setIsPickupModalOpen] = useState(false);
  const [isDropModalOpen, setIsDropModalOpen] = useState(false);

  // Order Data
  const [totalData, setTotalData] = useState({});

  const [recommendationData, setRecommendationData] = useState(null);
  const [carrierPartnerData, setCarrierPartnerData] = useState(null);
  const [CashFreeOfferId, setCashFreeOfferId] = useState(null);
  const [paymentSessionId, setPaymentSessionId] = useState(null);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [successDetails, setSuccessDetails] = useState({
    transactionId: null,
    orderId: null,
    orderNumber: null,
  });

  const handleOrderTypeChange = (value) => {
    setParams({ pickup_type: value });
    setCurrent(0);
    form.resetFields();
  };

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

  // API Hooks
  const { mutate: serviceabilityCheck, isPending: serviceabilityPending } =
    useCheckServiceability({
      onSuccess: () => {
        setCurrent((prev) => prev + 1);
      },
      onError: (error) => {
        message.error(error.message || "Serviceability check failed");
      },
    });

  const { mutate: recommendationMutate, isPending: isRecommendationPending } =
    useGetDomesticRecommendation({
      onSuccess: (data) => {
        const isServiceable =
          data?.recommendations?.result?.[0]?.preference_array?.length > 0;

        if (!isServiceable) {
          message.error("Service not available for this shipment");
          return;
        }

        setRecommendationData(data);
        setCurrent((prev) => prev + 1);
      },
    });

  // Handle Address Selection
  const handleSelectPickup = (address) => {
    setPickupAddress(address);
    setIsPickupModalOpen(false);
    form.setFieldsValue({ pickup_address: address });
  };

  const handleSelectDrop = (address) => {
    setDropAddress(address);
    setIsDropModalOpen(false);
    form.setFieldsValue({ drop_address: address });
  };

  const next = async () => {
    console.log("hi");

    try {
      if (current === 0) {
        if (!pickupAddress || !dropAddress) {
          message.error("Please select both Pickup and Delivery addresses.");
          return;
        }
        // Validate Serviceability
        const payload = [
          {
            pickup_pincode: pickupAddress.pincode,
            drop_pincode: dropAddress.pincode,
          },
        ];

        // Update totalData with address info mapping to expected schema
        setTotalData((prev) => ({
          ...prev,
          pickup_info: {
            pickup_pincode: pickupAddress.pincode,
            pickup_lat: pickupAddress.latitude,
            pickup_long: pickupAddress.longitude,
            pickup_name: pickupAddress.full_name,
            pickup_phone: pickupAddress.phone_number,
            pickup_address: addressToString(pickupAddress),
            pickup_city: pickupAddress.city,
            pickup_state: pickupAddress.state,
          },
          drop_info: {
            drop_pincode: dropAddress.pincode,
            drop_latitude: dropAddress.latitude,
            drop_longitude: dropAddress.longitude,
            drop_name: dropAddress.full_name,
            drop_phone: dropAddress.phone_number,
            drop_address: addressToString(dropAddress),
            drop_city: dropAddress.city,
            drop_state: dropAddress.state,
          },
        }));

        serviceabilityCheck(payload);
      } else if (current === 1) {
        const values = await form.validateFields();
        const payload = {
          pickup_pincode: totalData.pickup_info.pickup_pincode,
          drop_pincode: totalData.drop_info.drop_pincode,
          length: Number(values.shipment_details.length),
          breadth: Number(values.shipment_details.breadth),
          height: Number(values.shipment_details.height),
          weight: Number(values.shipment_details.weight),
          delivery_type: values.shipment_details.delivery_type,
          order_type: "PREPAID",
        };

        const validData = orderRecommendationSchema.parse(payload);

        setTotalData((prev) => ({ ...prev, ...values }));
        recommendationMutate(validData);
      } else if (current === 2) {
        const values = await form.validateFields();
        const payload = {
          from_latitude: Number(totalData?.pickup_info?.pickup_lat),
          from_longitude: Number(totalData?.pickup_info?.pickup_long),
          courier_partner: String(carrierPartnerData?.carrier_partner),
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
    } catch (error) {
      console.error("Step validation failed", error);
    }
  };

  const prev = () => setCurrent(current - 1);

  const addressToString = (addr) => {
    if (!addr) return "";
    return `${addr.address_line1}, ${
      addr.address_line2 ? addr.address_line2 + ", " : ""
    }${addr.city}, ${addr.state} - ${addr.pincode}`;
  };

  const steps = [
    {
      title: "Select Addresses",
      icon: <EnvironmentOutlined />,
      content: (
        <>
          {pickup_type === "warehouse" && (
            <Form.Item
              rules={[{ required: true, message: "Please select a warehouse" }]}
              name="warehouse_id"
              label="Warehouse"
              className="mb-2!"
              wrapperCol={{ span: 8 }}
            >
              <PaginatedSelect
                fetchUrl="v1/transit-warehouse/warehouses"
                valueField="id"
                labelField="name"
                onChange={(value) => console.log(value)}
                placeholder="Select Warehouse"
              />
            </Form.Item>
          )}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Pickup Address Card */}
            <Card
              title="From Address"
              className="shadow-sm border-gray-200"
              extra={
                <Button type="link" onClick={() => setIsPickupModalOpen(true)}>
                  {pickupAddress ? "Change" : "Select"}
                </Button>
              }
            >
              {pickupAddress ? (
                <div className="flex flex-col gap-1">
                  <Text strong>{pickupAddress.label}</Text>
                  <Text>
                    {pickupAddress.full_name} | {pickupAddress.phone_number}
                  </Text>
                  <Text type="secondary">{addressToString(pickupAddress)}</Text>
                </div>
              ) : (
                <div className="text-center py-8 text-gray-400">
                  <Button
                    type="dashed"
                    onClick={() => setIsPickupModalOpen(true)}
                  >
                    + Select Pickup Address
                  </Button>
                </div>
              )}
            </Card>

            {/* Delivery Address Card */}
            <Card
              title="To Address"
              className="shadow-sm border-gray-200"
              extra={
                <Button type="link" onClick={() => setIsDropModalOpen(true)}>
                  {dropAddress ? "Change" : "Select"}
                </Button>
              }
            >
              {dropAddress ? (
                <div className="flex flex-col gap-1">
                  <Text strong>{dropAddress.label}</Text>
                  <Text>
                    {dropAddress.full_name} | {dropAddress.phone_number}
                  </Text>
                  <Text type="secondary">{addressToString(dropAddress)}</Text>
                </div>
              ) : (
                <div className="text-center py-8 text-gray-400">
                  <Button
                    type="dashed"
                    onClick={() => setIsDropModalOpen(true)}
                  >
                    + Select Delivery Address
                  </Button>
                </div>
              )}
            </Card>

            <AddressSelectorModal
              open={isPickupModalOpen}
              onCancel={() => setIsPickupModalOpen(false)}
              onSelect={handleSelectPickup}
              title="Select Pickup Address"
            />
            <AddressSelectorModal
              open={isDropModalOpen}
              onCancel={() => setIsDropModalOpen(false)}
              onSelect={handleSelectDrop}
              title="Select Delivery Address"
            />
          </div>
        </>
      ),
    },
    {
      title: "Package Details",
      icon: <CodeSandboxOutlined />,
      content: (
        <ResponsiveCard title="Shipment Details">
          <Row gutter={[24]} align="top">
            {/* SECTION 1: Configuration */}
            <Col xs={24} md={12} lg={6}>
              <Form.Item
                name={["shipment_details", "delivery_type"]}
                label="Service Type"
                initialValue="FORWARD"
                className="mb-0"
              >
                <Select
                  placeholder="Select Type"
                  options={deliveryTypeOptions}
                  className="w-full"
                />
              </Form.Item>
            </Col>

            {/* SECTION 2: Dimensions */}
            <Col xs={24} sm={12} md={12} lg={9}>
              <Form.Item
                label={"Dimensions (L × B × H)"}
                className="mb-0"
                required
              >
                <Space.Compact block>
                  <Form.Item name={["shipment_details", "length"]} noStyle>
                    <InputNumber
                      min={0}
                      controls={false}
                      placeholder="L"
                      className="w-full"
                    />
                  </Form.Item>
                  <Form.Item name={["shipment_details", "breadth"]} noStyle>
                    <InputNumber
                      min={0}
                      controls={false}
                      placeholder="B"
                      className="w-full border-l-0"
                    />
                  </Form.Item>
                  <Form.Item name={["shipment_details", "height"]} noStyle>
                    <InputNumber
                      min={0}
                      controls={false}
                      placeholder="H"
                      className="w-full border-l-0"
                    />
                  </Form.Item>
                  <Text className="bg-gray-100 px-2 text-nowrap rounded-r-sm text-xs">
                    cm
                  </Text>
                </Space.Compact>
              </Form.Item>
            </Col>
            {/* Actual Weight Input */}
            <Col xs={24} sm={12} lg={9}>
              <Form.Item
                name={["shipment_details", "weight"]}
                label="Actual Weight"
                className="mb-0"
              >
                <InputNumber
                  min={0}
                  controls={false}
                  suffix="kg"
                  className="w-full shadow-none"
                  placeholder="0"
                />
              </Form.Item>
            </Col>

            {/* SECTION 3: Weight Calculations */}
            <Col xs={24} sm={12}>
              <div className="bg-slate-50 border border-slate-100 rounded-md p-3 mb-2">
                <Row gutter={[12, 8]}>
                  {/* Volumetric Display */}
                  <Col span={12}>
                    <Form.Item
                      label={
                        <span className="text-xs text-gray-500">
                          Volumetric
                        </span>
                      }
                      className="mb-0"
                      tooltip="Calculation: (L × B × H) / 5000"
                    >
                      <div className="ant-input ant-input-sm ant-input-disabled bg-transparent border-0 text-gray-500 font-medium px-0">
                        {volumetricWeight || 0}{" "}
                        <span className="text-xs">kg</span>
                      </div>
                    </Form.Item>
                  </Col>

                  {/* Final Weight Highlight */}
                  <Col span={12}>
                    <Form.Item
                      label={
                        <span className="text-xs text-blue-600 font-bold">
                          Billable
                        </span>
                      }
                      className="mb-0"
                    >
                      <div className="text-blue-700 font-bold text-lg leading-tight">
                        {finalWeight || 0}{" "}
                        <span className="text-xs font-normal text-gray-500">
                          kg
                        </span>
                      </div>
                    </Form.Item>
                  </Col>
                </Row>
              </div>
            </Col>
          </Row>

          <Row gutter={24}>
            {/* Category Selection - Visual */}
            <Col span={24}>
              <Form.Item label="Select Category">
                <Form.Item
                  name={["shipment_details", "category_id"]}
                  noStyle
                  rules={[
                    { required: true, message: "Please select a category" },
                  ]}
                >
                  <VisualSelector
                    fetchUrl="/v1/mobile/catalog/categories"
                    queryKey="categories_visual"
                  />
                </Form.Item>
              </Form.Item>
            </Col>

            {/* Sub Category Selection - Visual */}
            <Col span={24}>
              <Form.Item label="Select Sub-Category">
                <Form.Item
                  name={["shipment_details", "sub_category_id"]}
                  noStyle
                >
                  <VisualSelector
                    fetchUrl="/v1/mobile/catalog/sub-categories"
                    queryKey="sub_categories_visual"
                    params={{ category_id }}
                    disabled={!category_id}
                  />
                </Form.Item>
              </Form.Item>
            </Col>

            {/* Item Selection - Visual */}
            <Col span={24}>
              <Form.Item label="Select Item">
                <Form.Item
                  name={["shipment_details", "item_ids"]}
                  noStyle
                  rules={[{ required: true, message: "Please select an item" }]}
                  getValueFromEvent={(e) => [e]} // Convert single ID to array for item_ids
                  getValueProps={(value) => ({ value: value?.[0] })} // Extract single ID from array for display
                >
                  <VisualSelector
                    fetchUrl="/v1/mobile/catalog/items"
                    queryKey="items_visual"
                    params={
                      sub_category_id ? { sub_category_id } : { category_id }
                    }
                    disabled={!category_id}
                  />
                </Form.Item>
              </Form.Item>
            </Col>
          </Row>
        </ResponsiveCard>
      ),
    },
    // Placeholder for Carrier Partner Step (to be implemented/reused)
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
    // Summary
    {
      title: "Summary",
      icon: <RiBillLine />,
      content: <SummaryStep summaryData={summaryData} />,
    },
  ];

  const { mutate: createOrder, isPending } = useCreateComprehensiveOrder({
    onSuccess: (data) => {
      console.log("data", data);

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
              // message.success("Payment successful!");
              // message.success("Order created successfully!");
              // navigate({ to: "/orders" });
              setSuccessDetails({
                transactionId: CashFreeOfferId,
                orderId: data?.order_id || data?.id,
                orderNumber: data?.order_number,
              });
              setIsSuccessModalOpen(true);
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
      if (!sessionData?.payment_order?.cf_order_id) {
        message.error("Payment session not initiated. Please try again.");
        return;
      }

      const payload = {
        ...cleanedTotalData,
        pickup_info: {
          ...cleanedTotalData.pickup_info,
          pickup_lat: Number(cleanedTotalData.pickup_info.pickup_lat),
          pickup_long: Number(cleanedTotalData.pickup_info.pickup_long),
          email: "abcd@gmail.com",
        },
        drop_info: {
          ...cleanedTotalData.drop_info,
          drop_latitude: Number(cleanedTotalData.drop_info.drop_latitude),
          drop_longitude: Number(cleanedTotalData.drop_info.drop_longitude),
        },
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
          item_ids: cleanedTotalData?.shipment_details?.item_ids,
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
        message.error("Please check your inputs.");
      } else {
        console.error("Submission error:", error);
      }
    }
  };
  return (
    <div className="w-full flex flex-col gap-3">
      <Radio.Group
        options={[
          {
            label: "Direct Carrier Partner (Warehouse Pickup)",
            value: "warehouse",
          },
          {
            label: "First Mile Order + Carrier Partner (Home Pickup)",
            value: "home",
          },
        ]}
        onChange={(e) => handleOrderTypeChange(e.target.value)}
        value={pickup_type}
        optionType="button"
        buttonStyle="solid"
        className="mb-2!"
      />

      <Steps
        onChange={(e) => setCurrent(e)}
        current={current}
        items={steps}
        className="mb-8"
        size="small"
      />

      <Form onFinish={onFinish} form={form} layout="vertical">
        <div className="mb-8">{steps[current]?.content}</div>

        {/* Navigation Buttons */}
        <div className="flex justify-end gap-4 -mx-3 -mb-8 sticky bottom-0 bg-white p-4 border-t border-gray-300 z-10 shadow-md rounded-b-lg">
          {current > 0 && (
            <ResponsiveButton onClick={prev}>Previous</ResponsiveButton>
          )}
          {current === 0 && <BackButton navigateTo="/orders">Back</BackButton>}
          {current < steps.length - 1 && (
            <ResponsiveButton
              type="primary"
              onClick={next}
              loading={
                serviceabilityPending ||
                isRecommendationPending ||
                calculatePricePending
              }
            >
              Next
            </ResponsiveButton>
          )}
          {current === steps.length - 1 && (
            <ResponsiveButton
              loading={isPending}
              type="primary"
              htmlType="submit"
            >
              Create Order & Pay
            </ResponsiveButton>
          )}
        </div>
      </Form>

      {isSuccessModalOpen && (
        <PaymentSuccessModal
          open={isSuccessModalOpen}
          onClose={() => setIsSuccessModalOpen(false)}
          amount={summaryData?.total_charge}
          transactionId={successDetails.transactionId}
          orderId={successDetails.orderId}
          orderNumber={successDetails.orderNumber}
        />
      )}
    </div>
  );
};

export default NewOrderForm;
