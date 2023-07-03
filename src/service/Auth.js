import axios from "axios";
import { endpoints } from "config/api";
import { axiosErrorHandler } from "./helpers/axiosHelpers";

export const LoginAPI = async (data) => {
  const request = await axios({
    method: "post",
    url: endpoints.auth.LOGIN_USER,
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    data: data,
  }).catch(axiosErrorHandler);
  return request;
};

export const getStaffList = async (params) => {
  let request = await axios({
    method: "get",
    url: `${endpoints.auth.GET_STAFF_LIST}`,
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    params: params,
  }).catch(axiosErrorHandler);
  return request;
};

export const addStaff = async (data) => {
  let request = await axios({
    method: "post",
    url: endpoints.auth.ADD_STAFF,
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    data: data,
  }).catch(axiosErrorHandler);
  return request;
};

export const getStaff = async (params) => {
  const request = await axios({
    method: "get",
    url: endpoints.auth.GET_STAFF,
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    params,
  }).catch(axiosErrorHandler);
  return request;
};

export const deleteStaff = async (params) => {
  const request = await axios({
    method: "delete",
    url: endpoints.auth.DELETE_STAFF,
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    params,
  }).catch(axiosErrorHandler);
  return request;
};

export const bulkDeleteStaff = async (body) => {
  const request = await axios({
    method: "delete",
    url: endpoints.auth.DELETE_STAFF,
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    data: body,
  }).catch(axiosErrorHandler);
  return request;
};

export const updateStaff = async (body, id) => {
  const request = await axios({
    method: "put",
    url: `${endpoints.auth.UPDATE_STAFF}?id=${id}`,
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    data: body,
  }).catch(axiosErrorHandler);
  return request;
};

export const getClientList = async (params) => {
  let request = await axios({
    method: "get",
    url: `${endpoints.auth.LIST_CLIENT}`,
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    params: params,
  }).catch(axiosErrorHandler);
  return request;
};

export const addClient = async (data) => {
  let request = await axios({
    method: "post",
    url: endpoints.auth.ADD_CLIENT,
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    data: data,
  }).catch(axiosErrorHandler);
  return request;
};

export const getClient = async (params) => {
  console.log("params", params);
  const request = await axios({
    method: "get",
    url: endpoints.auth.GET_CLIENT,
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    params,
  }).catch(axiosErrorHandler);
  return request;
};

export const deleteClient = async (params) => {
  const request = await axios({
    method: "delete",
    url: endpoints.auth.DELETE_CLIENT,
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    params,
  }).catch(axiosErrorHandler);
  return request;
};

export const bulkDeleteClient = async (body) => {
  const request = await axios({
    method: "delete",
    url: endpoints.auth.DELETE_CLIENT,
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    data: body,
  }).catch(axiosErrorHandler);
  return request;
};
export const updateClient = async (body, id) => {
  const request = await axios({
    method: "put",
    url: `${endpoints.auth.UPDATE_CLIENT}?id=${id}`,
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    data: body,
  }).catch(axiosErrorHandler);
  return request;
};

export const forgotPassword = async (data) => {
  let request = await axios({
    method: "post",
    url: endpoints.auth.FORGET_PASSWORD,
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    data: data,
  }).catch(axiosErrorHandler);
  return request;
};

export const resetPassword = async (data, token) => {
  let request = await axios({
    method: "post",
    url: endpoints.auth.RESET_PASSWORD,
    headers: {
      Authorization: `Bearer ${token || localStorage.getItem("token")}`,
    },
    data: data,
  }).catch(axiosErrorHandler);
  return request;
};

export const uploadImage = (formData) => {
  let request = axios({
    method: "post",
    url: endpoints.auth.IMAGE_UPLOAD,
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    data: formData,
  }).catch(axiosErrorHandler);
  return request;
};

export const getSegmentList = async (params) => {
  let request = await axios({
    method: "get",
    url: `${endpoints.auth.LIST_SEGMENT}`,
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    params: params,
  }).catch(axiosErrorHandler);
  return request;
};

export const addSegment = async (data) => {
  let request = await axios({
    method: "post",
    url: endpoints.auth.ADD_SEGMENT,
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    data: data,
  }).catch(axiosErrorHandler);
  return request;
};

export const getSegment = async (params) => {
  console.log("params", params);
  const request = await axios({
    method: "get",
    url: endpoints.auth.GET_SEGMENT,
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    params,
  }).catch(axiosErrorHandler);
  return request;
};

export const deleteSegment = async (params) => {
  const request = await axios({
    method: "delete",
    url: endpoints.auth.DELETE_SEGMENT,
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    params,
  }).catch(axiosErrorHandler);
  return request;
};

export const bulkDeleteSegment = async (body) => {
  const request = await axios({
    method: "delete",
    url: endpoints.auth.DELETE_SEGMENT,
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    data: body,
  }).catch(axiosErrorHandler);
  return request;
};
export const updateSegment = async (body, id) => {
  const request = await axios({
    method: "put",
    url: `${endpoints.auth.UPDATE_SEGMENT}?id=${id}`,
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    data: body,
  }).catch(axiosErrorHandler);
  return request;
};
export const updateRegisterFee = async (body, id) => {
  const request = await axios({
    method: "put",
    url: `${endpoints.auth.UPDATE_REGISTER_FEE}?id=${id}`,
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    data: body, 
  }).catch(axiosErrorHandler);
  return request;
};

export const getRegisterFee = async (params) => {
  const request = await axios({
    method: "get",
    url: `${endpoints.auth.GET_REGISTER_FEE}`,
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    params,
  }).catch(axiosErrorHandler);
  return request;
};
