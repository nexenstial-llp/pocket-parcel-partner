/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { useBlocker } from "@tanstack/react-router";
import {
  Form,
  Steps,
  Button,
  Card,
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
  InfoCircleOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import WebcamCapture from "@/components/ui/WebcamCapture";
import AddressSelectionModal from "./AddressSelectionModal";
import { getCustomerAddress } from "@/features/address-management/address-management.service";
import { useQueryClient } from "@tanstack/react-query";
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
import { useRef } from "react";
import { Warehouse } from "lucide-react";
import {
  useFetchWarehouse,
  useFetchWarehouseLocations,
} from "@/features/warehouses/warehouses.query";
import ResponsiveCard from "@/components/ui/cards/ResponsiveCard";
import AddressFormItems from "./AddressFormItems";
import { APIProvider } from "@vis.gl/react-google-maps";
import { useCreateAddress } from "@/features/address-management/address-management.query";

const deliveryTypeOptions = [
  { label: "Forward", value: "FORWARD" },
  { label: "Reverse", value: "REVERSE" },
];
const cashFreePaymentMode =
  import.meta.env.VITE_APP_ENV === "production" ? "production" : "sandbox";
const API_KEY = import.meta.env.VITE_APP_GOOGLE_API_KEY;

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

const NewOrderForm = () => {
  const { params, setParams } = useUrlParams();
  const { pickup_type = "warehouse" } = params;
  const [current, setCurrent] = useState(0);
  const [form] = Form.useForm();
  const queryClient = useQueryClient();
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

  const [isPickupModalOpen, setIsPickupModalOpen] = useState(false);
  const [isDropModalOpen, setIsDropModalOpen] = useState(false);

  // Search Results
  const [pickupSearchResults, setPickupSearchResults] = useState([]);
  const [dropSearchResults, setDropSearchResults] = useState([]);
  const [pickupSearchLoading, setPickupSearchLoading] = useState(false);
  const [dropSearchLoading, setDropSearchLoading] = useState(false);

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
  const [chargeableDimensions, setchargableDimensions] = useState({});

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
      ? parseFloat(((lengthInCm * breadthInCm * heightInCm) / 5000).toFixed(2))
      : 0; // This is in kg

  // Final weight is max of actual weight (in kg) and volumetric weight (in kg)
  // weightInGm / 1000 converts actual weight to kg
  const finalWeight = parseFloat(
    Math.max(weightInGm / 1000, volumetricWeight).toFixed(2)
  );

  const { mutateAsync: createAddress } = useCreateAddress({
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["address"],
      });
    },
  });

  // Auto-select first warehouse
  const { data: warehousesData } = useFetchWarehouse({ page: 1, limit: 100 });
  const { data: warehouseLocationsData } =
    useFetchWarehouseLocations(warehouse);

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

  /* -------------------- LOAD CASHFREE -------------------- */
  useEffect(() => {
    let mounted = true;
    load({ mode: cashFreePaymentMode }).then((cf) => {
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

  useEffect(() => {
    if (
      pickup_type === "warehouse" &&
      !warehouse &&
      warehousesData?.data?.length
    ) {
      const firstWarehouseId = warehousesData.data[0].id;

      setWarehouse(firstWarehouseId);
      form.setFieldsValue({ warehouse: firstWarehouseId });
    }
  }, [pickup_type, warehouse, warehousesData, form]);

  useEffect(() => {
    if (
      pickup_type === "warehouse" &&
      warehouse &&
      !warehouseLocation &&
      warehouseLocationsData?.length
    ) {
      const firstLocationId = warehouseLocationsData.find(
        (item) => item.is_primary === true
      );

      setWarehouseLocation(firstLocationId?.id);
      form.setFieldsValue({ warehouseLocation: firstLocationId?.id });
    }
  }, [pickup_type, warehouse, warehouseLocation, warehouseLocationsData, form]);

  // Search Handlers
  const handlePickupSearch = async (value) => {
    if (!value || value.length < 10)
      return message.error("Please enter a valid phone number");
    setPickupSearchLoading(true);
    try {
      const response = await queryClient.fetchQuery({
        queryKey: ["addresses", { phone: "91" + value }],
        queryFn: () =>
          getCustomerAddress({ phone: "91" + value, page: 1, limit: 100 }),
        staleTime: 5000,
      });

      const addresses = response?.data?.addresses || response?.data || [];
      if (addresses.length > 0) {
        setPickupSearchResults(addresses);
        setIsPickupModalOpen(true);
      } else {
        message.info(
          "No saved addresses found. Please enter details manually."
        );
      }
    } catch (error) {
      console.error(error);
      message.error("Failed to fetch addresses");
    } finally {
      setPickupSearchLoading(false);
    }
  };

  const handleDropSearch = async (value) => {
    if (!value || value.length < 10)
      return message.error("Please enter a valid phone number");
    setDropSearchLoading(true);
    try {
      const response = await queryClient.fetchQuery({
        queryKey: ["addresses", { phone: "91" + value }],
        queryFn: () =>
          getCustomerAddress({ phone: "91" + value, page: 1, limit: 100 }),
        staleTime: 5000,
      });

      const addresses = response?.data?.addresses || response?.data || [];
      if (addresses.length > 0) {
        setDropSearchResults(addresses);
        setIsDropModalOpen(true);
      } else {
        message.info(
          "No saved addresses found. Please enter details manually."
        );
      }
    } catch (error) {
      console.error(error);
      message.error("Failed to fetch addresses");
    } finally {
      setDropSearchLoading(false);
    }
  };

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
    setIsPickupModalOpen(false);
    form.setFieldsValue({ pickup_info: { ...address, save_address: false } });
  };

  const handleSelectDrop = (address) => {
    setIsDropModalOpen(false);
    form.setFieldsValue({ drop_info: { ...address, save_address: false } });
  };
  console.log("totalData", totalData);

  const next = async () => {
    try {
      if (current === 0) {
        const values = await form.validateFields();
        const pickup = values.pickup_info;
        const drop = values.drop_info;

        if (!pickup || !drop) {
          message.error("Please fill in both Pickup and Delivery addresses.");
          return;
        }
        if (!pickup?.latitude || !pickup?.longitude) {
          message.error(
            "Pickup Address does not have valid coordinates, please enter valid landmark."
          );
          return;
        }
        if (!drop?.latitude || !drop?.longitude) {
          message.error(
            "Delivery Address does not have valid coordinates, please enter valid landmark."
          );
          return;
        }
        // Validate Serviceability
        const payload = [
          {
            pickup_pincode: pickup?.pincode,
            drop_pincode: drop?.pincode,
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
            pickup_name: pickup?.full_name,
            pickup_phone: pickup?.phone_number,
            email: pickup?.email,
            pickup_address_line1: pickup?.address_line1,
            pickup_address_line2: pickup?.address_line2,
            pickup_address: addressToString(pickup),
            pickup_house_number: pickup?.house_number,
            pickup_city: pickup?.city,
            pickup_state: pickup?.state,
            pickup_pincode: pickup?.pincode,
            pickup_country: pickup?.country,
            pickup_lat: pickup?.latitude,
            pickup_long: pickup?.longitude,
            pickup_landmark: pickup?.landmark,
            pickup_district: pickup?.district,
            pickup_address_type: pickup?.address_type,
            pickup_custom_address_type: pickup?.custom_address_type,
            save_address: pickup?.save_address, // Persist save_address flag
            label: pickup?.label,
          },
          drop_info: {
            drop_pincode: drop?.pincode,
            drop_name: drop?.full_name,
            drop_phone: drop?.phone_number,
            drop_address_line1: drop?.address_line1,
            drop_address_line2: drop?.address_line2,
            drop_address: addressToString(drop),
            drop_city: drop?.city,
            drop_state: drop?.state,
            drop_country: drop?.country,
            drop_lat: drop?.latitude,
            drop_long: drop?.longitude,
            drop_landmark: drop?.landmark,
            drop_district: drop?.district,
            drop_address_type: drop?.address_type,
            drop_custom_address_type: drop?.custom_address_type,
            save_address: drop?.save_address, // Persist save_address flag
            label: drop?.label,
          },
        }));

        // Address creation logic moved to onFinish to avoid duplicate saves during navigation

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
          skip_first_mile_pickup: pickup_type === "warehouse" ? true : false,
        };

        // const shipmentDetails = {
        //   ...values.shipment_details,
        //   ...weightPayload,
        //   weight:
        //     weightUnit === "kg"
        //       ? Number(values?.shipment_details?.weight) * 1000
        //       : Number(values?.shipment_details?.weight),
        // };
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
          setchargableDimensions(weightResponse?.data?.dimensions);
        }
        setTotalData((prev) => ({
          ...prev,
          ...values,
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
          length: Number(chargeableDimensions?.length_cm),
          breadth: Number(chargeableDimensions?.breadth_cm),
          height: Number(chargeableDimensions?.height_cm),
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
        console.log("values", values);
        setTotalData((prev) => ({ ...prev, ...values }));
        setCurrent(current + 1);
      } else if (current === 4) {
        console.log("current", current);
        setCurrent(current + 1);
      } else {
        setCurrent(current + 1);
      }
    } catch (error) {
      console.log("error", error);

      if (error.name === "ZodError") {
        applyZodErrorsToForm(form, error);
      } else if (error.errorFields?.length > 0) {
        toast.error(error.errorFields?.[0]?.errors?.[0]);
      } else {
        toast.error(error?.message || "Please enter all the fields");
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
        // if (code) {
        //   message.success("Offer applied successfully!");
        // } else {
        //   message.success("Offer removed successfully!");
        // }
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
        <div className="flex flex-col gap-6">
          {/* Warehouse Selection Section */}
          {pickup_type === "warehouse" && (
            <Card
              className="shadow-sm border-blue-50"
              title={
                <div className="flex items-center gap-2">
                  <Warehouse className="text-blue-500" />
                  <span>Select Warehouse</span>
                </div>
              }
              size="small"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-[600px]">
                <div>
                  <Form.Item
                    name="warehouse"
                    label={
                      <span className="text-sm font-medium text-gray-700">
                        Warehouse
                        <span className="text-red-500 ml-1">*</span>
                      </span>
                    }
                  >
                    <Select
                      placeholder="Select Warehouse"
                      loading={!warehousesData}
                      showSearch
                      optionFilterProp="children"
                      value={warehouse}
                      onChange={(value) => {
                        setWarehouse(value);
                        setWarehouseLocation(null);
                        form.setFieldsValue({
                          warehouse: value,
                          warehouseLocation: null,
                        });
                      }}
                      className="w-full"
                      options={warehousesData?.data?.map((w) => ({
                        label: w.name,
                        value: w.id,
                      }))}
                    />
                  </Form.Item>
                </div>

                {warehouse && (
                  <div className="animate-fadeIn">
                    <Form.Item
                      name="warehouseLocation"
                      label={
                        <span className="text-sm font-medium text-gray-700">
                          Location/Section
                          <span className="text-red-500 ml-1">*</span>
                        </span>
                      }
                    >
                      <Select
                        placeholder="Select Location"
                        loading={!warehouseLocationsData}
                        showSearch
                        optionFilterProp="children"
                        value={warehouseLocation}
                        onChange={(value) => {
                          setWarehouseLocation(value);
                          form.setFieldsValue({ warehouseLocation: value });
                        }}
                        className="w-full"
                        options={warehouseLocationsData?.map((l) => ({
                          label: l.location_name,
                          value: l.id,
                        }))}
                      />
                    </Form.Item>
                  </div>
                )}
              </div>

              {!warehouse && (
                <div className="mt-2 text-xs text-gray-500 flex items-center gap-1">
                  <InfoCircleOutlined />
                  Select a warehouse first to choose specific location
                </div>
              )}
            </Card>
          )}
          <div>
            <small className="text-xs text-gray-500">
              Note: Addresses of all the customers can be searched using mobile
              number
            </small>
            {/* Address Cards Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Pickup Address Card */}
              <Card
                className={`shadow-md hover:shadow-lg transition-all duration-300`}
                title={
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-blue-50">
                        <EnvironmentOutlined className="text-blue-600 text-lg" />
                      </div>
                      <div>
                        <div className="font-semibold text-gray-800">
                          Pickup Address
                        </div>
                        <div className="text-xs text-gray-500">
                          Where we&apos;ll pick up your shipment
                        </div>
                      </div>
                    </div>
                  </div>
                }
                extra={
                  <Button
                    type="link"
                    onClick={() => {
                      form.resetFields(["pickup_info"]); // Or handle specific fields
                    }}
                  >
                    Clear
                  </Button>
                }
              >
                <div className="flex flex-col gap-4">
                  <div className="flex flex-col gap-1 w-full">
                    <label
                      htmlFor="pickup_phone_search"
                      className="text-xs text-gray-500 mb-1"
                    >
                      Search via Phone
                    </label>
                    <Input.Search
                      id="pickup_phone_search"
                      placeholder="Search Phone"
                      enterButton={
                        <Button
                          icon={<SearchOutlined />}
                          loading={pickupSearchLoading}
                          type="primary"
                        />
                      }
                      onSearch={handlePickupSearch}
                      maxLength={10}
                      allowClear
                    />
                  </div>
                  <AddressFormItems prefix="pickup_info" />
                </div>
              </Card>

              {/* Delivery Address Card */}
              <Card
                className={`shadow-md hover:shadow-lg transition-all duration-300`}
                title={
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-green-50">
                        <HomeOutlined className="text-green-600 text-lg" />
                      </div>
                      <div>
                        <div className="font-semibold text-gray-800">
                          Delivery Address
                        </div>
                        <div className="text-xs text-gray-500">
                          Where we&apos;ll deliver your shipment
                        </div>
                      </div>
                    </div>
                  </div>
                }
                extra={
                  <Button
                    type="link"
                    onClick={() => {
                      form.resetFields(["drop_info"]);
                    }}
                  >
                    Clear
                  </Button>
                }
              >
                <div className="flex flex-col gap-4">
                  <div className="flex flex-col gap-1 w-full">
                    <label
                      htmlFor="drop_phone_search"
                      className="text-xs text-gray-500 mb-1"
                    >
                      Search via Phone
                    </label>
                    <Input.Search
                      id="drop_phone_search"
                      placeholder="Search Phone"
                      enterButton={
                        <Button
                          icon={<SearchOutlined />}
                          loading={dropSearchLoading}
                          type="primary"
                        />
                      }
                      onSearch={handleDropSearch}
                      maxLength={10}
                      allowClear
                    />
                  </div>
                  <AddressFormItems prefix="drop_info" />
                </div>
              </Card>
            </div>
          </div>

          {/* Address Selection Modals */}
          <AddressSelectionModal
            open={isPickupModalOpen}
            onCancel={() => setIsPickupModalOpen(false)}
            onSelect={handleSelectPickup}
            title="Select Pickup Address"
            addresses={pickupSearchResults}
          />
          <AddressSelectionModal
            open={isDropModalOpen}
            onCancel={() => setIsDropModalOpen(false)}
            onSelect={handleSelectDrop}
            title="Select Delivery Address"
            addresses={dropSearchResults}
          />
        </div>
      ),
    },

    {
      title: "Package Details",
      icon: <CodeSandboxOutlined />,
      content: (
        <div className="bg-white rounded-xl border-0 shadow-sm p-6">
          <div className="mb-4">
            <h3 className="text-base font-semibold text-gray-900">
              Shipment Details
            </h3>
          </div>
          <Row gutter={24}>
            {/* Category Selection - Visual */}
            <Col span={24}>
              <Form.Item
                label={
                  <span className="text-sm font-semibold text-gray-700">
                    Select Category
                  </span>
                }
              >
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

            {/* Item Selection - Visual */}
            <Col span={24}>
              <Form.Item
                label={
                  <span className="text-sm font-semibold text-gray-700">
                    Select Item
                  </span>
                }
              >
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

          <Divider className="my-6 border-gray-200" />

          <Row gutter={[24]} align="top">
            {/* SECTION 1: Configuration */}
            <Col xs={24} md={12} lg={6}>
              <Form.Item
                name={["shipment_details", "delivery_type"]}
                label={
                  <span className="text-sm font-semibold text-gray-700">
                    Service Type
                  </span>
                }
                initialValue="FORWARD"
                className="mb-0"
              >
                <Select
                  placeholder="Select Type"
                  options={deliveryTypeOptions}
                  className="w-full rounded-lg"
                />
              </Form.Item>
            </Col>

            {/* SECTION 2: Dimensions */}
            <Col xs={24} sm={12} md={12} lg={9}>
              <Form.Item
                label={
                  <span className="text-sm font-semibold text-gray-700">
                    Dimensions (L × B × H)
                  </span>
                }
                className="mb-0"
                rules={[
                  {
                    required: true,
                    message: "Please enter dimensions",
                  },
                ]}
                tooltip="Please enter dimensions in integer format only"
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
                      step={1}
                      precision={0}
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
                      step={1}
                      precision={0}
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
                      step={1}
                      precision={0}
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
                label={
                  <span className="text-sm font-semibold text-gray-700">
                    Actual Weight
                  </span>
                }
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
                  className="w-full shadow-none max-w-[200px]"
                  placeholder="0"
                />
              </Form.Item>
            </Col>

            {/* SECTION 3: Weight Calculations */}
            <Col xs={24} sm={12}>
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-2">
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
                        {(volumetricWeight || 0).toFixed(2)}{" "}
                        <span className="text-xs">kg</span>
                      </div>
                    </Form.Item>
                  </Col>

                  {/* Final Weight Highlight */}
                  <Col span={12}>
                    <Form.Item
                      label={
                        <span className="text-gray-700 font-semibold text-xs">
                          Chargeable Weight
                        </span>
                      }
                      className="mb-0"
                    >
                      <div className="text-gray-900 font-bold text-2xl leading-tight">
                        {(finalWeight || 0).toFixed(2)}{" "}
                        <span className="text-xs font-normal text-gray-500">
                          kg
                        </span>
                      </div>
                      <div className="text-gray-500 text-xs mt-1">
                        {((finalWeight || 0) * 1000).toFixed(0)} gm
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
        </div>
      ),
    },
    {
      title: "Additional Details",
      icon: <FileTextOutlined />,
      content: (
        <div className="bg-white rounded-xl border-0 shadow-sm p-6">
          <div className="mb-4">
            <h3 className="text-base font-semibold text-gray-900 flex items-center gap-2">
              <SafetyCertificateOutlined className="text-gray-600" /> Additional
              Details
            </h3>
          </div>

          {/* 1. COMPACT SUMMARY STRIP */}
          <div className="mb-4 rounded-xl border border-gray-200 bg-gray-50 p-4">
            <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-gray-700">
              <ShoppingOutlined className="text-gray-600" />
              <span>Shipment Dimensions</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 md:grid-cols-4 lg:grid-cols-5">
              {[
                {
                  label: "Length",
                  value: totalData?.shipment_details?.length,
                  unit: dimensionUnit,
                },
                {
                  label: "Breadth",
                  value: totalData?.shipment_details?.breadth,
                  unit: dimensionUnit,
                },
                {
                  label: "Height",
                  value: totalData?.shipment_details?.height,
                  unit: dimensionUnit,
                },
                {
                  label: "Actual Weight",
                  value: totalData?.shipment_details?.weight,
                  unit: weightUnit,
                },
                {
                  label: "Chargeable Weight",
                  value: (Number(chargeableWeight || 0) / 1000).toFixed(2),
                  unit: "kg",
                },
              ].map((item) => (
                <div
                  key={item.label}
                  className="flex items-center gap-3 rounded-lg bg-white p-3 border border-gray-200"
                >
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100">
                    <ShoppingOutlined className="text-gray-600 text-sm" />
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
              <div className="bg-gray-50 p-3 rounded-lg border border-gray-200 h-full flex flex-col justify-center gap-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600 flex items-center gap-2">
                    <MessageOutlined className="text-gray-500" /> WhatsApp
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

                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600 flex items-center gap-2">
                    <SafetyCertificateOutlined className="text-gray-500" />{" "}
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
        </div>
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
            setOfferCode("");
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
          chargeableDimensions={chargeableDimensions}
          carrierPartnerData={carrierPartnerData}
          onOfferApplied={handleOfferApplied}
          offerCode={offerCode}
          setOfferCode={setOfferCode}
          pickup_type={pickup_type}
          form={form}
          dimensionUnit={dimensionUnit}
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
          message.error("Payment failed or cancelled. Please retry.");
          // We DO NOT reset createdOrderId here, so the next click reuses this order.
        }

        // B. Redirect (Not used in modal mode usually, but safety check)
        if (result.redirect) {
          console.log("Payment Redirecting...");
        }

        // C. Success (Payment Completed)
        if (result.paymentDetails) {
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

        // Create Addresses if requested (Moved from step transition)
        const pickupInfo = totalData.pickup_info;
        const dropInfo = totalData.drop_info;

        if (pickupInfo?.save_address) {
          try {
            const payload = {
              full_name: pickupInfo?.pickup_name,
              phone_number: pickupInfo?.pickup_phone,
              email: pickupInfo?.pickup_email,
              house_number: pickupInfo?.pickup_house_number,
              address_line1: pickupInfo?.pickup_address_line1,
              address_line2: pickupInfo?.pickup_address_line2,
              landmark: pickupInfo?.pickup_landmark,
              city: pickupInfo?.pickup_city,
              state: pickupInfo?.pickup_state,
              country: pickupInfo?.pickup_country,
              pincode: pickupInfo?.pickup_pincode,
              address_type: pickupInfo?.pickup_address_type,
              custom_address_type: pickupInfo?.pickup_custom_address_type,
              latitude: Number(pickupInfo.pickup_lat),
              longitude: Number(pickupInfo.pickup_long),
              label: pickupInfo?.label,
            };
            const cleanedTotalData = removeNullValues(payload);
            await createAddress(cleanedTotalData, true);
          } catch (error) {
            console.error("Failed to save pickup address", error);
          }
        }
        if (dropInfo?.save_address) {
          try {
            const payload = {
              full_name: dropInfo?.drop_name,
              phone_number: dropInfo?.drop_phone,
              email: dropInfo?.drop_email,
              house_number: dropInfo?.drop_house_number,
              address_line1: dropInfo?.drop_address_line1,
              address_line2: dropInfo?.drop_address_line2,
              landmark: dropInfo?.drop_landmark,
              city: dropInfo?.drop_city,
              state: dropInfo?.drop_state,
              country: dropInfo?.drop_country,
              pincode: dropInfo?.drop_pincode,
              address_type: dropInfo?.drop_address_type,
              custom_address_type: dropInfo?.drop_custom_address_type,
              latitude: Number(dropInfo.drop_lat),
              longitude: Number(dropInfo.drop_long),
              label: dropInfo?.label,
            };
            const cleanedTotalData = removeNullValues(payload);
            await createAddress(cleanedTotalData, true);
          } catch (error) {
            console.error("Failed to save drop address", error);
          }
        }
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
          drop_lat: Number(cleanedTotalData.drop_info.drop_lat),
          drop_long: Number(cleanedTotalData.drop_info.drop_long),
        },
        shipment_details: {
          ...cleanedTotalData.shipment_details,
          length: parseInt(chargeableDimensions?.length_cm),
          breadth: parseInt(chargeableDimensions?.breadth_cm),
          height: parseInt(chargeableDimensions?.height_cm),
          weight: chargeableWeight,
          order_type: "PREPAID",
          invoice_value: summaryData?.[0]?.price_summary?.final_total,
          invoice_date: dayjs().format("DD-MM-YYYY"),
          cp_id: String(cleanedTotalData?.shipment_details?.courier_partner),
          courier_partner: carrierPartnerData?.carrier_partner,
          account_code: carrierPartnerData?.account_code,
          category_id: cleanedTotalData?.shipment_details?.category_id,
          item_ids: cleanedTotalData?.shipment_details?.item_ids,
          ...(offerCode && { offer_code: offerCode }),
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

      const validatedData = createOrderSchema.parse(payload);
      createOrder(validatedData);
    } catch (error) {
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
      <Row gutter={[16, 16]}>
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
                relative cursor-pointer rounded-xl border-2 p-2 transition-all duration-200
                ${
                  isSelected
                    ? "border-blue-500 bg-blue-50 shadow-md"
                    : "border-gray-200 bg-white hover:border-gray-400 hover:shadow-sm"
                }
              `}
              >
                {isSelected && (
                  <div className="absolute top-3 right-3 text-blue-500">
                    <CheckCircleFilled className="text-lg" />
                  </div>
                )}
                <div
                  className={`flex gap-3 items-center ${
                    isSelected ? "text-blue-500" : "text-gray-600"
                  }`}
                >
                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded-lg ${
                      isSelected
                        ? "bg-gray-200 text-blue-500"
                        : "bg-gray-100 text-gray-500"
                    }`}
                  >
                    {option.icon}
                  </div>
                  <div className="font-semibold text-base">{option.title}</div>
                </div>
              </div>
            </Col>
          );
        })}
      </Row>
    );
  };
  return (
    <ResponsiveCard title="Create New Order">
      <div className="w-full flex flex-col gap-4">
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
          size="small"
        />
        <APIProvider apiKey={API_KEY} libraries={["places", "geocoding"]}>
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
            <div className="flex justify-end gap-3 -mx-6 -mb-6 sticky bottom-0 bg-white p-3 border-t border-gray-200 z-10 shadow-lg rounded-b-xl">
              {current > 0 && (
                <ResponsiveButton
                  onClick={prev}
                  className="border-gray-300 hover:border-gray-400"
                >
                  Previous
                </ResponsiveButton>
              )}
              {current === 0 && (
                <BackButton navigateTo="/orders">Back</BackButton>
              )}
              {current < steps.length - 1 && (
                <ResponsiveButton
                  type="primary"
                  onClick={next}
                  loading={
                    serviceabilityPending ||
                    calculatePricePending ||
                    isCheckWeightRangeServiceabilityPending
                  }
                  className="bg-gray-900 hover:bg-gray-800 border-0"
                >
                  Next
                </ResponsiveButton>
              )}
              {current === steps.length - 1 && (
                <ResponsiveButton
                  loading={isPending}
                  type="primary"
                  htmlType="submit"
                  className="bg-gray-900 hover:bg-gray-800 border-0"
                >
                  Create Order & Pay
                </ResponsiveButton>
              )}
            </div>
          </Form>
        </APIProvider>

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
    </ResponsiveCard>
  );
};

export default NewOrderForm;
