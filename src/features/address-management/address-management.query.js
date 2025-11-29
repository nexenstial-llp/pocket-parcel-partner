import { useMutation, useQuery } from "@tanstack/react-query";
import {
  createAddress,
  deleteAddress,
  getAddressesById,
  getAllAddresses,
  setDefaultAddress,
  updateAddress,
} from "./address-management.service";

// Get addresses by id query
export const useGetAddressesById = (id) => {
  return useQuery({
    queryKey: ["addresses", id],
    queryFn: () => getAddressesById(id),
    enabled: !!id,
  });
};

// Get addresses by id query
export const useGetAllAddresses = ({ page, limit }) => {
  return useQuery({
    queryKey: ["addresses", { page, limit }],
    queryFn: () => getAllAddresses({ page, limit }),
  });
};

// Update address query
export const useUpdateAddress = ({ onSuccess, onError, ...rest }) => {
  return useMutation({
    mutationFn: updateAddress,
    onSuccess,
    onError,
    ...rest,
  });
};

// Create addresses
export const useCreateAddress = ({ onError, onSuccess, ...rest }) => {
  return useMutation({
    mutationFn: createAddress,
    onSuccess,
    onError,
    ...rest,
  });
};

// Set default addresses
export const useSetDefaultAddress = ({ onError, onSuccess, ...rest }) => {
  return useMutation({
    mutationFn: setDefaultAddress,
    onSuccess,
    onError,
    ...rest,
  });
};

// Delete addresses
export const useDeleteAddress = ({ onError, onSuccess, ...rest }) => {
  return useMutation({
    mutationFn: deleteAddress,
    onSuccess,
    onError,
    ...rest,
  });
};
