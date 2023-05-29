import axios from "axios";

import { history } from "helpers";
import { endpoints } from "config/api";
import { axiosErrorHandler } from "./axiosHelpers";


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