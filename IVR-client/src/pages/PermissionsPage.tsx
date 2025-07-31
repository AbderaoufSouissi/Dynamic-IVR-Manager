import { useCallback, useEffect, useState } from "react";
import PermissionFilter from "../components/filters/PermissionFilter";
import PermissionsTable from "../components/tables/PermissionsTable";
import { Outlet, useNavigate, useSearchParams } from "react-router-dom";
import { getPermissions } from "../service/PermissionService";
import type { Permission } from "../types/types";
import { HiKey, HiOutlineKey } from "react-icons/hi2";
import { HiX } from "react-icons/hi";

const PermissionsPage = () => {
  const [filters, setFilters] = useState({
    id: "",
    name: "",
    createdAt: "",
    updatedAt: "",
    createdBy: "",
    updatedBy: "",
  });

  const [permissions, setPermissions] = useState<Permission[]>([]);
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const triggerRefresh = () => setRefreshTrigger((prev) => prev + 1);

    const [searchParams, setSearchParams] = useSearchParams();
  const sortBy = searchParams.get("sortBy") || "permission_id";
 const rawSortDir = searchParams.get("sortDir") || "desc";
  const sortDir = rawSortDir === "asc" ? "asc" : "desc";
 

  const resetFilters = () => {
    setFilters({
      id: "",
      name: "",
      createdBy: "",
      updatedBy: "",
      createdAt: "",
      updatedAt: "",
    });
  };

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

  const fetchPermissions = async () => {
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
      const data = await getPermissions(params);
      setPermissions(data.content);
    } catch (err) {
      console.error("Erreur lors de la récupération des utilisateurs", err);
    }
  };

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      fetchPermissions();
    }, 500);

    return () => clearTimeout(delayDebounce);
  }, [filters, refreshTrigger, searchParams]);





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


  const navigate = useNavigate();

  const handleFilterChange = (name: string, value: string) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };
  return (
    <>
      <div>
        <div className="mb-6 flex items-center justify-between">
          <p className="text-3xl font-bold text-slate-900">
            Gestion des permissions ici.
          </p>
          <button
            className="cursor-pointer bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 disabled:from-gray-400 disabled:to-gray-500 text-white font-semibold py-3.5 px-4 rounded-xl transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-blue-500/20 transform hover:scale-[1.02] active:scale-[0.98] disabled:transform-none disabled:cursor-not-allowed shadow-lg hover:shadow-xl min-h-[50px] flex items-center justify-center"
            onClick={() => navigate("/admin/permissions/create")}
          >
            <HiOutlineKey size={25} className="mr-2" />
            Ajouter une permission
          </button>
        </div>

        <PermissionFilter
          filters={filters}
          onFilterChange={handleFilterChange}
          onResetFilters={resetFilters}
        />  
        {permissions.length != 0 ? <PermissionsTable permissions={permissions} sortBy={sortBy} sortDir={sortDir} onSortChange={handleSortChange}/>
        : <div className="p-10 flex flex-col items-center text-gray-500">
  <div className="relative w-12 h-12 mb-4">
    <HiKey className="w-12 h-12 text-gray-300" />
    <HiX className="absolute top-0 right-0 w-5 h-5 text-red-500 bg-white rounded-full" />
  </div>
  <p className="text-lg font-medium">Aucune permission trouvée</p>
</div>}
      </div>
      <Outlet context={{ triggerRefresh }} />
    </>
  );
};

export default PermissionsPage;
