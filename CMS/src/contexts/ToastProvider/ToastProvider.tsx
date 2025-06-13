import { toast, ToastContainer, ToastOptions } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./ToastProvider.css";

const defaultOptions: ToastOptions = {
  position: "top-center",
  autoClose: 2000,
  hideProgressBar: true,
  pauseOnHover: false,
  draggable: false,
  closeButton: false,
  progress: undefined,
  theme: "colored",
};

export const showToast = {
  success: (message: string, options: ToastOptions = {}) =>
    toast.success(message, { ...defaultOptions, ...options }),
  error: (message: string, options: ToastOptions = {}) =>
    toast.error(message, { ...defaultOptions, ...options }),
  info: (message: string, options: ToastOptions = {}) =>
    toast.info(message, { ...defaultOptions, ...options }),
  warning: (message: string, options: ToastOptions = {}) =>
    toast.warning(message, { ...defaultOptions, ...options }),
};

const ToastProvider = () => {
  return (
    <ToastContainer
      toastClassName="custom-toast"
      className="custom-toast-body"
    />
  );
};

export default ToastProvider;
