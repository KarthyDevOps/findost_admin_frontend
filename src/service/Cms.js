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
  }).catch(axiosErrorHandler);
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

export const bulkDeleteProduct = async (body) => {
  const request = await axios({
    method: "delete",
    url: endpoints.cms.DELETE_PRODUCT,
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    data: body,
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
export const bulkDeleteContentList = async (body) => {
  let request = await axios({
    method: "delete",
    url: `${endpoints.cms.DELETE_CONTENT}`,
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    data: body,
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

export const addContent = async (data) => {
  const request = await axios({
    method: "post",
    url: endpoints.cms.ADD_CONTENT,
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    data: data,
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
export const bulkDeletetemplateList = async (body) => {
  let request = await axios({
    method: "delete",
    url: `${endpoints.cms.DELETE_TEMPLATE}`,
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    data: body,
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
export const bulkDeleteFaq = async (body) => {
  const request = await axios({
    method: "delete",
    url: endpoints.cms.DELETE_FAQ,
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    data: body,
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

export const getKnowledgeList = async (params) => {
  let request = await axios({
    method: "get",
    url: `${endpoints.cms.LIST_KNOWLEDGE}`,
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    params: params,
  }).catch(axiosErrorHandler);
  return request;
};

export const addKnowledge = async (data) => {
  let request = await axios({
    method: "post",
    url: `${endpoints.cms.ADD_KNOWLEDGE}`,
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    data: data,
  }).catch(axiosErrorHandler);
  return request;
};

export const updateKnowledge = async (body, id) => {
  const request = await axios({
    method: "put",
    url: `${endpoints.cms.UPDATE_KNOWLEDGE}?id=${id}`,
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    data: body,
  }).catch(axiosErrorHandler);
  return request;
};

export const getKnowledge = async (params) => {
  const request = await axios({
    method: "get",
    url: `${endpoints.cms.GET_KNOWLEDGE}`,
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    params,
  }).catch(axiosErrorHandler);
  return request;
};

export const deleteKnowledge = async (params) => {
  let request = await axios({
    method: "delete",
    url: `${endpoints.cms.DELETE_KNOWLEDGE}`,
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    params,
  }).catch(axiosErrorHandler);
  return request;
};
export const bulkDeleteKnowledge = async (body) => {
  let request = await axios({
    method: "delete",
    url: `${endpoints.cms.DELETE_KNOWLEDGE}`,
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    data: body,
  }).catch(axiosErrorHandler);
  return request;
};

export const getFeedbackList = async (params) => {
  let request = await axios({
    method: "get",
    url: `${endpoints.cms.LIST_FEEDBACK}`,
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    params: params,
  }).catch(axiosErrorHandler);
  return request;
};

export const addFeedback = async (data) => {
  const request = await axios({
    method: "post",
    url: endpoints.cms.ADD_FEEDBACK,
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    data: data,
  }).catch(axiosErrorHandler);
  return request;
};

export const getFeedback = async (params) => {
  const request = await axios({
    method: "get",
    url: endpoints.cms.GET_FEEDBACK,
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    params,
  }).catch(axiosErrorHandler);
  return request;
};

export const deleteFeedback = async (params) => {
  const request = await axios({
    method: "delete",
    url: endpoints.cms.DELETE_FEEDBACK,
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    params,
  }).catch(axiosErrorHandler);
  return request;
};

export const bulkDeleteFeedback = async (body) => {
  const request = await axios({
    method: "delete",
    url: endpoints.cms.DELETE_FEEDBACK,
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    data: body,
  }).catch(axiosErrorHandler);
  return request;
};

export const updateFeedback = async (body, id) => {
  const request = await axios({
    method: "put",
    url: `${endpoints.cms.UPDATE_FEEDBACK}?feedbackId=${id}`,
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    data: body,
  }).catch(axiosErrorHandler);
  return request;
};

export const getCategoryList = async (params) => {
  let request = await axios({
    method: "get",
    url: `${endpoints.cms.LIST_CATEGORY}`,
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    params: params,
  }).catch(axiosErrorHandler);
  return request;
};

export const addCategory = async (data) => {
  const request = await axios({
    method: "post",
    url: endpoints.cms.CREATE_CATEGORY,
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    data: data,
  }).catch(axiosErrorHandler);
  return request;
};
