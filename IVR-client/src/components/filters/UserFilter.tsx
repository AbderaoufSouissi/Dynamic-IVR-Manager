
interface UserFiltersProps {
  filters: {
    id: string;
    username: string;
    email: string;
    firstName: string;
    lastName: string;
    createdBy: string;
    updatedBy: string;
    createdAt: string;
    updatedAt: string;
    roleName: string;
  };
  onApplyFilters: ()=> void
  onFilterChange: (name: string, value: string) => void;
  onResetFilters: () => void;
}

const labelClass = "block text-xs font-semibold text-gray-700";
const inputClass = "w-full block rounded-md bg-white px-2 py-1 text-xs text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600";

const UserFilter = ({
  filters,
  onFilterChange,
  onResetFilters,
  onApplyFilters
}: UserFiltersProps) => {
  return (
    <div className="mb-2 p-2 bg-white rounded-xl shadow border border-gray-200">
      {/* Changed to 12 columns for more control over width */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-1">
        {/* Each input now spans 2 columns (2/12 = ~16.6% width) */}
        <div className="md:col-span-2">
          <label htmlFor="id-filter" className={labelClass}>
            ID
          </label>
          <input
            id="id-filter"
            type="text"
            placeholder="Filtrer par ID"
            value={filters.id}
            onChange={(e) => onFilterChange("id", e.target.value)}
            className={inputClass}
          />
        </div>

        <div className="md:col-span-2">
          <label htmlFor="username-filter" className={labelClass}>
            Username
          </label>
          <input
            id="username-filter"
            type="text"
            placeholder="Filtrer par username"
            value={filters.username}
            onChange={(e) => onFilterChange("username", e.target.value)}
            className={inputClass}
          />
        </div>

        <div className="md:col-span-2">
          <label htmlFor="email-filter" className={labelClass}>
            Email
          </label>
          <input
            id="email-filter"
            type="email"
            placeholder="Filtrer par email"
            value={filters.email}
            onChange={(e) => onFilterChange("email", e.target.value)}
            className={inputClass}
          />
        </div>

        <div className="md:col-span-2">
          <label htmlFor="role-filter" className={labelClass}>
            Role
          </label>
          <input
            id="role-filter"
            type="text"
            placeholder="Filtrer par role"
            value={filters.roleName}
            onChange={(e) => onFilterChange("roleName", e.target.value)}
            className={inputClass}
          />
        </div>

        <div className="md:col-span-2">
          <label htmlFor="firstname-filter" className={labelClass}>
            Prénom
          </label>
          <input
            id="firstname-filter"
            type="text"
            placeholder="Filtrer par prénom"
            value={filters.firstName}
            onChange={(e) => onFilterChange("firstName", e.target.value)}
            className={inputClass}
          />
        </div>

        <div className="md:col-span-2">
          <label htmlFor="lastname-filter" className={labelClass}>
            Nom
          </label>
          <input
            id="lastname-filter"
            type="text"
            placeholder="Filtrer par nom"
            value={filters.lastName}
            onChange={(e) => onFilterChange("lastName", e.target.value)}
            className={inputClass}
          />
        </div>

        {/* Second row */}
        <div className="md:col-span-2">
          <label htmlFor="createdBy-filter" className={labelClass}>
            Créé par
          </label>
          <input
            id="createdBy-filter"
            type="text"
            placeholder="Filtrer par créateur"
            value={filters.createdBy}
            onChange={(e) => onFilterChange("createdBy", e.target.value)}
            className={inputClass}
          />
        </div>

        <div className="md:col-span-2">
          <label htmlFor="updatedBy-filter" className={labelClass}>
            Modifié par
          </label>
          <input
            id="updatedBy-filter"
            type="text"
            placeholder="Filtrer par modificateur"
            value={filters.updatedBy}
            onChange={(e) => onFilterChange("updatedBy", e.target.value)}
            className={inputClass}
          />
        </div>

        <div className="md:col-span-2">
          <label htmlFor="createdAt-filter" className={labelClass}>
            Date création
          </label>
          <input
            id="createdAt-filter"
            type="text"
            placeholder="ex: 2020-07-28"
            value={filters.createdAt}
            onChange={(e) => onFilterChange("createdAt", e.target.value)}
            className={inputClass}
          />
        </div>

        <div className="md:col-span-2">
          <label htmlFor="updatedAt-filter" className={labelClass}>
            Date modification
          </label>
          <input
            id="updatedAt-filter"
            type="text"
            placeholder="ex: 2020-07-28"
            value={filters.updatedAt}
            onChange={(e) => onFilterChange("updatedAt", e.target.value)}
            className={inputClass}
          />
        </div>

        {/* Buttons - span 3 columns each to make them more prominent */}
        <div className="md:col-span-2 flex flex-col justify-end">
          <button
            onClick={onResetFilters}
className={`${inputClass} cursor-pointer bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 disabled:from-gray-400 disabled:to-gray-500 text-white font-medium px-2 py-1 rounded-lg transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-blue-500/20 transform hover:scale-[1.01] active:scale-[0.98] disabled:transform-none disabled:cursor-not-allowed shadow-md hover:shadow-lg flex items-center justify-center text-sm` }          >
            Réinitialiser
          </button>
        </div>

        <div className="md:col-span-2 flex flex-col justify-end">
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

export default UserFilter;