import { useMutation, useQuery } from "@tanstack/react-query";
import {
  createPaymentSession,
  verifyPayment,
  verifyPaymentByPocketParcelId,
} from "./payment.service";

export const useCreatePaymentSession = (options = {}) => {
  return useMutation({
    mutationFn: createPaymentSession,
    ...options,
  });
};

export const useVerifyPayment = (orderId) => {
  return useQuery({
    queryFn: verifyPayment,
    queryKey: ["verify-payment", orderId],
    enabled: !!orderId,
  });
};

// Get payment by pocket parcel id
export const useVerifyPaymentByPocketParcelId = (options = {}) => {
  return useMutation({
    mutationFn: verifyPaymentByPocketParcelId,
    ...options,
  });
};
