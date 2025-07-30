import { useEffect, useState } from 'react';
import type { PermissionRequest } from '../../types/types';
import { createPermission, getPermissionById } from '../../service/PermissionService';
import { useNavigate, useOutletContext, useParams } from 'react-router-dom';

type Title = "Créer une nouvelle permission";
type Description ="Complétez les informations ci-dessous pour créer une nouvelle permission"


interface PermissionFormProps {
  title: Title;
  description: Description;
}
type PermissionsPageContext = {
  triggerRefresh: () => void;
};

const PermissionForm = ({ title, description }: PermissionFormProps) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const { triggerRefresh } = useOutletContext<PermissionsPageContext >()

  const [formData, setFormData] = useState<PermissionRequest>({
    name: '',
    description: ''
  });
const fetchPermission = async () => {
      if (id) {
        try {
          getPermissionById(parseInt(id)).then((perm)=>{setFormData({ name: perm.name, description: perm.description });})
          
        } catch (err) {
          console.error('Erreur lors de la récupération de la permission :', err);
        }
      }
      setLoading(false);
    };

  useEffect(() => {
    
    fetchPermission();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createPermission(formData);
      triggerRefresh()
      navigate("/admin/permissions");
    } catch (err) {
      console.error("Erreur lors de la soumission du formulaire :", err);
    }
  };

  const handleCancel = () => navigate("/admin/permissions");

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
                  Nom de la permission
                </label>
                <input
                  type="text"
                  className="form-input w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  placeholder="ex: READ_USER"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  className="form-textarea w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Ajoutez une description pour cette permission"
                  rows={3}
                />
              </div>

              <footer className="mt-6 flex justify-between">
                <button
                  type="button"
                  className="px-4 py-2 bg-red-700 text-white font-medium rounded-lg hover:bg-red-800 transition text-sm"
                  onClick={handleCancel}
                >
                  Annuler
                </button>
                <button
                  type="submit"
                                  className="px-5 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition text-sm"
                                 

                >
                  Valider
                </button>
              </footer>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PermissionForm;
