import axiosInstance from "@/utils/axiosInstance.util";

// Get all offers
export const getAllOffers = async () => {
  const response = await axiosInstance.get("v1/transit-warehouse/offers");
  return response.data;
};
