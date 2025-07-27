const FilterButtons = () => {
  return (
    <div className="md:col-span-3 flex gap-4 mt-4">
          <button
            className="rounded-md bg-blue-600 py-3 px-6 text-white font-semibold hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            type="submit"
          >
            Appliquer les filtres
          </button>
          <button
            className="rounded-md bg-gray-100 py-3 px-6 text-blue-600 font-semibold hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            type="button"
          >
            Réinitialiser les filtres
          </button>
        </div>
  );
};

export default FilterButtons;
