import { useState } from "react";
import { createPermission } from "../../service/PermissionService";
import type { PermissionRequest } from "../../types/types";
import { useNavigate } from "react-router-dom";
import { toastSuccess } from "../../service/ToastService";

const PermissionForm = () => {
  const [formData, setFormData] = useState<PermissionRequest>({
    name: "",
    description: "",
  });

  const [formError, setFormError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      setFormError("Le nom de la permission est requis.");
      return;
    }

    if (!formData.description.trim()) {
      setFormError("La description de la permission est requise.");
      return;
    }
    try {
      await createPermission(formData);
      toastSuccess(`La permission ${formData.name} a été créé avec succés`);
       navigate("/admin/permissions");
    } catch (error: any) {
      console.error("Erreur lors de la soumission du formulaire :", error);
      const message =
        error?.response?.data?.error ||
        error?.message ||
        "Une erreur est survenue.";
      setFormError(message);

      console.error("Erreur lors de la soumission du formulaire :", error);
    }
   
  };

  const navigate = useNavigate();

  const handleCancel = () => navigate("/admin/permissions");

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex flex-col min-h-screen bg-gray-50">
        <main className="flex-grow">
          <div className=" mx-auto px-4 sm:px-6 lg:px-8 py-2">
            <div className="mb-1">
              <h1 className="text-3xl font-bold text-gray-900">
                Créer une nouvelle permission
              </h1>
              <p className=" text-sm text-gray-600">
                Complétez les informations ci-dessous pour créer une nouvelle
              </p>
            </div>

            <div className="bg-white shadow-sm rounded-lg">
              <div className="p-2 space-y-1">
                {/* Role Details */}
                {/* Role Name */}
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">
                    Détails de la permission{" "}
                  </h2>
                  <label
                    className="mt-2 block text-sm font-medium text-gray-900"
                    htmlFor="role-name"
                  >
                    <h2 className="text-md font-semibold text-gray-900">
                      Nom de la permission
                    </h2>
                  </label>
                  <input
                    className=" block border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm  rounded-lg border  px-3 py-0.5 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-1"
                    id="perm-name"
                    name="perm-name"
                    placeholder="ex: create:users"
                    type="text"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, name: e.target.value }))
                    }
                  />
                  <label
                    className="mt-2 block text-sm font-medium text-gray-900"
                    htmlFor="role-name"
                  >
                    <h2 className="text-md font-semibold text-gray-900">
                      Description de la permission
                    </h2>
                  </label>
                  <input
                    className="w-full block border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm  rounded-lg border  px-3 py-0.5 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-1"
                    id="permission-desc"
                    name="permission-desc"
                    placeholder="ex: créér des users"
                    type="text"
                    value={formData.description}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        description: e.target.value,
                      }))
                    }
                  />
                </div>
                {formError && (
                  <div className="mb-4 rounded-md bg-red-50 p-3 text-red-700 border border-red-400">
                    {formError}
                  </div>
                )}
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

export default PermissionForm;
