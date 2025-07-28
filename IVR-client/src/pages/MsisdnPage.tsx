import { useState } from "react";
import MSISDNInput from "../components/MSISDNInput";
import ActionButtons from "../components/buttons/ActionButtons";
import { StatusMessage } from "../components/StatusMessage";
import Modal from "../components/modal/Modal";

import { FiAlertTriangle } from "react-icons/fi";
import { blacklistMsisdn, isBlacklisted, resetNbCalls, WhitelistMsisdn } from "../service/MsisdnService";


const MsisdnPage = () => {
  const [msisdn, setMsisdn] = useState("");
  const [error, setError] = useState("");
  const [status, setStatus] = useState("Le numéro est invalide");
  const [isLoading, setIsLoading] = useState(false);
  const [showBlacklistModal, setShowBlacklistModal] = useState(false);
  const [showWhitelistModal, setShowWhitelistModal] = useState(false);
  const [showResetModal,setShowResetModal] = useState(false)

  const validateMSISDN = (number: string) => /^\d{8,15}$/.test(number);

  

  const blacklist = async () => {
    const data = await blacklistMsisdn(msisdn)
  
    setStatus(data.message)
      console.log("status of blacklist  : ",status)

  }

  const handleOnBlacklist = () => {
  if (!validateMSISDN(msisdn)) {
    setError("Le format du MSISDN est invalide.");
    return;
  }
  setError("");
  setShowBlacklistModal(true);
};



  const whitelist = async () => {
    const data = await WhitelistMsisdn(msisdn)
    setStatus(data.message)
        console.log("status of whitelist  : ",status)

  }

  const handleOnWhitelist = () => {
  if (!validateMSISDN(msisdn)) {
    setError("Le format du MSISDN est invalide.");
    return;
  }
  setError("");
  setShowWhitelistModal(true);
};



  const reset = async () => {
    const data = await resetNbCalls(msisdn)
    setStatus(data.message)
    console.log("status of reset nb calls  : ",status)

  }

 const handleOnReset = () => {
  if (!validateMSISDN(msisdn)) {
    setError("Le format du MSISDN est invalide.");
    return;
  }
  setError("");
  setShowResetModal(true);
};


  const handleOnVerify = () => {
    isMsisdnBlacklisted()
  }


  const isMsisdnBlacklisted = async () => {
    const data = await isBlacklisted(msisdn)
    setStatus(data.message)
    console.log("status of is blacklisted  : ",status)
  }

  return (
    <div>

    
    <main className="flex flex-1 items-center justify-center py-12">
      
      <div className="w-full max-w-md space-y-8 bg-white p-8 border border-gray-200 rounded-xl shadow transition-all duration-300 cursor-pointer hover:shadow-2xl hover:bg-white/80">

        <div>
          <h2 className="text-center text-3xl font-bold text-gray-900">Gérer MSISDN</h2>
          <p className="mt-2 text-center text-sm">Entrez un numéro de téléphone pour le gérer.</p>
        </div>
        <MSISDNInput value={msisdn} onChange={setMsisdn} error={error} />
        <ActionButtons
          isLoading={isLoading}
          onVerify={handleOnVerify}
          onBlacklist={handleOnBlacklist}
  onWhitelist={handleOnWhitelist}
  onReset={handleOnReset}
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
  onConfirm={async () => {
  setIsLoading(true);
  try {
    const data = await blacklistMsisdn(msisdn);
    setStatus(data.message);
  } catch (err) {
    console.error(err);
    setStatus("Erreur lors du blacklistage.");
  } finally {
    setIsLoading(false);
    setShowBlacklistModal(false);
  }
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
  onConfirm={async () => {
  setIsLoading(true);
  try {
    const data = await blacklistMsisdn(msisdn);
    setStatus(data.message);
  } catch (err) {
    console.error(err);
    setStatus("Erreur lors du whitelistage.");
  } finally {
    setIsLoading(false);
    setShowWhitelistModal(false);
  }
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
  onConfirm={async () => {
  setIsLoading(true);
  try {
    const data = await blacklistMsisdn(msisdn);
    setStatus(data.message);
  } catch (err) {
    console.error(err);
    setStatus("Erreur lors de la réinitialisation du nombre d'appels.");
  } finally {
    setIsLoading(false);
    setShowResetModal(false);
  }
}}
/>

      </main>
      </div>
  );
};

export default MsisdnPage;


