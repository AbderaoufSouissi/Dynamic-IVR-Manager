import { useCallback, useEffect, useState } from "react";
import UserFilter from "../components/filters/UserFilter";
import UsersTable from "../components/tables/UsersTable";
import { HiOutlineUserAdd, HiUserRemove } from "react-icons/hi";

import { Outlet, useNavigate, useSearchParams } from "react-router-dom";
import { getUsers } from "../service/UserService";
import type { User } from "../types/types";
import AddButton from "../components/buttons/AddButton";
import PageHeader from "../components/headers/PageHeader";

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
    roleName: "",
  });

  const [appliedFilters, setAppliedFilters] = useState({
    username: "",
    email: "",
    id: "",
    firstName: "",
    lastName: "",
    createdBy: "",
    updatedBy: "",
    createdAt: "",
    updatedAt: "",
    roleName: "",
  });

  const [searchParams, setSearchParams] = useSearchParams();
  const sortBy = searchParams.get("sortBy") || "user_id";
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

  const [users, setUsers] = useState<User[]>([]);
  const [showFilters, setShowFilters] = useState(false);

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
    const validatedFilters = validateFilters(appliedFilters);
    if (validatedFilters === null) return;

    const params = {
      ...validatedFilters,
      sortBy,
      sortDir,
      page,
      size: pageSize,
    };

    try {
      const data = await getUsers(params);

      setUsers(data.content);
      setTotalElements(data.totalElements);
    } catch (err) {
      console.error("Erreur lors de la récupération des utilisateurs", err);
    }
  };

  const handleUserStatusChange = (userId: number, newStatus: boolean) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.userId === userId ? { ...user, active: newStatus } : user
      )
    );
  };

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      fetchUsers();
    }, 500);

    return () => clearTimeout(delayDebounce);
  }, [
    appliedFilters,
    refreshTrigger,
    searchParams,
    page,
    pageSize,
    sortBy,
    sortDir,
  ]);

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

  const handleFilterChange = (name: string, value: string) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  const navigate = useNavigate();

  const handleApplyFilters = () => {
    setAppliedFilters({ ...filters });
    setPage(0); // Reset to first page when applying new filters
  };

  const resetFilters = () => {
    const emptyFilters = {
      id: "",
      username: "",
      email: "",
      firstName: "",
      lastName: "",
      createdBy: "",
      updatedBy: "",
      createdAt: "",
      updatedAt: "",
      roleName: "",
    };
    setFilters(emptyFilters);
    setAppliedFilters(emptyFilters);
    setPage(0); // Reset to first page when resetting filters
  };

  return (
    <>
      <div>
        <PageHeader title={"Gestion des utilisateurs"} />

        <div className="flex justify-between items-center mb-2 gap-2">
          <button
            onClick={() => setShowFilters((prev) => !prev)}
            className=" cursor-pointer px-2 py-1 text-sm font-semibold rounded-lg border transition-all duration-200 flex items-center justify-center shadow-md hover:shadow-lg bg-gray-100 text-gray-800 hover:scale-[1.01] active:scale-[0.98] border-gray-300 hover:bg-gray-200"
          >
            {showFilters ? "Masquer les filtres" : "Afficher les filtres"}
          </button>

          <AddButton
            onClick={() => navigate("/admin/users/create")}
            icon={HiOutlineUserAdd}
            label={"Créer Nouveau"}
          />
        </div>

        {showFilters && (
          <UserFilter
            filters={filters}
            onFilterChange={handleFilterChange}
            onResetFilters={resetFilters}
            onApplyFilters={handleApplyFilters}
          />
        )}

        {users.length !== 0 ? (
          <UsersTable
            users={users}
            onUserStatusChange={handleUserStatusChange}
            sortBy={sortBy}
            sortDir={sortDir}
            onSortChange={handleSortChange}
            currentPage={page + 1}
            onPageChange={(newPage) => setPage(newPage - 1)}
            totalCount={totalElements}
            onRowsPerPageChange={(size) => {
              setPageSize(size);
              setPage(0);
            }}
            rowsPerPage={pageSize}
          />
        ) : (
          <div className="p-10 flex flex-col items-center text-gray-500">
            <HiUserRemove className="w-12 h-12 text-gray-300 mb-4" />
            <p className="text-lg font-medium">Aucun utilisateur trouvé</p>
          </div>
        )}
      </div>

      <Outlet context={{ triggerRefresh }} />
    </>
  );
};
export default UsersPage;
