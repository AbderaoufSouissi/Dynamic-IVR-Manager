import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_BACKEND_URL;





export const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true, // ✅ needed to send cookies
});



export const login = async (username: string, password: string) => {
  const params = new URLSearchParams();
  params.append("username", username);
  params.append("password", password);
  
  try {
    const response = await axios.post(`${API_BASE_URL}/auth/login`, params, {
      withCredentials: true,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      }
    });
    return response.data;
    
  } catch (error: any) {
    if (error.response && error.response.status === 401) {
      throw new Error("Invalid credentials");
    }
    throw error;
  }
};

// Logout - fixed endpoint to match your login pattern
export const logout = async () => {
  try {
    const response = await axios.post(`${API_BASE_URL}/api/v1/auth/logout`, null, {
      withCredentials: true
    });
    console.log(response)
    return response.data;
  } catch (error: any) {
    console.error('Logout error:', error);
    throw error;
  }
};

// Optional: Check if user is authenticated
export const getCurrentUser = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/v1/auth/user`, {
      withCredentials: true
    });
    return response.data;
  } catch (error: any) {
    throw error;
  }
};