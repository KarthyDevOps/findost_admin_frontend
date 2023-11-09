import axios from "axios";
import { endpoints } from "config/api";
import { axiosErrorHandler } from "./helpers/axiosHelpers";

export const getLead = async (params) => {
  const request = await axios({
    method: "get",
    url: endpoints.lead.LEAD_GET,
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    params,
  }).catch(axiosErrorHandler);
  return request;
};

export const getIpoList = async (params) => {
  const request = await axios({
    method: "get",
    url: endpoints.lead.IPO_LIST,
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    params,
  }).catch(axiosErrorHandler);
  return request;
};

export const getDashboardDetails = async () => {
  const request = await axios({
    method: "post",
    url: endpoints.lead.DASHBOARD_DETAILS,
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  }).catch(axiosErrorHandler);
  return request;
};

export const updateIpo = async (body) => {
  const request = await axios({
    method: "post",
    url: endpoints.lead.IPO_UPDATE,
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    data: body,
  }).catch(axiosErrorHandler);
  return request;
};
