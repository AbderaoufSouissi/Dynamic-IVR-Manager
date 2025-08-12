import { useCallback, useEffect, useState } from "react";
import PermissionFilter from "../components/filters/PermissionFilter";
import PermissionsTable from "../components/tables/PermissionsTable";
import { Outlet, useNavigate, useSearchParams } from "react-router-dom";
import { getPermissions } from "../service/PermissionService";
import type { Permission } from "../types/types";
import { HiKey, HiOutlineKey } from "react-icons/hi2";
import { HiX } from "react-icons/hi";
import AddButton from "../components/buttons/AddButton";
import PageHeader from "../components/headers/PageHeader";
import { useAuth } from "../hooks/useAuth";

const PermissionsPage = () => {

    const { hasPermission } = useAuth()
  

  const [filters, setFilters] = useState({
    id: "",
    name: "",
    createdAt: "",
    updatedAt: "",
    createdBy: "",
    updatedBy: "",
  });

 const [appliedFilters, setAppliedFilters] = useState({
    id: "",
    name: "",
    createdAt: "",
    updatedAt: "",
    createdBy: "",
    updatedBy: "",
  });

  const [searchParams, setSearchParams] = useSearchParams();
  const sortBy = searchParams.get("sortBy") || "permission_id";
  const rawSortDir = searchParams.get("sortDir") || "desc";
  const sortDir = rawSortDir === "asc" ? "asc" : "desc"; //

  const pageParam = searchParams.get("page");
  const sizeParam = searchParams.get("size");

  const initialPage = pageParam !== null && !isNaN(+pageParam) ? +pageParam : 0;
  const initialPageSize =
    sizeParam !== null && !isNaN(+sizeParam) ? +sizeParam : 5;

  const [page, setPage] = useState(initialPage);
  const [pageSize, setPageSize] = useState(initialPageSize);

  const [totalElements, setTotalElements] = useState(0);
  const [permissions, setPermissions] = useState<Permission[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const triggerRefresh = () => setRefreshTrigger((prev) => prev + 1);

  const resetFilters = () => {
    const emptyFilters ={
      id: "",
      name: "",
      createdBy: "",
      updatedBy: "",
      createdAt: "",
      updatedAt: "",
    };
    setFilters(emptyFilters);
    setAppliedFilters(emptyFilters);
    setPage(0);
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
    const validatedFilters = validateFilters(appliedFilters);
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
      const data = await getPermissions(params);
      setPermissions(data.content);
      setTotalElements(data.totalElements);
    } catch (err) {
      console.error("Erreur lors de la récupération des utilisateurs", err);
    }
  };

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      fetchPermissions();
    }, 500);

    return () => clearTimeout(delayDebounce);
  }, [appliedFilters, refreshTrigger, searchParams, page, pageSize, sortBy, sortDir]);

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
    newParams.page = String(page); // Add current page to URL
    newParams.size = String(pageSize);

    setSearchParams(newParams);
  }, [filters, sortBy, sortDir, page, pageSize, setSearchParams]);

  const navigate = useNavigate();

  const handleFilterChange = (name: string, value: string) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };


 const handleApplyFilters = () => {
    setAppliedFilters({ ...filters });
    setPage(0); // Reset to first page when applying new filters
  };

  return (
    <>
      <div>
        <PageHeader title={"Gestion des permissions"}/>

        <div className="flex justify-between items-center mb-2 gap-2">
  <button
    onClick={() => setShowFilters((prev) => !prev)}
    className=" cursor-pointer px-2 py-1 text-sm font-semibold rounded-lg border transition-all duration-200 flex items-center justify-center shadow-md hover:shadow-lg bg-gray-100 text-gray-800 hover:scale-[1.01] active:scale-[0.98] border-gray-300 hover:bg-gray-200"
  >
    {showFilters ? "Masquer les filtres" : "Afficher les filtres"}
  </button>

      {hasPermission("create:users") && <AddButton onClick={() => navigate("/admin/permissions/create")} icon={HiOutlineKey} label={"Créer Nouveau"}/> }
          
</div>

        {showFilters && (
          <PermissionFilter
            filters={filters}
            onFilterChange={handleFilterChange}
            onResetFilters={resetFilters} onApplyFilters={handleApplyFilters}          />
        )}

        {permissions.length != 0 ? (
          <PermissionsTable
            permissions={permissions}
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
            rowsPerPage={pageSize}
          
          />
        ) : (
          <div className="p-10 flex flex-col items-center text-gray-500">
            <div className="relative w-12 h-12 mb-4">
              <HiKey className="w-12 h-12 text-gray-300" />
              <HiX className="absolute top-0 right-0 w-5 h-5 text-red-500 bg-white rounded-full" />
            </div>
            <p className="text-lg font-medium">Aucune permission trouvée</p>
          </div>
        )}
      </div>
      <Outlet context={{ triggerRefresh }} />
    </>
  );
};

export default PermissionsPage;
