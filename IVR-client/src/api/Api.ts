import axios from "axios";

export const API_BASE_URL = import.meta.env.VITE_BACKEND_URL;

export const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
});


export const formatTimestamp = (timestamp: string) => {
  // Format ISO string to local date/time string, fallback to raw if invalid
  try {
    return new Intl.DateTimeFormat('fr-FR', {
      dateStyle: 'medium',
      timeStyle: 'short'
    }).format(new Date(timestamp));
  } catch {
    return timestamp;
  }
}
