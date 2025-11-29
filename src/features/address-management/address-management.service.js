import axiosInstance from "@/utils/axiosInstance.util";

// Get addresses by id
export const getAddressesById = async (id) => {
  const response = await axiosInstance.get(`/v1/addresses/${id}`);
  return response?.data?.data ?? null;
};

// Get all addresses
export const getAllAddresses = async ({ page, limit }) => {
  const response = await axiosInstance.get("/v1/addresses", {
    params: {
      page,
      limit,
    },
  });
  return response?.data ?? null;
};

// Create address
export const createAddress = async (data) => {
  const response = await axiosInstance.post("/v1/addresses", data);
  return response?.data?.data ?? null;
};

// Update address
export const updateAddress = async ({ id, data }) => {
  const response = await axiosInstance.put(`/v1/addresses/${id}`, data);
  return response?.data?.data ?? null;
};

// Delete address
export const deleteAddress = async (id) => {
  const response = await axiosInstance.delete(`/v1/addresses/${id}`);
  return response?.data?.data ?? null;
};

// Set default address
export const setDefaultAddress = async (id) => {
  const response = await axiosInstance.put(`/v1/addresses/${id}/set-default`);
  return response?.data?.data ?? null;
};
