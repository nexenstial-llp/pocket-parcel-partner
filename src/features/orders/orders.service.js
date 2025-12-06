import axiosInstance from "@/utils/axiosInstance.util";
import axios from "axios";

// Create first-mile order
export const createQuickOrder = async (payload) => {
  console.log({ payload });
  return await axiosInstance.post("/v1/orders/qwqer/order-create", payload);
};

// Get all qwqer orders
export const getAllQwqerOrders = async ({ page, limit }) => {
  const response = await axiosInstance.get("/v1/orders/qwqer/list", {
    params: {
      page,
      limit,
    },
  });
  return response?.data?.data ?? null;
};

// Get by Id
export const getQwqerOrderById = async (id) => {
  const response = await axiosInstance.get(
    `/v1/orders/qwqer/order-details/${id}`
  );
  return response?.data?.data ?? null;
};

// Cancel Order
export const cancelQwqerOrder = async (data) => {
  const response = await axiosInstance.post(
    `/v1/orders/qwqer/order-cancel`,
    data
  );
  return response?.data?.data ?? null;
};

// Modify order
export const modifyQwqerOrder = async (data) => {
  const response = await axiosInstance.post(
    `/v1/orders/qwqer/modify-order`,
    data
  );
  return response?.data?.data ?? null;
};

// create reverse order
export const createReverseOrder = async (data) => {
  const response = await axiosInstance.post(
    "/v1/orders/qwqer/create-reverse-order",
    data
  );
  return response?.data?.data ?? null;
};

// price-calculate
export const priceCalculate = async (data) => {
  const response = await axiosInstance.post(
    "/v1/orders/qwqer/price-calculate",
    data
  );
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
  const response = await axiosInstance.post("/v1/orders/create", payload);
  return response?.data?.data ?? null;
};
