import type { IconType } from 'react-icons';


interface AddButtonProps {
  onClick: () => void;
  icon: IconType;
  label: string;
}

const AddButton = ({ onClick, icon: Icon, label }: AddButtonProps) => {
  return (
    <button
      onClick={onClick}
        className="cursor-pointer px-2 py-1 text-sm font-semibold rounded-lg transition-all duration-200 flex items-center justify-center shadow-md hover:shadow-lg text-white bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 hover:scale-[1.01] active:scale-[0.98] focus:outline-none focus:ring-4 focus:ring-blue-500/20 transform  "
    >
      <Icon size={16} className="mr-1.5" />
      {label}
    </button>
  );
};

export default AddButton;