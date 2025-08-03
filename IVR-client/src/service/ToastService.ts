import { toast, type ToastOptions } from "react-toastify";

const toastConfig: ToastOptions = {
  position: "top-right",
  autoClose: 2000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: "light",
  className: "font-sans",
  style: {
    background: '#ffffff',   // Tailwind blue-600
    color: '#18181b',
  
    fontWeight: 500,
    fontSize: '14px',
    borderRadius: '8px',
    padding: '12px 16px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
  },

  progressClassName: "custom-toast-progress"
  
};




export const toastInfo = (message: string) => {
  toast.info(message, toastConfig);
};

export const toastSuccess = (message: string) => {
  toast.success(message, toastConfig);
};

export const toastWarning = (message: string) => {
  toast.warning(message, toastConfig);
};

export const toastError = (message: string) => {
  toast.error(message, toastConfig);
};