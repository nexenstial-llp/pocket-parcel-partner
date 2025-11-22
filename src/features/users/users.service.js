import axiosInstance from "@/utils/axiosInstance.util";

export const fetchCurrentUserProfile = async () => {
  const response = await axiosInstance.get("/v1/users/me");
  return response?.data?.data ?? null;
};

// Update user
export const updateUserProfile = async (data) => {
  const response = await axiosInstance.put(`/v1/users/me`, data);
  return response?.data?.data ?? null;
};

// Change password
export const changePassword = async (data) => {
  const response = await axiosInstance.put(
    `/v1/users/me/change-password`,
    data
  );
  return response?.data?.data ?? null;
};

// Delete account
export const deleteAccount = async () => {
  const response = await axiosInstance.delete(`/v1/users/me`);
  return response?.data?.data ?? null;
};
