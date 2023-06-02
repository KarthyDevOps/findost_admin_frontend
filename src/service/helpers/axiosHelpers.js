import { history } from "component/Dashboard/ProductManagement/helpers";
import { Toast } from "service/toast";

export const axiosErrorHandler = (error, action, checkUnauthorized = true) => {
  const requestStatus = error?.request?.status;
  const responseStatus = error?.response?.status;
  const dataStatus = error?.response?.data?.status;
  if (!localStorage.getItem("token")) {
    history.push("/auth");
  }

  if (dataStatus === 400 || responseStatus === 400 || requestStatus === 400) {
    if (localStorage.getItem("token")) {
      //Toast({ type: "error", message: error?.response?.data?.data?.message });
      Toast({
        type: "error",
        message:
          error?.response?.data?.data?.message ||
          error?.response?.data?.message ||
          error?.response?.data?.data,
      });
    }
  }

  if (dataStatus === 401 || responseStatus === 401 || requestStatus === 401) {
    localStorage.clear();
    history.push("/auth");
  }

  if (
    checkUnauthorized &&
    (dataStatus === 409 || responseStatus === 409 || requestStatus === 409)
  ) {
    if (localStorage.getItem("token")) {
      // history.push("/doctor/dashboard");
      Toast({ type: "error", message: error?.response?.data?.message });
    }
  }

  if (action === "uploadImage") {
    if (dataStatus === 500 || responseStatus === 500 || requestStatus === 500) {
      if (localStorage.getItem("token")) {
        const message = error?.response?.data?.message;
        message && Toast({ type: "error", message });
      } else history.push("/auth");
    }
  }

  if (error.response) return error.response;
  else if (error.request) return error.request;
  else return error.message;
};
