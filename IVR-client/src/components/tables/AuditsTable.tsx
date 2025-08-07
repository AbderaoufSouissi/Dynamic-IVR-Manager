import type { Audit } from "../../types/types";
import { MdArrowDropDown, MdArrowDropUp, MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import { formatTimestamp } from "../../api/Api";
import { HiChevronDown } from "react-icons/hi";

interface AuditsTableProps {
  itemsPerPage?: number;
  audits: Audit[];
  sortBy: string;
  sortDir: "asc" | "desc";
  onSortChange: (field: string) => void
  currentPage: number;       // 1-based page index for UI
  onPageChange: (page: number) => void;

  totalCount: number;        // totalElements
  onRowsPerPageChange: (size: number) => void;
  rowsPerPage: number;
  totalPages: number
}


const auditTableHeads = [
      { key: "audit_id", label: "ID" },
      { key: "action_type", label: "Type d'action" },
      { key: "user_id", label: "Réalisé par" },
      { key: "msisdn", label: "MSISDN" },
      { key: "action_time_stamp", label: "Date Action" },
      { key: "entity_id", label: "Entité affecté" },
    
    ]

const AuditsTable = ({ audits, sortBy, sortDir, onSortChange, currentPage, onPageChange, totalCount, onRowsPerPageChange, rowsPerPage, totalPages }: AuditsTableProps) => {
  



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


  return (<>
     <p className="text-sm text-left font-semibold text-gray-700">
          Affichage de {toRecord} sur {totalCount}{" "}
          logs
      </p>
    <div className="overflow-x-auto max-w-[100vw] rounded-xl shadow border border-gray-200 bg-white">
     
      <table className="w-full text-sm">
        <thead className="bg-gray-100 text-gray-600 uppercase text-xs">
          <tr>
            {auditTableHeads.map(({ key, label }) => (
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
          </tr>
        </thead>
        <tbody>
          {audits.map((audit) => (
            <tr
              key={audit.auditId}
              className="border-t border-gray-200 hover:bg-gray-50 transition"
            >
              <td className="px-1 py-1 font-medium whitespace-nowrap text-slate-800">
                {audit.auditId}
              </td>
            
              <td className="px-1 py-1 font-medium whitespace-nowrap text-slate-800">
                {audit.actionType}
              </td>
              <td className="px-1 py-1 font-medium whitespace-nowrap text-slate-800">
                {audit.userId}
              </td>
              <td className="px-1 py-1 whitespace-nowrap text-slate-800">
                {audit.msisdn}
              </td>
              <td className="px-1 py-1 whitespace-nowrap text-slate-800">
                {formatTimestamp(audit.actionTimestamp)}
              </td>
             
              <td className="px-1 py-1 whitespace-nowrap text-slate-800">
                {audit.entityId}
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

        {/* Displayed range */}
        
      </div>

      </div>
      </>

  );
}
export default AuditsTable;
