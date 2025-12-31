import axiosInstance from "@/utils/axiosInstance.util";

export const trackParcel = async ({ order_number }) => {
  const response = await axiosInstance.get(`/v1/track-parcel`, {
    params: {
      order_number,
    },
    suppressErrorToast: true,
  });

  return response.data;
};
