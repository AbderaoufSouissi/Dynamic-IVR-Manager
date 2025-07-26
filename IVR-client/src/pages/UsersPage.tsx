import { useEffect, useState } from "react";
import UserFilter from "../components/filters/UserFilter";
import UsersTable from "../components/tables/UsersTable";
import { HiOutlineUserAdd } from "react-icons/hi";

import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { getUsers } from "../service/UserService";

const UsersPage = () => {
  const [filters, setFilters] = useState({
    username: "",
    email: "",
    id: "",
    firstname: "",
    lastname: "",
    createdBy: "",
    updatedBy: "",
    createdAt: "",
    updatedAt: "",
    role: "",
  });

  const [users, setUsers] = useState([]);
  const location = useLocation();

  useEffect(() => {
  fetchUsers();
}, [location]);


  const fetchUsers = async () => {
    try {
      const data = await getUsers();
      console.log(data)
      setUsers(data.content);
    } catch (err) {
      console.error("Erreur lors de la récupération des utilisateurs", err);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);


  const handleFilterChange = (name: string, value: string) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  

  const navigate = useNavigate();
 

  return (
    <>
      <div className="mb-6 flex items-center justify-between">
        <p className="text-3xl font-bold text-slate-900">Gestion des utilisateurs</p>
        <button
          onClick={() => navigate("/admin/users/create")}

          className="flex items-center gap-2 cursor-pointer rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 hover:scale-105 transform transition-transform duration-300 focus:outline-none"
        >
          <HiOutlineUserAdd size={20} />
          Ajouter un utilisateur
        </button>
      </div>

      <UserFilter filters={filters} onFilterChange={handleFilterChange} />

            
    <UsersTable users={users}/>
      <Outlet />

      
  

    </>
  );
};

export default UsersPage;
