import axios from "axios";
import { history } from "helpers";
import { endpoints } from "config/api";
import { axiosErrorHandler } from "./helpers/axiosHelpers";

export const getProductList = async (params) => {
  let request = await axios({
    method: "get",
    url: `${endpoints.cms.LIST_PRODUCTS}`,
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    params: params,
  });
  return request;
};

export const addProduct = async (data) => {
  const request = await axios({
    method: "post",
    url: endpoints.cms.ADD_PRODUCT,
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    data: data,
  }).catch(axiosErrorHandler);
  return request;
};

export const getProduct = async (params) => {
  const request = await axios({
    method: "get",
    url: endpoints.cms.GET_PRODUCT,
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    params,
  }).catch(axiosErrorHandler);
  return request;
};

export const deleteProduct = async (params) => {
  const request = await axios({
    method: "delete",
    url: endpoints.cms.DELETE_PRODUCT,
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    params,
  }).catch(axiosErrorHandler);
  return request;
};

export const updateProduct = async (body, id) => {
  const request = await axios({
    method: "put",
    url: `${endpoints.cms.UPDATE_PRODUCT}?productId=${id}`,
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    data: body,
  }).catch(axiosErrorHandler);
  return request;
};

export const getContentList = async (params) => {
  let request = await axios({
    method: "get",
    url: `${endpoints.cms.LIST_CONTENT}`,
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    params: params,
  }).catch(axiosErrorHandler);
  return request;
};

export const deleteContentList = async (params) => {
  let request = await axios({
    method: "delete",
    url: `${endpoints.cms.DELETE_CONTENT}`,
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    params,
  }).catch(axiosErrorHandler);
  return request;
};

export const getContent = async (params) => {
  const request = await axios({
    method: "get",
    url: endpoints.cms.GET_CONTENT,
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    params,
  }).catch(axiosErrorHandler);
  return request;
};
export const updateContent = async (body, id) => {
  const request = await axios({
    method: "put",
    url: `${endpoints.cms.UPDATE_CONTENT}?id=${id}`,
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    data: body,
  }).catch(axiosErrorHandler);
  return request;
};
export const getTemplateList = async (params) => {
  let request = await axios({
    method: "get",
    url: `${endpoints.cms.LIST_TEMPLATE}`,
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    params: params,
  }).catch(axiosErrorHandler);
  return request;
};
export const addTemplate = async (data) => {
  let request = await axios({
    method: "post",
    url: `${endpoints.cms.ADD_TEMPLATE}`,
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    data: data,
  }).catch(axiosErrorHandler);
  return request;
};
export const updateTemplate = async (body, templateId) => {
  const request = await axios({
    method: "put",
    url: `${endpoints.cms.UPDATE_TEMPLATE}?templateId=${templateId}`,
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    data: body,
  }).catch(axiosErrorHandler);
  return request;
};
export const getTemplate = async (params) => {
  const request = await axios({
    method: "get",
    url: `${endpoints.cms.GET_TEMPLATE}`,
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    params,
  }).catch(axiosErrorHandler);
  return request;
};
export const deletetemplateList = async (params) => {
  let request = await axios({
    method: "delete",
    url: `${endpoints.cms.DELETE_TEMPLATE}`,
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    params,
  }).catch(axiosErrorHandler);
  return request;
};
export const getFAQList = async (params) => {
  let request = await axios({
    method: "get",
    url: `${endpoints.cms.LIST_FAQ}`,
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    params: params,
  }).catch(axiosErrorHandler);
  return request;
};
export const addFAQ = async (data) => {
  let request = await axios({
    method: "post",
    url: `${endpoints.cms.ADD_FAQ}`,
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    data: data,
  }).catch(axiosErrorHandler);
  return request;
};
export const updateFAQ = async (body, id) => {
  const request = await axios({
    method: "put",
    url: `${endpoints.cms.UPDATE_FAQ}?faqId=${id}`,
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    data: body,
  }).catch(axiosErrorHandler);
  return request;
};
export const getFAQ = async (params) => {
  const request = await axios({
    method: "get",
    url: `${endpoints.cms.GET_FAQ}`,
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    params,
  }).catch(axiosErrorHandler);
  return request;
};
export const deleteFAQList = async (params) => {
  let request = await axios({
    method: "delete",
    url: `${endpoints.cms.DELETE_FAQ}`,
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    params,
  }).catch(axiosErrorHandler);
  return request;
};
export const updateSiteSetting = async (body, id) => {
  const request = await axios({
    method: "put",
    url: `${endpoints.cms.UPDATE_SITE_SETTING}?Id=${id}`,
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    data: body,
  }).catch(axiosErrorHandler);
  return request;
};
export const getSiteSetting = async (params) => {
  const request = await axios({
    method: "get",
    url: `${endpoints.cms.GET_SITE_SETTING}`,
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    params,
  }).catch(axiosErrorHandler);
  return request;
};