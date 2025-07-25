import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { createRole, getRoleById, updateRole } from "../../service/RoleService";
import { getPermissions } from "../../service/PermissionService";
import type { RoleRequest, Permission } from "../../types/types";

type Title = "Créer un nouveau role" | "Modifier un role";
type Description =
  | "Complétez les informations ci-dessous pour créer un nouveau role."
  | "Mettez à jour les détails de l'utilisateur ci-dessous.";

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

  // Fetch permissions and role (if editing)
  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await getPermissions();
        const permissions = data.content;
        setPermissions(permissions);

        if (id) {
          const role = await getRoleById(parseInt(id));
          setFormData({
            name: role.name,
            permissions: role.permissions.map((p: Permission) => p.name),
          });
        }
      } catch (error) {
        console.error("Erreur lors du chargement des données :", error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [id]);

  const handleCheckboxChange = (permName: string) => {
    setFormData((prev) => ({
      ...prev,
      permissions: prev.permissions.includes(permName)
        ? prev.permissions.filter((p) => p !== permName)
        : [...prev.permissions, permName],
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

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Permissions (facultatif)
                </label>
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                  {permissions.length === 0 ? (
                    <p className="text-gray-500 text-sm text-center py-4">
                      Aucune permission disponible
                    </p>
                  ) : (
                    <div className="max-h-60 overflow-y-auto">
                      <div className="grid grid-cols-1 gap-3">
                        {permissions.map((perm) => (
                          <label
                            key={perm.name}
                            className={`flex items-center p-3 border rounded-lg transition-colors duration-200 cursor-pointer group
    ${
      formData.permissions.includes(perm.name)
        ? "bg-blue-50 border-blue-500"
        : "bg-white border-gray-200 hover:bg-blue-50 hover:border-blue-300"
    }
  `}
                          >
                            <div className="flex items-center">
                              <input
                                type="checkbox"
                                hidden
                                className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                                checked={formData.permissions.includes(
                                  perm.name
                                )}
                                onChange={() => handleCheckboxChange(perm.name)}
                              />
                              <div className="ml-3">
                                <span className="text-sm font-medium text-gray-800 group-hover:text-blue-700">
                                  {perm.name}
                                </span>
                                {perm.description && (
                                  <p className="text-xs text-gray-500 mt-1">
                                    {perm.description}
                                  </p>
                                )}
                              </div>
                            </div>
                            <div className="ml-auto">
                              {formData.permissions.includes(perm.name) && (
                                <div className="flex items-center justify-center w-6 h-6 bg-blue-100 rounded-full">
                                  <svg
                                    className="w-3 h-3 text-blue-600"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                  >
                                    <path
                                      fillRule="evenodd"
                                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                      clipRule="evenodd"
                                    />
                                  </svg>
                                </div>
                              )}
                            </div>
                          </label>
                        ))}
                      </div>
                      {formData.permissions.length > 0 && (
                        <div className="mt-4 pt-3 border-t border-gray-200">
                          <p className="text-sm text-gray-600">
                            <span className="font-medium text-blue-600">
                              {formData.permissions.length}
                            </span>{" "}
                            permission
                            {formData.permissions.length > 1 ? "s" : ""}{" "}
                            sélectionnée
                            {formData.permissions.length > 1 ? "s" : ""}
                          </p>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>

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
