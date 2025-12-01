import { useMutation, useQuery } from "@tanstack/react-query";
import {
  authMe,
  changePasswordApi,
  emailPasswordLogin,
  forgotPasswordSendOtpApi,
  login,
  logout,
  resendEmailOtpApi,
  resendMobileOtpApi,
  resetPasswordApi,
  sendEmailOtpApi,
  sendMobileOtpApi,
  verifyEmailOtpApi,
  verifyMobileOtpApi,
} from "./auth.service";

export const useLogin = ({ onError, onSuccess }) => {
  return useMutation({
    mutationFn: login,
    onSuccess,
    onError,
  });
};

export const useEmailPasswordLogin = ({
  onError,
  onSuccess,
  onSettled,
  ...rest
}) => {
  return useMutation({
    mutationFn: emailPasswordLogin,
    onSuccess,
    onError,
    onSettled,
    ...rest,
  });
};

// Get me
export const useGetMe = () => {
  const token = localStorage.getItem("auth-token");
  return useQuery({
    queryKey: ["me"],
    queryFn: () => authMe(),
    enabled: !!token,
  });
};

// Logout
export const useLogout = ({ onError, onSuccess, onSettled, ...rest }) => {
  return useMutation({
    mutationFn: logout,
    onSuccess,
    onSettled,
    onError,
    ...rest,
  });
};

// Send Email Otp
export const useSendEmailOtp = ({ onSuccess, onError, ...rest }) => {
  return useMutation({
    mutationFn: sendEmailOtpApi,
    onSuccess,
    onError,
    ...rest,
  });
};

// Resend EMail Otp
export const useResendEmailOtp = ({ onSuccess, onError, ...rest }) => {
  return useMutation({
    mutationFn: resendEmailOtpApi,
    onSuccess,
    onError,
    ...rest,
  });
};

// Verify Email Otp
export const useVerifyEmailOtp = ({ onSuccess, onError, ...rest }) => {
  return useMutation({
    mutationFn: verifyEmailOtpApi,
    onSuccess,
    onError,
    ...rest,
  });
};

// Send Mobile Otp
export const useSendMobileOtp = ({ onSuccess, onError, ...rest }) => {
  return useMutation({
    mutationFn: sendMobileOtpApi,
    onSuccess,
    onError,
    ...rest,
  });
};

// Verify Mobile Otp
export const useVerifyMobileOtp = ({ onSuccess, onError, ...rest }) => {
  return useMutation({
    mutationFn: verifyMobileOtpApi,
    onSuccess,
    onError,
    ...rest,
  });
};

// Resend Mobile Otp
export const useResendMobileOtp = ({ onSuccess, onError, ...rest }) => {
  return useMutation({
    mutationFn: resendMobileOtpApi,
    onSuccess,
    onError,
    ...rest,
  });
};

// Forgot password
export const useForgotPasswordSendOtpApi = ({
  onSuccess,
  onError,
  ...rest
}) => {
  return useMutation({
    mutationFn: forgotPasswordSendOtpApi,
    onSuccess,
    onError,
    ...rest,
  });
};

// Rest password
export const useResetPasswordApi = ({ onSuccess, onError, ...rest }) => {
  return useMutation({
    mutationFn: resetPasswordApi,
    onSuccess,
    onError,
    ...rest,
  });
};

// Change password
export const useChangePasswordApi = ({ onSuccess, onError, ...rest }) => {
  return useMutation({
    mutationFn: changePasswordApi,
    onSuccess,
    onError,
    ...rest,
  });
};
