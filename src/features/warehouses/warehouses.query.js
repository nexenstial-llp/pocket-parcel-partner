import { useMutation, useQuery } from "@tanstack/react-query";
import {
  createWarehouse,
  deleteWarehouse,
  fetchWarehouses,
  getWarehouseById,
  updateWarehouse,
} from "./warehouses.service";

export const useFetchWarehouse = ({ page, limit }) => {
  return useQuery({
    queryKey: ["warehouses", { page, limit }],
    queryFn: () => fetchWarehouses({ page, limit }),
    retry: false,
    refetchOnWindowFocus: true,
  });
};

// Create warehouse
export const useCreateWarehouse = ({ onError, onSuccess, ...rest }) => {
  return useMutation({
    mutationFn: createWarehouse,
    retry: false,
    onSuccess,
    onError,
    ...rest,
  });
};

// Delete user
export const useDeleteWarehouse = ({ onError, onSuccess, ...rest }) => {
  return useMutation({
    mutationFn: deleteWarehouse,
    onSuccess,
    onError,
    ...rest,
  });
};

// Get by id
export const useGetWarehouseById = (id) => {
  return useQuery({
    queryKey: ["warehouse", id],
    queryFn: () => getWarehouseById(id),
    retry: false,
  });
};

// Update warehouse
export const useUpdateWarehouse = ({ onError, onSuccess, ...rest }) => {
  return useMutation({
    mutationFn: updateWarehouse,
    onSuccess,
    onError,
    ...rest,
  });
};
