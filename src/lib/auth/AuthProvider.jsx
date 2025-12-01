/* eslint-disable react/prop-types */
// src/lib/auth/AuthProvider.jsx - FIXED VERSION
import { useCallback, useEffect } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { router } from "@/router";
import Loader from "@/components/layout/Loader";
import axiosInstance from "@/utils/axiosInstance.util.js";
import { AuthContext } from "./authContext.js";
import {
  useEmailPasswordLogin,
  useLogout,
  useVerifyMobileOtp,
} from "@/features/auth/auth.query.js";
import { message } from "antd";

const STORAGE_KEYS = {
  ACCESS_TOKEN: "access_token",
  REFRESH_TOKEN: "refresh_token",
  USER: "user",
};

const authKeys = {
  user: ["user"],
};

async function fetchCurrentUser() {
  const token = localStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN);
  if (!token) return null;

  try {
    const response = await axiosInstance.get("/users/me");
    return response?.data?.data ?? null;
  } catch (error) {
    Object.values(STORAGE_KEYS).forEach((key) => localStorage.removeItem(key));
    console.error("Failed to fetch current user:", error);
    return null;
  }
}

export function AuthProvider({ children }) {
  const queryClient = useQueryClient();

  const { data: user, isLoading } = useQuery({
    queryKey: authKeys.user,
    queryFn: fetchCurrentUser,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    retry: false,
    refetchOnWindowFocus: true,
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
    } else {
      localStorage.removeItem(STORAGE_KEYS.USER);
    }
  }, [user]);

  const loginMutation = useEmailPasswordLogin({
    onSuccess: (userData) => {
      localStorage.setItem(STORAGE_KEYS.ACCESS_TOKEN, userData.access_token);
      localStorage.setItem(STORAGE_KEYS.REFRESH_TOKEN, userData.refresh_token);
      // ✅ Extract and store only the user object, not the entire response
      const userObject = userData.user || userData;
      localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(userObject));

      queryClient.setQueryData(authKeys.user, userObject);
      router.invalidate();
    },
  });
  // verify mobile otp
  const verifyMobileOtpMutation = useVerifyMobileOtp({
    onSuccess: (data) => {
      const userData = data?.data;
      console.log("data from verify mobile otp", data?.data);
      localStorage.setItem(STORAGE_KEYS.ACCESS_TOKEN, userData.access_token);
      localStorage.setItem(STORAGE_KEYS.REFRESH_TOKEN, userData.refresh_token);
      // ✅ Extract and store only the user object, not the entire response
      const userObject = userData.user || userData;
      localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(userObject));

      queryClient.setQueryData(authKeys.user, userObject);
      router.invalidate();
    },
  });

  const logoutMutation = useLogout({
    onSuccess: async () => {
      message.success("Logout Successfully");
      // 1. Clear all storage
      Object.values(STORAGE_KEYS).forEach((key) =>
        localStorage.removeItem(key)
      );

      // 2. Reset the query (this will trigger a re-fetch with null token)
      await queryClient.resetQueries({ queryKey: authKeys.user });

      // 3. Wait a tick for state to update
      await new Promise((resolve) => setTimeout(resolve, 0));

      // 4. Navigate to login
      await router.navigate({
        to: "/auth/login",
        replace: true,
      });

      // 5. Invalidate router
      await router.invalidate();
    },
  });

  // ✅ PROPER FIX: Use resetQueries to force re-fetch
  const logout = useCallback(async () => {
    logoutMutation.mutateAsync();
  }, [logoutMutation]);

  const login = useCallback(
    async (email, password) => {
      return loginMutation.mutateAsync({ email, password });
    },
    [loginMutation]
  );

  const verifyMobileOtp = useCallback(
    async ({ country_code, phone_number, otp_code }) => {
      console.log({ country_code, phone_number, otp_code });
      return verifyMobileOtpMutation.mutateAsync({
        country_code,
        phone_number,
        otp_code,
      });
    },
    [verifyMobileOtpMutation]
  );

  const hasRole = useCallback(
    (role) => {
      if (!user?.roles || !Array.isArray(user.roles)) return false;
      return user.roles.includes(role);
    },
    [user]
  );

  const hasAnyRole = useCallback(
    (roles) => {
      if (!user?.roles || !Array.isArray(user.roles) || !roles?.length)
        return false;
      return roles.some((role) => user.roles.includes(role));
    },
    [user]
  );

  const hasPermission = useCallback(
    (permission) => {
      if (!user?.permissions || !Array.isArray(user.permissions)) return false;
      return user.permissions.includes(permission);
    },
    [user]
  );

  const hasAnyPermission = useCallback(
    (permissions) => {
      if (
        !user?.permissions ||
        !Array.isArray(user.permissions) ||
        !permissions?.length
      )
        return false;
      return permissions.some((perm) => user.permissions.includes(perm));
    },
    [user]
  );

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader />
      </div>
    );
  }

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated: !!user,
        user,
        login,
        logout,
        verifyMobileOtp,
        isLoggingIn:
          loginMutation.isPending || verifyMobileOtpMutation.isPending,
        loginError: loginMutation.error || verifyMobileOtpMutation.error,
        hasRole,
        hasAnyRole,
        hasPermission,
        hasAnyPermission,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
