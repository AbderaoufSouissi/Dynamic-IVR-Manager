import { useState, useMemo } from "react";
import type { User } from "../../types/types";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import { NavLink, useNavigate } from "react-router-dom";
import Modal from "../Modal";
import { FiAlertTriangle } from "react-icons/fi";

interface UsersTableProps {
  users: User[];
  itemsPerPage?: number;
  onEdit: (user: User) => void; // New
}

const UsersTable = ({ users, itemsPerPage = 5, onEdit }: UsersTableProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(itemsPerPage);

  const totalPages = Math.ceil(users.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;

  const navigate = useNavigate();
  const [showModal,setShowModal] = useState(false)

  const currentUsers = useMemo(
    () => users.slice(startIndex, endIndex),
    [users, startIndex, endIndex]
  );

  const getPageNumbers = () => {
    const pages = [];
    const maxPagesToShow = 5;

    if (totalPages <= maxPagesToShow) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else if (currentPage <= 3) {
      for (let i = 1; i <= 5; i++) pages.push(i);
    } else if (currentPage >= totalPages - 2) {
      for (let i = totalPages - 4; i <= totalPages; i++) pages.push(i);
    } else {
      for (let i = currentPage - 2; i <= currentPage + 2; i++) pages.push(i);
    }

    return pages;
  };

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  const handlePrevious = () => handlePageChange(currentPage - 1);
  const handleNext = () => handlePageChange(currentPage + 1);

  const handleRowsPerPageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setRowsPerPage(parseInt(e.target.value));
    setCurrentPage(1); // Reset to first page on change
  };

  const handleEditUser = (user: User) => {
    navigate("/admin/users/update", { state: { user } });
  };
  return (
    <div className="overflow-x-auto rounded-xl shadow border border-gray-200 bg-white">
      <table className="w-full text-sm">
        <thead className="bg-gray-100 text-gray-600 uppercase text-xs">
          <tr>
            <th className="text-left px-4 py-2 font-semibold whitespace-nowrap">
              ID
            </th>
            <th className="text-left px-4 py-2 font-semibold whitespace-nowrap">
              Prénom
            </th>
            <th className="text-left px-4 py-2 font-semibold whitespace-nowrap">
              Nom
            </th>
            <th className="text-left px-4 py-2 font-semibold whitespace-nowrap">
              Email
            </th>
            <th className="text-left px-4 py-2 font-semibold whitespace-nowrap">
              Username
            </th>
            <th className="text-left px-4 py-2 font-semibold whitespace-nowrap">
              Rôle
            </th>
            <th className="text-left px-4 py-2 font-semibold whitespace-nowrap">
              Date de création
            </th>
            <th className="text-left px-4 py-2 font-semibold whitespace-nowrap">
              Créé par
            </th>
            <th className="text-left px-4 py-2 font-semibold whitespace-nowrap">
              Date de modification
            </th>
            <th className="text-left px-4 py-2 font-semibold whitespace-nowrap">
              Modifié par
            </th>
            <th className="text-left px-4 py-2 font-semibold whitespace-nowrap">
              Statut
            </th>
            <th className="p-4 text-left font-semibold text-gray-600">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {currentUsers.map((user) => (
            <tr
              key={user.userId}
              className="border-t border-gray-200 hover:bg-gray-50 transition"
            >
              <td className="px-4 py-2 font-medium">{user.userId}</td>
              <td className="px-4 py-2 font-medium">{user.firstName}</td>
              <td className="px-4 py-2 font-medium">{user.lastName}</td>
              <td className="px-4 py-2 font-medium">{user.email}</td>
              <td className="px-4 py-2 font-medium">{user.username}</td>
              <td className="px-4 py-2 font-medium">{user.roleName}</td>
              <td className="px-4 py-2">{user.createdAt}</td>
              <td className="px-4 py-2">{user.createdBy}</td>
              <td className="px-4 py-2">{user.updatedAt}</td>
              <td className="px-4 py-2">{user.updatedBy}</td>
              <td className="px-4 py-2">
                <span
                  className={`inline-block px-2 py-1 text-xs font-semibold rounded-full ${
                    user.active
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {user.active ? "Actif" : "Inactif"}
                </span>
              </td>
              <td className="p-4 space-x-2 font-medium text-blue-600">
                <button
                  onClick={() => onEdit(user)}
                  className="action-link text-blue-600 hover:underline"
                >
                  Edit
                </button>
                <span className="text-slate-300">|</span>
                <button
                  className="cursor-pointer text-red-500 hover:underline"
                  onClick={() => 
                    setShowModal(true)
                    }
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination + Rows per page */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mt-4 p-4 border-t border-gray-200 gap-4">
        {/* Rows per page selector */}
        <div className="flex items-center gap-2">
          <p className="text-sm text-gray-700">Rows per page:</p>
          <div className="relative">
            <select
              value={rowsPerPage}
              onChange={handleRowsPerPageChange}
              className="cursor-pointer appearance-none rounded-md border border-gray-300 bg-white py-1.5 pl-3 pr-8 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            >
              {[5, 10, 15, 20].map((size) => (
                <option key={size} value={size}>
                  {size}
                </option>
              ))}
            </select>
            <svg
              className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="m19.5 8.25-7.5 7.5-7.5-7.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>

        {/* Pagination controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={handlePrevious}
            disabled={currentPage === 1}
            className={`cursor-pointer flex size-8 items-center justify-center rounded-md border border-slate-300 transition-colors ${
              currentPage === 1
                ? "opacity-50 cursor-not-allowed"
                : "hover:bg-slate-100"
            }`}
          >
            <MdKeyboardArrowLeft />
          </button>
          {getPageNumbers().map((page) => (
            <button
              key={page}
              onClick={() => handlePageChange(page)}
              className={`cursor-pointer text-sm font-medium flex size-8 items-center justify-center rounded-md transition-colors ${
                page === currentPage
                  ? "text-white bg-blue-600"
                  : "text-slate-600 hover:bg-slate-100"
              }`}
            >
              {page}
            </button>
          ))}
          <button
            onClick={handleNext}
            disabled={currentPage === totalPages}
            className={`cursor-pointer flex size-8 items-center justify-center rounded-md border border-slate-300 transition-colors ${
              currentPage === totalPages
                ? "opacity-50 cursor-not-allowed"
                : "hover:bg-slate-100"
            }`}
          >
            <MdKeyboardArrowRight />
          </button>
        </div>

        {/* Displayed range */}
        <p className="text-sm text-slate-500">
          Affichage de {Math.min(endIndex, users.length)} sur {users.length}{" "}
          utilsateurs
        </p>
      </div>
      {showModal && (
  <Modal
    open={showModal}
    onClose={() => setShowModal(false)}
    icon={<FiAlertTriangle />}
    title="Confirmer la suppression"
          description="Êtes-vous sûr de vouloir supprimer cet utilisateur ?"
          confirmType="danger"
    onConfirm={() => {
      // Implement deletion logic here
      console.log("Confirmed");
      setShowModal(false);
    }}
    confirmLabel="Supprimer"
  />
)}
      
    </div>
    
  );
};

export default UsersTable;
