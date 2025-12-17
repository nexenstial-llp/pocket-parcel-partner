import axios from "axios";
import toast from "react-hot-toast";

// const ENV = import.meta.env.VITE_APP_ENV;
const BASE_URL = import.meta.env.VITE_APP_BASE_URL;

// Create axios instances
const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
    "ngrok-skip-browser-warning": "true",
  },
});

// Function to refresh access token
const refreshAccessToken = async () => {
  try {
    const refreshToken = localStorage.getItem("refresh_token");

    let request_body = {
      refresh_token: refreshToken,
    };

    const response = await axios.post(
      `${BASE_URL}/hq/auth/refresh-token`,
      request_body
    );

    let response_data = response.data;

    const { access_token, refresh_token } = response_data.data;

    localStorage.setItem("access_token", access_token);
    localStorage.setItem("refresh_token", refresh_token);
    return access_token;
  } catch (error) {
    console.error("Failed to refresh access token", error);
    throw error;
  }
};

// Token refresh queue
let isRefreshing = false;
let refreshSubscribers = [];

// Notify all subscribers with the new token
const onRefreshed = (newAccessToken) => {
  refreshSubscribers.forEach((callback) => callback(newAccessToken));
  refreshSubscribers = [];
};

// Add a new subscriber to the queue
const addSubscriber = (callback) => {
  refreshSubscribers.push(callback);
};

// Helper function to handle error messages for toast notifications
const handleErrorMessage = async (error) => {
  console.log(error);
  // Default error message
  let errorMessage = "Something went wrong. Please try again.";

  // Check if there's a response from the server
  if (error.response?.data) {
    if (error?.status >= 500) {
      console.log("error", error.response.data.message);
      return error.response.data.message || "Internal server error";
    }

    let responseData = error.response.data;

    const { message, error: errorDetails } = responseData;

    // Handle Zod validation errors (they come as details in an array)
    if (
      errorDetails?.details &&
      Array.isArray(errorDetails.details) &&
      errorDetails.details.length > 0
    ) {
      // Get the first validation error from the array
      const firstError = errorDetails.details[0];

      // Format as "Validation error: [field] [error message]"
      if (firstError.field && firstError.error) {
        errorMessage = `Validation error: ${firstError.field} ${firstError.error}`;
      } else {
        // Fallback to general validation message
        errorMessage = message?.message || message || "Validation error";
      }
    } else {
      // For regular errors, use the message from the server
      errorMessage = message?.message || message || errorMessage;
    }
  } else if (error.message) {
    // If it's a network error or other axios error
    errorMessage = error.message;
  }

  return errorMessage;
};

// Request interceptor
axiosInstance.interceptors.request.use(
  async (config) => {
    const accessToken = localStorage.getItem("access_token");
    // Add Authorization header if not skipping authentication
    if (
      !config.skipAuth &&
      accessToken &&
      !config.url?.includes("/auth/email/login")
    ) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    // Add default query parameters
    config.params = {
      ...config.params, // Keep existing params if any
    };

    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor
axiosInstance.interceptors.response.use(
  async (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    console.log("originalRequest", originalRequest);
    // ** FIX: Skip refresh token logic for auth endpoints **
    const isAuthEndpoint =
      originalRequest.skipAuth ||
      originalRequest.url?.includes("/auth/email/login") ||
      originalRequest.url?.includes("/auth/register") ||
      originalRequest.url?.includes("/auth/hq/refresh-token");

    // Handle token refresh
    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      !isAuthEndpoint
    ) {
      originalRequest._retry = true;

      if (isRefreshing) {
        // Wait for the ongoing refresh to complete
        return new Promise((resolve) => {
          addSubscriber((newAccessToken) => {
            originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
            resolve(axiosInstance(originalRequest));
          });
        });
      }

      isRefreshing = true;

      try {
        const newAccessToken = await refreshAccessToken();
        onRefreshed(newAccessToken);
        isRefreshing = false;

        // Retry the original request with the new token
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return axiosInstance(originalRequest);
      } catch (err) {
        console.error("Token refresh failed", err);

        // Always show toast notification for authentication failure
        toast.error("Your session has expired. Please login again.");

        window.location.href = "/auth/login";

        isRefreshing = false;
        refreshSubscribers = [];
        return Promise.reject(err);
      }
    }

    // Only show toast if suppressErrorToast is not set to true and noErrorToast is not set to true
    if (
      !originalRequest?.suppressErrorToast &&
      !originalRequest?.noErrorToast
    ) {
      const errorMessage = await handleErrorMessage(error);
      toast.error(errorMessage);
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
