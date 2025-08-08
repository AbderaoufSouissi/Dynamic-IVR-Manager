import { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import { getRoleById } from "../service/RoleService";
import { formatTimestamp } from "../api/Api";
import type { Role } from "../types/types";
import { FaCheckCircle } from "react-icons/fa";
import InfoInput from "../components/inputs/InfoInput";
import { IoIosArrowRoundBack } from "react-icons/io";

const RoleDetailsPage = () => {
  const { id } = useParams();
  const [role, setRole] = useState<Role | null>(null);
  const [loading, setLoading] = useState(true);



  useEffect(() => {
    if (id) {
      getRoleById(parseInt(id))
        .then((data: Role) => {
          setRole({
            ...data,
            createdAt: formatTimestamp(data.createdAt),
            updatedAt: formatTimestamp(data.updatedAt),
          });
          setLoading(false);
        })
        .catch((err) => {
          console.error("Erreur lors de la récupération du rôle:", err);
          setLoading(false);
        });
    }
  }, [id]);

  if (loading || !role) return <div className="p-4">Chargement...</div>;

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <main className="flex-grow">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="mb-2">
            <h1 className="text-3xl font-semibold text-gray-900">
              Détails du rôle <span className="font-bold"> {role.name}</span>
            </h1>
            <p className="text-sm text-gray-600">
              Informations sur le rôle et ses permissions.
            </p>
          </div>

          <div className="bg-white shadow-sm rounded-lg">
            <div className="p-4 space-y-6">

              {/* Role Details */}
              <div>
                <h2 className="text-lg font-semibold text-gray-900 mb-2">
                  Informations sur le rôle
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <InfoInput label="ID du rôle" value={role.roleId.toString()} />
                  <InfoInput label="Nom du rôle" value={role.name} />
                  <InfoInput label="Créé par" value={role.createdBy || "-"} />
                  <InfoInput label="Date de création" value={role.createdAt || "-"} />
                  <InfoInput label="Modifié par" value={role.updatedBy || "-"} />
                  <InfoInput label="Date de modification" value={role.updatedAt || "-"} />
                </div>
              </div>

              {/* Permissions */}
              <div>
                <h2 className="text-lg font-semibold text-gray-900 mb-1">
                  {role.permissionCount?.toString() || "0"} Permissions assignées
                </h2>
                <p className="text-sm text-gray-600 mb-2">
                  Liste des permissions actuellement assignées à ce rôle.
                </p>
                <div className="mt-1 border border-gray-300 rounded-lg">
                  <ul className="divide-y divide-gray-200">
                    {role.permissions.map((perm) => (
                      <li
                        key={perm}
                        className="flex items-center justify-between p-2"
                      >
                        <div className="flex items-center space-x-2">
                          <FaCheckCircle className="text-blue-600" />
                          <span className="text-sm font-medium text-gray-900">
                            {perm}
                          </span>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

            </div>
          </div>
           <div className="flex justify-center mt-8">
            <NavLink
              to="/admin/roles"
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


export default RoleDetailsPage;
