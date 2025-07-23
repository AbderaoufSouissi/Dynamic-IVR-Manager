import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_BACKEND_URL;

export const login = async (username: string, password: string) => {
  const params = new URLSearchParams();
  params.append("username", username);
  params.append("password", password);

  return axios.post(`${API_BASE_URL}/api/auth/login`, params, {
    withCredentials: true,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    }
  });
};

// Logout
export const logout = async () => {
  return axios.post(`${API_BASE_URL}/api/auth/logout`, null, {
    withCredentials: true
  });
};