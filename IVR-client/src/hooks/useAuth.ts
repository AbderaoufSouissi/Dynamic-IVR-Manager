// hooks/useAuth.ts
import { useEffect, useState } from "react";
import { getCurrentUser } from "../service/AuthService";
import type { User } from "../types/types";


export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
  getCurrentUser()
    .then(userData => {
      setUser(userData);
    })
    .catch(() => setUser(null))
    .finally(() => setLoading(false));
  }, []);
  
  const hasPermission = (permission: string) => user?.permissions?.includes(permission);

return { user, loading, hasPermission };
};
