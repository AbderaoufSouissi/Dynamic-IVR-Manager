const ProfileInput = ({ label, value, id }: { label: string; value?: string; id: string }) => (
  <div>
    <label htmlFor={id} className="block text-sm/6 font-medium text-gray-900">
      {label}
    </label>
    <div className="mt-1">
      <input
        id={id}
        type="text"
        value={value || ""}
        readOnly
        className="block w-full rounded-md bg-white px-3 py-0.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 sm:text-sm/6"
      />
    </div>
  </div>
);
export default ProfileInput