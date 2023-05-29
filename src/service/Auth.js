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
    url: `${endpoints.auth.GET_sTAFF}`,
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
