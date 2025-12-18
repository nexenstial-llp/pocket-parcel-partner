import { useMutation, useQuery } from "@tanstack/react-query";
import {
  calculatePrice,
  cancelOrder,
  cancelQwqerOrder,
  checkServiceability,
  createComprehensiveOrder,
  createQuickOrder,
  createReverseOrder,
  getAllQwqerOrders,
  getDomesticRecommendation,
  getOrderById,
  getOrders,
  getQwqerOrderById,
  makeOrderPacked,
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
// Check comprehensive serviceability
export const useCheckServiceability = ({ onError, onSuccess, ...rest }) => {
  return useMutation({
    mutationFn: checkServiceability,
    retry: false,
    onSuccess,
    onError,
    ...rest,
  });
};

// Calculate Price
export const useCalculatePriceOfOrder = ({ onError, onSuccess, ...rest }) => {
  return useMutation({
    mutationFn: calculatePrice,
    retry: false,
    onSuccess,
    onError,
    ...rest,
  });
};

// Get Orders
export const useGetOrders = ({ page, limit }) => {
  return useQuery({
    queryKey: ["orders", { page, limit }],
    queryFn: () => getOrders({ page, limit }),
  });
};

// Get Order by Id
export const useGetOrderById = (id) => {
  return useQuery({
    queryKey: ["order", id],
    queryFn: () => getOrderById(id),
    enabled: !!id,
  });
};

// Pack Order
export const usePackOrder = ({ onError, onSuccess, ...rest }) => {
  return useMutation({
    mutationFn: makeOrderPacked,
    retry: false,
    onSuccess,
    onError,
    ...rest,
  });
};

// Get domestic recommendation
export const useGetDomesticRecommendation = ({
  onError,
  onSuccess,
  ...rest
}) => {
  return useMutation({
    mutationFn: getDomesticRecommendation,
    retry: false,
    onSuccess,
    onError,
    ...rest,
  });
};

// Cancel order
export const useCancelOrder = ({ onError, onSuccess, ...rest }) => {
  return useMutation({
    mutationFn: cancelOrder,
    retry: false,
    onSuccess,
    onError,
    ...rest,
  });
};
