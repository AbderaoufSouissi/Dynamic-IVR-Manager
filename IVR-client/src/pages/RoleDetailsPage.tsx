import React, { useState } from 'react';
import { FaLock } from "react-icons/fa6";

const RoleDetailsPage = () => {
  const [roleId] = useState('admin-001'); // Read-only
  const [roleName, setRoleName] = useState('Administrator');

  const [permissions, setPermissions] = useState({
    createContent: true,
    editContent: true,
    deleteContent: true,
    publishContent: false,
    manageUsers: false,
    accessSettings: false
  });

  const permissionsList = [
    { key: 'createContent', title: 'Create Content', description: 'Allows users to create new content.' },
    { key: 'editContent', title: 'Edit Content', description: 'Allows users to edit existing content.' },
    { key: 'deleteContent', title: 'Delete Content', description: 'Allows users to delete content.' },
    { key: 'publishContent', title: 'Publish Content', description: 'Allows users to make content live.' },
    { key: 'manageUsers', title: 'Manage Users', description: 'Allows role to add, edit, and remove users.' },
    { key: 'accessSettings', title: 'Access Settings', description: 'Allows role to view and edit site settings.' }
  ];

  // ✅ This was missing
  const handlePermissionChange = (key: string) => {
    setPermissions((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const handleSaveChanges = () => {
    console.log('Saving changes:', { roleId, roleName, permissions });
    // TODO: Replace with API call
  };

  const handleCancel = () => {
    console.log('Canceling changes');
    // TODO: Reset form or navigate back
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <main className="flex-grow">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Edit Role</h1>
            <p className="mt-1 text-sm text-gray-600">
              Manage the details and permissions for this role.
            </p>
          </div>

          <div className="bg-white shadow-sm rounded-lg">
            <div className="p-6 space-y-8">
              {/* Role Details */}
              <div>
                <h2 className="text-lg font-semibold text-gray-900">Role Details</h2>
                <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Role ID */}
                  <div>
                    <label className="block text-sm font-medium text-gray-900" htmlFor="role-id">
                      Role ID
                    </label>
                    <div className="mt-1 relative rounded-md shadow-sm">
                      <input
                        className="block w-full pr-10 rounded-md border-gray-300 bg-gray-50 text-gray-500"
                        id="role-id"
                        name="role-id"
                        readOnly
                        type="text"
                        value={roleId}
                      />
                      <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                        <FaLock className="h-5 w-5 text-gray-400" />
                      </div>
                    </div>
                  </div>

                  {/* Role Name */}
                  <div>
                    <label className="block text-sm font-medium text-gray-900" htmlFor="role-name">
                      Role Name
                    </label>
                    <input
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                      id="role-name"
                      name="role-name"
                      placeholder="e.g. Content Editor"
                      type="text"
                      value={roleName}
                      onChange={(e) => setRoleName(e.target.value)}
                    />
                  </div>
                </div>
              </div>

              {/* Permissions */}
              <div>
                <h2 className="text-lg font-semibold text-gray-900">Permissions</h2>
                <p className="mt-1 text-sm text-gray-600">
                  Select the permissions this role should have.
                </p>
                <div className="mt-6 border border-gray-300 rounded-lg">
                  <ul className="divide-y divide-gray-300">
                    {permissionsList.map((permission) => (
                      <li key={permission.key} className="p-4 flex justify-between items-center">
                        <div>
                          <h3 className="font-medium text-gray-900">{permission.title}</h3>
                          <p className="text-sm text-gray-600">{permission.description}</p>
                        </div>
                        {/* Toggle */}
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            className="sr-only peer"
                            checked={permissions[permission.key]}
                            onChange={() => handlePermissionChange(permission.key)}
                          />
                          <div className={`w-11 h-6 rounded-full transition-colors duration-200 ease-in-out
                            ${permissions[permission.key] ? 'bg-blue-600' : 'bg-gray-200'}`}>
                            <div className={`absolute top-[2px] left-[2px] h-5 w-5 bg-white border rounded-full transition-transform duration-200 ease-in-out
                              ${permissions[permission.key] ? 'translate-x-5 border-blue-600' : 'translate-x-0 border-gray-300'}`}></div>
                          </div>
                        </label>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Sticky Footer */}
      <footer className="sticky bottom-0 bg-white border-t border-gray-300 shadow-inner">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-end items-center py-4 space-x-3">
            <button
              className="px-4 py-2 text-sm font-medium rounded-md shadow-sm text-gray-900 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400 border border-gray-300 transition"
              type="button"
              onClick={handleCancel}
            >
              Cancel
            </button>
            <button
              className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition"
              type="button"
              onClick={handleSaveChanges}
            >
              Save Changes
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default RoleDetailsPage;
