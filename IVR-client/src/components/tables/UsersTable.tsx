import type { User } from "../../types/types";
import { MdEdit, MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import { MdArrowDropUp, MdArrowDropDown } from "react-icons/md";

import { useNavigate } from "react-router-dom";
import { formatTimestamp } from "../../api/Api";
import { HiChevronDown } from "react-icons/hi";
import ToggleSwitch from "../buttons/ToggleSwitch";
import { updateUser } from "../../service/UserService";
import { toastSuccess } from "../../service/ToastService";

interface UsersTableProps {
  itemsPerPage?: number;
  users: User[];
  onUserStatusChange:(userId: number, newStatus: boolean) => void;
  sortBy: string;
  sortDir: "asc" | "desc";
  onSortChange: (field: string) => void
  currentPage: number;       // 1-based page index for UI
  onPageChange: (page: number) => void;

  totalCount: number;        // totalElements
  onRowsPerPageChange: (size: number) => void;
  rowsPerPage: number;
}


const userTableHeads = [
  { key: "user_id", label: "ID" },
  { key: "email", label: "Nom complet" },
  { key: "Nom d'utilisateur", label: "Username" },
  { key: "role_id", label: "Role" },
  { key: "created_at", label: "Date de création" },
  { key: "created_by_id", label: "Créé par" },
  { key: "updated_at", label: "Date de modification" },
  { key: "updated_by_id", label: "Modifié par" },
  { key: "is_active", label: "Statut" },
]

const UsersTable = ({users, onUserStatusChange, sortBy, sortDir, onSortChange, currentPage, onPageChange, totalCount, onRowsPerPageChange, rowsPerPage }: UsersTableProps) => {


  const totalPages = Math.ceil(totalCount / rowsPerPage);
 
  const navigate = useNavigate();




  const handleSort = (column: string) => {
    onSortChange(column)
  };

  const renderSortIcon = (column: string) => {
    if (sortBy !== column) return null;
    return sortDir === "asc" ? (
      <MdArrowDropUp className="text-blue-600" size={20} />
    ) : (
      <MdArrowDropDown className="text-blue-600" size={20} />
    );
  };



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
    if (page >= 1 && page <= totalPages) onPageChange(page);
  };

  const handlePrevious = () => handlePageChange(currentPage - 1);
  const handleNext = () => handlePageChange(currentPage + 1);

  // Call parent's handler on rows per page change
  const handleRowsPerPageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newSize = parseInt(e.target.value);
    onRowsPerPageChange(newSize);
  };

  // Calculate current displayed range (e.g. showing 6-10 of 52)
  const toRecord = Math.min(currentPage * rowsPerPage, totalCount);
  
  const handleToggleStatus = async (userId: number, newStatus: boolean) => {
  try {
    const userToUpdate = users.find(u => u.userId === userId);
    if (!userToUpdate) return;

    const updatedUser = { ...userToUpdate, active: newStatus };

    await updateUser(userId, updatedUser);
    
    


    // Optimistically update UI
    onUserStatusChange(userId, newStatus);
    newStatus == true ? toastSuccess(`L'utilisateur ${updatedUser.username} est maintenant Activé`) : toastSuccess(`L'utilisateur ${updatedUser.username} est maintenant Désactivé`);
  } catch (error) {
    console.error("Failed to update user status", error);
  }
};


 
  return (
    <div className="overflow-x-auto max-w-[100vw] rounded-xl shadow border border-gray-200 bg-white">
      <table className="w-full text-sm">
        <thead className="bg-gray-100 text-gray-600 uppercase text-xs">
          <tr>
            {userTableHeads.map(({ key, label }) => (
              <th
                key={key}
                onClick={() => handleSort(key)}
                className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider cursor-pointer group"
              >
                <div className="flex items-center w-fit">
                  {label}
                  <span className={`ml-2 transition-colors duration-200 text-base ${sortBy === key ? "text-blue-600" : "text-gray-400 group-hover:text-gray-600"
                    }`}>
                    {renderSortIcon(key) || <MdArrowDropDown />} {/* Show faint icon for visual consistency */}
                  </span>
                </div>
              </th>
            ))}
            <th className="px-4 py-3 text-left font-semibold text-gray-600">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr
              key={user.userId}
              className="border-t border-gray-200 hover:bg-gray-50 transition"
            >
              <td className="px-4 py-3 font-medium whitespace-nowrap text-slate-800">
                {user.userId}
              </td>
              <td className="px-4 py-3 whitespace-nowrap">
                <div className="flex items-center">
                  <div>
                    <div className="text-sm font-medium text-gray-900">
                      {user.firstName} {user.lastName}
                    </div>
                    <div className="text-sm text-gray-500">{user.email}</div>
                  </div>
                </div>
              </td>
              <td className="px-4 py-3 font-medium whitespace-nowrap text-slate-800">
                {user.username}
              </td>
              <td className="px-4 py-3 font-medium whitespace-nowrap text-slate-800">
                {user.roleName}
              </td>
              <td className="px-4 py-3 whitespace-nowrap text-slate-800">
                {formatTimestamp(user.createdAt)}
              </td>
              <td className="px-4 py-3 whitespace-nowrap text-slate-800">
                {user.createdBy}
              </td>
              <td className="px-4 py-3 whitespace-nowrap text-slate-800">
                {formatTimestamp(user.updatedAt)}
              </td>
              <td className="px-4 py-3 whitespace-nowrap text-slate-800">
                {user.updatedBy}
              </td>
              <td className="px-4 py-3 whitespace-nowrap text-slate-800">
                <ToggleSwitch checked={user.active} onToggle={() => handleToggleStatus(user.userId, !user.active)}/>
              </td>
              <td className="px-4 py-3 font-medium text-blue-600">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => navigate(`update/${user.userId}`, { replace: true })}
                    className="flex items-center gap-1 text-blue-600 hover:underline cursor-pointer"
                  >
                    <MdEdit />
                    Éditer
                  </button>

                  {/* <span className="text-slate-300">|</span>

                  <button
                    onClick={() => navigate(`/admin/users/delete/${user.userId}, { replace: true }`)}
                    className="flex items-center gap-1 text-red-600 hover:underline cursor-pointer"
                  >
                    <MdDelete />
                    Supprimer
                  </button> */}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination + Rows per page */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mt-4 p-4 border-t border-gray-200 gap-4">
        {/* Rows per page selector */}
        <div className="flex items-center gap-2">
          <p className="text-sm font-semibold text-gray-700">Lignes par page :</p>
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
            <HiChevronDown className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          </div>
        </div>

        {/* Pagination controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={handlePrevious}
            disabled={currentPage === 1}
            className={`flex size-8 items-center justify-center rounded-md border border-slate-300 transition-colors ${currentPage === 1
                ? "opacity-50 cursor-not-allowed"
                : "cursor-pointer hover:bg-slate-100"
              }`}
          >
            <MdKeyboardArrowLeft />
          </button>
          {getPageNumbers().map((page) => (
            <button
              key={page}
              onClick={() => handlePageChange(page)}
              className={`text-sm font-medium flex size-8 items-center justify-center rounded-md transition-colors ${page === currentPage
                  ? "text-white bg-blue-600"
                  : "cursor-pointer text-slate-600 hover:bg-slate-100"
                }`}
            >
              {page}
            </button>
          ))}
          <button
            onClick={handleNext}
            disabled={currentPage === totalPages}
            className={`flex size-8 items-center justify-center rounded-md border border-slate-300 transition-colors ${currentPage === totalPages
                ? "opacity-50 cursor-not-allowed"
                : "cursor-pointer hover:bg-slate-100"
              }`}
          >
            <MdKeyboardArrowRight />
          </button>
        </div>

        {/* Displayed range */}
        <p className="text-sm font-semibold text-slate-500">
          Affichage de {toRecord} sur {totalCount}{" "}
          utilsateurs
        </p>
      </div>

    </div>
  );
};

export default UsersTable;
