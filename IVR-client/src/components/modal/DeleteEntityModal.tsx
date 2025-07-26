import { useNavigate, useParams, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { FiAlertTriangle } from "react-icons/fi";
import Modal from "./Modal";
import { deleteUser, getUserById } from "../../service/UserService";
import { deleteRole, getRoleById } from "../../service/RoleService";
import { deletePermission, getPermissionById } from "../../service/PermissionService";

const DeleteEntityModal = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const [entityName, setEntityName] = useState<string | null>(null);

  const path = location.pathname.toLowerCase();

  const getEntityType = () => {
    if (path.includes("/users/delete")) return "user";
    if (path.includes("/roles/delete")) return "role";
    if (path.includes("/permissions/delete")) return "permission";
    return null;
  };

  const entityType = getEntityType();

  useEffect(() => {
    const fetchEntityName = async () => {
      if (!id || !entityType) return;

      const numericId = parseInt(id);

      try {
        switch (entityType) {
          case "user":
            const user = await getUserById(numericId);
            setEntityName(user.username || user.email || `Utilisateur #${id}`);
            break;
          case "role":
            const role = await getRoleById(numericId);
            setEntityName(role.name || `Rôle #${id}`);
            break;
          case "permission":
            const permission = await getPermissionById(numericId);
            setEntityName(permission.name || `Permission #${id}`);
            break;
        }
      } catch (err) {
        console.error(`Erreur lors du chargement du ${entityType}`, err);
      }
    };

    fetchEntityName();
  }, [id, entityType]);

  const handleClose = () => {
    navigate(`/admin/${entityType}s`);
  };

  const handleConfirm = async () => {
    if (!id || !entityType) return;

    const numericId = parseInt(id);

    try {
      switch (entityType) {
        case "user":
          await deleteUser(numericId);
          break;
        case "role":
          await deleteRole(numericId);
          break;
        case "permission":
          await deletePermission(numericId);
          break;
      }

      navigate(`/admin/${entityType}s`);
    } catch (error) {
      console.error(`Erreur lors de la suppression du ${entityType} :`, error);
    }
  };

  return (
    <Modal
      open={true}
      onClose={handleClose}
      icon={<FiAlertTriangle className="text-red-600 w-6 h-6" />}
      title={`Confirmer la suppression du ${entityType}`}
      description={
        entityName
          ? `Êtes-vous sûr de vouloir supprimer ${entityType} « ${entityName} » ? Cette action est irréversible.`
          : `Êtes-vous sûr de vouloir supprimer ce ${entityType} ? Cette action est irréversible.`
      }
      onConfirm={handleConfirm}
      confirmLabel="Supprimer"
      confirmType="danger"
    />
  );
};

export default DeleteEntityModal;
