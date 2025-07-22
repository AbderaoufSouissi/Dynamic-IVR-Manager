import { FaBan } from "react-icons/fa";
import { FiCheckCircle } from "react-icons/fi";
import { HiOutlineRefresh } from "react-icons/hi";
import { TfiSearch } from "react-icons/tfi";


interface ActionButtonsProps {
  isLoading: boolean;
  onCheck: () => void;
  onBlacklist: () => void;
  onWhitelist: () => void;
  onReset: () => void;
}

const ActionButtons = ({
  isLoading,
  onCheck,
  onBlacklist,
  onWhitelist,
  onReset,
}: ActionButtonsProps) => (
  <div className="space-y-3 pt-2 flex flex-col">

    <button
            className="
      text-center
      cursor-pointer
        bg-blue-600 text-white
        hover:bg-blue-700 hover:scale-105
        flex w-full items-center justify-center
        rounded-md h-12 px-4
        text-sm font-semibold tracking-wide
        transition-all duration-200
        disabled:opacity-70 disabled:cursor-not-allowed disabled:scale-100
      "
      disabled={isLoading}
      onClick={onCheck}
        >
            <TfiSearch className="mr-1"/>
            {isLoading ? "Vérification en cours..." : "Vérifier"}
            
    </button>

    {/* Danger Action (Blacklist) */}
    <button
      className="
        bg-gray-200
        cursor-pointer
        text-gray-900
        hover:bg-gray-300 hover:scale-105
        flex w-full items-center justify-center
        rounded-md h-12 px-4
        text-sm font-semibold tracking-wide
        transition-all duration-200
      "
      onClick={onBlacklist}
    >
      <FaBan className="mr-1 text-red-800" />
      Blacklister
    </button>

    {/* Success Action (Whitelist) */}
    <button
      className="bg-gray-200
            cursor-pointer
      text-gray-900
        hover:bg-gray-300 hover:scale-105
        flex w-full items-center justify-center
        rounded-md h-12 px-4
        text-sm font-semibold tracking-wide
        transition-all duration-200
      "
      onClick={onWhitelist}
    >
      <FiCheckCircle className="mr-1 text-green-800" />
      Whitelister
    </button>

    {/* Secondary Action (Reset) */}
    <button
      className="
      cursor-pointer
        bg-gray-600 text-white
        hover:bg-gray-700 hover:scale-105
        flex w-full items-center justify-center
        rounded-md h-12 px-4
        text-sm font-semibold tracking-wide
        transition-all duration-200
      "
      onClick={onReset}
    > <HiOutlineRefresh className="mr-1"/>
      Réinitialiser le nombre d'appels
    </button>
  </div>
);

export default ActionButtons;
