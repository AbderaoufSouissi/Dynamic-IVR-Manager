import { useNavigate } from "react-router-dom";
import Modal from "./Modal";
import { FiAlertTriangle } from "react-icons/fi";
import { logout } from "../../service/AuthService"; // 👈 Assure-toi que ce chemin est correct

const LogoutModal = ({ onClose }: {onClose: () => void}) => {
  const navigate = useNavigate();

  const handleConfirm = async () => {
    try {
      await logout(); // 👈 Déconnexion côté serveur/localstorage
      navigate('/'); // 👈 Redirige vers login ou page d'accueil
    } catch (err) {
      console.error("Logout failed", err);
    }
  };

  return (
    <Modal
      open={true}
      onClose={onClose}
      icon={<FiAlertTriangle className="text-red-600 w-6 h-6" />}
      title={`Confirmer l'opération de Logout`}
      description={`Êtes-vous sûr de vouloir quitter l'application ?`}
      onConfirm={handleConfirm}
      confirmLabel="Confirmer"
      confirmType="danger"
    />
  );
};

export default LogoutModal;
