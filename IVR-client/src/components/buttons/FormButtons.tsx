interface FormButtonsProps {
  onCancel: () => void;
}

const FormButtons = ({ onCancel }: FormButtonsProps) => {
  return (
    <footer className="mt-6 flex justify-between">
      <button
        type="button"
        onClick={onCancel}
        className="px-5 py-2 font-semibold hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 text-sm cursor-pointer bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 disabled:from-gray-400 disabled:to-gray-500 text-white rounded-xl transition-all duration-200 focus:ring-red-500/20 transform hover:scale-[1.02] active:scale-[0.98] disabled:transform-none disabled:cursor-not-allowed shadow-lg"
      >
        Annuler
      </button>
      <button
        type="submit"
        className="px-5 py-2 font-semibold hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 text-sm cursor-pointer bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 disabled:from-gray-400 disabled:to-gray-500 text-white rounded-xl transition-all duration-200 focus:ring-blue-500/20 transform hover:scale-[1.02] active:scale-[0.98] disabled:transform-none disabled:cursor-not-allowed shadow-lg"
      >
        Valider
      </button>
    </footer>
  );
};

export default FormButtons;
