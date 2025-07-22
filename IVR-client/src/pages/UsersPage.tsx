import { useState } from "react";
import UserFilter from "../components/filters/UserFilter";
import UsersTable from "../components/tables/UsersTable";
import content from "../data/content.json";
import { HiOutlineUserAdd } from "react-icons/hi";

import type { User } from "../types/types";
import { Outlet, useNavigate } from "react-router-dom";

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
        <p className="text-lg font-semibold text-gray-800">Gestion des utilisateurs</p>
        <button
          onClick={() => navigate("/admin/users/create")}

          className="flex items-center gap-2 cursor-pointer rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 hover:scale-105 transform transition-transform duration-300 focus:outline-none"
        >
          <HiOutlineUserAdd size={20} />
          Ajouter un utilisateur
        </button>
      </div>

      <UserFilter filters={filters} onFilterChange={handleFilterChange} />

            
    <UsersTable users={content.users} onEdit={(user: User) => {
        navigate("/admin/users/update", { state: { user } });
      } }/>
      <Outlet />
      {/* Render create/update form when route matches */}

    </>
  );
};

export default UsersPage;
