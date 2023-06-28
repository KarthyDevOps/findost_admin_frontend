import { privilegesData } from "action/home";
import { getStaff } from "service/Auth";

const getPermissionObj = (arr = []) => {
  return {
    create: Boolean(arr?.includes?.("ADD")),
    view: Boolean(arr?.includes?.("VIEW")),
    edit: Boolean(arr?.includes?.("EDIT")),
    remove: Boolean(arr?.includes?.("DELETE"))
  }
}

const adminPrivileges = () => async (dispatch, getState) => {
  let filteredData = {
    "dashboard": {
      "create": true,
      "view": true,
      "edit": true,
      "remove": true
    },
    "calendarManagement": {
      "create": true,
      "view": true,
      "edit": true,
      "remove": true
    },
  };
  try {
    console.log("toto privelage Callll")
    let { data: { data = [], status } } = await getStaff();
    if (data?.[0]?.permissions) {
      for (let [key, value] of Object.entries(data?.[0]?.permissions)) {
        filteredData[key] = getPermissionObj(value);
      }
    }
    dispatch(privilegesData(filteredData));
  } catch (error) {
    console.log("error in adminPrivileges", error)
  } finally {
    return filteredData;
  }
};

export const getadminPrivileges = async (dispatch) => {
  let filteredData = {
    "dashboard": {
      "create": true,
      "view": true,
      "edit": true,
      "remove": true
    },
    "calendarManagement": {
      "create": true,
      "view": true,
      "edit": true,
      "remove": true
    },
  };
  try {
    console.log("toto privelage gettttt")
    let { data: { data = [], status } } = await getStaff();
    if (data?.[0]?.permissions) {
      for (let [key, value] of Object.entries(data?.[0]?.permissions)) {
        filteredData[key] = getPermissionObj(value);
      }
    }
    dispatch(privilegesData(filteredData));
  } catch (error) {
    console.log("error in adminPrivileges", error)
  } finally {
    return filteredData;
  }
};

export default adminPrivileges;
