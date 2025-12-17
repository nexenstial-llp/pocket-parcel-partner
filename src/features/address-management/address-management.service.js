import axiosInstance from "@/utils/axiosInstance.util";

// Get addresses by id
export const getAddressesById = async (id) => {
  const response = await axiosInstance.get(`/v1/mobile/addresses/${id}`);
  return response?.data?.data ?? null;
};

// Get all addresses
export const getAllAddresses = async ({ page, limit, search }) => {
  const response = await axiosInstance.get("/v1/mobile/addresses", {
    params: {
      page,
      limit,
      search,
    },
  });
  return response?.data ?? null;
};

// Create address
export const createAddress = async (data) => {
  const response = await axiosInstance.post(
    "/v1/mobile/addresses/create",
    data
  );
  return response?.data?.data ?? null;
};

// Update address
export const updateAddress = async ({ id, data }) => {
  const response = await axiosInstance.put(
    `/v1/mobile/addresses/${id}/update`,
    data
  );
  return response?.data?.data ?? null;
};

// Delete address
export const deleteAddress = async (id) => {
  const response = await axiosInstance.delete(
    `/v1/mobile/addresses/${id}/delete`
  );
  return response?.data?.data ?? null;
};

// Set default address
export const setDefaultAddress = async (id) => {
  const response = await axiosInstance.put(
    `/v1/mobile/addresses/${id}/default`
  );
  return response?.data?.data ?? null;
};
