import { useState } from "react";
import UserFilter from "../components/filters/UserFilter";
import UsersTable from "../components/tables/UsersTable";
import content from "../data/content.json";
import { HiOutlineUserAdd } from "react-icons/hi";

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
        <p>Gestion des utilisateurs ici.</p>
        <button className="flex items-center gap-2 cursor-pointer rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 hover:scale-105 transform transition-transform duration-300 focus:outline-none">
          <HiOutlineUserAdd size={25} />
          Add User
        </button>
      </div>
      <UserFilter filters={filters} onFilterChange={handleFilterChange} />
      <UsersTable users={content.users} />
      {/* Use filters state as needed */}
    </div>
  );
};

export default UsersPage;
