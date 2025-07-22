import { FaFilter } from "react-icons/fa";

const FilterButton = () => {
  return (
    <div>
      <button
        type="button"
        className="text-sm mt-6 inline-flex items-center justify-center w-1/2 rounded-md bg-gray-200 py-2 text-gray-900 font-semibold cursor-pointer hover:scale-105 transition-all duration-200 gap-2"
      >
        <FaFilter />
        Filtrer
      </button>
    </div>
  );
};

export default FilterButton;
