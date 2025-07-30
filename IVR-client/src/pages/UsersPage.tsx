import { useCallback, useEffect, useState } from "react";
import UserFilter from "../components/filters/UserFilter";
import UsersTable from "../components/tables/UsersTable";
import { HiOutlineUserAdd, HiUserRemove } from "react-icons/hi";

import { Outlet, useNavigate, useSearchParams } from "react-router-dom";
import { getUsers } from "../service/UserService";
import type { User } from "../types/types";

const UsersPage = () => {
  const [filters, setFilters] = useState({
    username: "",
    email: "",
    id: "",
    firstName: "",
    lastName: "",
    createdBy: "",
    updatedBy: "",
    createdAt: "",
    updatedAt: "",
    role: "",
  });
  const [searchParams, setSearchParams] = useSearchParams();
  const sortBy = searchParams.get("sortBy") || "user_id";
 const rawSortDir = searchParams.get("sortDir") || "desc";
  const sortDir = rawSortDir === "asc" ? "asc" : "desc"; // 


  const [users, setUsers] = useState<User[]>([]);
 const [refreshTrigger, setRefreshTrigger] = useState(0);
const triggerRefresh = () => setRefreshTrigger((prev) => prev + 1);


  const isNumeric = (value: string) => /^[0-9]+$/.test(value);

  const isValidDate = (value: string) => {
    return /^\d{4}-\d{2}-\d{2}$/.test(value); // Only accept full YYYY-MM-DD
  };
  const validateFilters = useCallback(
    (filters: Record<string, string>): Record<string, string> | null => {
      const validated: Record<string, string> = {};

      for (const [key, value] of Object.entries(filters)) {
        const trimmed = value.trim();
        if (!trimmed) continue;

        if (key === "id" && !isNumeric(trimmed)) return null;
        if (
          (key === "createdAt" || key === "updatedAt") &&
          !isValidDate(trimmed)
        )
          return null;

        validated[key] = trimmed;
      }

      return validated;
    },
    []
  );

  const fetchUsers = async () => {
    const validatedFilters = validateFilters(filters);
    if (validatedFilters === null) {
      return;
    }
    const params = {
      ...validatedFilters,
      sortBy,
      sortDir,
    };

    try {
      const data = await getUsers(params);
      setUsers(data.content);
    } catch (err) {
      console.error("Erreur lors de la récupération des utilisateurs", err);
    }
  };

  // Run fetchUsers on mount and on filters change with debounce
  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      fetchUsers();
    }, 500);
  

    return () => clearTimeout(delayDebounce);
  }, [filters, refreshTrigger,searchParams]);
  
const handleSortChange = (field: string) => {
    const isSameField = field === sortBy;
    const newSortDir = isSameField && sortDir === "asc" ? "desc" : "asc";

    // Update URL params for sorting, preserving filters
    const currentParams = Object.fromEntries(searchParams.entries());
    setSearchParams({
      ...currentParams,
      sortBy: field,
      sortDir: newSortDir,
    });
  };

   useEffect(() => {
    // Update URL search params except sort params (they are independent)
    const newParams: Record<string, string> = {};

    Object.entries(filters).forEach(([key, val]) => {
      if (val.trim()) newParams[key] = val.trim();
    });

    // Preserve current sortBy/sortDir params
    newParams.sortBy = sortBy;
    newParams.sortDir = sortDir;

    setSearchParams(newParams);
  }, [filters, sortBy, sortDir, setSearchParams]);

  const handleFilterChange = (name: string, value: string) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  const navigate = useNavigate();

  const resetFilters = () => {
    setFilters({
      id: "",
      username: "",
      email: "",
      firstName: "",
      lastName: "",
      createdBy: "",
      updatedBy: "",
      createdAt: "",
      updatedAt: "",
      role: "",
    });
  };

  

  return (
    <>
      <div>
        <div className="mb-6 flex items-center justify-between">
          <p className="text-3xl font-bold text-slate-900">
            Gestion des utilisateurs
          </p>
          <button
            onClick={() => navigate("/admin/users/create")}
            className="cursor-pointer bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 disabled:from-gray-400 disabled:to-gray-500 text-white font-semibold py-3.5 px-4 rounded-xl transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-blue-500/20 transform hover:scale-[1.02] active:scale-[0.98] disabled:transform-none disabled:cursor-not-allowed shadow-lg hover:shadow-xl min-h-[50px] flex items-center justify-center"
          >
            <HiOutlineUserAdd size={20} className="mr-2" />
            Ajouter un utilisateur
          </button>
        </div>

        <UserFilter
          filters={filters}
          onFilterChange={handleFilterChange}
          onResetFilters={resetFilters}
        />
        {users.length != 0 ? <UsersTable users={users} sortBy={sortBy} sortDir={sortDir} onSortChange={handleSortChange} />

        : <div className="p-10 flex flex-col items-center text-gray-500">
        <HiUserRemove className="w-12 h-12 text-gray-300 mb-4" />
        <p className="text-lg font-medium">Aucun utilisateur trouvé</p>
      </div>}
       
   

        
      </div>

      <Outlet context={{ triggerRefresh }}/>
    </>
  );
};
export default UsersPage;
