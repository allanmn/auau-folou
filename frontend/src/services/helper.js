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
