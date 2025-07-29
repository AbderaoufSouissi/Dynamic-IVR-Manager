import { useEffect, useState } from "react";
import AuditTable from "../components/tables/AuditsTable";

import { getAudits } from "../service/AuditService";
import AuditFilter from "../components/filters/AuditFilter";
import type { Audit } from "../types/types";

const AuditsPage = () => {
  const [filters, setFilters] = useState({
    auditId: "",
    userId: "",
    actionType: "",
    entityType: "",
    entityId: "",
    
    msisdn: "",
    date: "",
  });

  const [audits, setAudits] = useState<Audit[]>([]);
  const [refreshTrigger, setRefreshTrigger] = useState(0);
const triggerRefresh = () => setRefreshTrigger((prev) => prev + 1);

  const fetchAudits = async () => {
    try {
      const data = await getAudits();
      console.log(data);
      setAudits(data.content);
    } catch (err) {
      console.error("Erreur lors de la récupération des utilisateurs", err);
    }
  };

  useEffect(() => {
    fetchAudits();
  }, []);

  const handleFilterChange = (name: string, value: string) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  const filteredAudits = () => {
    return audits.filter((audit) => {
      return (
        (filters.auditId === "" ||
          audit.auditId.toString().includes(filters.auditId)) &&
        (filters.actionType === "" ||
          audit.actionType
            ?.includes(filters.actionType.toLowerCase())) &&
        (filters.entityId === "" ||
          audit.entityId
            ?.toString()
            .includes(filters.entityId.toLowerCase())) &&
        (filters.entityType === "" ||
          audit.entityType
            ?.toLowerCase()
            .includes(filters.entityType.toLowerCase())) &&
        (filters.actionType === "" ||
          audit.actionType?.startsWith(filters.actionType)) &&
        (filters.date === "" ||
          audit.actionTimestamp?.includes(filters.date.toLowerCase())) &&
        (filters.msisdn === "" ||
          audit.msisdn?.toString().includes(filters.msisdn.toLowerCase()))
      );
    });
  };
  const resetFilters = () => {
    setFilters({
      auditId: "",
      userId: "",
      actionType: "",
      entityType: "",
      entityId: "",
      msisdn: "",
      date: "",
    });
  };

  return (
    <>
      <div>
        {audits.length === 0 ? (
          <div className="text-center mt-10 text-gray-500">
            <div className="mb-6 flex flex-col items-center justify-center gap-4">
              <p className="text-3xl font-bold text-slate-900">
                Aucun log d’audit trouvé
              </p>
            </div>
          </div>
        ) : (
          <>
            <div className="mb-6 flex items-center justify-between">
              <p className="text-3xl font-bold text-slate-900">
                Logs d’audit ici.
              </p>
            </div>

            <AuditFilter
              filters={filters}
              onFilterChange={handleFilterChange}
              onResetFilters={resetFilters}
            />
            <AuditTable audits={filteredAudits()} triggerRefresh={triggerRefresh} />
          </>
        )}
      </div>
    </>
  );
};

export default AuditsPage;
