import ResetFiltersButton from "../buttons/ResetFiltersButton";

interface UserFiltersProps {
  filters: {
    id: string,
    username: string,
    email: string,
    firstName: string,
    lastName: string,
    createdBy: string,
    updatedBy: string,
    createdAt: string,
    updatedAt: string,
    role: string,
  };
  onFilterChange: (name: string, value: string) => void;
  onResetFilters:()=>void
}

const labelClass = "block text-sm font-medium text-gray-700 mb-1";
const inputClass = "block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 sm:text-sm";

const UserFilter = ({ filters, onFilterChange, onResetFilters }: UserFiltersProps) => {
  return (
    <div className="mb-6 p-4 bg-white rounded-xl shadow border border-gray-200">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div>
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
        <div>
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
        <div>
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
        <div>
          <label htmlFor="role-filter" className={labelClass}>
            Role
          </label>
          <input
            id="role-filter"
            type="text"
            placeholder="Filtrer par role"
            value={filters.role}
            onChange={(e) => onFilterChange("role", e.target.value)}
            className={inputClass}
          />
        </div>
        
        <div>
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
        <div>
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
        <div>
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
        <div>
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
        <div>
          <label htmlFor="createdAt-filter" className={labelClass}>
            Date de création
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
        <div>
          <label htmlFor="updatedAt-filter" className={labelClass}>
            Date de modification
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
       <ResetFiltersButton onClick={onResetFilters} />
      </div>
    </div>
  );
};

export default UserFilter;