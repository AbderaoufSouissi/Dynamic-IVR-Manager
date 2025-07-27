
const FilterButtons = () => {
  return (
    <div className="flex flex-col space-y-4 !mt-8 sm:flex-row sm:space-y-0 sm:space-x-4">
      <button
        className="flex w-full justify-center rounded-md border border-transparent bg-blue-600 py-3 px-4 text-sm font-semibold text-white shadow-sm hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-[#141414] focus:ring-offset-2"
        type="submit"
      >
        Appliquer les filters
      </button>
      <button
        className="flex w-full justify-center rounded-md border border-transparent bg-gray-100 py-3 px-4 text-sm font-semibold text-blue-600 shadow-sm hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-[#141414] focus:ring-offset-2"
        type="button"
      >
        Réinitialiser les filtres
      </button>
    </div>
  );
};

export default FilterButtons;
