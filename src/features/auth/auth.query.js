import { useMutation, useQuery } from "@tanstack/react-query";
import { authMe, emailPasswordLogin, login, logout } from "./auth.service";

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
