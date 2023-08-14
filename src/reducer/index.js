import { combineReducers } from "redux";
import home from "./home"
import notification from "./notification";

export const reducers = combineReducers({
    home,
    notification

})