import React from "react";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  icon: React.ReactNode;
  title: string;
  description: string;
  onConfirm: () => void;
  confirmLabel: string;
  confirmType?: "primary" | "danger" | "warning";
}

const Modal = ({
  open,
  onClose,
  icon,
  title,
  description,
  onConfirm,
  confirmLabel,
  confirmType = "primary"
}: ModalProps) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-md" onClick={onClose}>
      <div 
        className="mx-4 w-full max-w-md rounded-xl border border-gray-200 bg-white p-6 shadow-2xl dark:border-gray-700 dark:bg-gray-800"
        onClick={e => e.stopPropagation()}
      >
        <div className="text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/30">
            {icon}
          </div>
          <h3 className="mt-3 text-lg font-medium text-gray-900 dark:text-white">
            {title}
          </h3>
          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
            {description}
          </p>
          <div className="mt-6 flex justify-center gap-4">
            <button
              className={`rounded-md px-4 py-2 text-sm font-medium transition-all duration-200 ${
                confirmType === "danger"
                  ? "bg-red-600 text-white hover:bg-red-700 hover:scale-[1.02]"
                  : "bg-blue-600 text-white hover:bg-blue-700 hover:scale-[1.02]"
              }`}
              onClick={onConfirm}
            >
              {confirmLabel}
            </button>
            <button
              className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition-all duration-200 hover:bg-gray-50 hover:scale-[1.02] dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
              onClick={onClose}
            >
              Annuler
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;