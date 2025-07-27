import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { createRole, getRoleById, updateRole } from "../../service/RoleService";
import { getPermissions } from "../../service/PermissionService";
import type { RoleRequest, Permission } from "../../types/types";
import { FaRegCheckCircle, FaCheckCircle } from "react-icons/fa";

type Title = "Créer un nouveau role" | "Modifier un role";
type Description =
  | "Complétez les informations ci-dessous pour créer un nouveau role."
  | "Mettez à jour les détails du role ci-dessous.";

interface RoleFormProps {
  title: Title;
  description: Description;
}

const RoleForm = ({ title, description }: RoleFormProps) => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState<RoleRequest>({
    name: "",
    permissions: [],
  });

  const [permissions, setPermissions] = useState<Permission[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch permissions and role if editing
  useEffect(() => {
    getPermissions()
      .then(res => {
        setPermissions(res.content);
        setLoading(false);
      })
      .catch(error => {
        console.error("Erreur lors du chargement des permissions :", error);
        setLoading(false);
      });
  }, []);

  // Load role data if editing
  useEffect(() => {
    if (id) {
      getRoleById(parseInt(id))
        .then(role => {
          setFormData({
            name: role.name,
            permissions: role.permissions
          });
        })
        .catch(error => {
          console.error("Erreur lors du chargement du rôle :", error);
        });
    }
  }, [id]);
  const handlePermissionToggle = (permissionName: string) => {
    setFormData(prev => ({
      ...prev,
      permissions: prev.permissions.includes(permissionName)
        ? prev.permissions.filter(p => p !== permissionName)
        : [...prev.permissions, permissionName]
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (id) {
        await updateRole(parseInt(id), formData);
      } else {
        await createRole(formData);
      }
      navigate("/admin/roles");
    } catch (err) {
      console.error("Erreur lors de la soumission du formulaire :", err);
    }
  };

  const handleCancel = () => navigate("/admin/roles");

  if (loading) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/30 p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-xl max-h-[95vh] overflow-y-auto">
        <div className="p-6">
          <header className="text-center mb-4">
            <h2 className="text-2xl font-bold text-gray-800">{title}</h2>
            <p className="text-gray-500 text-sm mt-1">{description}</p>
          </header>

          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 gap-6">
              {/* Role Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nom du rôle
                </label>
                <input
                  type="text"
                  className="form-input w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  required
                  placeholder="ex: ROLE_ADMIN"
                />
              </div>

              {/* Permissions */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Permissions (facultatif)
                </label>
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 max-h-60 overflow-y-auto">
                  {permissions.length === 0 ? (
                    <p className="text-gray-500 text-sm text-center py-4">
                      Aucune permission disponible
                    </p>
                  ) : (
                    <div className="space-y-2">
                      {permissions.map((perm) => {
                        const isSelected = formData.permissions.includes(perm.name);
                        return (
                          <div
                            key={perm.name}
                            className={`flex items-center p-3 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
                              isSelected
                                ? 'border-blue-500 bg-blue-50 shadow-sm'
                                : 'border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50'
                            }`}
                            onClick={() => handlePermissionToggle(perm.name)}
                          >
                            <div className="flex items-center justify-center w-5 h-5 mr-3">
                              {isSelected ? (
                                <FaCheckCircle className="text-blue-600 text-lg" />
                              ) : (
                                <FaRegCheckCircle className="text-gray-400 text-lg" />
                              )}
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className={`text-sm font-medium ${
                                isSelected ? 'text-blue-900' : 'text-gray-900'
                              }`}>
                                {perm.name}
                              </p>
                              {perm.description && (
                                <p className={`text-xs mt-1 ${
                                  isSelected ? 'text-blue-700' : 'text-gray-500'
                                }`}>
                                  {perm.description}
                                </p>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}

                  {formData.permissions.length > 0 && (
                    <div className="mt-4 pt-3 border-t border-gray-200">
                      <p className="text-sm text-gray-600">
                        <span className="font-medium text-blue-600">
                          {formData.permissions.length}
                        </span>{" "}
                        {formData.permissions.length > 1
                          ? "permissions"
                          : "permission"}{" "}
                        {formData.permissions.length > 1
                          ? "sélectionnées"
                          : "sélectionnée"}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Footer Buttons */}
            <footer className="mt-6 flex justify-between">
              <button
                type="button"
                className="px-4 cursor-pointer py-2 bg-red-700 text-white font-medium rounded-lg hover:bg-red-800 transition text-sm"
                onClick={handleCancel}
              >
                Annuler
              </button>
              <button
                type="submit"
                className="px-5 cursor-pointer py-2 bg-blue-600 text-white font-semibold rounded-lg shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition text-sm"
              >
                Valider
              </button>
            </footer>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RoleForm;