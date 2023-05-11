import axios from "axios";

import { history } from "helpers";
import { endpoints } from "config/api";
import { axiosErrorHandler } from "./helpers/axiosHelpers";

export const SignInAPI = async (data) => {
  const request = await axios({
    method: "post",
    url: endpoints.auth.SIGN_IN,
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    data: data,
  }).catch(axiosErrorHandler);
  return request;
};

export const resetPassword = async (data) => {
  let request = await axios({
    method: "post",
    url: endpoints.auth.RESET_PASSWORD,
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    data: data,
  });
  return request;
};

export const verifyOtp = async (data) => {
  let request = await axios({
    method: "post",
    url: endpoints.auth.VERIFY_OTP,
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    data: data,
  });
  return request;
};

export const updateUser = async (data) => {
  let request = await axios({
    method: "put",
    url: endpoints.auth.UPDATE_USER,
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    data: data,
  });
  return request;
};

export const changePassword = async (data) => {
  let request = await axios({
    method: "put",
    url: endpoints.auth.CHANGE_PASSWORD,
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    data: data,
  });
  return request;
};

export const forgotPassword = async (data, token) => {
  let request = await axios({
    method: "put",
    url: endpoints.auth.FORGOT_PASSWORD,
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    data: data,
  });
  return request;
};

export const getUserById = async (id) => {
  let request = await axios({
    method: "get",
    url: `${endpoints.auth.GET_USER_BY_ID}/${id}`,
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  return request;
};

/** ------------------ @APPOINTMENT_MANAGEMENT_START ------------------ **/

export const GetAllAppointment = async (data) => {
  const request = await axios({
    method: "post",
    url: endpoints.appointment.GET_ALL_APPOINTMENT,
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    data: data,
  }).catch(axiosErrorHandler);
  return request;
};

export const GetAppointment = async ({ id }) => {
  const request = await axios({
    method: "get",
    url: endpoints.appointment.GET_APPOINTMENT + id,
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  }).catch(axiosErrorHandler);
  return request;
};

export const CancelAppointment = async ({ id, body }) => {
  const request = await axios({
    method: "post",
    url: endpoints.appointment.CANCEL_APPOINTMENT + id,
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    data: body,
  }).catch(axiosErrorHandler);
  return request;
};

export const RescheduleAppointment = async ({ id, ...data }) => {
  const request = await axios({
    method: "put",
    url: endpoints.appointment.RESCHEDULE_APPOINTMENT + id,
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    data,
  }).catch(axiosErrorHandler);
  return request;
};

export const GetALLSlot = async ({ doctorId, startDate, endDate }) => {
  let query = "";

  if (startDate) query += `?date=${startDate}`;

  const request = await axios({
    method: "get",
    url: `${endpoints.slot.GET_ALL_SLOT_BASED_ON_DOCTOR}${doctorId}${query}`,
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  }).catch(axiosErrorHandler);
  return request;
};

export const GetUserDataByNumber = async (mobileNumber) => {
  const request = await axios({
    method: "get",
    url: `${endpoints.appointment.GET_USER_DATA_BASED_ON_MOBILE_NUMBER}?mobile=${mobileNumber}`,
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  }).catch(axiosErrorHandler);
  return request;
};
export const GetUserDataByNumberandPatient = async (mobile, userId) => {
  const request = await axios({
    method: "get",
    url: `${endpoints.appointment.GET_USER_DATA_BASED_ON_MOBILE_NUMBER}?mobile=${mobile}&userId=${userId}`,
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  }).catch(axiosErrorHandler);
  return request;
};

export const GetUserDataByNumberforAccount = async (mobileNumber) => {
  const request = await axios({
    method: "get",
    url: `${endpoints.appointment.GET_USER_DATA_BASED_ON_MOBILE_NUMBER_ACCOUNT}?mobile=${mobileNumber}`,
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  }).catch(axiosErrorHandler);
  return request;
};
/** ------------------ @APPOINTMENT_MANAGEMENT_END ------------------ **/

/** ------------------ @CLINICAL_MANAGEMENT_START ------------------ **/

export const GetALLClinicalManagemet = async ({
  page = 1,
  size = 10,
  search,
}) => {
  let query = "";

  if (page) query += `&page=${page}`;
  if (size) query += `&size=${size}`;
  if (search && search.toString().trim() !== "") query += `&search=${search}`;

  const request = await axios({
    method: "get",
    url: `${endpoints.clinicalManagement.GET_ALL_DATA}?${query}`,
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  }).catch(axiosErrorHandler);
  return request;
};

export const GetClinicalManagemet = async (data) => {
  const request = await axios({
    method: "get",
    url: `${endpoints.clinicalManagement.GET_DATA + data?.id}`,
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  }).catch(axiosErrorHandler);
  return request;
};

export const CreateClinicalManagemet = async (data) => {
  const request = await axios({
    method: "post",
    url: `${endpoints.clinicalManagement.CREATE_DATA}`,
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    data,
  }).catch(axiosErrorHandler);
  return request;
};

export const UpdateClinicalManagemet = async (data) => {
  const request = await axios({
    method: "put",
    url: `${endpoints.clinicalManagement.UPDATE_DATA}`,
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    data,
  }).catch(axiosErrorHandler);
  return request;
};

export const DeleteClinicalManagemet = async (data) => {
  const request = await axios({
    method: "put",
    url: `${endpoints.clinicalManagement.DELETE_DATA}`,
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    data,
  }).catch(axiosErrorHandler);
  return request;
};

/** ------------------ @CLINICAL_MANAGEMENT_END ------------------ **/

export const GetALLDoctor = async ({
  doctorType = "SP",
  date,
  slotType = "",
  language = "",
}) => {
  let params = {
    doctorType,
  };
  if (date) params.date = date;
  if (slotType) params.slotType = slotType;
  if (language) params.language = language;
  const request = await axios({
    method: "get",
    url: `${endpoints.roaster.GET_ALL_DOCTOR}`,
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    params,
  }).catch(axiosErrorHandler);
  return request;
};
