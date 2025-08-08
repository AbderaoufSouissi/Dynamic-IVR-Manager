import React, { useEffect, useState } from "react";
import { getAllPermissions } from "../../service/PermissionService";
import type { Permission, Role, RoleRequest } from "../../types/types";
import { useNavigate, useParams } from "react-router-dom";
import { createRole, getRoleById, updateRole } from "../../service/RoleService";
import { toastSuccess } from "../../service/ToastService";
import { formatTimestamp } from "../../api/Api";
import ReadOnlyInput from "../inputs/ReadOnlyInput";

type Title = "Créer un nouveau role" | "Modifier un role";
type Description =
  | "Complétez les informations ci-dessous pour créer un nouveau role."
  | "Modifiez les détails du role ci-dessous.";

const RoleForm = ({
  title,
  description,
}: {
  title: Title;
  description: Description;
}) => {
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

  // Trim and validate roleName
  if (!formData.name || formData.name.trim() === "") {
    setFormError("Le nom du rôle ne peut pas être vide.");
    return;
  }

  try {
    if (id) {
      await updateRole(parseInt(id), formData);
      toastSuccess(`Le rôle ${formData.name} a été modifié avec succès`);
    } else {
      await createRole(formData);
      toastSuccess(`Le rôle ${formData.name} a été créé avec succès`);
    }
    navigate("/admin/roles");
  } catch (error: any) {
    const message =
      error?.response?.data?.error ||
      error?.message ||
      "Une erreur est survenue.";
    setFormError(message);

    console.error("Erreur lors de la soumission du formulaire :", error);
  }
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

  


  

  if (loading) return null;

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex flex-col min-h-screen bg-gray-50">
      <main className="flex-grow">
        <div className=" mx-auto px-4 sm:px-6 lg:px-8 py-2">
          <div className="mb-1">
            <h1 className="text-3xl font-bold text-gray-900">{title}</h1>
            <p className=" text-sm text-gray-600">{description}</p>
          </div>

          <div className="bg-white shadow-sm rounded-lg">
            <div className="p-2 space-y-1">
              {/* Role Details */}
              {id && <div>
                <h2 className="text-lg font-semibold text-gray-900">
                      Infos sur le rôle
                    </h2>
                <div className=" grid grid-cols-1 md:grid-cols-1 gap-6">
                  {/* Role ID */}
                  <div className="mt-1 grid grid-cols-1 md:grid-cols-5 gap-6">
                      <ReadOnlyInput label="ID" value={id} name="role-id" />
                      <ReadOnlyInput
                        label="Créé par"
                        value={roleInfo?.createdBy}
                        name="createdBy"
                      />
                      <ReadOnlyInput
                        label="Date création"
                        value={roleInfo?.createdAt}
                        name="createdAt"
                      />
                      <ReadOnlyInput
                        label="Modifié par"
                        value={roleInfo?.updatedBy}
                        name="updatedBy"
                      />
                      <ReadOnlyInput
                        label="Date dernière modification"
                        value={roleInfo?.updatedAt}
                        name="updatedAt"
                      />
                    </div>
                  </div>
              </div>
}
              {/* Role Name */}
              <div>
                <h2 className="text-xl font-semibold text-gray-900">
                  Détails du rôle                </h2>
                <label
                  className="mt-2 block text-sm font-medium text-gray-900"
                  htmlFor="role-name"
                >
                  <h2 className="text-md font-semibold text-gray-900">
                    Nom du rôle
                  </h2>
                </label>
                <input
                  className=" block border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm  rounded-lg border  px-3 py-0.5 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-1"
                  id="role-name"
                  name="role-name"
                  placeholder="ex: admin"
                  type="text"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, name: e.target.value }))
                  }
                />
              </div>

              {/* Permissions */}
              <div>
                <h2 className="text-md font-semibold text-gray-900">
                  Permissions du role
                </h2>
                <p className=" text-sm text-gray-600">
                  Sélectionnez les permissions que ce rôle doit avoir.
                  </p>
                   {formError && (
  <div className="mb-4 rounded-md bg-red-50 p-3 text-red-700 border border-red-400">
    {formError}
  </div>
)}
                
                {formData.permissions.length > 0 && (
  <p className="font-semibold text-gray-600">
    {formData.permissions.length}{" "}
    {formData.permissions.length === 1 ? "permission sélectionnée" : "permissions sélectionnées"}
  </p>
)}
                
                <div className="mt-2 border border-gray-300 rounded-lg">
                  <ul className="divide-y divide-gray-300">
                    {permissions.map((permission) => {
                      const isAssigned = isPermissionAssigned(permission.name);

                      return (
                        <li
                          key={permission.permissionId}
                          className="p-1.5 flex justify-between items-center"
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
                        <label
  className={`relative inline-flex items-center cursor-pointer rounded-full ring-2 ring-offset-2 transition-all duration-200 ease-in-out ${
    isAssigned ? "ring-blue-500" : "ring-gray-400"
  }`}
>
  <input
    type="checkbox"
    className="sr-only peer"
    checked={isAssigned}
    onChange={() => handlePermissionChange(permission)}
  />
  <div
    className={`w-14 h-6 rounded-full transition-colors duration-200 ease-in-out ${
      isAssigned ? "bg-blue-600" : "bg-gray-200"
    }`}
  >
    <div
      className={`absolute top-[2px] left-[2px] h-5 w-5 bg-white border rounded-full transition-transform duration-200 ease-in-out ${
        isAssigned ? "translate-x-8 border-blue-600" : "translate-x-0 border-gray-300"
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
      <footer className="sticky bottom-0 bg-gray-100 border-t border-gray-300 shadow-inner">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-end items-center py-4 space-x-3">
            <button
              type="button"
              onClick={handleCancel}
              className="cursor-pointer px-4 py-2 text-sm font-medium rounded-md shadow-sm text-gray-900 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400 border border-gray-300 transition"
            >
              Annuler
            </button>
            <button
              type="submit"
              className="cursor-pointer px-4 py-2 inline-flex justify-center text-sm font-medium text-white border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:ring-offset-2 transition bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 hover:scale-[1.01] active:scale-[0.98] focus:outline-none focus:ring-4 focus:ring-blue-500/20 transform "
            >
              Sauvegarder
            </button>
          </div>
        </div>
      </footer>
    </div>
    </form>
    
  );
};

export default RoleForm;
