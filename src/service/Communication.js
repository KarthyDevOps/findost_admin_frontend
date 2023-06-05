import axios from "axios";
import { history } from "helpers";
import { endpoints } from "config/api";
import { axiosErrorHandler } from "./helpers/axiosHelpers";

// Notification Template
export const getNotificationTemplateList = async (params) => {
  let request = await axios({
    method: "get",
    url: `${endpoints.communication.NOTIFICATION_TEMPLATE_LIST}`,
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    params: params,
  });
  return request;
};

export const addNotificationTemplate = async (data) => {
  const request = await axios({
    method: "post",
    url: endpoints.communication.NOTIFICATION_TEMPLATE_CREATE,
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    data: data,
  }).catch(axiosErrorHandler);
  return request;
};

export const editNotificationTemplate = async (params) => {
  const request = await axios({
    method: "get",
    url: endpoints.communication.NOTIFICATION_TEMPLATE_GET,
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    params,
  }).catch(axiosErrorHandler);
  return request;
};

export const deleteNotificationTemplate = async (params) => {
  const request = await axios({
    method: "delete",
    url: endpoints.communication.NOTIFICATION_TEMPLATE_DELETE,
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    params,
  }).catch(axiosErrorHandler);
  return request;
};

export const updateNotificationTemplate = async (body, id) => {
  const request = await axios({
    method: "put",
    url: `${endpoints.communication.NOTIFICATION_TEMPLATE_UPDATE}?notificationTemplateId=${id}`,
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    data: body,
  }).catch(axiosErrorHandler);
  return request;
};

// Notification History
export const getNotificationHistoryList = async (params) => {
  let request = await axios({
    method: "get",
    url: `${endpoints.communication.NOTIFICATION_HISTORY_LIST}`,
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    params: params,
  });
  return request;
};

export const addNotificationHistory = async (data) => {
  const request = await axios({
    method: "post",
    url: endpoints.communication.NOTIFICATION_HISTORY_CREATE,
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    data: data,
  }).catch(axiosErrorHandler);
  return request;
};

export const editNotificationHistory = async (params) => {
  const request = await axios({
    method: "get",
    url: endpoints.communication.NOTIFICATION_HISTORY_GET,
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    params,
  }).catch(axiosErrorHandler);
  return request;
};

export const deleteNotificationHistory = async (params) => {
  const request = await axios({
    method: "delete",
    url: endpoints.communication.NOTIFICATION_HISTORY_DELETE,
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    params,
  }).catch(axiosErrorHandler);
  return request;
};

export const updateNotificationHistory = async (body, id) => {
  const request = await axios({
    method: "put",
    url: `${endpoints.communication.NOTIFICATION_HISTORY_UPDATE}?id=${id}`,
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    data: body,
  }).catch(axiosErrorHandler);
  return request;
};
