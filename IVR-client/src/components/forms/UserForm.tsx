import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import type { User } from "../../types/types";

interface UserFormProps {
  title: Title;
  description: Description;
}

type Title = "Créer un nouvel utilisateur" | "Modifier un utilisateur";
type Description =
  | "Complétez les informations ci-dessous pour créer un nouvel utilisateur."
  | "Mettez à jour les détails de l'utilisateur ci-dessous.";

const UserForm = ({ title, description }: UserFormProps) => {
  const location = useLocation();
  const user: User = location.state?.user;
  const [firstName, setFirstName] = useState(user?.firstName || "");
  const [lastName, setLastName] = useState(user?.lastName || "");
  const [email, setEmail] = useState(user?.email || "");
  const [username, setUsername] = useState(user?.username || "");
  const [password, setPassword] = useState(""); // You usually don't prefill password
  const [role, setRole] = useState(user?.roleName || "");
  const [active,setActive] = useState(user?.active)

  const navigate = useNavigate();

  const handleCancel = () => {
    navigate("/admin/users"); // Go back to users page
  };

  useEffect(() => {
    if (user) {
      setFirstName(user.firstName || "");
      setLastName(user.lastName || "");
      setEmail(user.email || "");
      setUsername(user.username || "");
      setRole(user.roleName || "");
      setActive(user.active || false)
    }
  }, [user]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/30 p-4">
      <div
        aria-labelledby="modal-title"
        aria-modal="true"
        className="bg-white rounded-2xl shadow-xl w-full max-w-xl max-h-[95vh] overflow-y-auto"
        role="dialog"
      >
        <div className="p-6">
          <header className="text-center mb-4">
            <h2 className="text-2xl font-bold text-gray-800" id="modal-title">
              {title}
            </h2>
            <p className="text-gray-500 text-sm mt-1">{description}</p>
          </header>

          <form>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-3">
              <div>
                <label
                  className="block text-sm font-medium text-gray-700 mb-1"
                  htmlFor="first-name"
                >
                  Prénom
                </label>
                <input
                  className="form-input w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  value={firstName}
                  id="first-name"
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="ex: Jean"
                  type="text"
                />
              </div>

              <div>
                <label
                  className="block text-sm font-medium text-gray-700 mb-1"
                  htmlFor="last-name"
                >
                  Nom
                </label>
                <input
                  className="form-input w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  value={lastName}
                  id="last-name"
                  onChange={(e) => setLastName(e.target.value)}
                  placeholder="ex: Dupont"
                  type="text"
                />
              </div>

              <div className="md:col-span-2">
                <label
                  className="block text-sm font-medium text-gray-700 mb-1"
                  htmlFor="email"
                >
                  Adresse Email
                </label>
                <input
                  className="form-input w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  value={email}
                  id="email"
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="ex: jean.dupont@mail.com"
                  type="email"
                />
              </div>

              <div className="md:col-span-2">
                <label
                  className="block text-sm font-medium text-gray-700 mb-1"
                  htmlFor="username"
                >
                  Username
                </label>
                <input
                  className="form-input w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  value={username}
                  id="username"
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="ex: jeandupont"
                  type="text"
                />
              </div>

              <div className="md:col-span-2">
                <label
                  className="block text-sm font-medium text-gray-700 mb-1"
                  htmlFor="password"
                >
                  Mot de passe
                </label>
                <input
                  className="form-input w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  type="password"
                />
              </div>

              <div className="md:col-span-2">
                <label
                  className="block text-sm font-medium text-gray-700 mb-1"
                  htmlFor="role"
                >
                  Rôle (optionnel)
                </label>
                <input
                  className="form-input w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  value={role}
                  id="role"
                  onChange={(e) => setRole(e.target.value)}
                  placeholder="ex: administrateur"
                  type="text"
                />
              </div>
              
              <div className="md:col-span-2">
                <label className="text-sm font-medium text-gray-700 mb-1 block">
                  Statut
                </label>
                <div className="flex flex-col sm:flex-row gap-3">
                  {/* Active Radio Button */}
                  <label
                    htmlFor="active"
                    className="flex items-center cursor-pointer"
                  >
                    <input
                      type="radio"
                      name="status"
                      id="active"
                      value="active"
                      className="h-4 w-4 text-green-600 border-gray-300 focus:ring-green-500"
                      checked = {active === true}
                    />
                    <span className="ml-2 flex items-center text-sm text-gray-700">
                      <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                      Actif
                    </span>
                  </label>

                  {/* Inactive Radio Button */}
                  <label
                    htmlFor="inactive"
                    className="flex items-center cursor-pointer"
                  >
                    <input
                      type="radio"
                      name="status"
                      id="inactive"
                      value="inactive"
                      className="h-4 w-4 text-red-600 border-gray-300 focus:ring-red-500"
                      checked = {active === false}
                    />
                    <span className="ml-2 flex items-center text-sm text-gray-700">
                      <span className="w-2 h-2 bg-red-500 rounded-full mr-2"></span>
                      Inactif
                    </span>
                  </label>
                </div>
              </div>
            </div>

            <footer className="mt-6 flex justify-between">
              <button
                className="px-4 cursor-pointer py-2 bg-red-700 text-white font-medium rounded-lg hover:bg-red-800 transition text-sm"
                type="button"
                onClick={handleCancel}
              >
                Annuler
              </button>
              <button
                className="px-5 cursor-pointer py-2 bg-blue-600 text-white font-semibold rounded-lg shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition text-sm"
                type="submit"
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

export default UserForm;