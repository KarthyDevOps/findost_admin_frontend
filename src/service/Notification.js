import axios from "axios";
import { history } from "helpers";
import { endpoints } from "config/api";
import { axiosErrorHandler } from "./helpers/axiosHelpers";

// NotificationList
export const getNotificationList = async (params) => {
  let request = await axios({
    method: "get",
    url: `${endpoints.calendar.NOTIFICATION_GET_LIST}`,
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    params: params,
  }).catch(axiosErrorHandler);
  return request;
};
