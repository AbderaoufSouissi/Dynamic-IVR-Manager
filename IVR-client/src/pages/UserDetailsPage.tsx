import { FaLock } from "react-icons/fa";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getUserById, updateUser } from "../service/UserService";
import type { User } from "../types/types";
import { toastError, toastSuccess } from "../service/ToastService";

export const UserDetailsPage = () => {


  const { id } = useParams();
  const [userInfo, setUserInfo] = useState<User | null>(null);

  
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    username: "",
    password: "",
    roleName: "",
    active: null as boolean | null,
  });


  const navigate = useNavigate()

  useEffect(() => {

  if (id) {
    getUserById(parseInt(id)).then((user) => {
      setUserInfo(user);
      const { password, ...rest } = user;
      setFormData({
        ...rest,
        password: "",
      });
    });
  }
}, [id]);



  const [formError, setFormError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !formData.firstName.trim() ||
      !formData.lastName.trim() ||
      !formData.email.trim() ||
      !formData.username.trim() ||
      (!id && !formData.password.trim()) ||
      formData.active === null
    ) {
      setFormError("Veuillez remplir tous les champs requis et sélectionner un statut.");
      return;
    }
    if (id && (!formData.roleName || formData.roleName.trim() === "")) {
      setFormError("Veuillez sélectionner un rôle pour l'utilisateur.");
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
        toastSuccess(`L'utilisateur ${updatePayload.username} a été modifié avec succés`)
      }

      
    } catch (error: any) {
      const message =
        error?.response?.data?.error ||
        error?.message ||
        "Une erreur est survenue.";
      toastError(message)
      console.error("Erreur lors de la soumission du formulaire :", error);
  

     

      setFormError(message);


    }
    navigate("/admin/users");
  };


  const handleSaveChanges = () => {
    handleSubmit({ preventDefault: () => { } } as React.FormEvent);
  };
  

  const handleCancel = () => navigate("/admin/users");
  




  

    return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <main className="flex-grow">
        <div className="mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Modifier l’utilisateur</h1>
            <p className="mt-1 text-sm text-gray-600">Modifier les informations d’utilisateur.</p>
          </div>

          <div className="bg-white shadow-sm rounded-lg">
            <div className="p-6 space-y-6">
              {/* Détails de l'utilisateur */}
              <div>
                <h2 className="text-lg font-semibold text-gray-900">Détails de l'utilisateur</h2>
                <div className="mt-1 grid grid-cols-1 md:grid-cols-5 gap-6">
                  {/* ID */}
                  <ReadOnlyField label="ID" value={id} name="user-id" />
                  <ReadOnlyField label="Créé par" value={userInfo?.createdBy} name="createdBy" />
                  <ReadOnlyField label="Date de création" value={userInfo?.createdAt} name="createdAt" />
                  <ReadOnlyField label="Modifié par" value={userInfo?.updatedBy} name="updatedBy" />
                  <ReadOnlyField label="Date de dernière modification" value={userInfo?.updatedAt} name="updatedAt" />
                </div>
              </div>

              {/* Infos modifiables */}
              <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
                {[
                  { label: "Prénom", name: "firstName", value: formData.firstName },
                  { label: "Nom", name: "lastName", value: formData.lastName },
                  { label: "Nom d’utilisateur", name: "username", value: formData.username },
                  { label: "Email", name: "email", value: formData.email },
                    { label: "Rôle", name: "roleName", value: formData.roleName },
                  { label: "Mot de passe", name: "password", value: formData.password, type: "password" },
                ].map((field) => (
                  <div key={field.name}>
                    <label htmlFor={field.name} className="block text-sm font-medium text-gray-900">
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
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Sticky Footer */}
      <footer className="sticky bottom-0 bg-white border-t border-gray-300 shadow-inner">
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
              type="button"
              onClick={handleSaveChanges}
              className="cursor-pointer px-4 py-2 inline-flex justify-center text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition"
            >
              Sauvegarder
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
};



    


export default UserDetailsPage;


const ReadOnlyField = ({ label, value, name }: { label: string, value: string | undefined, name: string }) => (
  <div>
    
    <label className="block text-sm font-medium text-gray-900" htmlFor={name}>
      <h2 className="text-lg font-semibold text-gray-900">
                    {label}
      </h2>
    </label>
    <div className="mt-1 relative rounded-md shadow-sm">
      <input
        className="block w-full border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm rounded-lg border px-3 py-1 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 pr-10"
        id={name}
        name={name}
        type="text"
        value={value || ""}
        readOnly
        disabled
      />
      <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
        <FaLock className="h-5 w-5 text-gray-400" />
      </div>
    </div>
  </div>
);
