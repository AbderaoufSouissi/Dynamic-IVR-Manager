import { toast, type ToastOptions } from "react-toastify";

const toastConfig: ToastOptions = {
  position: "bottom-left",
  autoClose: 2000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: "light",
  
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