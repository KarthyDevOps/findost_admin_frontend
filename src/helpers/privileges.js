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
  };
  try {
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
