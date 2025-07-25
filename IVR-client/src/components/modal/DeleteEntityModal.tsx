// components/modals/DeleteEntityModal.tsx
import { useNavigate, useParams, useLocation } from "react-router-dom";

import { FiAlertTriangle } from "react-icons/fi";
import { deleteUser } from "../../service/UserService";
import Modal from "./Modal";
// import { deleteRole } from "../../service/RoleService";
// import { deletePermission } from "../../service/PermissionService";

const DeleteEntityModal = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const path = location.pathname.toLowerCase(); // e.g., /admin/users/delete/3

  const getEntityType = () => {
    if (path.includes("/users/delete")) return "user";
    if (path.includes("/roles/delete")) return "role";
    if (path.includes("/permissions/delete")) return "permission";
    return null;
  };

  const entityType = getEntityType();

  const handleClose = () => {
    navigate(`/admin/${entityType}s`);
  };

  const handleConfirm = async () => {
    try {
      if (!id || !entityType) return;

      const numericId = parseInt(id);

      switch (entityType) {
        case "user":
          await deleteUser(numericId);
          break;
        // case "role":
        //   await deleteRole(numericId);
        //   break;
        // case "permission":
        //   await deletePermission(numericId);
        //   break;
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
      description={`Êtes-vous sûr de vouloir supprimer ce ${entityType} ? Cette action est irréversible.`}
      onConfirm={handleConfirm}
      confirmLabel="Supprimer"
      confirmType="danger"
    />
  );
};

export default DeleteEntityModal;
