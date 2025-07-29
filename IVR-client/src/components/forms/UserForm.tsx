import { useEffect, useState } from "react";
import { useNavigate, useOutletContext, useParams } from "react-router-dom";
import { createUser, getUserById, updateUser } from "../../service/UserService";
import { HiEye, HiEyeSlash } from "react-icons/hi2";

interface UserFormProps {
  title: Title;
  description: Description;
}
type UsersPageContext = {
  triggerRefresh: () => void;
};

type Title = "Créer un nouvel utilisateur" | "Modifier un utilisateur";
type Description =
  | "Complétez les informations ci-dessous pour créer un nouvel utilisateur."
  | "Mettez à jour les détails de l'utilisateur ci-dessous.";



const UserForm = ({ title, description }: UserFormProps) => {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    username: "",
    password: "",
    roleName: "",
    active: null as boolean | null, // allow null initially
  });

  const [showPassword, setShowPassword] = useState(false);
  const { triggerRefresh } = useOutletContext<UsersPageContext>();

  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  useEffect(() => {
    if (id) {
      getUserById(parseInt(id)).then((user) => {
        const { password, ...rest } = user; // remove hashed password
        setFormData({
          ...rest,
          password: "", // clear the password field intentionally
        });
      });
    }
  }, [id]);

  const handleCancel = () => {
    navigate("/admin/users"); // Go back to users page
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // common data
    const basePayload: any = {
  firstName: formData.firstName,
  lastName: formData.lastName,
  email: formData.email,
  username: formData.username,
      roleName: formData.roleName.trim() === "" ? null : formData.roleName,
  
};

// Only add active if it's boolean (true or false), ignore if null
if (formData.active !== null) {
  basePayload.active = formData.active;
    }
  


    try {
      if (id) {
        // Update: password nullable or omitted if empty
        const updatePayload = {
          ...basePayload,
          password: formData.password.trim() === "" ? null : formData.password,
        };

        

        await updateUser(parseInt(id), updatePayload);
      } else {
        // Create: password required and must be string (not null)
        if (formData.password.trim() === "") {
          throw new Error("Password is required to create a new user.");
        }
        const createPayload = {
          ...basePayload,
          password: formData.password,
        };

        await createUser(createPayload);
      }
       triggerRefresh()

      navigate("/admin/users");
    } catch (error) {
      console.error("Erreur lors de la soumission du formulaire :", error);
      // show toast or error message
    }
  };

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
                  value={formData.firstName}
                  id="first-name"
                  onChange={(e) =>
                    setFormData({ ...formData, firstName: e.target.value })
                  }
                  placeholder="ex: Jean"
                  type="text"
                  required
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
                  value={formData.lastName}
                  id="last-name"
                  onChange={(e) =>
                    setFormData({ ...formData, lastName: e.target.value })
                  }
                  placeholder="ex: Dupont"
                  type="text"
                  required
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
                  value={formData.email}
                  id="email"
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  placeholder="ex: jean.dupont@mail.com"
                  type="email"
                  required
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
                  value={formData.username}
                  id="username"
                  onChange={(e) =>
                    setFormData({ ...formData, username: e.target.value })
                  }
                  placeholder="ex: jeandupont"
                  type="text"
                  required
                />
              </div>

             <div className="md:col-span-2 relative">
                <label
                  className="block text-sm font-medium text-gray-700 mb-1"
                  htmlFor="password"
                >
                  Mot de passe
                </label>
                <input
                  className="form-input w-full rounded-lg border border-gray-300 px-3 py-2 pr-10 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  id="password"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                  placeholder="••••••••••••••••"
                  type={showPassword ? "text" : "password"}
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute cursor-pointer top-8 right-3 flex items-center text-gray-400 hover:text-blue-600 transition-colors duration-200 focus:outline-none focus:text-blue-600"
                >
                  {showPassword ? (
                    <HiEyeSlash size={20} />
                  ) : (
                    <HiEye size={20} />
                  )}
                </button>
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
                  value={formData.roleName}
                  id="role"
                  onChange={(e) =>
                    setFormData({ ...formData, roleName: e.target.value })
                  }
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
                      checked={formData.active === true}
                      onChange={() =>
                        setFormData({ ...formData, active: true })
                      }
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
                      onChange={() =>
                        setFormData({ ...formData, active: false })
                      }
                      checked={formData.active === false}
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
                onClick={handleSubmit}
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
