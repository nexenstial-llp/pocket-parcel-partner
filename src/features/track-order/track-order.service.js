import axiosInstance from "@/utils/axiosInstance.util";

export const trackParcel = async ({ order_number }) => {
  const response = await axiosInstance.get(`/v1/track-parcel`, {
    params: {
      order_number,
    },
  });
  return response.data;
};
