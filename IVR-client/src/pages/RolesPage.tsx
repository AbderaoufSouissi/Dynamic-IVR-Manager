import { useEffect, useState } from "react";
import RoleFilter from "../components/filters/RoleFilter";
import RolesTable from "../components/tables/RolesTable";
// import content from "../data/content.json";
import { MdAdminPanelSettings } from "react-icons/md";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { getRoles } from "../service/RoleService";

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

  const navigate = useNavigate()
  

 const [roles, setRoles] = useState([]);
  const location = useLocation();




   const fetchRoles = async () => {
    try {
      const data = await getRoles();
      setRoles(data.content);
    } catch (err) {
      console.error("Erreur lors de la récupération des utilisateurs", err);
    }
  };

  useEffect(() => {
   
    fetchRoles();
  }, [location]);



  const handleFilterChange = (name: string, value: string) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };
  return (
    <>
    
      <div className="mb-6 flex items-center justify-between">
        <p className="text-3xl font-bold text-slate-900">Gestion des rôles ici.</p>
        <button onClick={() => navigate("/admin/roles/create")} className="flex items-center gap-2 cursor-pointer rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 hover:scale-105 transform transition-transform duration-300 focus:outline-none">
          <MdAdminPanelSettings size={25} />
          Add Role
        </button>
      </div>

      <RoleFilter filters={filters} onFilterChange={handleFilterChange} />
      <RolesTable roles={roles} />
    
      <Outlet/>
    </>
  );
};

export default RolesPage




