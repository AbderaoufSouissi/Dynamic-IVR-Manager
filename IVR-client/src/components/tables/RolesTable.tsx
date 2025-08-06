import type { Role } from "../../types/types";
import { MdArrowDropDown, MdArrowDropUp, MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import { HiChevronDown } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";
import { formatTimestamp } from "../../api/Api";
import { FaPencil } from "react-icons/fa6";
import { BsTrash3 } from "react-icons/bs";
import { FaEye } from "react-icons/fa";

interface RolesTableProps {
  roles: Role[];
  itemsPerPage?: number;
  sortBy: string;
  sortDir: "asc" | "desc";
  onSortChange: (field: string) => void
  currentPage: number;       // 1-based page index for UI
  onPageChange: (page: number) => void;

  totalCount: number;        // totalElements
  onRowsPerPageChange: (size: number) => void;
  rowsPerPage: number;
}

const roleTableHeads = [
      { key: "role_id", label: "ID" },
      { key: "role_name", label: "Nom complet" },
      // { key: "permission_count", label: "permissions" },
      { key: "created_at", label: "Date de création" },
      { key: "created_by_id", label: "Créé par" },
      { key: "updated_at", label: "Date de modification" },
      { key: "updated_by_id", label: "Modifié par" },
      
    ]

const RolesTable = ({ roles, sortBy, sortDir, onSortChange, currentPage, onPageChange, totalCount, onRowsPerPageChange, rowsPerPage }: RolesTableProps) => {
  const totalPages = Math.ceil(totalCount / rowsPerPage);
  const navigate = useNavigate()
 



  

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

  const toRecord = Math.min(currentPage * rowsPerPage, totalCount);

  
  

 

 

  return (
 <>
     <p className="text-sm text-left font-semibold text-gray-700">
          Affichage de {toRecord} sur {totalCount}{" "}
          roles
      </p>
    <div className="overflow-x-auto max-w-[100vw] rounded-xl shadow border border-gray-200 bg-white">
     
      <table className="w-full text-sm">
        <thead className="bg-gray-100 text-gray-600 uppercase text-xs">
          <tr>
            {roleTableHeads.map(({ key, label }) => (
              <th
                key={key}
                onClick={() => handleSort(key)}
                className="px-1 py-1 text-left text-xs font-medium uppercase tracking-wider cursor-pointer group"
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
           <th className="px-4 py-3 text-center font-semibold text-gray-600">
  Actions
</th>
          </tr>
        </thead>
        <tbody>
          {roles.map((role) => (
            <tr
              key={role.roleId}
              className="border-t border-gray-200 hover:bg-gray-50 transition"
            >
              <td className="px-1 py-1 font-medium whitespace-nowrap text-slate-800">
                {role.roleId}
              </td>
              <td className="px-1 py-1 font-medium whitespace-nowrap text-slate-800">
                {role.name}
              </td>

              <td className="px-1 py-1 whitespace-nowrap text-slate-800">
                {formatTimestamp(role.createdAt)}
              </td>
              <td className="px-1 py-1 whitespace-nowrap text-slate-800">
                {role.createdBy}
              </td>
              <td className="px-1 py-1 whitespace-nowrap text-slate-800">
                {formatTimestamp(role.updatedAt)}
              </td>
              <td className="px-1 py-1 whitespace-nowrap text-slate-800">
                {role.updatedBy}
              </td>
              
              <td className="px-4 py-2 text-center">
  <div className="flex items-center justify-center gap-3">
    <button
      onClick={() =>
        navigate({
          pathname: `/admin/roles/edit/${role.roleId}`,
          search: "",
        })
      }
      className="text-slate-700 hover:text-slate-900 transition"
      title="Voir"
    >
      <FaEye size={20} />
    </button>

    <button
      onClick={() =>
        navigate({
          pathname: `/admin/roles/update/${role.roleId}`,
          search: "",
        })
      }
      className="text-blue-600 hover:text-blue-800 transition"
      title="Modifier"
    >
      <FaPencil size={20} />
    </button>

    <button
      onClick={() =>
        navigate({
          pathname: `/admin/roles/delete/${role.roleId}`,
          search: "",
        })
      }
      className="text-red-600 hover:text-red-800 transition"
      title="Supprimer"
    >
      <BsTrash3 size={20} />
    </button>
  </div>
</td>


            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination + Rows per page */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mt-2 p-2 border-t border-gray-200 gap-4">
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

 
        
      </div>

      </div>
    </>
  )

}
export default RolesTable;
