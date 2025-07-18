import { useState, useMemo } from "react";
import type { User } from "../types/types";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { MdKeyboardArrowRight } from "react-icons/md";

interface UsersTableProps {
  users: User[];
  itemsPerPage?: number;
}

const UsersTable = ({ users, itemsPerPage = 5 }: UsersTableProps) => {
  const [currentPage, setCurrentPage] = useState(1);

  // Calculate pagination values
  const totalPages = Math.ceil(users.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentUsers = useMemo(() => users.slice(startIndex, endIndex), [users, startIndex, endIndex]);

  // Generate page numbers to display
  const getPageNumbers = () => {
    const pages = [];
    const maxPagesToShow = 5;
    
    if (totalPages <= maxPagesToShow) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 5; i++) {
          pages.push(i);
        }
      } else if (currentPage >= totalPages - 2) {
        for (let i = totalPages - 4; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        for (let i = currentPage - 2; i <= currentPage + 2; i++) {
          pages.push(i);
        }
      }
    }
    
    return pages;
  };

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handlePrevious = () => {
    handlePageChange(currentPage - 1);
  };

  const handleNext = () => {
    handlePageChange(currentPage + 1);
  };

  return (
    <div className="overflow-x-auto rounded-xl shadow border border-gray-200 bg-white">
      <table className="w-full text-sm">
        <thead className="bg-gray-100 text-gray-600 uppercase text-xs">
          <tr>
            <th className="text-left px-4 py-2 font-semibold whitespace-nowrap">ID</th>
            <th className="text-left px-4 py-2 font-semibold whitespace-nowrap">Prénom</th>
            <th className="text-left px-4 py-2 font-semibold whitespace-nowrap">Nom</th>
            <th className="text-left px-4 py-2 font-semibold whitespace-nowrap">Email</th>
            <th className="text-left px-4 py-2 font-semibold whitespace-nowrap">Nom d'utilisateur</th>
            <th className="text-left px-4 py-2 font-semibold whitespace-nowrap">Rôle</th>
            <th className="text-left px-4 py-2 font-semibold whitespace-nowrap">Date de création</th>  
            <th className="text-left px-4 py-2 font-semibold whitespace-nowrap">Créé par</th>         
            <th className="text-left px-4 py-2 font-semibold whitespace-nowrap">Date de modification</th>
            <th className="text-left px-4 py-2 font-semibold whitespace-nowrap">Modifié par</th>    
            <th className="text-left px-4 py-2 font-semibold whitespace-nowrap">Statut</th>
            <th className="p-4 text-left font-semibold text-gray-600">Actions</th>
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
                      ? 'bg-green-100 text-green-700'
                      : 'bg-red-100 text-red-700'
                  }`}
                >
                  {user.active ? 'Actif' : 'Inactif'}
                </span>
              </td>
              <td className="p-4 space-x-2 font-medium text-blue-600">
                <a className="action-link" href="#">Edit</a>
                <span className="text-slate-300">|</span>
                <a className="action-link text-red-500" href="#">Delete</a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      
      {/* Pagination */}
      <div className="flex items-center justify-between mt-4 p-4 border-t border-gray-200">
       <span className="text-sm text-slate-500">
  Affichage de {Math.min(endIndex, users.length)} sur {users.length} résultats
</span>
        <div className="flex items-center gap-2">
          <button
            onClick={handlePrevious}
            disabled={currentPage === 1}
            className={`flex size-8 items-center justify-center rounded-md border border-slate-300 transition-colors ${
              currentPage === 1 
                ? 'opacity-50 cursor-not-allowed' 
                : 'hover:bg-slate-100'
            }`}
          >
            <MdKeyboardArrowLeft />
          </button>
          
          {getPageNumbers().map((page) => (
            <button
              key={page}
              onClick={() => handlePageChange(page)}
              className={`text-sm font-medium flex size-8 items-center justify-center rounded-md transition-colors ${
                page === currentPage
                  ? 'text-white bg-blue-600'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              {page}
            </button>
          ))}
          
          <button
            onClick={handleNext}
            disabled={currentPage === totalPages}
            className={`flex size-8 items-center justify-center rounded-md border border-slate-300 transition-colors ${
              currentPage === totalPages 
                ? 'opacity-50 cursor-not-allowed' 
                : 'hover:bg-slate-100'
            }`}
          >
           <MdKeyboardArrowRight/>
          </button>
        </div>
      </div>
    </div>
  );
};

export default UsersTable;