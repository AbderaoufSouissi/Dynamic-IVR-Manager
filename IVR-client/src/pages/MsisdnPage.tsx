import { useState } from "react";
import MSISDNInput from "../components/MSISDNInput";
import ActionButtons from "../components/buttons/ActionButtons";
import { StatusMessage } from "../components/StatusMessage";
import Modal from "../components/modal/Modal";

import { FiAlertTriangle } from "react-icons/fi";
import {
  blacklistMsisdn,
  isBlacklisted,
  resetNbCalls,
  WhitelistMsisdn,
} from "../service/MsisdnService";
import axios from "axios";

const MsisdnPage = () => {
  const [msisdn, setMsisdn] = useState("");
  const [error, setError] = useState("");
  const [status, setStatus] = useState("Le numéro est invalide");
  const [isLoading, setIsLoading] = useState(false);
  const [showBlacklistModal, setShowBlacklistModal] = useState(false);
  const [showWhitelistModal, setShowWhitelistModal] = useState(false);
  const [showResetModal, setShowResetModal] = useState(false);

  const validateMSISDN = (number: string) => /^\d{8,15}$/.test(number);


const blacklist = async () => {
  setIsLoading(true);
  try {
    const data = await blacklistMsisdn(msisdn);
    setStatus(data.message);
    console.log(status);
  } catch (error: unknown) {
    console.error(error);
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 404) {
        setStatus("Blacklistage impossible, MSISDN introuvable.");
      } else {
        setStatus("Erreur lors du blacklistage.");
      }
    } else {
      setStatus("Erreur inconnue.");
    }
  } finally {
    setIsLoading(false);
    setShowBlacklistModal(false);
  }
};

  const handleOnBlacklist = () => {
    if (!validateMSISDN(msisdn)) {
      setError("Le format du MSISDN est invalide.");
      return;
    }
    setError("");
    setShowBlacklistModal(true);
  };


const whitelist = async () => {
  setIsLoading(true);
  try {
    const data = await WhitelistMsisdn(msisdn);
    setStatus(data.message);
  } catch (error) {
    console.error(error);
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 404) {
        setStatus("Whitelistage impossible, MSISDN introuvable.");
      } else {
        setStatus("Erreur lors du whitelistage.");
      }
    } else {
      setStatus("Erreur inconnue.");
    }
  } finally {
    setIsLoading(false);
    setShowWhitelistModal(false);
  }
};


  const handleOnWhitelist = () => {
    if (!validateMSISDN(msisdn)) {
      setError("Le format du MSISDN est invalide.");
      return;
    }
    setError("");
    setShowWhitelistModal(true);
  };


const reset = async () => {
  setIsLoading(true);
  try {
    const data = await resetNbCalls(msisdn);
    setStatus(data.message);
    console.log(status);
  } catch (error) {
    console.error(error);
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 404) {
        setStatus("MSISDN introuvable.");
      } else {
        setStatus("Erreur lors de la réinitialisation du nombre d'appels.");
      }
    } else {
      setStatus("Erreur inconnue.");
    }
  } finally {
    setIsLoading(false);
    setShowResetModal(false);
  }
};


  const handleOnReset = () => {
    if (!validateMSISDN(msisdn)) {
      setError("Le format du MSISDN est invalide.");
      return;
    }
    setError("");
    setShowResetModal(true);
  };

  const handleOnVerify = () => {
    if (!validateMSISDN(msisdn)) {
      setError("Le format du MSISDN est invalide.");
      return;
    }
    setError("");
    isMsisdnBlacklisted();
  };

  const isMsisdnBlacklisted = async () => {
  try {
    const data = await isBlacklisted({ msisdn });
    setStatus(data.message);
    console.log("status of is blacklisted:", data.message);
  } catch (error) {
    console.error(error);

    if (axios.isAxiosError(error)) {
      if (error.response?.status === 404) {
        setStatus("MSISDN introuvable.");
      } else {
        setStatus("Erreur lors de la vérification du blacklistage.");
      }
    } else {
      setStatus("Erreur inconnue.");
    }
  }
};

  return (
    <div className="h-screen overflow-hidden">
      <main className="flex flex-1 items-center justify-center py-12 h-full">
        <div className="w-full max-w-md space-y-8 bg-white p-8 border border-gray-200 rounded-xl shadow transition-all duration-300 cursor-pointer hover:shadow-2xl hover:bg-white/80">
          <div>
            <h2 className="text-center text-3xl font-bold text-gray-900">
              Gérer MSISDN
            </h2>
            <p className="mt-2 text-center text-sm">
              Entrez un numéro de téléphone pour le gérer.
            </p>
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
          onConfirm={blacklist}
        />

        <Modal
          open={showWhitelistModal}
          onClose={() => setShowWhitelistModal(false)}
          icon={<FiAlertTriangle />}
          title="Confirmer le whitelistage"
          description={`Êtes-vous sûr de vouloir whitelister ce numéro ${msisdn} ?`}
          confirmLabel="Confirmer"
          confirmType="primary"
          onConfirm={whitelist}
        />

        <Modal
          open={showResetModal}
          onClose={() => setShowResetModal(false)}
          icon={<FiAlertTriangle />}
          title="Réinitialiser le compteur"
          description={`Êtes-vous sûr de vouloir réinitialiser le nombre d'appels pour ${msisdn} ?`}
          confirmLabel="Confirmer"
          confirmType="warning"
          onConfirm={reset}
        />
      </main>
    </div>
  );
};

export default MsisdnPage;
