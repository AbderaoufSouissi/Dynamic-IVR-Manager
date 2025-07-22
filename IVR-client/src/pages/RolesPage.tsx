import { useState } from "react";
import RoleFilter from "../components/filters/RoleFilter";
import RolesTable from "../components/tables/RolesTable";
import content from "../data/content.json";
import { MdAdminPanelSettings } from "react-icons/md";

<div className="mb-6 flex items-center justify-between">
  <p>Gestion des utilisateurs ici.</p>
</div>;

const RolesPage = () => {
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
        <p className="text-lg font-semibold text-gray-800">Gestion des rôles ici.</p>
        <button className="flex items-center gap-2 cursor-pointer rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 hover:scale-105 transform transition-transform duration-300 focus:outline-none">
          <MdAdminPanelSettings size={25} />
          Add Role
        </button>
      </div>

      <RoleFilter filters={filters} onFilterChange={handleFilterChange} />
      <RolesTable roles={content.roles} />
    </div>
  );
};

export default RolesPage;
