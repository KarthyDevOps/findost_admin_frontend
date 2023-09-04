import React, { useEffect } from "react";
import ApManagementComp from "component/Dashboard/ApManagement/index";
import { useSelector, useDispatch } from "react-redux";
// Helpers
import { checkAndReturnViewableComponent, history } from "helpers";
import { getadminPrivileges } from "helpers/privileges";

const ApManagement = ({ privilegesData = {} }) => {
  const dispatch = useDispatch();
  const { apManagement = {} } = privilegesData || {};

  useEffect(() => {
    getadminPrivileges(dispatch);
  }, []);

  useEffect(() => {
    const redirectTo = checkAndReturnViewableComponent(
      privilegesData,
      apManagement
    );
    if (redirectTo) return history.push(redirectTo?.to);
  }, [privilegesData]);

  // access for AP management
  // const apAccess = useSelector(
  //   (state) => state?.home?.privileges?.apManagement
  // );
  return (
    <div>
      <ApManagementComp apAccess={apManagement} />
    </div>
  );
};

export default ApManagement;
