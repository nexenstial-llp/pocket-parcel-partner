import axiosInstance from "@/utils/axiosInstance.util";
import axios from "axios";

// Create first-mile order
export const createQuickOrder = async (payload) => {
  const response = await axiosInstance.post("/v1/qwqer/order-create", payload);
  return response?.data?.data ?? null;
};

// Get all qwqer orders
export const getAllQwqerOrders = async ({ page, limit }) => {
  const response = await axiosInstance.get("/v1/qwqer/list", {
    params: {
      page,
      limit,
    },
  });
  return response?.data?.data ?? null;
};

// Get by Id
export const getQwqerOrderById = async (id) => {
  const response = await axiosInstance.get(`/v1/qwqer/order-details/${id}`);
  return response?.data?.data ?? null;
};

// Cancel Order
export const cancelQwqerOrder = async (data) => {
  const response = await axiosInstance.post(`/v1/qwqer/order-cancel`, data);
  return response?.data?.data ?? null;
};

// Modify order
export const modifyQwqerOrder = async (data) => {
  const response = await axiosInstance.post(`/v1/qwqer/modify-order`, data);
  return response?.data?.data ?? null;
};

// create reverse order
export const createReverseOrder = async (data) => {
  const response = await axiosInstance.post(
    "/v1/qwqer/create-reverse-order",
    data
  );
  return response?.data?.data ?? null;
};

// price-calculate
export const priceCalculate = async (data) => {
  const response = await axiosInstance.post("/v1/qwqer/price-calculate", data);
  return response?.data?.data ?? null;
};

export const fetchLocationFromPincode = async (pincode) => {
  const response = await axios.get(
    `https://api.postalpincode.in/pincode/${pincode}`
  );

  const info = response.data[0].PostOffice?.[0];

  return {
    city: info?.Name || "",
    district: info?.District || "",
    state: info?.State || "",
    country: info?.Country || "India",
  };
};

// Create Comprehensive Order
export const createComprehensiveOrder = async (payload) => {
  const response = await axiosInstance.post(
    "/v1/transit-warehouse/orders/create",
    payload
  );
  return response?.data?.data ?? null;
};

// Check comprehensive serviceability
export const checkServiceability = async (data) => {
  const response = await axiosInstance.post(
    "/v1/transit-warehouse/orders/serviceability/check",
    data
  );
  return response?.data?.data ?? null;
};

// Calculate Price
export const calculatePrice = async (data) => {
  const response = await axiosInstance.post(
    "/v1/transit-warehouse/orders/calculate-price",
    data
  );
  return response?.data?.data ?? null;
};

// Get Orders
export const getOrders = async ({ page = 1, limit = 10 }) => {
  const response = await axiosInstance.get("/v1/transit-warehouse/orders", {
    params: {
      page,
      limit,
    },
  });
  return response?.data?.data ?? null;
};

// Get Order by Id
export const getOrderById = async (id) => {
  const response = await axiosInstance.get(
    `/v1/transit-warehouse/orders/${id}`
  );
  return response?.data?.data ?? null;
};

// Packed
export const makeOrderPacked = async (id) => {
  const response = await axiosInstance.patch(
    `/v1/transit-warehouse/orders/${id}/packed`
  );
  return response?.data?.data ?? null;
};

// Get domestic recommendation
export const getDomesticRecommendation = async (data) => {
  const response = await axiosInstance.post(
    "/v1/transit-warehouse/orders/domestic/recommendation",
    data
  );
  return response?.data?.data ?? null;
};

// Cancel Order
export const cancelOrder = async ({ id, cancellation_reason }) => {
  const response = await axiosInstance.patch(
    `/v1/transit-warehouse/orders/${id}/cancel`,
    {
      cancellation_reason,
    }
  );
  return response?.data?.data ?? null;
};

// Edit order
export const editOrder = async ({ id, data }) => {
  const response = await axiosInstance.patch(
    `/v1/transit-warehouse/orders/${id}`,
    data
  );
  return response?.data?.data ?? null;
};

// Download invoice
export const downloadInvoice = async (id) => {
  const response = await axiosInstance.get(
    `/v1/transit-warehouse/orders/${id}/invoice`,
    {
      responseType: "blob",
    }
  );

  return response.data ?? null;
};

// export waybill
export const downloadWaybill = async (id) => {
  const response = await axiosInstance.get(
    `/v1/transit-warehouse/orders/${id}/waybill`,
    {
      responseType: "blob",
    }
  );

  return response.data ?? null;
};
