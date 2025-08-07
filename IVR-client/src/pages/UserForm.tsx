import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { createUser, getUserById, updateUser } from "../service/UserService";
import type { Role, User } from "../types/types";
import {  toastSuccess } from "../service/ToastService";
import { HiEye, HiEyeSlash } from "react-icons/hi2";
import ReadOnlyInput from "../components/inputs/ReadOnlyInput";
import { getRoles } from "../service/RoleService";

type Title = "Créer un nouvel utilisateur" | "Modifier un utilisateur";
type Description =
  | "Complétez les informations ci-dessous pour créer un nouvel utilisateur."
  | "Modifiez les détails de l'utilisateur ci-dessous.";

export const UserForm = ({
  title,
  description,
}: {
  title: Title;
  description: Description;
  }) => {
  const DEFAULT_ROLE_NAME = "default"
  
  const { id } = useParams();
  const [userInfo, setUserInfo] = useState<User | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const navigate = useNavigate();

  const [roles, setRoles] = useState<Role[]>([])

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    username: "",
    password: "",
    roleName: DEFAULT_ROLE_NAME,
    active: null as boolean | null,
  });






  
    const fetchAllRoles = async () => {
     
      
      try {
        const data = await getRoles();
        setRoles(data.content);
        
      } catch (err) {
        console.error("Erreur lors de la récupération des utilisateurs", err);
      }
    };
    
  
    useEffect(() => {
      
        fetchAllRoles();
      
  
     
    }, []);

  useEffect(() => {
    if (id) {
      getUserById(parseInt(id)).then((user) => {
        setUserInfo(user);
        const { password, ...rest } = user;
        setFormData({ ...rest, password: "" });
      });
    }
  }, [id]);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const handleCancel = () => {
    navigate("/admin/users");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setFormError("")


   

    if (
      !formData.firstName.trim() ||
      !formData.lastName.trim() ||
      !formData.email.trim() ||
      !formData.username.trim() ||
      (!id && !formData.password.trim()) ||
      formData.active === null
    ) {
      console.log("Veuillez remplir tous les champs requis et sélectionner un statut.")
      setFormError(
        "Veuillez remplir tous les champs requis et sélectionner un statut."
      );
      return;
    }

    if (id && (!formData.roleName || formData.roleName.trim() === "")) {
      setFormError("Veuillez sélectionner un rôle pour l'utilisateur.");
      console.log("Veuillez sélectionner un rôle pour l'utilisateur.");
      return;
    }

    const basePayload: any = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      username: formData.username,
      roleName: formData.roleName.trim() === "" ? null : formData.roleName,
    };

    if (formData.active !== null) {
      basePayload.active = formData.active;
    }

    try {
      if (id) {
        const updatePayload = {
          ...basePayload,
          password: formData.password.trim() === "" ? null : formData.password,
        };

        await updateUser(parseInt(id), updatePayload);
        toastSuccess(
          `L'utilisateur ${updatePayload.username} a été modifié avec succés`
        );
      } else {
        if (formData.password.trim() === "") {
          throw new Error("Password is required to create a new user.");
        }
        const createPayload = {
          ...basePayload,
          password: formData.password,
        };

        await createUser(createPayload);
        toastSuccess(
          `L'utilisateur ${createPayload.username} a été créé avec succés`
        );
       
      }
       navigate("/admin/users");
    } catch (error: any) {
      const message =
        error?.response?.data?.error ||
        error?.message ||
        "Une erreur est survenue.";
      setFormError(message);
      console.error("Erreur lors de la soumission du formulaire :", error);
    }
  };

  const userEditableInfo = [
    { label: "Prénom", name: "firstName", value: formData.firstName },
    { label: "Nom", name: "lastName", value: formData.lastName },
    { label: "Nom d’utilisateur", name: "username", value: formData.username },
    { label: "Email", name: "email", value: formData.email },
    {
      label: "Mot de passe",
      name: "password",
      value: formData.password,
      type: "password",
    },
  ];

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex flex-col min-h-screen bg-gray-50">
        <main className="flex-grow">
          <div className="mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="mb-8">
              <h1 className="text-3xl font-semibold text-gray-900">{title}</h1>
              <p className="mt-1 text-sm text-gray-600">{description}</p>
              
            </div>

            <div className="bg-white shadow-sm rounded-lg">
              <div className="p-6 space-y-6">
                {id && (
                  <div>
                    <h2 className="text-lg font-semibold text-gray-900">
                      Infos sur l'utilisateur
                    </h2>
                    <div className="mt-1 grid grid-cols-1 md:grid-cols-5 gap-6">
                      <ReadOnlyInput label="ID" value={id} name="user-id" />
                      <ReadOnlyInput
                        label="Créé par"
                        value={userInfo?.createdBy}
                        name="createdBy"
                      />
                      <ReadOnlyInput
                        label="Date création"
                        value={userInfo?.createdAt}
                        name="createdAt"
                      />
                      <ReadOnlyInput
                        label="Modifié par"
                        value={userInfo?.updatedBy}
                        name="updatedBy"
                      />
                      <ReadOnlyInput
                        label="Date dernière modification"
                        value={userInfo?.updatedAt}
                        name="updatedAt"
                      />
                    </div>
                  </div>
                )}

                <h2 className="text-lg font-semibold text-gray-900">
                  Détails de l'utilisateur
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
                  {userEditableInfo.map((field) => {
                    if (field.name === "password") {
                      return (
                        <div
                          key={field.name}
                          className="md:col-span-1 relative"
                        >
                          <label
                            htmlFor={field.name}
                            className="block text-sm font-medium text-gray-700 mb-1"
                          >
                            {field.label}
                          </label>
                          <input
                            className="form-input w-full rounded-lg border border-gray-300 px-3 py-1 pr-10 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            id={field.name}
                            value={formData.password}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                password: e.target.value,
                              })
                            }
                            placeholder="••••••••••••••••"
                            type={showPassword ? "text" : "password"}
                          />
                          <button
                            type="button"
                            onClick={togglePasswordVisibility}
                            className="absolute cursor-pointer top-7.5 right-3 flex items-center text-gray-400 hover:text-blue-600 transition-colors duration-200 focus:outline-none focus:text-blue-600"
                          >
                            {showPassword ? (
                              <HiEyeSlash size={20} />
                            ) : (
                              <HiEye size={20} />
                            )}
                          </button>
                        </div>
                      );
                    }
                  
                    return (
                      <div key={field.name}>
                        <label
                          htmlFor={field.name}
                          className="block text-sm font-medium text-gray-900"
                        >
                          {field.label}
                        </label>
                        <input
                          id={field.name}
                          name={field.name}
                          type={field.type || "text"}
                          value={field.value}
                          onChange={(e) =>
                            setFormData((prev) => ({
                              ...prev,
                              [field.name]: e.target.value,
                            }))
                          }
                          className="mt-1 block w-full border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm rounded-lg border px-3 py-1 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2"
                        />
                      </div>
                    );
                  })}

                  <div className="md:col-span-1">
                    <label
                      htmlFor="status"
                      className="block text-sm font-medium text-gray-900 mb-1"
                    >
                      Statut
                    </label>
                    <select
                      id="status"
                      name="status"
                      value={
                        formData.active === null
                          ? ""
                          : formData.active
                          ? "active"
                          : "inactive"
                      }
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          active: e.target.value === "active" ? true : false,
                        })
                      }
                      className="mt-1 block w-full border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm rounded-lg border px-3 py-1 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2"
                    >
                      <option value="">-- Sélectionnez un statut --</option>
                      <option value="active">Actif</option>
                      <option value="inactive">Inactif</option>
                    </select>

                  </div>
                    <div className="md:col-span-1">
  <label
    htmlFor="roleName"
    className="block text-sm font-medium text-gray-900 mb-1"
  >
    Rôle (facultatif)
  </label>
  <select
    id="roleName"
    name="roleName"
    value={formData.roleName}
    onChange={(e) =>
      setFormData({
        ...formData,
        roleName: e.target.value,
      })
    }
    className="mt-1 block w-full border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm rounded-lg border px-3 py-1 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2"
  >
  
    {roles.map((role) => (
      <option key={role.roleId} value={role.name}>
        {role.name}
      </option>
    ))}
  </select>
</div>


                </div>
              </div>
            </div>
            {formError && (
  <div className="mb-4 rounded-md bg-red-50 p-3 text-red-700 border border-red-400">
    {formError}
  </div>
)}
          </div>
          
        </main>

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
                className="cursor-pointer px-4 py-2 inline-flex justify-center text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition"
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

export default UserForm;
