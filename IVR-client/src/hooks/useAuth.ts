// hooks/useAuth.ts
import { useEffect, useState } from "react";
import { getCurrentUser } from "../service/AuthService";


export const useAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
  getCurrentUser()
    .then(userData => {
      setUser(userData);
    })
    .catch(() => setUser(null))
    .finally(() => setLoading(false));
}, []);

return { user, loading };
};
