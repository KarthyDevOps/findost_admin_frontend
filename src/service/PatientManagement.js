import axios from "axios";
import { endpoints } from "config/api";
import { axiosErrorHandler } from "./helpers/axiosHelpers";

export const editRegisterUser = async body => {
  const request = await axios({
    method: "put",
    url: `${endpoints.patientManagement.EDIT_REGISTER_USER}`,
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    data: body,
  }).catch(axiosErrorHandler);
  return request;
};

export const uploadImage = async data => {
  const request = await axios({
    data,
    method: "post",
    url: endpoints.patientManagement.UPLOAD_IMAGE,
    headers: {
      "content-type": "multipart/form-data",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  }).catch((e) => {
    return axiosErrorHandler(e, "uploadImage");
  });
  return request;
};

export const GetStateAndPincodeByApi = pin => {
  let request = axios({
    method: "get",
    url: `${endpoints.patientManagement.GET_BY_PINCODE}`,
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    params: pin,
  }).catch(axiosErrorHandler);
  return request;
};