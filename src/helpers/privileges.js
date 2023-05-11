import { decodeJWT } from "service/helpers";
import { privilegesData } from "action/home";
import { getToken } from "service/helpers/utilities";

const makeTrue = obj => {
  if (typeof obj === "object") {
    obj.create = true;
    obj.view = true;
    obj.edit = true;
    obj.delete = true;
  }
  return obj;
};

const adminPrivileges = () => async (dispatch, getState) => {

  let filteredData = {
    "patientManagement": {
      "create": true,
      "view": true,
      "edit": true,
      "delete": true
    },
    "dashboard": {
      "create": true,
      "view": true,
      "edit": true,
      "delete": true
    },
  };

  dispatch(privilegesData(filteredData));
  return filteredData;
};

export default adminPrivileges;
