import { useMutation, useQuery } from "@tanstack/react-query";
import {
  addLocationToWarehouse,
  createWarehouse,
  deleteLocation,
  deleteWarehouse,
  fetchWarehouses,
  getWarehouseById,
  updateLocation,
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
    enabled: !!id,
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

// Add locations to warehouse
export const useAddLocationsToWarehouse = ({ onError, onSuccess, ...rest }) => {
  return useMutation({
    mutationFn: addLocationToWarehouse,
    onSuccess,
    onError,
    ...rest,
  });
};

// Update location
export const useUpdateLocationInWarehouse = ({
  onError,
  onSuccess,
  ...rest
}) => {
  return useMutation({
    mutationFn: updateLocation,
    onSuccess,
    onError,
    ...rest,
  });
};

// Delete warehouse location
export const useDeleteWarehouseLocation = ({ onError, onSuccess, ...rest }) => {
  return useMutation({
    mutationFn: deleteLocation,
    onSuccess,
    onError,
    ...rest,
  });
};
