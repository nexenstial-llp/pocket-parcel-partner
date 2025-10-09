import axios from "axios";
import toast from "react-hot-toast";

const ENV = import.meta.env.VITE_APP_ENV;
const BASE_URL = import.meta.env.VITE_APP_BASE_URL;
const API_AES_KEY = import.meta.env.VITE_APP_API_AES_ENCRYPTION_KEY;
const IV_LENGTH = 16;
const ALGORITHM = "AES-CBC";

// Helper function to convert hex to Uint8Array
const hexToUint8Array = (hex) => {
  return new Uint8Array(hex.match(/.{1,2}/g).map((byte) => parseInt(byte, 16)));
};

// Helper function to convert Uint8Array to hex string
const uint8ArrayToHex = (bytes) => {
  return Array.from(bytes)
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
};

// Encrypt function using Web Crypto API
const encrypt = async (text) => {
  const iv = crypto.getRandomValues(new Uint8Array(IV_LENGTH));
  const key = await crypto.subtle.importKey(
    "raw",
    hexToUint8Array(API_AES_KEY),
    { name: ALGORITHM },
    false,
    ["encrypt"]
  );

  const encodedText = new TextEncoder().encode(text);
  const encryptedData = await crypto.subtle.encrypt(
    { name: ALGORITHM, iv },
    key,
    encodedText
  );

  const encryptedArray = new Uint8Array(encryptedData);
  return `${uint8ArrayToHex(iv)}:${uint8ArrayToHex(encryptedArray)}`;
};

// Decrypt function using Web Crypto API
const decrypt = async (text) => {
  const [ivHex, encryptedHex] = text.split(":");
  const iv = hexToUint8Array(ivHex);
  const encryptedData = hexToUint8Array(encryptedHex);

  const key = await crypto.subtle.importKey(
    "raw",
    hexToUint8Array(API_AES_KEY),
    { name: ALGORITHM },
    false,
    ["decrypt"]
  );

  const decryptedData = await crypto.subtle.decrypt(
    { name: ALGORITHM, iv },
    key,
    encryptedData
  );

  return new TextDecoder().decode(decryptedData);
};

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

    if (ENV === "production") {
      const content = await encrypt(JSON.stringify(request_body));
      request_body = { itAm_Lfdwnk_sq: content };
    }

    const response = await axios.post(
      `${BASE_URL}/v1/auth/refresh-token`,
      request_body
    );

    let response_data = response.data;

    if (ENV === "production") {
      response_data = JSON.parse(await decrypt(response_data.itAm_Lfdwnk_sq));
    }

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
      return "Internal server error";
    }
    let responseData = error.response.data;

    // Decrypt response data if in production
    if (ENV === "production" && responseData.itAm_Lfdwnk_sq) {
      responseData = JSON.parse(await decrypt(responseData.itAm_Lfdwnk_sq));
    }

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
        errorMessage = message || "Validation error";
      }
    } else {
      // For regular errors, use the message from the server
      errorMessage = message || errorMessage;
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
    const retailer_shop_id = localStorage.getItem("retailer_shop_id");

    // Add Authorization header if not skipping authentication
    if (
      !config.skipAuth &&
      accessToken &&
      !config.url?.includes("/auth/login")
    ) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    // Add default query parameters
    config.params = {
      ...config.params, // Keep existing params if any
      retailer_shop_id: retailer_shop_id || "", // Add retailer_shop_id (fallback to empty if not found)
    };

    // Encrypt data if in production
    if (ENV === "production" && config.data) {
      const encryptedData = await encrypt(JSON.stringify(config.data));
      config.data = { itAm_Lfdwnk_sq: encryptedData };
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor
axiosInstance.interceptors.response.use(
  async (response) => {
    // Decrypt response data if in production
    if (ENV === "production" && response.data?.itAm_Lfdwnk_sq) {
      const decryptedData = await decrypt(response.data.itAm_Lfdwnk_sq);
      response.data = JSON.parse(decryptedData);
    }
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    // Handle token refresh
    if (error.response?.status === 401 && !originalRequest._retry) {
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

    // Only show toast if suppressErrorToast is not set to true
    if (!originalRequest?.suppressErrorToast) {
      const errorMessage = await handleErrorMessage(error);
      toast.error(errorMessage);
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
