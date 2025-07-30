import { useCallback, useEffect, useState } from "react";
import RoleFilter from "../components/filters/RoleFilter";
import RolesTable from "../components/tables/RolesTable";
import { MdAdminPanelSettings } from "react-icons/md";
import { Outlet, useNavigate } from "react-router-dom";
import { getRoles } from "../service/RoleService";
import type { Role } from "../types/types";
import { HiShieldCheck } from "react-icons/hi2";
import { HiX } from "react-icons/hi";

const RolesPage = () => {
  const [filters, setFilters] = useState({
    id: "",
    name: "",
    createdAt: "",
    updatedAt: "",
    createdBy: "",
    updatedBy: "",
  });

  const navigate = useNavigate();

  const [roles, setRoles] = useState<Role[]>([]);
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

  const fetchRoles = async () => {
    const validatedFilters = validateFilters(filters);
    if (validatedFilters === null) {
      return;
    }

    try {
      const data = await getRoles(validatedFilters);
      setRoles(data.content);
    } catch (err) {
      console.error("Erreur lors de la récupération des utilisateurs", err);
    }
  };

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      fetchRoles();
    }, 500);

    return () => clearTimeout(delayDebounce);
  }, [filters, refreshTrigger]);

  const handleFilterChange = (name: string, value: string) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  const resetFilters = () => {
    setFilters({
      id: "",
      name: "",
      createdAt: "",
      updatedAt: "",
      createdBy: "",
      updatedBy: "",
    });
  };

  return (
    <>
      <div>
        <div className="mb-6 flex items-center justify-between">
          <p className="text-3xl font-bold text-slate-900">
            Gestion des rôles ici.
          </p>
          <button
            onClick={() => navigate("/admin/roles/create")}
            className="cursor-pointer bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 disabled:from-gray-400 disabled:to-gray-500 text-white font-semibold py-3.5 px-4 rounded-xl transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-blue-500/20 transform hover:scale-[1.02] active:scale-[0.98] disabled:transform-none disabled:cursor-not-allowed shadow-lg hover:shadow-xl min-h-[50px] flex items-center justify-center"
          >
            <MdAdminPanelSettings size={25} className="mr-2" />
            Ajouter un rôle
          </button>
        </div>

        <RoleFilter
          filters={filters}
          onFilterChange={handleFilterChange}
          onResetFilters={resetFilters}
        />
        {roles.length != 0 ? (
          <RolesTable roles={roles} triggerRefresh={triggerRefresh} />
        ) : (
          <div className="p-10 flex flex-col items-center text-gray-500">
            <div className="relative w-12 h-12 mb-4">
              <HiShieldCheck className="w-12 h-12 text-gray-300" />
              <HiX className="absolute top-0 right-0 w-5 h-5 text-red-500 bg-white rounded-full" />
            </div>
            <p className="text-lg font-medium">Aucun rôle trouvé</p>
          </div>
        )}
      </div>

      <Outlet context={{ triggerRefresh }} />
    </>
  );
};

export default RolesPage;
