import axios from "axios";

import { history } from "helpers";
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

export const getStaff = async (params) => {
  let request = await axios({
    method: "get",
    url: `${endpoints.auth.GET_STAFF}`,
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    params: params,
  });
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
  });
  return request;
};

export const editStaff = async (params) => {
  const request = await axios({
    method: "get",
    url: endpoints.auth.EDIT_STAFF,
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


export const getClient = async (params) => {
  let request = await axios({
    method: "get",
    url: `${endpoints.auth.LIST_CLIENT}`,
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    params: params,
  });
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
  });
  return request;
};

export const editClient = async (params) => {
  console.log('params', params)
  const request = await axios({
    method: "get",
    url: endpoints.auth.EDIT_CLIENT,
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