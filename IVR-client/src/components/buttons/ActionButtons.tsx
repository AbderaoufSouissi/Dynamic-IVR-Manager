import { FaBan } from "react-icons/fa";
import { FiCheckCircle } from "react-icons/fi";
import { HiOutlineRefresh } from "react-icons/hi";
import { TfiSearch } from "react-icons/tfi";


interface ActionButtonsProps {
  isLoading: boolean;
  onVerify: () => void;
  onBlacklist: () => void;
  onWhitelist: () => void;
  onReset: () => void;
}

const ActionButtons = ({
  isLoading,
  onVerify,
  onBlacklist,
  onWhitelist,
  onReset,
}: ActionButtonsProps) => (
  <div className="space-y-3 pt-2 flex flex-col">

    <button
            className="
      text-center
      cursor-pointer
       bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 disabled:from-gray-400 disabled:to-gray-500 text-white font-semibold py-3.5 px-4 rounded-xl transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-blue-500/20 transform hover:scale-[1.02] active:scale-[0.98] disabled:transform-none disabled:cursor-not-allowed hover:scale-105
        flex w-full items-center justify-center
        h-12  
        text-sm tracking-wide
        disabled:opacity-70 disabled:scale-100
         shadow-lg hover:shadow-xl min-h-[50px]
      "
      disabled={isLoading}
      onClick={onVerify}
        >
            <TfiSearch className="mr-1"/>
            {isLoading ? "Vérification en cours..." : "Vérifier"}
            
    </button>

    {/* Danger Action (Blacklist) */}
    <button
      className="
    cursor-pointer bg-gray-200 py-3 px-6 rounded-xl text-blue-600 font-semibold hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] disabled:transform-none disabled:cursor-not-allowed shadow-lg hover:shadow-xl
    text-center
  
    disabled:from-gray-400 disabled:to-gray-500 hover:scale-105
    flex w-full items-center justify-center
    h-12  
    text-sm tracking-wide
    disabled:opacity-70 disabled:scale-100
    min-h-[50px]
  "
      onClick={onBlacklist}
    >
      <FaBan className="mr-1 text-red-800" />
      Blacklister
    </button>

    {/* Success Action (Whitelist) */}
    <button
      className="
  cursor-pointer bg-gray-200 py-3 px-6 rounded-xl text-blue-600 font-semibold hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] disabled:transform-none disabled:cursor-not-allowed shadow-lg hover:shadow-xl
    text-center
  
    disabled:from-gray-400 disabled:to-gray-500 hover:scale-105
    flex w-full items-center justify-center
    h-12  
    text-sm tracking-wide
    disabled:opacity-70 disabled:scale-100
    min-h-[50px]
  "
  onClick={onWhitelist}
>
  <FiCheckCircle className="mr-1 text-green-700" />
  Whitelister
</button>

    {/* Secondary Action (Reset) */}
    <button
      className="
      text-center
    cursor-pointer
    bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 disabled:from-gray-400 disabled:to-gray-500 text-white font-semibold py-3.5 px-4 rounded-xl transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-gray-500/20 transform hover:scale-[1.02] active:scale-[0.98] disabled:transform-none disabled:cursor-not-allowed hover:scale-105
    flex w-full items-center justify-center
    h-12  
    text-sm tracking-wide
    disabled:opacity-70 disabled:scale-100
    shadow-lg hover:shadow-xl min-h-[50px]
      "
      onClick={onReset}
    > <HiOutlineRefresh className="mr-1"/>
      Réinitialiser le nombre d'appels
    </button>
  </div>
);

export default ActionButtons;
