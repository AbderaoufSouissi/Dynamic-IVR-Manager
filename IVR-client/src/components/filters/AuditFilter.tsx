import ResetFiltersButton from "../buttons/ResetFiltersButton";

interface AuditFilterProps {
  filters: {
    id: string;
    userId: string;
    actionType: string;
    entityType: string;
    entityId: string;
    msisdn: string
    date: string;
  };
  onFilterChange: (name: string, value: string) => void;
  onResetFilters: ()=> void
}

const AuditFilter = ({ filters, onFilterChange, onResetFilters }: AuditFilterProps) => {
  const labelClass = "block text-sm font-medium text-gray-700 mb-1";
  const inputClass = "block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 sm:text-sm";

  return (
    <div className="mb-6 p-4 bg-white rounded-xl shadow border border-gray-200">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">

        {/* Audit ID */}
        <div>
          <label htmlFor="id-filter" className={labelClass}>
            ID Audit
          </label>
          <input
            id="id-filter"
            type="text"
            placeholder="Filtrer par ID audit"
            value={filters.id}
            onChange={(e) => onFilterChange("id", e.target.value)}
            className={inputClass}
          />
        </div>

        {/* User ID */}
        <div>
          <label htmlFor="userId-filter" className={labelClass}>
            ID Utilisateur
          </label>
          <input
            id="userId-filter"
            type="text"
            placeholder="Filtrer par ID utilisateur"
            value={filters.userId}
            onChange={(e) => onFilterChange("userId", e.target.value)}
            className={inputClass}
          />
        </div>

        {/* Action Type */}
        <div>
          <label htmlFor="actionType-filter" className={labelClass}>
            Type d'action
          </label>
          <input
            id="actionType-filter"
            type="text"
            placeholder="Filtrer par type d'action"
            value={filters.actionType}
            onChange={(e) => onFilterChange("actionType", e.target.value)}
            className={inputClass}
          />
        </div>
        <div>
          <label htmlFor="msisdn-filter" className={labelClass}>
            MSISDN
          </label>
          <input
            id="msisdn-filter"
            type="text"
            placeholder="Filtrer par MSISDN"
            value={filters.msisdn}
            onChange={(e) => onFilterChange("msisdn", e.target.value)}
            className={inputClass}
          />
        </div>

        {/* Entity Type */}
        <div>
          <label htmlFor="entity-filter" className={labelClass}>
            Type d'entité affectée
          </label>
          <input
            id="entity-filter"
            type="text"
            placeholder="Filtrer par type d'entité"
            value={filters.entityType}
            onChange={(e) => onFilterChange("entityType", e.target.value)}
            className={inputClass}
          />
        </div>

        {/* Entity ID */}
        <div>
          <label htmlFor="entityId-filter" className={labelClass}>
            ID d'entité affectée
          </label>
          <input
            id="entityId-filter"
            type="text"
            placeholder="Filtrer par ID d'entité"
            value={filters.entityId}
            onChange={(e) => onFilterChange("entityId", e.target.value)}
            className={inputClass}
          />
        </div>

        {/* Date */}
        <div>
          <label htmlFor="date-filter" className={labelClass}>
            Date de l'action
          </label>
          <input
            id="date-filter"
            type="text"
            value={filters.date}
            placeholder="ex: 2020-07-28"
            onChange={(e) => onFilterChange("date", e.target.value)}
            className={inputClass}
          />
        </div>
      </div>

      <ResetFiltersButton onClick={onResetFilters} />
    </div>
  );
};

export default AuditFilter;
