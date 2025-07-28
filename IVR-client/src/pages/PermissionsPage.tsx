import { useEffect, useState } from "react";
import PermissionFilter from "../components/filters/PermissionFilter";
import PermissionsTable from "../components/tables/PermissionsTable";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { getPermissions } from "../service/PermissionService";
import type { Permission } from "../types/types";
import { HiOutlineKey } from "react-icons/hi2";

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
  const location = useLocation();

  // const permissions = []

  const fetchPermissions = async () => {
    try {
      const data = await getPermissions();
      setPermissions(data.content);
      console.log(data);
    } catch (err) {
      console.error("Erreur lors de la récupération des utilisateurs", err);
    }
  };

  useEffect(() => {
    fetchPermissions();
  }, [location]);

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
      {permissions.length === 0 ? (
        <div className="text-center mt-10 text-gray-500">
          <div className="mb-6 flex flex-col items-center justify-center gap-4">
            <p className="text-3xl font-bold text-slate-900">Aucune permission trouvée</p>
            <button
              className="cursor-pointer bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 disabled:from-gray-400 disabled:to-gray-500 text-white font-semibold py-3.5 px-4 rounded-xl transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-blue-500/20 transform hover:scale-[1.02] active:scale-[0.98] disabled:transform-none disabled:cursor-not-allowed shadow-lg hover:shadow-xl min-h-[50px] flex items-center justify-center"
              onClick={() => navigate("/admin/permissions/create")}
            >
              <HiOutlineKey size={25} className="mr-2" />
              Ajouter une permission
            </button>
          </div>
        </div>
      ) : (
        <>
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
          />
          <PermissionsTable permissions={permissions} />
        </>
      )}
    </div>
    <Outlet />
  </>
);
};

export default PermissionsPage;
