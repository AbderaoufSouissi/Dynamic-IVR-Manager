// hooks/useAuth.ts
import { useEffect, useState } from "react";
import axios from "axios";

const BASE_URL = import.meta.env.VITE_BACKEND_URL;

export const useAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`${BASE_URL}/auth/user`, { withCredentials: true }) // adjust to your API
      .then(res => {
        setUser(res.data) 
        console.log("User found:", res.data);
      })
      .catch(() => setUser(null))
      .finally(() => setLoading(false));
  }, []);

  return { user, loading };
};
