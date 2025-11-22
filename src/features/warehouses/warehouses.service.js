import axiosInstance from "@/utils/axiosInstance.util";

export const fetchWarehouses = async ({ page, limit }) => {
  const response = await axiosInstance.get("/v1/admin/warehouses", {
    params: {
      page,
      limit,
    },
  });
  return response?.data ?? null;
};

// Create warehouse
export const createWarehouse = async (data) => {
  const response = await axiosInstance.post("/v1/admin/warehouses", data);
  return response?.data?.data ?? null;
};

// Delete warehouse
export const deleteWarehouse = async (id) => {
  const response = await axiosInstance.delete(`/v1/admin/warehouses/${id}`);
  return response?.data?.data ?? null;
};

// Get by id
export const getWarehouseById = async (id) => {
  const response = await axiosInstance.get(`/v1/admin/warehouses/${id}`);
  return response?.data?.data ?? null;
};

// Update warehouse
export const updateWarehouse = async ({ id, data }) => {
  const response = await axiosInstance.put(`/v1/admin/warehouses/${id}`, data);
  return response?.data?.data ?? null;
};
