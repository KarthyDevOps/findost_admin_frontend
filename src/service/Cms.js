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
      params : params,
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