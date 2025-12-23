/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { useBlocker } from "@tanstack/react-router";
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
  Modal,
  Divider,
  Input,
  Switch,
} from "antd";
import {
  EnvironmentOutlined,
  CodeSandboxOutlined,
  FileTextOutlined,
  CameraOutlined,
  SafetyCertificateOutlined,
  MessageOutlined,
  ShoppingOutlined,
  ShopOutlined,
  HomeOutlined,
  CheckCircleFilled,
} from "@ant-design/icons";
import WebcamCapture from "@/components/ui/WebcamCapture";
import AddressSelectorModal from "./AddressSelectorModal";
import ResponsiveButton from "@/components/ui/ResponsiveButton";
import BackButton from "@/components/ui/BackButton";
import {
  useCheckServiceability,
  useCreateComprehensiveOrder,
  useCalculatePriceOfOrder,
} from "@/features/orders/orders.query";
import {
  calculatePriceOfOrderSchema,
  createOrderSchema,
} from "../orders.schema";
import VisualSelector from "./VisualSelector";
import ResponsiveCard from "@/components/ui/cards/ResponsiveCard";
import CourierPartnerSelector from "./CourierPartnerSelector";
import SummaryStep from "./steps/SummaryStep";
import { load } from "@cashfreepayments/cashfree-js";
import { verifyPayment } from "@/features/payment/payment.service";
import dayjs from "dayjs";
import { FaShippingFast } from "react-icons/fa";
import { RiBillLine } from "react-icons/ri";
import PaymentSuccessModal from "./PaymentSuccessModal";
import { useUrlParams } from "@/hooks/useUrlParams";
import toast from "react-hot-toast";
import { useCheckWeightRangeServiceability } from "@/features/weight-range/weight-range.query";
import { applyZodErrorsToForm } from "@/utils/formError.util";
import { useCreatePaymentSession } from "@/features/payment/payment.query";

import { createPaymentOrderSchema } from "@/features/payment/payment.schema";
import PaginatedSelect from "@/components/ui/PaginatedSelect";
import { useRef } from "react";
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
  const [cashfree, setCashfree] = useState(null);
  const [warehouse, setWarehouse] = useState(null);
  const [warehouseLocation, setWarehouseLocation] = useState(null);

  const isPromptOpen = useRef(false);
  // Watch fields for dependent selects
  const category_id = Form.useWatch(["shipment_details", "category_id"], form);
  const sub_category_id = Form.useWatch(
    ["shipment_details", "sub_category_id"],
    form
  );

  const [summaryData, setSummaryData] = useState({});
  const length = Form.useWatch(["shipment_details", "length"], form) || 0;
  const breadth = Form.useWatch(["shipment_details", "breadth"], form) || 0;
  const height = Form.useWatch(["shipment_details", "height"], form) || 0;
  const weight = Form.useWatch(["shipment_details", "weight"], form) || 0;

  /* -------------------- WEIGHT CALC REMOVED -------------------- */

  const itemsQueryParams = sub_category_id
    ? { sub_category_id }
    : { category_id };

  // State for Address Selection
  const [pickupAddress, setPickupAddress] = useState(null);
  const [dropAddress, setDropAddress] = useState(null);
  const [isPickupModalOpen, setIsPickupModalOpen] = useState(false);
  const [isDropModalOpen, setIsDropModalOpen] = useState(false);

  // Order Data
  const [totalData, setTotalData] = useState({});
  const [carrierOptions, setCarrierOptions] = useState([]);

  const [carrierPartnerData, setCarrierPartnerData] = useState(null);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [successDetails, setSuccessDetails] = useState({
    transactionId: null,
    orderId: null,
    orderNumber: null,
  });
  const [chargeableWeight, setchargableWeight] = useState(null);
  const [offerCode, setOfferCode] = useState(null);
  const [isDirty, setIsDirty] = useState(false);

  // Unit State
  const [dimensionUnit, setDimensionUnit] = useState("cm"); // 'cm' | 'inch'
  const [weightUnit, setWeightUnit] = useState("gm"); // 'gm' | 'kg'

  /* -------------------- WEIGHT CALC (CORRECT) -------------------- */
  // Convert dimensions to cm for calculation
  const lengthInCm =
    dimensionUnit === "inch" ? (length || 0) * 2.54 : length || 0;
  const breadthInCm =
    dimensionUnit === "inch" ? (breadth || 0) * 2.54 : breadth || 0;
  const heightInCm =
    dimensionUnit === "inch" ? (height || 0) * 2.54 : height || 0;

  // Convert weight to gm for comparison
  const weightInGm = weightUnit === "kg" ? (weight || 0) * 1000 : weight || 0;

  const volumetricWeight =
    lengthInCm && breadthInCm && heightInCm
      ? (lengthInCm * breadthInCm * heightInCm) / 5000
      : 0; // This is in kg

  // Final weight is max of actual weight (in kg) and volumetric weight (in kg)
  // weightInGm / 1000 converts actual weight to kg
  const finalWeight = Math.max(weightInGm / 1000, volumetricWeight);

  const blocker = useBlocker({
    shouldBlockFn: () => isDirty,
    withResolver: true,
  });

  useEffect(() => {
    if (blocker.status === "blocked" && !isPromptOpen.current) {
      isPromptOpen.current = true;
      Modal.confirm({
        title: "Unsaved Changes",
        content: "You have unsaved changes. Are you sure you want to exit?",
        okText: "Yes, Exit",
        cancelText: "No, Stay",
        onOk: () => {
          isPromptOpen.current = false;
          blocker.proceed();
        },
        onCancel: () => {
          isPromptOpen.current = false;
          blocker.reset();
        },
      });
    }
  }, [blocker, blocker.status]);

  // useEffect(() => {
  //   const initSdk = async () => {
  //     const cf = await load({ mode: "sandbox" });
  //     // const cf = await load({ mode: "production" });
  //     setCashfree(cf);
  //   };
  //   initSdk();
  // }, []);

  /* -------------------- LOAD CASHFREE -------------------- */
  useEffect(() => {
    let mounted = true;
    load({ mode: "production" }).then((cf) => {
      if (mounted) setCashfree(cf);
    });
    return () => {
      mounted = false;
    };
  }, []);
  useEffect(() => {
    if (pickup_type === "home") {
      setWarehouse(null);
      setWarehouseLocation(null);
    }
  }, [pickup_type]);
  useEffect(() => {
    if (!warehouse) {
      setWarehouseLocation(null);
    }
  }, [warehouse]);

  const handleOrderTypeChange = (value) => {
    setParams({ pickup_type: value });
    setCurrent(0);
    form.resetFields();
  };

  const {
    mutateAsync: checkWeightRangeServiceability,
    isPending: isCheckWeightRangeServiceabilityPending,
  } = useCheckWeightRangeServiceability({
    onSuccess: (data) => {
      console.log(data);
    },
    onError: (error) => {
      console.log(error);
    },
  });

  // Payment Hooks
  const { mutateAsync: createPaymentSession } = useCreatePaymentSession();

  // Calculate Price
  const { mutate: calculatePriceOfOrder, isPending: calculatePricePending } =
    useCalculatePriceOfOrder({
      onSuccess: (data) => {
        console.log("Calculate Price Data:", data);
        if (Array.isArray(data)) {
          setCarrierOptions(data);
        }
        // setSummaryData(data); // Don't set summary data here, wait for selection
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
        if (pickup_type === "warehouse" && !warehouseLocation) {
          message.error("Please select warehouse location.");
          return;
        }

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
        const weightPayload = {
          length:
            dimensionUnit === "inch"
              ? Number(values?.shipment_details?.length) * 2.54
              : Number(values?.shipment_details?.length),
          breadth:
            dimensionUnit === "inch"
              ? Number(values?.shipment_details?.breadth) * 2.54
              : Number(values?.shipment_details?.breadth),
          height:
            dimensionUnit === "inch"
              ? Number(values?.shipment_details?.height) * 2.54
              : Number(values?.shipment_details?.height),
          actual_weight:
            weightUnit === "kg"
              ? Number(values?.shipment_details?.weight) * 1000
              : Number(values?.shipment_details?.weight),
        };

        const weightResponse = await checkWeightRangeServiceability(
          weightPayload
        );
        if (
          weightResponse?.status === false ||
          weightResponse?.data?.is_serviceable === false
        ) {
          Modal.error({
            title: "Weight Serviceability Check Failed",
            content:
              weightResponse?.data?.reason ||
              weightResponse?.message ||
              "Package not serviceable",
          });
          return;
        }
        if (weightResponse?.data?.is_serviceable) {
          setchargableWeight(weightResponse?.data?.chargeable_weight_grams);
        }
        // const payload = {
        //   pickup_pincode: totalData.pickup_info.pickup_pincode,
        //   drop_pincode: totalData.drop_info.drop_pincode,
        //   length: Number(values.shipment_details.length),
        //   breadth: Number(values.shipment_details.breadth),
        //   height: Number(values.shipment_details.height),
        //   weight: Number(weightResponse?.data?.chargeable_weight_grams),
        //   delivery_type: values.shipment_details.delivery_type,
        //   order_type: "PREPAID",
        // };

        // const validData = orderRecommendationSchema.parse(payload);

        // Update totalData with chargeable weight instead of actual weight
        setTotalData((prev) => ({
          ...prev,
          ...values,
          shipment_details: {
            ...values.shipment_details,
            // Store chargeable weight in the same unit as input for display consistency
            weight: weightUnit === "kg" 
              ? weightResponse?.data?.chargeable_weight_grams / 1000 
              : weightResponse?.data?.chargeable_weight_grams,
          },
        }));
        setCurrent((prev) => prev + 1);
        // recommendationMutate(validData);
      } else if (current === 2) {
        // Validation for Additional Details Step
        const values = await form.validateFields();
        const payload = {
          from_latitude: Number(totalData?.pickup_info?.pickup_lat),
          from_longitude: Number(totalData?.pickup_info?.pickup_long),
          to_pincode: totalData?.drop_info?.drop_pincode,
          length: Number(totalData?.shipment_details?.length),
          breadth: Number(totalData?.shipment_details?.breadth),
          height: Number(totalData?.shipment_details?.height),
          weight: Number(chargeableWeight),
          skip_first_mile_pickup: pickup_type === "warehouse" ? true : false,

          // cp_id: carrierPartnerData?.carrier_partner,
          // account_code: carrierPartnerData?.account_code,
        };
        const validData = calculatePriceOfOrderSchema.parse(payload);
        calculatePriceOfOrder(validData);
        setTotalData((prev) => ({ ...prev, ...values }));
      } else if (current === 3) {
        if (!carrierPartnerData || !carrierPartnerData.account_code) {
          message.error("Please select a carrier partner");
          return;
        }
        const values = await form.validateFields();
        setTotalData((prev) => ({ ...prev, ...values }));
        setCurrent(current + 1);
      } else {
        setCurrent(current + 1);
      }
    } catch (error) {
      console.error("Step validation failed", error);
      if (error.name === "ZodError") {
        applyZodErrorsToForm(form, error);
      } else {
        toast.error(error?.message);
      }
    }
  };

  const prev = () => setCurrent(current - 1);

  const addressToString = (addr) => {
    if (!addr) return "";
    return `${addr.address_line1}, ${
      addr.address_line2 ? addr.address_line2 + ", " : ""
    }${addr.city}, ${addr.state} - ${addr.pincode}`;
  };

  const handleOfferApplied = (data, code) => {
    // data is the array of courier services with updated prices
    if (Array.isArray(data)) {
      // Find the currently selected courier partner in the new data
      const currentCpId =
        carrierPartnerData?.courier_details?.cp_id ||
        carrierPartnerData?.carrier_partner;
      const updatedCourier = data.find(
        (item) =>
          item?.courier_service?.cp_id === currentCpId ||
          item?.courier_details?.cp_id === currentCpId
      );

      if (updatedCourier) {
        setSummaryData([updatedCourier]);
        setOfferCode(code);
        if (code) {
          message.success("Offer applied successfully!");
        } else {
          message.success("Offer removed successfully!");
        }
      } else {
        // Fallback if for some reason the courier isn't found
        message.warning(
          "Offer applied, but pricing for selected courier not found. Please re-select courier if needed."
        );
      }
    }
  };

  const steps = [
    {
      title: "Select Addresses",
      icon: <EnvironmentOutlined />,
      content: (
        <div className="flex flex-col gap-4">
          {pickup_type === "warehouse" && (
            <div className="grid grid-cols-2 gap-4">
              <Form.Item name="warehouse" label="Warehouse">
                <PaginatedSelect
                  fetchUrl="/v1/transit-warehouse/warehouses"
                  valueField="id"
                  labelField="name"
                  queryKey="warehouses"
                  placeholder="Select Warehouse"
                  value={warehouse}
                  onChange={(value) => {
                    setWarehouse(value);
                  }}
                />
              </Form.Item>
              {warehouse && (
                <Form.Item name="warehouseLocation" label="Location">
                  <PaginatedSelect
                    fetchUrl={`/v1/transit-warehouse/warehouses/${warehouse}/locations`}
                    fetchUrlItem={`/v1/transit-warehouse/warehouses/locations`}
                    valueField="id"
                    labelField="location_name"
                    queryKey="locations"
                    placeholder="Select Location"
                    value={warehouseLocation}
                    onChange={(value) => {
                      setWarehouseLocation(value);
                    }}
                  />
                </Form.Item>
              )}
            </div>
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
        </div>
      ),
    },
    {
      title: "Package Details",
      icon: <CodeSandboxOutlined />,
      content: (
        <ResponsiveCard title="Shipment Details">
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
                    fetchUrl="/v1/transit-warehouse/catalog/categories"
                    queryKey="categories_visual"
                  />
                </Form.Item>
              </Form.Item>
            </Col>

            {/* Sub Category Selection - Visual */}
            {/* <Col span={24}>
              <Form.Item label="Select Sub-Category">
                <Form.Item
                  name={["shipment_details", "sub_category_id"]}
                  noStyle
                >
                  <VisualSelector
                    fetchUrl="/v1/transit-warehouse/catalog/subcategories"
                    queryKey="sub_categories_visual"
                    params={{ category_id }}
                    disabled={!category_id}
                    dataPoint={"sub_categories"}
                  />
                </Form.Item>
              </Form.Item>
            </Col> */}

            {/* Item Selection - Visual */}
            <Col span={24}>
              <Form.Item label="Select Item">
                <Form.Item
                  name={["shipment_details", "item_ids"]}
                  noStyle
                  rules={[{ required: true, message: "Please select an item" }]}
                >
                  <VisualSelector
                    fetchUrl="/v1/transit-warehouse/catalog/items"
                    queryKey="items_visual"
                    params={itemsQueryParams}
                    disabled={!category_id}
                    dataPoint={"items"}
                    multiple={true}
                  />
                </Form.Item>
              </Form.Item>
            </Col>
          </Row>
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
                rules={[
                  {
                    required: true,
                    message: "Please enter dimensions",
                  },
                ]}
              >
                <Space.Compact block>
                  <Form.Item
                    rules={[
                      {
                        required: true,
                        message: "Please enter length",
                      },
                    ]}
                    name={["shipment_details", "length"]}
                    noStyle
                  >
                    <InputNumber
                      min={0}
                      controls={false}
                      placeholder="L"
                      className="w-full"
                    />
                  </Form.Item>
                  <Form.Item
                    rules={[
                      {
                        required: true,
                        message: "Please enter breadth",
                      },
                    ]}
                    name={["shipment_details", "breadth"]}
                    noStyle
                  >
                    <InputNumber
                      min={0}
                      controls={false}
                      placeholder="B"
                      className="w-full border-l-0"
                    />
                  </Form.Item>
                  <Form.Item
                    rules={[
                      {
                        required: true,
                        message: "Please enter height",
                      },
                    ]}
                    name={["shipment_details", "height"]}
                    noStyle
                  >
                    <InputNumber
                      min={0}
                      controls={false}
                      placeholder="H"
                      className="w-full border-l-0"
                    />
                  </Form.Item>
                  <Select
                    value={dimensionUnit}
                    onChange={(value) => {
                      setDimensionUnit(value);
                      // Reset dimension fields when unit changes
                      form.setFieldsValue({
                        shipment_details: {
                          length: undefined,
                          breadth: undefined,
                          height: undefined,
                        },
                      });
                    }}
                    options={[
                      { label: "cm", value: "cm" },
                      { label: "inch", value: "inch" },
                    ]}
                    style={{ width: 80 }}
                    size="middle"
                  />
                </Space.Compact>
              </Form.Item>
            </Col>
            {/* Actual Weight Input */}
            <Col xs={24} sm={12} lg={9}>
              <Form.Item
                name={["shipment_details", "weight"]}
                label="Actual Weight"
                className="mb-0"
                rules={[{ required: true, message: "Please enter weight" }]}
              >
                <InputNumber
                  min={0}
                  controls={false}
                  addonAfter={
                    <Select
                      defaultValue="gm"
                      value={weightUnit}
                      onChange={(value) => {
                        setWeightUnit(value);
                        // Reset weight field when unit changes
                        form.setFieldsValue({
                          shipment_details: {
                            weight: undefined,
                          },
                        });
                      }}
                      className="select-after"
                      style={{ width: 80 }}
                      options={[
                        { label: "gm", value: "gm" },
                        { label: "kg", value: "kg" },
                      ]}
                    />
                  }
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
                        <span className="text-blue-600 font-bold">
                          Chargeable Weight
                        </span>
                      }
                      className="mb-0"
                    >
                      <div className="text-blue-700 font-bold text-3xl leading-tight">
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
            {/* <Col xs={24} sm={12}>
              <Form.Item
                name={["shipment_details", "invoice_value"]}
                label={"Invoice Value"}
                className="mb-0"
              >
                <InputNumber
                  className="w-full!"
                  placeholder="Enter Invoice Value"
                  style={{
                    maxWidth: "200px",
                  }}
                />
              </Form.Item>
            </Col> */}
          </Row>
        </ResponsiveCard>
      ),
    },
    {
      title: "Additional Details",
      icon: <FileTextOutlined />,
      content: (
        <ResponsiveCard
          title={
            <span className="flex items-center gap-2">
              <SafetyCertificateOutlined className="text-blue-500" /> Additional
              Details
            </span>
          }
          size="small" // Compact Antd Card padding
          className="shadow-sm"
        >
          {/* 1. COMPACT SUMMARY STRIP */}
          <div className="mb-4 rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
            <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-gray-700">
              <ShoppingOutlined className="text-blue-600" />
              <span>Shipment Dimensions</span>
            </div>

            <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
              {[
                {
                  label: "Length",
                  value: totalData?.shipment_details?.length,
                  unit: "cm",
                },
                {
                  label: "Breadth",
                  value: totalData?.shipment_details?.breadth,
                  unit: "cm",
                },
                {
                  label: "Height",
                  value: totalData?.shipment_details?.height,
                  unit: "cm",
                },
                {
                  label: "Weight",
                  value: totalData?.shipment_details?.weight,
                  unit: weightUnit,
                },
              ].map((item) => (
                <div
                  key={item.label}
                  className="flex items-center gap-3 rounded-lg bg-gray-50 p-3"
                >
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100">
                    <ShoppingOutlined className="text-blue-600 text-sm" />
                  </div>

                  <div className="flex flex-col">
                    <span className="text-xs uppercase text-gray-500">
                      {item.label}
                    </span>
                    <span className="font-semibold text-gray-800">
                      {item.value ?? "--"} {item.unit}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 2. FORM INPUTS */}
          <Row gutter={[20, 0]}>
            {/* Left Col: Special Instructions */}
            <Col xs={24} md={14}>
              <Form.Item
                name={["additional", "special_instructions"]}
                label={
                  <span className="text-xs font-semibold text-gray-500 uppercase">
                    Instructions
                  </span>
                }
                className="mb-2 md:mb-0"
              >
                <Input.TextArea
                  prefix={<MessageOutlined className="text-gray-300 mr-1" />}
                  placeholder="e.g. Ring doorbell, Leave at gate..."
                  autoSize={{ minRows: 3, maxRows: 3 }}
                  className="rounded-md text-sm"
                />
              </Form.Item>
            </Col>

            {/* Right Col: Toggles (Stacked densely) */}
            <Col xs={24} md={10}>
              <div className="bg-white p-3 rounded-lg border border-gray-100 h-full flex flex-col justify-center gap-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600 flex items-center gap-2">
                    <MessageOutlined className="text-green-500" /> WhatsApp
                    Updates
                  </span>
                  <Form.Item
                    name={["additional", "enable_whatsapp"]}
                    valuePropName="checked"
                    initialValue={true}
                    noStyle
                  >
                    <Switch size="small" />
                  </Form.Item>
                </div>

                {/* <div className="flex justify-between items-center">
                  <Tooltip title="Courier will not pick up from origin">
                    <span className="text-sm text-gray-600 flex items-center gap-2 cursor-help border-b border-dashed border-gray-300">
                      <StopOutlined className="text-orange-500" /> Skip 1st Mile
                    </span>
                  </Tooltip>
                  <Form.Item
                    name={["additional", "skip_first_mile_pickup"]}
                    valuePropName="checked"
                    noStyle
                  >
                    <Switch size="small" />
                  </Form.Item>
                </div> */}

                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600 flex items-center gap-2">
                    <SafetyCertificateOutlined className="text-red-500" />{" "}
                    Fragile Item
                  </span>
                  <Form.Item
                    name={["additional", "is_fragile"]}
                    valuePropName="checked"
                    noStyle
                  >
                    <Switch size="small" className="bg-gray-200" />
                  </Form.Item>
                </div>
              </div>
            </Col>

            {/* Bottom: Camera */}
            <Col span={24}>
              <Divider dashed className="my-3 text-xs text-gray-400">
                <CameraOutlined /> Parcel Proof
              </Divider>
              <Form.Item name={["additional", "parcel_images"]} noStyle>
                <WebcamCapture maxCount={2} />
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
          data={carrierOptions}
          value={carrierPartnerData?.account_code}
          onChange={(selectedItem) => {
            if (!selectedItem) return;
            const { courier_details } = selectedItem;

            setCarrierPartnerData({
              carrier_partner: courier_details?.cp_id, // Assuming cp_id is needed for backend
              account_code: courier_details?.account_code,
              ...courier_details,
            });
            // Update summary data for the final step
            // SummaryStep expects an array with [0] containing keys { courier_service, price_summary }
            // The selectedItem already matches this structure.
            setSummaryData([selectedItem]);

            // Also update form values?
            setTotalData((prev) => ({
              ...prev,
              shipment_details: {
                ...prev.shipment_details,
                courier_partner: courier_details?.cp_id,
                account_code: courier_details?.account_code,
              },
            }));
          }}
        />
      ),
    },
    // Summary
    {
      title: "Summary",
      icon: <RiBillLine />,
      content: (
        <SummaryStep
          summaryData={summaryData}
          shipmentData={totalData}
          chargeableWeight={chargeableWeight}
          carrierPartnerData={carrierPartnerData}
          onOfferApplied={handleOfferApplied}
          pickup_type={pickup_type}
          form={form}
          weightUnit={weightUnit}
        />
      ),
    },
  ];
  // Extract Payment Logic into a reusable function
  // Helper function to handle Payment Session Creation + Cashfree Checkout
  const initiatePayment = async (
    orderId,
    orderNumber,
    amount,
    customerData
  ) => {
    try {
      const payload = {
        order_id: orderId,
        order_amount: amount,
        customer_details: {
          customer_id: customerData.phone, // Ensure this maps correctly
          customer_phone: customerData.phone,
          customer_name: customerData.name,
          customer_email: customerData.email,
        },
      };
      const validatedData = createPaymentOrderSchema.parse(payload);
      // 1. Create Payment Session (Backend Call)
      const sessionData = await createPaymentSession(validatedData);
      console.log(
        "sessionData?.payment_order?.payment_session_id",
        sessionData?.payment_order?.payment_session_id
      );
      if (!sessionData?.payment_order?.payment_session_id) {
        throw new Error("Failed to generate payment session ID");
      }

      if (!sessionData?.payment_order?.cf_order_id) {
        throw new Error("Failed to generate Cashfree Order ID");
      }

      // 2. Trigger Cashfree SDK (Frontend Modal)
      const checkoutOptions = {
        paymentSessionId: sessionData?.payment_order?.payment_session_id,
        redirectTarget: "_modal",
      };

      cashfree.checkout(checkoutOptions).then((result) => {
        // A. User Closed Popup or Failed
        if (result.error) {
          console.warn("Payment failed or dismissed:", result.error);
          message.error("Payment failed or cancelled. Please retry.");
          // We DO NOT reset createdOrderId here, so the next click reuses this order.
        }

        // B. Redirect (Not used in modal mode usually, but safety check)
        if (result.redirect) {
          console.log("Payment Redirecting...");
        }

        // C. Success (Payment Completed)
        if (result.paymentDetails) {
          console.log("Payment Completed at Gateway, Verifying...");

          verifyPayment(sessionData?.payment_order?.cf_order_id)
            .then(() => {
              setSuccessDetails({
                transactionId: sessionData?.payment_order?.cf_order_id,
                orderId: orderId,
                orderNumber: orderNumber,
              });
              setIsSuccessModalOpen(true);

              // Clear the "createdOrderId" so if they start a NEW form, it creates a NEW order
              // setCreatedOrderId(null);
              // setCreatedOrderNumber(null);
            })
            .catch((err) => {
              console.error("Verification Error:", err);
              message.error(
                "Payment successful but verification failed. Contact support."
              );
            });
        }
      });
    } catch (error) {
      console.error("Initiate Payment Error:", error);
      if (error.name === "ZodError") {
        applyZodErrorsToForm(form, error);
      } else {
        message.error(error.message || "Failed to initiate payment");
      }
    }
  };

  const { mutate: createOrder, isPending } = useCreateComprehensiveOrder({
    onSuccess: async (data) => {
      try {
        setIsDirty(false);
        const orderId = data?.order?.id;
        const orderNumber = data?.order?.order_number;
        // setCreatedOrderId(orderId);
        // setCreatedOrderNumber(newOrderNumber);
        const customerInfo = {
          name: totalData.pickup_info.pickup_name,
          phone: totalData.pickup_info.pickup_phone,
          email: totalData.pickup_info.pickup_email,
        };

        await initiatePayment(
          orderId,
          orderNumber,
          summaryData?.[0]?.price_summary?.final_total,
          customerInfo
        );
      } catch (error) {
        console.error(error);
        message.error(
          "Order created, but payment initialization failed. Please try paying from the Orders page."
        );
      }
    },
    onError: (error) => {
      console.error("Order creation failed:", error);
      message.error(error.message || "Failed to create order");
    },
  });

  const onFinish = async () => {
    try {
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

      const payload = {
        ...cleanedTotalData,
        pickup_info: {
          ...cleanedTotalData.pickup_info,
          pickup_lat: Number(cleanedTotalData.pickup_info.pickup_lat),
          pickup_long: Number(cleanedTotalData.pickup_info.pickup_long),
        },
        drop_info: {
          ...cleanedTotalData.drop_info,
          drop_latitude: Number(cleanedTotalData.drop_info.drop_latitude),
          drop_longitude: Number(cleanedTotalData.drop_info.drop_longitude),
        },
        shipment_details: {
          ...cleanedTotalData.shipment_details,
          order_type: "PREPAID",
          invoice_value: summaryData?.[0]?.price_summary?.final_total,
          invoice_date: dayjs().format("DD-MM-YYYY"),
          cp_id: String(cleanedTotalData?.shipment_details?.courier_partner),
          courier_partner: carrierPartnerData?.carrier_partner,
          account_code: carrierPartnerData?.account_code,
          category_id: cleanedTotalData?.shipment_details?.category_id,
          item_ids: cleanedTotalData?.shipment_details?.item_ids,
          offer_code: offerCode,
          // Convert weight to grams for API (chargeable weight is already stored)
          weight:
            weightUnit === "kg"
              ? Number(cleanedTotalData?.shipment_details?.weight) * 1000
              : Number(cleanedTotalData?.shipment_details?.weight),
        },
        additional: {
          ...cleanedTotalData.additional,
          ...(warehouseLocation && {
            warehouse_location_id: warehouseLocation,
          }),
          skip_first_mile_pickup: pickup_type === "warehouse" ? true : false,
        },
      };

      // const customerInfo = {
      //   name: cleanedTotalData.pickup_info.pickup_name,
      //   phone: cleanedTotalData.pickup_info.pickup_phone,
      //   email: cleanedTotalData.pickup_info.pickup_email || "abcd@gmail.com",
      // };

      // await initiatePayment(
      //   createdOrderId,
      //   summaryData?.[0]?.price_summary?.final_total,
      //   customerInfo
      // );
      
      console.log("=== ORDER PAYLOAD ===");
      console.log("Weight Unit:", weightUnit);
      console.log("Weight in totalData:", cleanedTotalData?.shipment_details?.weight);
      console.log("Weight being sent to API (in grams):", payload.shipment_details.weight);
      console.log("Chargeable Weight (grams):", chargeableWeight);
      console.log("Full payload:", payload);
      
      const validatedData = createOrderSchema.parse(payload);
      createOrder(validatedData);
    } catch (error) {
      console.log("Error:", error);

      if (error.name === "ZodError") {
        applyZodErrorsToForm(form, error);
      } else {
        console.error("Submission error:", error);
      }
    }
  };

  const PickupTypeSelector = ({ value, onChange }) => {
    const options = [
      {
        value: "warehouse",
        title: "Warehouse Drop-off",
        icon: <ShopOutlined className="text-xl" />,
      },
      {
        value: "home",
        title: "Home Pickup",
        icon: <HomeOutlined className="text-xl" />,
      },
    ];

    return (
      <Row gutter={[16, 16]} className="mb-6">
        {options.map((option) => {
          const isSelected = value === option.value;
          return (
            <Col
              xs={24}
              md={12}
              style={{ maxWidth: "300px" }}
              key={option.value}
            >
              <div
                onClick={() => onChange(option.value)}
                className={`
                relative cursor-pointer rounded-lg border-2 p-2 transition-all duration-200
                ${
                  isSelected
                    ? "border-blue-500 bg-blue-50 shadow-md"
                    : "border-gray-200 bg-white hover:border-blue-300"
                }
              `}
              >
                {isSelected && (
                  <div className="absolute top-2 right-2 text-blue-500">
                    <CheckCircleFilled className="text-xl" />
                  </div>
                )}
                <div
                  className={`flex  gap-2 items-center text-center ${
                    isSelected ? "text-blue-700" : "text-gray-600"
                  }`}
                >
                  <div
                    className={isSelected ? "text-blue-500" : "text-gray-400"}
                  >
                    {option.icon}
                  </div>
                  <div className="font-semibold text-[16px] mb-1">
                    {option.title}
                  </div>
                </div>
              </div>
            </Col>
          );
        })}
      </Row>
    );
  };
  return (
    <div className="w-full flex flex-col gap-3">
      <PickupTypeSelector
        value={pickup_type}
        onChange={handleOrderTypeChange}
      />

      <Steps
        onChange={(nextStep) => {
          if (nextStep > current) {
            message.warning("Please use Next button to proceed");
            return;
          }
          setCurrent(nextStep);
        }}
        // onChange={(e) => setCurrent(e)}
        current={current}
        items={steps}
        className="mb-8"
        size="small"
      />

      <Form
        onValuesChange={(changedValues) => {
          // Check if category_id changed
          if (changedValues.shipment_details?.category_id) {
            form.setFieldsValue({
              shipment_details: {
                sub_category_id: undefined,
                item_ids: undefined,
              },
            });
          }

          if (changedValues.shipment_details?.sub_category_id) {
            form.setFieldsValue({
              shipment_details: {
                item_ids: undefined,
              },
            });
          }
          if (!isDirty) {
            setIsDirty(true);
          }
        }}
        onFinish={onFinish}
        form={form}
        layout="vertical"
      >
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
                calculatePricePending ||
                isCheckWeightRangeServiceabilityPending
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
          amount={summaryData?.[0]?.price_summary?.final_total}
          transactionId={successDetails.transactionId}
          orderId={successDetails.orderId}
          orderNumber={successDetails.orderNumber}
        />
      )}
    </div>
  );
};

export default NewOrderForm;
