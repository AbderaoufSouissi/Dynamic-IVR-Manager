const FilterButtons = () => {
  return (
    <div className="md:col-span-3 flex gap-4 mt-4">
          <button
            className="cursor-pointer py-3 px-6 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 disabled:from-gray-400 disabled:to-gray-500 text-white font-semibold rounded-xl transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] disabled:transform-none disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
            type="submit"
          >
            Appliquer les filtres
          </button>
          <button
            className="cursor-pointer bg-gray-200 py-3 px-6 rounded-xl text-blue-600 font-semibold hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] disabled:transform-none disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
            type="button"
          >
            Réinitialiser les filtres
          </button>
        </div>
  );
};

export default FilterButtons;
