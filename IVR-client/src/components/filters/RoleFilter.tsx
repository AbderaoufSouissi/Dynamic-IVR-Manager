import ResetFiltersButton from "../buttons/ResetFiltersButton";

interface RoleFiltersProps {
  filters: {
    id: string;
    name: string;
    createdAt: string;
    updatedAt: string;
    createdBy: string;
    updatedBy: string;
  };
  onFilterChange: (name: string, value: string) => void;
  onResetFilters:()=>void
}

const labelClass = "block text-sm font-medium text-gray-700 mb-1";
const inputClass = "block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 sm:text-sm/6";

const RoleFilter = ({ filters, onFilterChange, onResetFilters }: RoleFiltersProps) => {
  return (
    <div className="mb-6 p-4 bg-white rounded-xl shadow border border-gray-200">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label htmlFor="id-filter" className={labelClass}>
            ID
          </label>
          <input
            id="id-filter"
            type="text"
            placeholder = "Filtrer par ID"
            value={filters?.id || ''}
            onChange={(e) => onFilterChange("id", e.target.value)}
            className={inputClass}
          />
        </div>
        <div>
          <label htmlFor="name-filter" className={labelClass}>
            Nom
          </label>
          <input
            id="name-filter"
            type="text"
            placeholder = "Filtrer par nom"
            value={filters?.name || ''}
            onChange={(e) => onFilterChange("name", e.target.value)}
            className={inputClass}
          />
        </div>
        <div>
          <label htmlFor="createdAt-filter" className={labelClass}>
            Date de création
          </label>
          <input
            id="createdAt-filter"
            type="text"
            placeholder="ex: 2020-07-28"
            value={filters?.createdAt || ''}
            onChange={(e) => onFilterChange("createdAt", e.target.value)}
            className={inputClass}
          />
        </div>
        <div>
          <label htmlFor="updatedAt-filter" className={labelClass}>
            Date de modification
          </label>
          <input
            id="updatedAt-filter"
            type="text"
            placeholder="ex: 2020-07-28"
            value={filters?.updatedAt || ''}
            onChange={(e) => onFilterChange("updatedAt", e.target.value)}
            className={inputClass}
          />
        </div>
        <div>
          <label htmlFor="createdBy-filter" className={labelClass}>
            Créé par
          </label>
          <input
            id="createdBy-filter"
            type="text"
            placeholder = "Filtrer par créateur"
            value={filters?.createdBy || ''}
            onChange={(e) => onFilterChange("createdBy", e.target.value)}
            className={inputClass}
          />
        </div>
        <div>
          <label htmlFor="updatedBy-filter" className={labelClass}>
            Modifié par
          </label>
          <input
            id="updatedBy-filter"
            type="text"
            placeholder = "Filtrer par modificateur"
            value={filters?.updatedBy || ''}
            onChange={(e) => onFilterChange("updatedBy", e.target.value)}
            className={inputClass}
          />
        </div>
        
      </div>
      
 <ResetFiltersButton onClick={onResetFilters} />

    </div>
  );
};

export default RoleFilter;