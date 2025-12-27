import axiosInstance from "@/utils/axiosInstance.util";

export const fetchWarehouses = async ({ page, limit }) => {
  const response = await axiosInstance.get("/v1/transit-warehouse/warehouses", {
    params: {
      page,
      limit,
    },
  });
  return response?.data ?? null;
};

// Create warehouse
export const createWarehouse = async (data) => {
  const response = await axiosInstance.post(
    "/v1/transit-warehouse/warehouses/create",
    data
  );
  return response?.data?.data ?? null;
};

// Delete warehouse
export const deleteWarehouse = async (id) => {
  const response = await axiosInstance.delete(
    `/v1/transit-warehouse/warehouses/${id}/delete`
  );
  return response?.data?.data ?? null;
};

// Get by id
export const getWarehouseById = async (id) => {
  const response = await axiosInstance.get(
    `/v1/transit-warehouse/warehouses/${id}`
  );
  return response?.data?.data ?? null;
};

// Update warehouse
export const updateWarehouse = async ({ id, data }) => {
  const response = await axiosInstance.put(
    `/v1/transit-warehouse/warehouses/${id}/update`,
    data
  );
  return response?.data?.data ?? null;
};

// Add location to the warehouse
export const addLocationToWarehouse = async ({ id, data }) => {
  const response = await axiosInstance.post(
    `/v1/transit-warehouse/warehouses/${id}/locations/create`,
    data
  );
  return response?.data?.data ?? null;
};

// Update location
export const updateLocation = async ({ id, data }) => {
  const response = await axiosInstance.put(
    `/v1/transit-warehouse/warehouses/locations/${id}/update`,
    data
  );
  return response?.data?.data ?? null;
};

// Delete location
export const deleteLocation = async (id) => {
  const response = await axiosInstance.delete(
    `/v1/transit-warehouse/warehouses/locations/${id}/delete`
  );
  return response?.data?.data ?? null;
};

// Get warehouse locations
export const getWarehouseLocations = async (id) => {
  const response = await axiosInstance.get(
    `/v1/transit-warehouse/warehouses/${id}/locations`
  );
  return response?.data?.data ?? null;
};
