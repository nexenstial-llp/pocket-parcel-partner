import { useMutation, useQuery } from "@tanstack/react-query";
import {
  changePassword,
  deleteAccount,
  fetchCurrentUserProfile,
  updateUserProfile,
} from "./users.service";

export const useCurrentUserProfile = () => {
  const token = localStorage.getItem("auth-token");
  return useQuery({
    queryKey: ["user"],
    queryFn: () => fetchCurrentUserProfile(),
    enabled: !!token,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    retry: false,
    refetchOnWindowFocus: true,
  });
};

// Update user
export const useUpdateUserProfile = ({ onError, onSuccess, ...rest }) => {
  return useMutation({
    mutationFn: updateUserProfile,
    onSuccess,
    onError,
    ...rest,
  });
};

// Change Password
export const useChangePassword = ({ onError, onSuccess, ...rest }) => {
  return useMutation({
    mutationFn: changePassword,
    onSuccess,
    onError,
    ...rest,
  });
};

// Delete User
export const useDeleteUser = ({ onError, onSuccess, ...rest }) => {
  return useMutation({
    mutationFn: deleteAccount,
    onSuccess,
    onError,
    ...rest,
  });
};
