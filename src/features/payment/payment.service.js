import axiosInstance from "@/utils/axiosInstance.util";

export const createPaymentSession = async (data) => {
  const response = await axiosInstance.post("/v1/payments/create-order", data);
  return response?.data?.data ?? null;
};

export const verifyPayment = async (orderId) => {
  const response = await axiosInstance.get(`/v1/payments/status/${orderId}`);
  return response?.data?.data ?? null;
};

// Get payment by pocket parcel id
export const verifyPaymentByPocketParcelId = async (id) => {
  const response = await axiosInstance.get(`/v1/payments/order/${id}`);
  return response?.data?.data ?? null;
};
