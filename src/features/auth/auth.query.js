import { useMutation, useQuery } from "@tanstack/react-query";
import { authMe, login } from "./auth.service";

export const useLogin = ({ onError, onSuccess }) => {
  return useMutation({
    mutationFn: login,
    onSuccess,
    onError,
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
