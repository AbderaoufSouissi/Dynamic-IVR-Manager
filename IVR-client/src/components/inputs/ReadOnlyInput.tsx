import { FaLock } from "react-icons/fa";

const ReadOnlyInput = ({ label, value, name }: { label: string, value: string | undefined, name: string }) => (
  <div>
    
    <label className="block text-sm font-medium text-gray-900" htmlFor={name}>
      
                    {label}
  
    </label>
    <div className="relative rounded-md shadow-sm">
      <input
        className="block w-full border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm rounded-lg border px-3 py-0.5 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 pr-10"
        id={name}
        name={name}
        type="text"
        value={value || ""}
        readOnly
        disabled
      />
      <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
        <FaLock className="h-5 w-5 text-blue-600" />
      </div>
    </div>
  </div>
);


export default ReadOnlyInput
