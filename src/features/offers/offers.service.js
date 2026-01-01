import axiosInstance from "@/utils/axiosInstance.util";

// Get all offers
export const getAllOffers = async (params) => {
  const response = await axiosInstance.get("/v1/transit-warehouse/offers", {
    params,
  });
  return response.data;
};
