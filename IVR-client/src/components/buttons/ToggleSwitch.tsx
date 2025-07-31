interface ToggleSwitchProps {
  checked: boolean;
  onToggle: () => void;
}

const ToggleSwitch = ({ checked, onToggle }: ToggleSwitchProps) => {
  return (
    <div className="flex items-center space-x-2">
      {/* Status Label */}
      

      {/* Toggle Switch */}
      <button
        onClick={onToggle}
        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 ${
          checked
            ? 'bg-green-600 focus:ring-green-500'
            : 'bg-red-600 focus:ring-red-500'
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
          checked ? 'text-green-600' : 'text-red-600'
        }`}
      >
        {checked ? 'Actif' : 'Inactif'}
      </span>
    </div>
  );
};

export default ToggleSwitch;
