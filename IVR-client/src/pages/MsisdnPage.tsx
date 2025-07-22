import { useState } from "react";
import MSISDNInput from "../components/MSISDNInput";
import ActionButtons from "../components/ActionButtons";
import { StatusMessage } from "../components/StatusMessage";
import Modal from "../components/Modal";

import { FiAlertTriangle } from "react-icons/fi";


const MsisdnPage = () => {
  const [msisdn, setMsisdn] = useState("");
  const [error, setError] = useState("");
  const [status, setStatus] = useState("Le numéro est invalide");
  const [isLoading, setIsLoading] = useState(false);
  const [showBlacklistModal, setShowBlacklistModal] = useState(false);
  const [showWhitelistModal, setShowWhitelistModal] = useState(false);
  const [showResetModal,setShowResetModal] = useState(false)

  const validateMSISDN = (number: string) => /^\d{8,15}$/.test(number);

  const handleCheck = () => {
    if (!validateMSISDN(msisdn)) return setError("Le format du MSISDN est invalide.");
    setError("");
    setIsLoading(true);
    setTimeout(() => {
      setStatus("Ce numéro est valide et n'est pas blacklisté.");
      setIsLoading(false);
    }, 2000);
  };

  

  return (
    <div>
    <p>Gestion des MSISDN ici.</p>
    
    <main className="flex flex-1 items-center justify-center py-12">
      
      <div className="w-full max-w-md space-y-8 rounded-xl bg-white p-8 shadow-2xl shadow-gray-200/60">
        <div>
          <h2 className="text-center text-3xl font-bold text-gray-900">Gérer MSISDN</h2>
          <p className="mt-2 text-center text-sm">Entrez un numéro de téléphone pour le gérer.</p>
        </div>
        <MSISDNInput value={msisdn} onChange={setMsisdn} error={error} />
        <ActionButtons
          isLoading={isLoading}
          onCheck={handleCheck}
          onBlacklist={() => {
    if (/^\d{8}$/.test(msisdn)) {
      setShowBlacklistModal(true);
      setError("");
    } else {
      setError("Veuillez entrer un numéro valide de 8 chiffres.");
    }
  }}
  onWhitelist={() => {
    if (/^\d{8}$/.test(msisdn)) {
      setShowWhitelistModal(true);
      setError("");
    } else {
      setError("Veuillez entrer un numéro valide de 8 chiffres.");
    }
  }}
  onReset={() => {
    if (/^\d{8}$/.test(msisdn)) {
      setShowResetModal(true);
      setStatus("Le compteur a été réinitialisé.");
      setError("");
    } else {
      setError("Veuillez entrer un numéro valide de 8 chiffres.");
    }
  }}
        />
        <StatusMessage message={status} />
      </div>

      {/* Modals */}
      <Modal
  open={showBlacklistModal}
  onClose={() => setShowBlacklistModal(false)}
  icon={<FiAlertTriangle />}
  title="Confirmer le blacklistage"
  description={`Êtes-vous sûr de vouloir blacklister le numéro ${msisdn} ?`}
  confirmLabel="Confirmer"
  confirmType="danger"
  onConfirm={() => {
    setStatus(`Le numéro ${msisdn} a été blacklisté.`);
    setShowBlacklistModal(false);
  }}
/>

      <Modal
  open={showWhitelistModal}
  onClose={() => setShowWhitelistModal(false)}
  icon={<FiAlertTriangle />}
  title="Confirmer le whitelistage"
  description={`Êtes-vous sûr de vouloir whitelister ce numéro ${msisdn} ?`}
  confirmLabel="Confirmer"
  confirmType="primary"
  onConfirm={() => {
    setStatus(`Le numéro ${msisdn} a été whitelisté.`);
    setShowWhitelistModal(false);
  }}
/>

      <Modal
  open={showResetModal}
  onClose={() => setShowResetModal(false)}
  icon={<FiAlertTriangle />}
  title="Réinitialiser le compteur"
  description={`Êtes-vous sûr de vouloir réinitialiser le nombre d'appels pour ${msisdn} ?`}
  confirmLabel="Confirmer"
  confirmType="warning"
  onConfirm={() => {
    setStatus(`Le compteur d'appels pour ${msisdn} a été réinitialisé.`);
    setShowResetModal(false);
  }}
/>

      </main>
      </div>
  );
};

export default MsisdnPage;