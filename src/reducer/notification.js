import { notification } from "antd";

const initialState = {
  isOpen: false,
  notifications: [],
  isLoading: false
};


export default (state = initialState, { type, payload }) => {
  switch (type) {
    case "TOGGLE_NOTIFICATION": {
      return {
        ...state,
        isOpen: payload.isOpen
      };
    };
    case "SET_LOADER": {
      return {
        ...state,
        isLoading: payload.isLoading
      };
    };
    case "GET_ALL_NOTIFICATION": {
      return {
        ...state,
        notifications: payload.notifications
      };
    }
    default: {
      return state;
    }
  }
};
