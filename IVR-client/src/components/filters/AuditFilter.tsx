
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
  onResetFilters: () => void
  onApplyFilters: () => void
}

 const labelClass = "block text-xs font-semibold text-gray-700";
const inputClass = "w-full block rounded-md bg-white px-2 py-1 text-xs text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600";

const AuditFilter = ({ filters, onFilterChange, onResetFilters, onApplyFilters }: AuditFilterProps) => {


  return (
<div className="mb-2 p-2 bg-white rounded-xl shadow border border-gray-200">
      {/* Changed to 12 columns for more control over width */}
      <div className="grid grid-cols-1 md:grid-cols-6 gap-1">
        {/* Each input now spans 2 columns (2/12 = ~16.6% width) */}
        <div className="md:col-span-1">
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

        <div className="md:col-span-1">
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

        <div className="md:col-span-1">
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

        <div className="md:col-span-1">
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

        <div className="md:col-span-1">
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

        <div className="md:col-span-1">
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

        {/* Second row */}
        <div className="md:col-span-1">
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

    

        
        {/* Buttons - span 3 columns each to make them more prominent */}
        <div className="md:col-span-1 flex flex-col justify-end ">
          <button
            onClick={onResetFilters}
className={`${inputClass} cursor-pointer bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 disabled:from-gray-400 disabled:to-gray-500 text-white font-medium px-2 py-1 rounded-lg transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-blue-500/20 transform hover:scale-[1.01] active:scale-[0.98] disabled:transform-none disabled:cursor-not-allowed shadow-md hover:shadow-lg flex items-center justify-center text-sm` }          >
            Réinitialiser
          </button>
        </div>

        <div className="md:col-span-1  flex flex-col justify-end">
          <button
            onClick={onApplyFilters}
className={`${inputClass} cursor-pointer bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 disabled:from-gray-400 disabled:to-gray-500 text-white font-medium px-2 py-1 rounded-lg transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-blue-500/20 transform hover:scale-[1.01] active:scale-[0.98] disabled:transform-none disabled:cursor-not-allowed shadow-md hover:shadow-lg flex items-center justify-center text-sm` }          >
            Appliquer
          </button>
        </div>
      </div>
    </div>
  );

};

export default AuditFilter;
