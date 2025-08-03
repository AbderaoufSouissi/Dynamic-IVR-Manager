import { FiPhone } from "react-icons/fi";

export interface MSISDNInputProps {
  value: string;
  onChange: (value: string) => void;
  error?: string;
}

const MSISDNInput = ({ value, onChange, error }: MSISDNInputProps) => (
  <div>
    <div className="relative">
      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
        <FiPhone/>
      </div>
      <input
        className="block w-full rounded-md bg-white py-2 pl-10 pr-3 text-base text-gray-900 outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:outline-blue-600 sm:text-sm"
        placeholder="Entrer MSISDN"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
    {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
  </div>
);

export default MSISDNInput;
