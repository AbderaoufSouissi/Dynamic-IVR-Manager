import { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import { formatTimestamp } from "../api/Api";
import type { User } from "../types/types";
import { getUserById } from "../service/UserService";
import InfoInput from "../components/inputs/InfoInput";
import { IoIosArrowRoundBack } from "react-icons/io";

const UserDetailsPage = () => {
  const { id } = useParams();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      getUserById(parseInt(id))
        .then((data: User) => {
          setUser({
            ...data,
            createdAt: formatTimestamp(data.createdAt),
            updatedAt: formatTimestamp(data.updatedAt),
          });
          setLoading(false);
        })
        .catch((err) => {
          console.error("Erreur lors de la récupération du user:", err);
          setLoading(false);
        });
    }
  }, [id]);

  if (loading || !user) return <div className="p-4">Chargement...</div>;

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <main className="flex-grow">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="mb-2">
            <h1 className="text-3xl font-semibold text-gray-900">
              Détails du user <span className="font-bold">{user.username}</span>
            </h1>
            <p className="text-sm text-gray-600">
              Informations et détails sur l'utilisateur.
            </p>
          </div>

          <div className="bg-white shadow-sm rounded-lg">
            <div className="p-4 space-y-6">
              <div>
                <h2 className="text-lg font-semibold text-gray-900 mb-2">
                  Informations sur l'utilisateur
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <InfoInput label="ID" value={user.userId.toString()} />
                  <InfoInput label="Nom" value={user.lastName} />
                  <InfoInput label="Prénom" value={user.firstName || "-"} />
                  <InfoInput label="Username" value={user.username || "-"} />
                  <InfoInput label="Email" value={user.email || "-"} />
                  <InfoInput label="Créé par" value={user.createdBy || "-"} />
                  <InfoInput
                    label="Date de création"
                    value={user.createdAt || "-"}
                  />
                  <InfoInput
                    label="Modifié par"
                    value={user.updatedBy || "-"}
                  />
                  <InfoInput
                    label="Date dernière modification"
                    value={user.updatedAt || "-"}
                  />
                  <InfoInput label="Role" value={user.roleName || "-"} />
                </div>
              </div>
            </div>
          </div>

          {/* Centered Back Link */}
          <div className="flex justify-center mt-8">
            <NavLink
              to="/admin/users"
              className="flex items-center space-x-1 text-sm text-gray-600 hover:text-gray-900 font-medium transition-colors"
            >
              <IoIosArrowRoundBack size={20} />
              <span>Retour à la page précédente</span>
            </NavLink>
          </div>
        </div>
      </main>
    </div>
  );
};

export default UserDetailsPage;