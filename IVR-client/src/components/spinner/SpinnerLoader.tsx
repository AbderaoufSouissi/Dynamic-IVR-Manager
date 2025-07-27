// components/SpinnerLoader.tsx
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const SpinnerLoader = () => {
  return (
    <div className="flex h-screen w-full items-center justify-center bg-white">
      <div className="flex flex-col items-center gap-4">
        <AiOutlineLoading3Quarters size={50} className="animate-spin text-blue-600" />
        <p className="text-gray-900 text-lg font-semibold">Chargement...</p>
      </div>
    </div>
  );
};

export default SpinnerLoader;
