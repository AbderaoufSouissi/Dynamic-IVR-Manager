import { useState } from "react";
import PermissionFilter from "../components/filters/PermissionFilter";
import PermissionsTable from "../components/tables/PermissionsTable";
import content from "../data/content.json";
import { MdVpnKey } from "react-icons/md";

const PermissionsPage = () => {
  const [filters, setFilters] = useState({
    id: "",
    name: "",
    createdAt: "",
    updatedAt: "",
    createdBy: "",
    updatedBy: "",
  });

  const handleFilterChange = (name: string, value: string) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };
  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <p className="text-3xl font-bold text-slate-900">Gestion des permissions ici.</p>
       <button className="cursor-pointer bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 disabled:from-gray-400 disabled:to-gray-500 text-white font-semibold py-3.5 px-4 rounded-xl transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-blue-500/20 transform hover:scale-[1.02] active:scale-[0.98] disabled:transform-none disabled:cursor-not-allowed shadow-lg hover:shadow-xl min-h-[50px] flex items-center justify-center">
          <MdVpnKey size={25} />
          Add Permission
        </button>
      </div>
    
      <PermissionFilter filters={filters} onFilterChange={handleFilterChange} />
      <PermissionsTable permissions={content.permissions} />
    </div>
  );
};

export default PermissionsPage;
