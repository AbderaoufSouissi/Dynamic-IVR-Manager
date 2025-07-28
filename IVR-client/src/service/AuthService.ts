import axios from "axios";
import { API_BASE_URL, axiosInstance } from "../api/Api";













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



export const forgetPassword = async (email: string) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/auth/forget-password`, { email })
    return response.data
  } catch (err) {
    console.error("forget password error: ", err)
    throw err
  }

}


export const resetPassword = async (token: string, newPassword: string) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/auth/reset-password?token=${token}`,{newPassword})
    return response.data
  } catch (err) {
    console.error("forget password error: ", err)
    throw err
  }

}
  
// export const getCurrentUser = async () => {
//   try {
//     const response = await axiosInstance.get("/auth/user");
//     return response.data;
//   } catch (error: any) {
//     throw error;
//   }
// };