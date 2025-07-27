import { axiosInstance } from "../api/Api";













export const login = async (username: string, password: string) => {
  const params = new URLSearchParams();
  params.append("username", username);
  params.append("password", password);

  try {
    const response = await axiosInstance.post("/auth/login", params, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      }
    });
    return response.data;
  } catch (error: any) {
    if (error.response?.status === 401) {
      throw new Error("Invalid credentials");
    }
    throw error;
  }
};

export const logout = async () => {
  try {
    const response = await axiosInstance.post("/auth/logout");
    return response.data;
  } catch (error: any) {
    console.error("Logout error:", error);
    throw error;
  }
};
  
export const getCurrentUser = async () => {
  try {
    const response = await axiosInstance.get("/auth/user");
    return response.data;
  } catch (error: any) {
    throw error;
  }
};