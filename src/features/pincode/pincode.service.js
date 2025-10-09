import axiosInstance from "@/utils/axiosInstance.util";

export const getCitySateFromPincode = async (pincode) => {
  const response = await axiosInstance.get(
    `https://api.postalpincode.in/pincode/${pincode}`
  );
  return response.data?.[0]?.PostOffice?.[0];
};
