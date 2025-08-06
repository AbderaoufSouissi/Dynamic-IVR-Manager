interface ToggleSwitchProps {
  checked: boolean;
  onToggle: () => void;
}

const ToggleSwitch = ({ checked, onToggle }: ToggleSwitchProps) => {
  return (
    <div className="flex items-center space-x-2">
      {/* Status Label */}
      

     
      <button
        onClick={onToggle}
        className={`cursor-pointer relative inline-flex h-5 w-10 items-center rounded-full transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 ${
          checked
            ? 'bg-blue-600 focus:ring-blue-500'
            : 'bg-gray-200 focus:ring-gray-500'
        }`}
        role="switch"
        aria-checked={checked}
      >
        <span
          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 ease-in-out ${
            checked ? 'translate-x-6' : 'translate-x-1'
          }`}
        />
          </button>
          <span
        className={`text-sm font-medium ${
          checked ? 'text-blue-600' : 'text-gray-500'
        }`}
      >
        {checked ? 'Actif' : 'Inactif'}
      </span>
    </div>
  );
};

export default ToggleSwitch;
