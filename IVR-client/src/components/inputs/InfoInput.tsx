import { FaLock } from "react-icons/fa";

const InfoInput = ({ label, value }: { label: string; value: string }) => (
  <div>
    <label className="block text-sm font-medium text-gray-900">
      {label}
    </label>
    <div className="relative rounded-md shadow-sm">
      <input
        type="text"
        value={value}
        readOnly
        disabled
        className="block w-full border-gray-300 bg-gray-100 text-gray-900 rounded-sm text-sm px-3 py-1 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      />
      <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
        <FaLock className="h-4 w-4 text-blue-600" />
      </div>
    </div>
  </div>
);


export default InfoInput
