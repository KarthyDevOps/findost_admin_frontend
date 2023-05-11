import thunk from "redux-thunk";
import logger from "redux-logger";
import { decode } from "jsonwebtoken";
import { createStore, applyMiddleware } from "redux";

import { reducers } from "../../reducer";
// import { api } from "service/api";
import { Toast } from "service/toast";

export const store = createStore(
  reducers,
  applyMiddleware(thunk.withExtraArgument({ Toast, logger }))
);

export const history = require("history").createBrowserHistory();

export const decodeJWT = token => (token ? decode(token) : token);

// export const axiosErrorHandler = (error) => {
//   if (
//     error?.response?.data?.status === 401 ||
//     error?.response?.status === 401 ||
//     error?.request?.status === 401
//   ) {
//     localStorage.clear();
//     history.push("/auth");
//   }

//   if (error.response) return error.response;
//   else if (error.request) return error.request;
//   else return error.message;
// };
