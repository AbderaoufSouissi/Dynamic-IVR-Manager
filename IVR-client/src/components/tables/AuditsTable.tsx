import { useState } from "react";
import type { Audit } from "../../types/types";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import { formatTimestamp } from "../../api/Api";
import { HiChevronDown } from "react-icons/hi";

interface AuditsTableProps {
  itemsPerPage?: number;
  audits: Audit[];
  triggerRefresh: () => void;
}

const AuditsTable = ({ itemsPerPage = 5, audits, triggerRefresh }: AuditsTableProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(itemsPerPage);

  const totalPages = Math.ceil(audits.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const currentAudits = audits.slice(startIndex, endIndex);

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

  return (
    <div className="overflow-x-auto max-w-[100vw] rounded-xl shadow border border-gray-200 bg-white">
      <table className="w-full text-sm">
        <thead className="bg-gray-100 text-gray-600 uppercase text-xs">
  <tr>
    <th className="text-center px-2 py-2 font-semibold whitespace-nowrap">ID</th>
    <th className="text-center px-2 py-2 font-semibold whitespace-nowrap">Type d'action</th>
    <th className="text-center px-2 py-2 font-semibold whitespace-nowrap">Réalisé par</th>
    <th className="text-center px-2 py-2 font-semibold whitespace-nowrap">MSISDN</th>
    <th className="text-center px-2 py-2 font-semibold whitespace-nowrap">Date Action</th>
    <th className="text-center px-2 py-2 font-semibold whitespace-nowrap">Entité affecté</th>
  </tr>
</thead>
<tbody>
  {currentAudits.map((audit: Audit) => (
    <tr key={audit.auditId} className="border-t border-gray-200 hover:bg-gray-50 transition">
      <td className="text-center px-2 py-2 font-medium text-slate-800">{audit.auditId}</td>
      <td className={`text-center px-2 py-2 font-medium ${audit.actionType == null ? "text-black" : "text-slate-800"}`}>
        {audit.actionType ?? "—"}
      </td>
      <td className={`text-center px-2 py-2 ${audit.userId == null ? "text-black" : "text-slate-800"}`}>
        {audit.userId ?? "—"}
      </td>
      <td className={`text-center px-2 py-2 ${audit.msisdn == null ? "text-black" : "text-slate-800"}`}>
        {audit.msisdn ?? "—"}
      </td>
      <td className={`text-center px-2 py-2 ${audit.actionTimestamp == null ? "text-black" : "text-slate-800"}`}>
        {audit.actionTimestamp ? formatTimestamp(audit.actionTimestamp) : "—"}
      </td>
      <td className={`text-center px-2 py-2 ${audit.entityId == null ? "text-black" : "text-slate-800"}`}>
        {audit.entityId ?? "—"}
      </td>
    </tr>
  ))}
</tbody>


      </table>

      {/* Pagination + Rows per page */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mt-4 p-4 border-t border-gray-200 gap-4">
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
             <HiChevronDown className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handlePrevious}
            disabled={currentPage === 1}
            className={` flex size-8 items-center justify-center rounded-md border border-slate-300 transition-colors ${
              currentPage === 1
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
              className={` text-sm font-medium flex size-8 items-center justify-center rounded-md transition-colors ${
                page === currentPage
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
            className={`flex size-8 items-center justify-center rounded-md border border-slate-300 transition-colors ${
              currentPage === totalPages
                ? "opacity-50 cursor-not-allowed"
                : "cursor-pointer hover:bg-slate-100"
            }`}
          >
            <MdKeyboardArrowRight />
          </button>
        </div>

        <p className="text-sm text-slate-500">
          Affichage de {Math.min(endIndex, audits.length)} sur {audits.length} audits
        </p>
      </div>
    </div>
  );
};

export default AuditsTable;
