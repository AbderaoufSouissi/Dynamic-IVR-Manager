import { useEffect, useState } from "react";
import AuditTable from "../components/tables/AuditTable";

import { getAudits } from "../service/AuditService";
import AuditFilter from "../components/filters/AuditFilter";

const AuditsPage = () => {
  const [filters, setFilters] = useState({
    auditId: "",
    userId: "",
    actionType: "",
    entityType: "",
    entityId: "",
    date: "",
  });

  const [audits, setAudits] = useState([]);

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

  //   const navigate = useNavigate();

  return (
    <>
      <div>
        <div className="mb-6 flex items-center justify-between">
          <p className="text-3xl font-bold text-slate-900">Logs d’audit ici.</p>
        </div>

        <AuditFilter filters={filters} onFilterChange={handleFilterChange} />

        <AuditTable audits={audits} />
      </div>
    </>
  );
};

export default AuditsPage;
