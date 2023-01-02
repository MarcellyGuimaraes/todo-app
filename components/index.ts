import { toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

export const notify = (type?: string, message?: string) => {
  switch (type) {
    case "success":
      toast.success(message, {
        autoClose: 3000,

        pauseOnHover: false,
        theme: "colored",
      });
      break;
    case "error":
      toast.error(message, {
        autoClose: 3000,
        pauseOnHover: false,
        theme: "colored",
      });
      break;
    case "warning":
      toast.warning(message, {
        autoClose: 3000,
        pauseOnHover: false,
        theme: "colored",
      });
      break;

    default:
      toast("🦄 Wow so easy!");
      break;
  }
};
