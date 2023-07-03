import axios from "axios";
import { history } from "helpers";
import { endpoints } from "config/api";
import { axiosErrorHandler } from "./helpers/axiosHelpers";

// Calendar event 
export const getCalendarEventsList = async (params) => {
    let request = await axios({
      method: "get",
      url: `${endpoints.calendar.CALENDAR_EVENT_LIST}`,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      params: params,
    }).catch(axiosErrorHandler);
    return request;
  };
  
  export const addCalendarEvent = async (data) => {
    const request = await axios({
      method: "post",
      url: endpoints.calendar.CALENDAR_EVENT_CREATE,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      data: data,
    }).catch(axiosErrorHandler);
    return request;
  };
  
  export const getCalendarEvent = async (params) => {
    const request = await axios({
      method: "get",
      url: endpoints.calendar.CALENDAR_EVENT_GET,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      params,
    }).catch(axiosErrorHandler);
    return request;
  };
  
  export const deleteCalendarEvent = async (params) => {
    const request = await axios({
      method: "delete",
      url: endpoints.calendar.CALENDAR_EVENT_DELETE,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      params,
    }).catch(axiosErrorHandler);
    return request;
  };
  
  export const BulkDeleteCalendarEvent = async (body) => {
    const request = await axios({
      method: "delete",
      url: endpoints.calendar.CALENDAR_EVENT_DELETE,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      data: body,
    }).catch(axiosErrorHandler);
    return request;
  };
  
  export const updateCalendarEvent = async (body, id) => {
    const request = await axios({
      method: "put",
      url: `${endpoints.calendar.CALENDAR_EVENT_UPDATE}?id=${id}`,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      data: body,
    }).catch(axiosErrorHandler);
    return request;
  };