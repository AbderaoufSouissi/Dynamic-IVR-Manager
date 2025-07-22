
import { useNavigate } from "react-router-dom";

interface UserFormProps {
  title: Title;
    description: Description;
   
}

type Title = "Créer un nouvel utilisateur" | "Modifier un utilisateur";
type Description =
  | "Complétez les informations ci-dessous pour créer un nouvel utilisateur."
  | "Mettez à jour les détails de l'utilisateur ci-dessous.";

const UserForm = ({ title, description }: UserFormProps) => {
    const navigate = useNavigate();
    
const handleCancel = () => {
    navigate("/admin/users"); // Go back to users page
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/30 p-4">
      <div
        aria-labelledby="modal-title"
        aria-modal="true"
        className="bg-white rounded-2xl shadow-xl w-full max-w-xl"
        role="dialog"
      >
        <div className="p-8">
          <header className="text-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800" id="modal-title">
              {title}
            </h2>
            <p className="text-gray-500 mt-1">{description}</p>
          </header>

          <form>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
              <div>
                <label
                  className="block text-sm font-medium text-gray-700 mb-1.5"
                  htmlFor="first-name"
                >
                  Prénom
                </label>
                <input
                  className="form-input w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  id="first-name"
                  placeholder="ex: Jean"
                  type="text"
                />
              </div>

              <div>
                <label
                  className="block text-sm font-medium text-gray-700 mb-1.5"
                  htmlFor="last-name"
                >
                  Nom
                </label>
                <input
                  className="form-input w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  id="last-name"
                  placeholder="ex: Dupont"
                  type="text"
                />
              </div>

              <div className="md:col-span-2">
                <label
                  className="block text-sm font-medium text-gray-700 mb-1.5"
                  htmlFor="email"
                >
                  Adresse email
                </label>
                <input
                  className="form-input w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  id="email"
                  placeholder="ex: jean.dupont@mail.com"
                  type="email"
                />
              </div>

              <div className="md:col-span-2">
                <label
                  className="block text-sm font-medium text-gray-700 mb-1.5"
                  htmlFor="username"
                >
                  Nom d'utilisateur
                </label>
                <input
                  className="form-input w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  id="username"
                  placeholder="ex: jeandupont"
                  type="text"
                />
              </div>

              <div className="md:col-span-2">
                <label
                  className="block text-sm font-medium text-gray-700 mb-1.5"
                  htmlFor="password"
                >
                  Mot de passe
                </label>
                <input
                  className="form-input w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  id="password"
                  placeholder="••••••••"
                  type="password"
                />
              </div>

              <div className="md:col-span-2">
                <label
                  className="block text-sm font-medium text-gray-700 mb-1.5"
                  htmlFor="role"
                >
                  Rôle (optionnel)
                </label>
                <input
                  className="form-input w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  id="role"
                  placeholder="ex: administrateur"
                  type="text"
                />
              </div>
            </div>

            <footer className="mt-8 flex justify-between">
              <button
        className="px-5 py-2.5 bg-gray-200 text-gray-700 font-medium rounded-lg hover:bg-gray-300 transition"
        type="button"
        onClick={handleCancel}
      >
                Annuler
              </button>
              <button
                className="px-6 py-2.5 bg-blue-600 text-white font-semibold rounded-lg shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition"
                type="submit"
              >
                Créer l'utilisateur
              </button>
            </footer>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UserForm;
