import FilterButtons from '../buttons/FilterButtons';

interface AuditFilterProps {
  filters: {
    auditId: string;
    userId: string;
    actionType: string;
    entityType: string;
    entityId: string;
    date: string;
  };
  onFilterChange: (name: string, value: string) => void;
}

const AuditFilter = ({ filters, onFilterChange }: AuditFilterProps) => {
  const labelClass =
    "block text-sm font-medium text-gray-700 mb-1";
  const inputClass =
    "block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 sm:text-sm/6";

  return (
    <div className="mb-6 p-4 bg-white rounded-xl shadow border border-gray-200">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

        {/* User ID */}
        <div>
          <label htmlFor="userId-filter" className={labelClass}>
            Utilisateur
          </label>
          <input
            id="userId-filter"
            type="text"
            placeholder="Filtrer par utilisateur"
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

        {/* Entity Type */}
        <div>
          <label htmlFor="entityType-filter" className={labelClass}>
            Type d'entité affectée
          </label>
          <input
            id="entityType-filter"
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
            type="date"
            value={filters.date}
            onChange={(e) => onFilterChange("date", e.target.value)}
            className={inputClass}
          />
        </div>

        {/* Filter Button */}
        <FilterButtons />
      </div>
    </div>
  );
};

export default AuditFilter;
