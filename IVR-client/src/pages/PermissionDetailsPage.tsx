import { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import { formatTimestamp } from "../api/Api";
import type { Permission } from "../types/types";
import { getPermissionById } from "../service/PermissionService";
import InfoInput from "../components/inputs/InfoInput";
import { IoIosArrowRoundBack } from "react-icons/io";

const PermissionDetailsPage = () => {
  const { id } = useParams();
  const [permission, setPermission] = useState<Permission | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      getPermissionById(parseInt(id))
        .then((data: Permission) => {
          setPermission({
            ...data,
            createdAt: formatTimestamp(data.createdAt),
            updatedAt: formatTimestamp(data.updatedAt),
          });
          setLoading(false);
        })
        .catch((err) => {
          console.error("Erreur lors de la récupération de la permission:", err);
          setLoading(false);
        });
    }
  }, [id]);

  if (loading || !permission) return <div className="p-4">Chargement...</div>;

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <main className="flex-grow">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="mb-2">
            <h1 className="text-3xl font-semibold text-gray-900">
              Détails de la permission <span className="font-bold"> {permission.name}</span>
            </h1>
            <p className="text-sm text-gray-600">
                          Informations et détails sur la permission 
            </p>
          </div>

          <div className="bg-white shadow-sm rounded-lg">
            <div className="p-4 space-y-6">

              {/* Role Details */}
              <div>
                <h2 className="text-lg font-semibold text-gray-900 mb-2">
                  Informations sur la permission
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <InfoInput label="ID" value={permission.permissionId.toString()} />
                  <InfoInput label="Nom" value={permission.name} />
                  <InfoInput label="Créé par" value={permission.createdBy || "-"} />
                  <InfoInput label="Date de création" value={permission.createdAt || "-"} />
                  <InfoInput label="Modifié par" value={permission.updatedBy || "-"} />
                  <InfoInput label="Date de modification" value={permission.updatedAt || "-"} />
                </div>
              </div>

              
    

            </div>
          </div>
          <div className="flex justify-center mt-8">
            <NavLink
              to="/admin/permissions"
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


export default PermissionDetailsPage;
