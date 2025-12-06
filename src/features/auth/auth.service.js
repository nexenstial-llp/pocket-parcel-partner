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

export const logout = async () => {
  const response = await axiosInstance.post("/v1/auth/logout");
  return response.data;
};

// Send email otp
export const sendEmailOtpApi = async (email) => {
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

// Resend email otp
export const resendEmailOtpApi = async (email) => {
  const response = await axiosInstance.post(
    "/v1/auth/email/resend-otp",
    { email },
    {
      skipAuth: true,
      suppressErrorToast: true,
    }
  );
  return response.data;
};

// verify email otp
export const verifyEmailOtpApi = async (email, otp) => {
  const response = await axiosInstance.post(
    "/v1/auth/email/verify-otp",
    { email, otp },
    {
      skipAuth: true,
      suppressErrorToast: true,
    }
  );
  return response.data;
};

// Send mobile otp
export const sendMobileOtpApi = async (data) => {
  const response = await axiosInstance.post(
    "/v1/auth/mobile/send-verification-otp",
    {
      ...data,
    },
    {
      skipAuth: true,
      suppressErrorToast: true,
    }
  );
  return response.data;
};

// Verify mobile otp
export const verifyMobileOtpApi = async (data) => {
  const response = await axiosInstance.post(
    "/v1/auth/mobile/verify-phone",
    data,
    {
      skipAuth: true,
      suppressErrorToast: true,
    }
  );
  return response.data;
};

// Resend mobile otp
export const resendMobileOtpApi = async (data) => {
  const response = await axiosInstance.post(
    "/v1/auth/mobile/resend-otp",
    data,
    {
      skipAuth: true,
      suppressErrorToast: true,
    }
  );
  return response.data;
};

// Forgot password
export const forgotPasswordSendOtpApi = async (email) => {
  const response = await axiosInstance.post(
    "/v1/auth/forgot-password",
    { email },
    {
      skipAuth: true,
      suppressErrorToast: true,
    }
  );
  return response.data;
};

// Rest password with otp
export const resetPasswordApi = async (data) => {
  const response = await axiosInstance.post("/v1/auth/reset-password", data, {
    skipAuth: true,
    suppressErrorToast: true,
  });
  return response.data;
};

// Change password
export const changePasswordApi = async (data) => {
  const response = await axiosInstance.post("/v1/auth/change-password", data, {
    skipAuth: true,
    suppressErrorToast: true,
  });
  return response.data;
};
