import axiosInstance from "@/utils/axiosInstance.util";

// Check weight range serviceability
export const checkWeightRangeServiceability = async (data) => {
  const response = await axiosInstance.post(
    "/v1/weight-ranges/check-serviceability",
    data
  );
  return response.data;
};
