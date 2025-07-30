import { useCallback, useEffect, useState } from "react";
import AuditTable from "../components/tables/AuditsTable";

import { getAudits } from "../service/AuditService";
import AuditFilter from "../components/filters/AuditFilter";
import type { Audit } from "../types/types";
import { HiX } from "react-icons/hi";
import { HiDocumentText } from "react-icons/hi2";

const AuditsPage = () => {
  const [filters, setFilters] = useState({
    id: "",
    userId: "",
    action: "",
    entity: "",
    entityId: "",
    msisdn: "",
    date: "",
  });

  const [audits, setAudits] = useState<Audit[]>([]);
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const triggerRefresh = () => setRefreshTrigger((prev) => prev + 1);

  const isNumeric = (value: string) => /^[0-9]+$/.test(value);

  const isValidDate = (value: string) => {
    return /^\d{4}-\d{2}-\d{2}$/.test(value); // Only accept full YYYY-MM-DD
  };


 const validateFilters = useCallback((filters: Record<string, string>): Record<string, string> | null => {
  const validated: Record<string, string> = {};

  for (const [key, value] of Object.entries(filters)) {
    const trimmed = value.trim();
    if (!trimmed) continue;

    // Only validate numeric fields for numbers
    if (["id", "userId", "entityId", "msisdn"].includes(key)) {
      if (!isNumeric(trimmed)) return null;
    }

    // Date validation remains
    if (key === "date" && !isValidDate(trimmed)) return null;

    validated[key] = trimmed;
  }

  return validated;
}, []);

  const fetchAudits = async () => {
    const validatedFilters = validateFilters(filters);
    if (validatedFilters === null) {
      return;
    }
    try {
      const data = await getAudits(validatedFilters);
      console.log(data);
      setAudits(data.content);
    } catch (err) {
      console.error("Erreur lors de la récupération des utilisateurs", err);
    }
  };

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      fetchAudits();
    }, 500);

    return () => clearTimeout(delayDebounce);
  }, [filters, refreshTrigger]);

  const handleFilterChange = (name: string, value: string) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  const resetFilters = () => {
    setFilters({
      id: "",
      userId: "",
      action: "",
      entity: "",
      entityId: "",
      msisdn: "",
      date: "",
    });
  };

  return (
    <>
      <div className="mb-6 flex items-center justify-between">
        <p className="text-3xl font-bold text-slate-900">Logs d’audit ici.</p>
      </div>

      <AuditFilter
        filters={filters}
        onFilterChange={handleFilterChange}
        onResetFilters={resetFilters}
      />
      {audits.length != 0 ? (
        <AuditTable audits={audits} triggerRefresh={triggerRefresh} />
      ) : (
        <div className="p-10 flex flex-col items-center text-gray-500">
          <div className="relative w-12 h-12 mb-4">
            <HiDocumentText className="w-12 h-12 text-gray-300" />
            <HiX className="absolute top-0 right-0 w-5 h-5 text-red-500 bg-white rounded-full" />
          </div>
          <p className="text-lg font-medium">Aucun journal d’audit trouvé</p>
        </div>
      )}
    </>
  );
};

export default AuditsPage;
