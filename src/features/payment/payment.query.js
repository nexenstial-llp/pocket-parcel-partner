import { useMutation } from "@tanstack/react-query";
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

export const useVerifyPayment = (options = {}) => {
  return useMutation({
    mutationFn: verifyPayment,
    ...options,
  });
};

// Get payment by pocket parcel id
export const useVerifyPaymentByPocketParcelId = (options = {}) => {
  return useMutation({
    mutationFn: verifyPaymentByPocketParcelId,
    ...options,
  });
};
