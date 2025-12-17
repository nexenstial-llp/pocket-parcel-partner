import { useMutation, useQuery } from "@tanstack/react-query";
import {
  createRack,
  deleteRack,
  getRackById,
  getRacks,
  updateRack,
} from "./racks.service";

// Get all racks
export const useFetchRacks = ({ page, limit }) => {
  return useQuery({
    queryKey: ["racks", { page, limit }],
    queryFn: () => getRacks({ page, limit }),
    retry: false,
  });
};

// Delete rack
export const useDeleteRack = ({ onError, onSuccess, ...rest }) => {
  return useMutation({
    mutationFn: deleteRack,
    onSuccess,
    onError,
    ...rest,
  });
};

// Create rack
export const useCreateRack = ({ onError, onSuccess, ...rest }) => {
  return useMutation({
    mutationFn: createRack,
    onSuccess,
    onError,
    ...rest,
  });
};

// Get rack by id
export const useFetchRackById = (id) => {
  return useQuery({
    queryKey: ["rack", id],
    queryFn: () => getRackById(id),
    enabled: !!id,
  });
};

// Update rack
export const useUpdateRack = ({ onError, onSuccess, ...rest }) => {
  return useMutation({
    mutationFn: updateRack,
    onSuccess,
    onError,
    ...rest,
  });
};
