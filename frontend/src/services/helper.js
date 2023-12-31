import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export function showToastError(message) {
  toast.error(message, {
    position: "top-right",
    autoClose: 5000, // Close the toast after 5 seconds
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
  });
}

export function showWarning(message) {
  toast.warning(message, {
    position: "top-right",
    autoClose: 5000, // Close the toast after 5 seconds
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
  });
}

export function showSuccess(message) {
  toast.success(message, {
    position: "top-right",
    autoClose: 5000, // Close the toast after 5 seconds
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
  });
}
