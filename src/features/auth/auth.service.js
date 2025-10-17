import axiosInstance from "@/utils/axiosInstance.util";

// login user
export const login = async ({ username, password }) => {
  const response = await axiosInstance.post("/auth/login", {
    username,
    password,
  });
  return response.data;
};

// Auth method
export const authMe = async () => {
  const response = await axiosInstance.get("/auth/me");
  return response.data;
};
