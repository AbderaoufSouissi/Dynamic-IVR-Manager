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
  confirmType = "primary",
}: ModalProps) => {
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-md px-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-xl sm:w-[90%] md:w-[80%] lg:w-[60%] rounded-xl border border-gray-200 bg-white p-6 shadow-2xl dark:border-gray-700 dark:bg-gray-800"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/30">
            {icon}
          </div>
          <h3 className="mt-3 text-lg font-medium text-gray-900 dark:text-white">
            {title}
          </h3>
          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400 whitespace-pre-line">
  {description}
</p>

          <div className="mt-6 flex justify-center gap-4 flex-wrap">
            <button
              className={`rounded-md cursor-pointer px-4 py-2 text-sm font-medium transition-all duration-200 ${
                confirmType === "danger"
                  ? "text-white px-5 py-2 font-semibold  focus:outline-none focus:ring-2 focus:ring-offset-2 text-sm cursor-pointer bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 disabled:from-gray-400 disabled:to-gray-500 rounded-xl transition-all duration-200 focus:ring-red-500/20 transform hover:scale-[1.02] active:scale-[0.98] disabled:transform-none disabled:cursor-not-allowed shadow-lg"
                  : "bg-blue-600 text-white hover:bg-blue-700 hover:scale-[1.02]"
              }`}
              onClick={onConfirm}
            >
              {confirmLabel}
            </button>
            <button
              className="rounded-md border cursor-pointer border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition-all duration-200 hover:bg-gray-50 hover:scale-[1.02] dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
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
