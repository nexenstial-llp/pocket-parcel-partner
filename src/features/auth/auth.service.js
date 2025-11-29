import axiosInstance from "@/utils/axiosInstance.util";

// login user
export const login = async ({ username, password }) => {
  const response = await axiosInstance.post("/v1/auth/login", {
    username,
    password,
  });
  return response.data;
};

export const emailPasswordLogin = async ({ email, password }) => {
  const response = await axiosInstance.post(
    "/v1/auth/email/login",
    {
      email,
      password,
    },
    {
      skipAuth: true, // Skip adding Authorization header
      suppressErrorToast: true, // Custom config to suppress error toasts
    }
  );
  return response.data.data;
};
// Auth method
export const authMe = async () => {
  const response = await axiosInstance.get("/v1/auth/me");
  return response.data;
};

export const sendOtpApi = async (email) => {
  const response = await axiosInstance.post(
    "/v1/auth/email/send-otp",
    { email },
    {
      skipAuth: true,
      suppressErrorToast: true,
    }
  );
  return response.data;
};
export const logout = async () => {
  const response = await axiosInstance.post("/v1/auth/logout");
  return response.data;
};
