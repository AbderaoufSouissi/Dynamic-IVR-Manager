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
        <p className="text-lg font-semibold text-gray-800">Gestion des permissions ici.</p>
       <button className="flex items-center gap-2 cursor-pointer rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 hover:scale-105 transform transition-transform duration-300 focus:outline-none">
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
