import React, { useEffect, useState } from "react";
import { FaLock } from "react-icons/fa6";
import { getAllPermissions } from "../service/PermissionService";
import type { Permission, Role, RoleRequest } from "../types/types";
import { useNavigate, useParams } from "react-router-dom";
import { getRoleById, updateRole } from "../service/RoleService";
import { toastSuccess, toastError } from "../service/ToastService";
import { formatTimestamp } from "../api/Api";

const RoleDetailsPage = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const [roleInfo, setRoleInfo] = useState<Role | null>(null);

  const [formData, setFormData] = useState<RoleRequest>({
    name: "",
    permissions: [],
  });

  const [permissions, setPermissions] = useState<Permission[]>([]);
  const [formError, setFormError] = useState<string | null>(null);

  // Load role data
  useEffect(() => {
    if (id) {
      getRoleById(parseInt(id))
        .then((role: Role) => {
          setFormData({
            name: role.name,
            permissions: role.permissions,
          });
          setRoleInfo({
            roleId: role.roleId,
            name: role.name,
            permissions: role.permissions,
            permissionCount: role.permissionCount,
            createdAt: formatTimestamp(role.createdAt),
            createdBy: role.createdBy,
            updatedAt: formatTimestamp(role.updatedAt),
            updatedBy: role.updatedBy,
          });
        })
        .catch((error) => {
          console.error("Erreur lors du chargement du rôle :", error);
        });
    }
  }, [id]);

  // Load all available permissions
  useEffect(() => {
    getAllPermissions()
      .then((res) => {
        setPermissions(res);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Erreur lors du chargement des permissions :", error);
        setLoading(false);
      });
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (id) {
        await updateRole(parseInt(id), formData);
        toastSuccess(`Le Role ${formData.name} a été modifié avec succès`);
      }
    } catch (error: any) {
      const message =
        error?.response?.data?.error ||
        error?.message ||
        "Une erreur est survenue.";

      console.error("Erreur lors de la soumission du formulaire :", error);
      toastError(message);
      setFormError(message);
    }
    navigate("/admin/roles");
  };

  const handleCancel = () => navigate("/admin/roles");

  // Check if a permission is currently assigned to the role
  const isPermissionAssigned = (permissionName: string) => {
    return formData.permissions.includes(permissionName);
  };

  // Handle permission toggle
  const handlePermissionChange = (permission: Permission) => {
    const isCurrentlyAssigned = isPermissionAssigned(permission.name);

    if (isCurrentlyAssigned) {
      // Remove permission from role
      setFormData((prev) => ({
        ...prev,
        permissions: prev.permissions.filter((p) => p !== permission.name),
      }));
    } else {
      // Add permission to role
      setFormData((prev) => ({
        ...prev,
        permissions: [...prev.permissions, permission.name],
      }));
    }
  };

  const handleSaveChanges = () => {
    handleSubmit({ preventDefault: () => {} } as React.FormEvent);
  };

  if (loading) return null;

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <main className="flex-grow">
        <div className=" mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">
              Modifier le rôle
            </h1>
            <p className="mt-1 text-sm text-gray-600">
              Gérer les permissions pour ce rôle.
            </p>
          </div>

          <div className="bg-white shadow-sm rounded-lg">
            <div className="p-6 space-y-2">
              {/* Role Details */}
             <div>
  <h2 className="text-lg font-semibold text-gray-900">
    Détails du rôle
  </h2>
  <div className="mt-1 grid grid-cols-1 md:grid-cols-5 gap-6">
    {/* Role ID */}
    <div>
      <label className="block text-sm font-medium text-gray-900" htmlFor="role-id">
        ID du rôle
      </label>
      <div className="mt-1 relative rounded-md shadow-sm">
        <input
          className="block w-full border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm rounded-lg border px-3 py-1 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 pr-10"
          id="role-id"
          name="role-id"
          type="text"
          value={id}
          readOnly
          disabled
        />
        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
          <FaLock className="h-5 w-5 text-gray-400" />
        </div>
      </div>
    </div>

    {/* Created By */}
    <div>
      <label className="block text-sm font-medium text-gray-900" htmlFor="created-by">
        Créé par
      </label>
      <div className="mt-1 relative rounded-md shadow-sm">
        <input
          className="block w-full border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm rounded-lg border px-3 py-1 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 pr-10"
          id="created-by"
          name="createdBy"
          type="text"
          value={roleInfo?.createdBy || ""}
          readOnly
          disabled
        />
        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
          <FaLock className="h-5 w-5 text-gray-400" />
        </div>
      </div>
    </div>

    {/* Created At */}
    <div>
      <label className="block text-sm font-medium text-gray-900" htmlFor="created-at">
        Date de création
      </label>
      <div className="mt-1 relative rounded-md shadow-sm">
        <input
          className="block w-full border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm rounded-lg border px-3 py-1 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 pr-10"
          id="created-at"
          name="createdAt"
          type="text"
          value={roleInfo?.createdAt || ""}
          readOnly
          disabled
        />
        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
          <FaLock className="h-5 w-5 text-gray-400" />
        </div>
      </div>
    </div>

    {/* Updated By */}
    <div>
      <label className="block text-sm font-medium text-gray-900" htmlFor="updated-by">
        Modifié par
      </label>
      <div className="mt-1 relative rounded-md shadow-sm">
        <input
          className="block w-full border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm rounded-lg border px-3 py-1 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 pr-10"
          id="updated-by"
          name="updatedBy"
          type="text"
          value={roleInfo?.updatedBy || ""}
          readOnly
          disabled
        />
        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
          <FaLock className="h-5 w-5 text-gray-400" />
        </div>
      </div>
    </div>

    {/* Updated At */}
    <div>
      <label className="text-lg block text-sm font-medium text-gray-900" htmlFor="updated-at">
        Date de dernière modification
      </label>
      <div className="mt-1 relative rounded-md shadow-sm">
        <input
          className="block w-full border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm rounded-lg border px-3 py-1 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 pr-10"
          id="updated-at"
          name="updatedAt"
          type="text"
          value={roleInfo?.updatedAt || ""}
          readOnly
          disabled
        />
        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
          <FaLock className="h-5 w-5 text-gray-400" />
        </div>
      </div>
    </div>
  </div>
</div>

              {/* Role Name */}
              <div>
                <label
                  className="mt-2 block text-sm font-medium text-gray-900"
                  htmlFor="role-name"
                >
                  <h2 className="text-lg font-semibold text-gray-900">
                    Nom du rôle
                  </h2>
                </label>
                <input
                  className="mt-1 block border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm  rounded-lg border  px-3 py-1 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2"
                  id="role-name"
                  name="role-name"
                  placeholder="e.g. Content Editor"
                  type="text"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, name: e.target.value }))
                  }
                />
              </div>

              {/* Permissions */}
              <div>
                <h2 className="text-lg font-semibold text-gray-900">
                  Permissions du role
                </h2>
                <p className="mt-1 text-sm text-gray-600">
                  Sélectionnez les permissions que ce rôle doit avoir.
                </p>
                <div className="mt-2 border border-gray-300 rounded-lg">
                  <ul className="divide-y divide-gray-300">
                    {permissions.map((permission) => {
                      const isAssigned = isPermissionAssigned(permission.name);

                      return (
                        <li
                          key={permission.permissionId}
                          className="p-2 flex justify-between items-center"
                        >
                          <div className="flex items-center space-x-2">
                            <h3 className="font-medium text-gray-900 text-x">
                              {permission.name}
                            </h3>
                            <p className="text-sm text-gray-600">
                              {permission.description}
                            </p>
                          </div>

                          {/* Toggle */}
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input
                              type="checkbox"
                              className="sr-only peer"
                              checked={isAssigned}
                              onChange={() =>
                                handlePermissionChange(permission)
                              }
                            />
                            <div
                              className={`w-11 h-6 rounded-full transition-colors duration-200 ease-in-out ${
                                isAssigned ? "bg-blue-600" : "bg-gray-200"
                              }`}
                            >
                              <div
                                className={`absolute top-[2px] left-[2px] h-5 w-5 bg-white border rounded-full transition-transform duration-200 ease-in-out ${
                                  isAssigned
                                    ? "translate-x-5 border-blue-600"
                                    : "translate-x-0 border-gray-300"
                                }`}
                              ></div>
                            </div>
                          </label>
                        </li>
                      );
                    })}
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
              className="cursor-pointer px-4 py-2 text-sm font-medium rounded-md shadow-sm text-gray-900 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400 border border-gray-300 transition"
              type="button"
              onClick={handleCancel}
            >
              Annuler
            </button>
            <button
              className="cursor-pointer px-4 py-2 inline-flex justify-center  text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition"
              type="button"
              onClick={handleSaveChanges}
            >
              Sauvegarder
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default RoleDetailsPage;
