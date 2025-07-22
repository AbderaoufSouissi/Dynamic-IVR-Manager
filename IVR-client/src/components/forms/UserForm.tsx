import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

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
  const user = location.state?.user;
  const [firstName, setFirstName] = useState(user?.firstname || "");
  const [lastName, setLastName] = useState(user?.lastname || "");
  const [email, setEmail] = useState(user?.email || "");
  const [username, setUsername] = useState(user?.username || "");
  const [password, setPassword] = useState(""); // You usually don't prefill password
  const [role, setRole] = useState(user?.role || "");

  const navigate = useNavigate();

  const handleCancel = () => {
      navigate("/admin/users"); // Go back to users page
      

      useEffect(() => {
    if (user) {
      setFirstName(user.firstname || "");
      setLastName(user.lastname || "");
      setEmail(user.email || "");
      setUsername(user.username || "");
      setRole(user.role || "");
    }
  }, [user]);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/30 p-4">
      <div
        aria-labelledby="modal-title"
        aria-modal="true"
        className="bg-white rounded-2xl shadow-xl w-full max-w-xl max-h-[98vh] "
        role="dialog"
      >
        <div className="p-8">
          <header className="text-center mb-6">
            <h2 className="text-3xl font-bold text-gray-800" id="modal-title">
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
                  value={firstName}
                  id="first-name"
                  onChange={(e) => setFirstName(e.target.value)}
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
                  value={lastName}
                  id="last-name"
                  onChange={(e) => setLastName(e.target.value)}
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
                  value={email}
                  id="email"
                  onChange={(e) => setEmail(e.target.value)}
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
                  value={username}
                  id="username"
                  onChange={(e) => setUsername(e.target.value)}
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
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
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
                  value={role}
                  id="role"
                  onChange={(e) => setRole(e.target.value)}
                  placeholder="ex: administrateur"
                  type="text"
                />
              </div>
            </div>

            <footer className="mt-8 flex justify-between">
              <button
                className="px-5 cursor-pointer py-2.5 bg-red-700 text-white font-medium rounded-lg hover:bg-red-800 transition"
                type="button"
                onClick={handleCancel}
              >
                Annuler
              </button>
              <button
                className="px-6 cursor-pointer py-2.5 bg-blue-600 text-white font-semibold rounded-lg shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition"
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
