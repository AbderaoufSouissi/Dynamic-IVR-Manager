import { useState, useMemo } from "react";
import type { Permission } from "../../types/types";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";

interface PermissionsTableProps {
  permissions: Permission[];
  itemsPerPage?: number;
}

const PermissionsTable = ({ permissions, itemsPerPage = 5 }: PermissionsTableProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(itemsPerPage ?? 5);

  const totalPages = Math.ceil(permissions.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;

  const currentPermissions = useMemo(
    () => permissions.slice(startIndex, endIndex),
    [permissions, startIndex, endIndex]
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
    setCurrentPage(1);
  };

  return (
    <div className="overflow-x-auto rounded-xl shadow border border-gray-200 bg-white">
      <table className="w-full text-sm">
        <thead className="bg-gray-100 text-gray-600 uppercase text-xs">
          <tr>
            <th className="text-left px-4 py-2 font-semibold whitespace-nowrap">ID</th>
            <th className="text-left px-4 py-2 font-semibold whitespace-nowrap">Nom</th>
            <th className="text-left px-4 py-2 font-semibold whitespace-nowrap">Description</th>
            <th className="text-left px-4 py-2 font-semibold whitespace-nowrap">Date de création</th>
            <th className="text-left px-4 py-2 font-semibold whitespace-nowrap">Créé par</th>
            <th className="text-left px-4 py-2 font-semibold whitespace-nowrap">Date de modification</th>
            <th className="text-left px-4 py-2 font-semibold whitespace-nowrap">Modifié par</th>
          </tr>
        </thead>
        <tbody>
          {currentPermissions.map((permission) => (
            <tr
              key={permission.permissionId}
              className="border-t border-gray-200 hover:bg-gray-50 transition"
            >
              <td className="px-4 py-2 font-medium">{permission.permissionId}</td>
              <td className="px-4 py-2 font-medium">{permission.name}</td>
              <td className="px-4 py-2">{permission.description}</td>
              <td className="px-4 py-2">{permission.createdAt}</td>
              <td className="px-4 py-2">{permission.createdBy}</td>
              <td className="px-4 py-2">{permission.updatedAt}</td>
              <td className="px-4 py-2">{permission.updatedBy}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination controls */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mt-4 p-4 border-t border-gray-200 gap-4">
        {/* Rows per page selector */}
        <div className="flex items-center gap-2">
          <p className="text-sm text-gray-700">Rows per page:</p>
          <div className="relative">
            <select
              value={rowsPerPage}
              onChange={handleRowsPerPageChange}
              className="appearance-none rounded-md border border-gray-300 bg-white py-1.5 pl-3 pr-8 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            >
              {[5, 10, 15, 20].map((size) => (
                <option key={size} value={size}>{size}</option>
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
              <path d="m19.5 8.25-7.5 7.5-7.5-7.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>

        {/* Page number controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={handlePrevious}
            disabled={currentPage === 1}
            className={`flex size-8 items-center justify-center rounded-md border border-slate-300 transition-colors ${
              currentPage === 1 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-slate-100'
            }`}
          >
            <MdKeyboardArrowLeft />
          </button>
          {getPageNumbers().map((page) => (
            <button
              key={page}
              onClick={() => handlePageChange(page)}
              className={`text-sm font-medium flex size-8 items-center justify-center rounded-md transition-colors ${
                page === currentPage ? 'text-white bg-blue-600' : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              {page}
            </button>
          ))}
          <button
            onClick={handleNext}
            disabled={currentPage === totalPages}
            className={`flex size-8 items-center justify-center rounded-md border border-slate-300 transition-colors ${
              currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : 'hover:bg-slate-100'
            }`}
          >
            <MdKeyboardArrowRight />
          </button>
        </div>

        {/* Summary text */}
        <p className="text-sm text-slate-500">
          Affichage de {Math.min(endIndex, permissions.length)} sur {permissions.length} permissions
        </p>
      </div>
    </div>
  );
};

export default PermissionsTable;
