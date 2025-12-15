import { useMutation, useQuery } from "@tanstack/react-query";
import { createRack, deleteRack, getRacks } from "./racks.service";

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
