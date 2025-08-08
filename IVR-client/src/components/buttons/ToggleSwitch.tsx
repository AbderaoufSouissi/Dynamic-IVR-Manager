interface ToggleSwitchProps {
  checked: boolean;
  onToggle: () => void;
}

const ToggleSwitch = ({ checked, onToggle }: ToggleSwitchProps) => {
  return (
    <div className="flex items-center justify-center">
      <button
        onClick={onToggle}
        className={`cursor-pointer relative inline-flex h-5 w-10 items-center rounded-full transition-all duration-200 ease-in-out ring-2 ring-offset-2 ${
          checked
            ? 'bg-blue-600 ring-blue-500'  // Checked: blue bg + blue ring
            : 'bg-gray-200 ring-gray-400' // Unchecked: gray bg + gray ring
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
    </div>
  );
};

export default ToggleSwitch;