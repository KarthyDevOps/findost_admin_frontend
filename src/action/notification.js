import { endpoints } from "config/api";
import axios from "axios";


export const getAllNotification = async (dispatch, params = {}, isLoad = true) => {
    try {
        isLoad && dispatch({ type: "SET_LOADER", payload: { isLoading: true } });
        let { data: { data, status } } = await axios({
            url: `${endpoints.calendar.NOTIFICATION_GET_LIST}`,
            method: "get",
            params
        });
        if (status == 200) {
            dispatch({ type: "GET_ALL_NOTIFICATION", payload: { notifications: data } });
        }
    } catch (err) {
        console.log("err", err);
    } finally {
        isLoad && dispatch({ type: "SET_LOADER", payload: { isLoading: false } });
    }
};


export const markAsRead = async (dispatch, data) => {
    try {
        let { data: { status } } = await axios({
            url: `${endpoints.calendar.NOTIFICATION_UPDATE_LIST}?id=${data?.id}&isRead=true`,
            method: "put",
            // data,
            isShowMessage: false
        });
        // if (status == 200) getAllNotification(dispatch, {}, false);
        return true;
    } catch (err) {
        console.log("err - ", err);
    }
};

