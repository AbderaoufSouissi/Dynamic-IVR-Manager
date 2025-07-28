import { useEffect, useState } from "react";
import UserFilter from "../components/filters/UserFilter";
import UsersTable from "../components/tables/UsersTable";
import { HiOutlineUserAdd } from "react-icons/hi";

import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { getUsers } from "../service/UserService";
import type { User } from "../types/types";

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

  const [users, setUsers] = useState<User[]>([]);
  const location = useLocation();

   
  
  // const users: User[] = []


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

   useEffect(() => {
    fetchUsers();
  }, [location]); 


  const handleFilterChange = (name: string, value: string) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  

  const navigate = useNavigate();
 

  return (
    <>
      <div>
        {users.length === 0 ? (
          <div className="text-center mt-10 text-gray-500">
            <div className="mb-6 flex flex-col items-center justify-center gap-4">
              <p className="text-3xl font-bold text-slate-900">Aucun utilisateur trouvé</p>
              <button
                onClick={() => navigate("/admin/users/create")}
                className="cursor-pointer bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 disabled:from-gray-400 disabled:to-gray-500 text-white font-semibold py-3.5 px-4 rounded-xl transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-blue-500/20 transform hover:scale-[1.02] active:scale-[0.98] disabled:transform-none disabled:cursor-not-allowed shadow-lg hover:shadow-xl min-h-[50px] flex items-center justify-center"
              >
                <HiOutlineUserAdd size={20} className="mr-2" />
                Ajouter un utilisateur
              </button>
            </div>
          </div>
        ) : (
          <>
            <div className="mb-6 flex items-center justify-between">
              <p className="text-3xl font-bold text-slate-900">Gestion des utilisateurs</p>
              <button
                onClick={() => navigate("/admin/users/create")}
                className="cursor-pointer bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 disabled:from-gray-400 disabled:to-gray-500 text-white font-semibold py-3.5 px-4 rounded-xl transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-blue-500/20 transform hover:scale-[1.02] active:scale-[0.98] disabled:transform-none disabled:cursor-not-allowed shadow-lg hover:shadow-xl min-h-[50px] flex items-center justify-center"
              >
                <HiOutlineUserAdd size={20} className="mr-2" />
                Ajouter un utilisateur
              </button>
            </div>

            <UserFilter filters={filters} onFilterChange={handleFilterChange} />
            <UsersTable users={users} />
          </>
        )}
      </div>

      <Outlet />
    </>
  );
}
export default UsersPage;
