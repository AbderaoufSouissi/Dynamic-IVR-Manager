import { useCallback, useEffect, useState } from "react";
import RoleFilter from "../components/filters/RoleFilter";
import RolesTable from "../components/tables/RolesTable";
import { MdAdminPanelSettings } from "react-icons/md";
import { Outlet, useLocation, useNavigate, useSearchParams } from "react-router-dom";
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
  const [searchParams, setSearchParams] = useSearchParams();
  const sortBy = searchParams.get("sortBy") || "role_id"; // adjust default
  const rawSortDir = searchParams.get("sortDir") || "desc";
  const sortDir = rawSortDir === "asc" ? "asc" : "desc";
  const [page, setPage] = useState(() => {
    const param = searchParams.get("page");
    return param && !isNaN(+param) ? +param : 0;
  });
  const [pageSize, setPageSize] = useState(() => {
    const param = searchParams.get("size");
    return param && !isNaN(+param) ? +param : 5;
  });
  const [totalElements, setTotalElements] = useState(0);

  const [roles, setRoles] = useState<Role[]>([]);
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const triggerRefresh = () => setRefreshTrigger((prev) => prev + 1);
  const isNumeric = (value: string) => /^[0-9]+$/.test(value);
   const location = useLocation();
  const isRootRolesPage = location.pathname === "/admin/roles";


  const handleSortChange = (field: string) => {
    const isSameField = field === sortBy;
    const newSortDir = isSameField && sortDir === "asc" ? "desc" : "asc";


    const currentParams = Object.fromEntries(searchParams.entries());
    setSearchParams({
      ...currentParams,
      sortBy: field,
      sortDir: newSortDir,
      page: "0", // reset to first page on sort
    });
    setPage(0); // reset local state too
  };
  

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
    const params = {
      ...validatedFilters,
      sortBy,
      sortDir,
      page,
      size: pageSize,
    };

    try {
      const data = await getRoles(params);
      setRoles(data.content);
      setTotalElements(data.totalElements);
    } catch (err) {
      console.error("Erreur lors de la récupération des utilisateurs", err);
    }
  };
  

  useEffect(() => {
    if (!isRootRolesPage) return;
    const delayDebounce = setTimeout(() => {
      fetchRoles();
    }, 500);

    return () => clearTimeout(delayDebounce);
  }, [filters, refreshTrigger, searchParams]);

  useEffect(() => {
    
    if (!isRootRolesPage) return;
    // Update URL search params except sort params (they are independent)
    const newParams: Record<string, string> = {};

    Object.entries(filters).forEach(([key, val]) => {
      if (val.trim()) newParams[key] = val.trim();
    });

    // Preserve current sortBy/sortDir params
    newParams.sortBy = sortBy;
    newParams.sortDir = sortDir;
    newParams.page = String(page); // Add current page to URL
    newParams.size = String(pageSize);

    setSearchParams(newParams);
  }, [filters, sortBy, sortDir, page, pageSize, setSearchParams]);

  const handleFilterChange = (name: string, value: string) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  useEffect(() => {
  if (location.search) {
    navigate(location.pathname, { replace: true });
  }
}, []);

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
            onClick={() => navigate({
  pathname: "/admin/roles/create",
  search: "", // Clear any ?size=5 etc
})}
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
          <RolesTable
            roles={roles}
            sortBy={sortBy}
            sortDir={sortDir}
            onSortChange={handleSortChange}
            currentPage={page + 1} // backend is 0-based, UI 1-based
            onPageChange={(newPage) => setPage(newPage - 1)}
            totalCount={totalElements}
            onRowsPerPageChange={(size) => {
              setPageSize(size);
              setPage(0); // reset page when page size changes
            }}
            rowsPerPage={pageSize} />
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
