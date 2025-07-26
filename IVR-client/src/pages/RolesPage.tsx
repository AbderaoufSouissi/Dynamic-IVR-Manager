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
        <button onClick={() => navigate("/admin/roles/create")} className="cursor-pointer bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 disabled:from-gray-400 disabled:to-gray-500 text-white font-semibold py-3.5 px-4 rounded-xl transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-blue-500/20 transform hover:scale-[1.02] active:scale-[0.98] disabled:transform-none disabled:cursor-not-allowed shadow-lg hover:shadow-xl min-h-[50px] flex items-center justify-center">
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




