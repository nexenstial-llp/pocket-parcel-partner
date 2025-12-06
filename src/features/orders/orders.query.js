import { useMutation, useQuery } from "@tanstack/react-query";
import {
  cancelQwqerOrder,
  createComprehensiveOrder,
  createQuickOrder,
  createReverseOrder,
  getAllQwqerOrders,
  getQwqerOrderById,
  modifyQwqerOrder,
  priceCalculate,
} from "./orders.service.js";

// Create Quick order query
export const useCreateQuickOrder = ({ onError, onSuccess, ...rest }) => {
  return useMutation({
    mutationFn: createQuickOrder,
    retry: false,
    onSuccess,
    onError,
    ...rest,
  });
};

// Get All first-mile orders query
export const useGetAllQwqerOrders = ({ page, limit }) => {
  return useQuery({
    queryKey: ["first-mile-orders", { page, limit }],
    queryFn: () => getAllQwqerOrders({ page, limit }),
  });
};

// Get by id
export const useGetQwqerOrderById = (id) => {
  return useQuery({
    queryKey: ["first-mile-order", id],
    queryFn: () => getQwqerOrderById(id),
    enabled: !!id,
  });
};

// Cancel Order
export const useCancelQwqerOrder = ({ onError, onSuccess, ...rest }) => {
  return useMutation({
    mutationFn: cancelQwqerOrder,
    retry: false,
    onSuccess,
    onError,
    ...rest,
  });
};

// Create Reverse Order
export const useCreateReverseOrder = ({ onError, onSuccess, ...rest }) => {
  return useMutation({
    mutationFn: createReverseOrder,
    retry: false,
    onSuccess,
    onError,
    ...rest,
  });
};

// price-calculate
export const usePriceCalculate = ({ onError, onSuccess, ...rest }) => {
  return useMutation({
    mutationFn: priceCalculate,
    retry: false,
    onSuccess,
    onError,
    ...rest,
  });
};

// Modify Order
export const useModifyQwqerOrder = ({ onError, onSuccess, ...rest }) => {
  return useMutation({
    mutationFn: modifyQwqerOrder,
    onSuccess,
    onError,
    ...rest,
  });
};

export const useCreateComprehensiveOrder = ({
  onError,
  onSuccess,
  ...rest
}) => {
  return useMutation({
    mutationFn: createComprehensiveOrder,
    onSuccess,
    onError,
    ...rest,
  });
};
