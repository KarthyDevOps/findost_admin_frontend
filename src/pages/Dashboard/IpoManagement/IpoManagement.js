import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
// Internal Component
import IpoManagementComp from "component/Dashboard/IpoManagement/IpoManagementComp";
// Helpers
import { checkAndReturnViewableComponent, history } from "helpers";
import { getadminPrivileges } from "helpers/privileges";

const IpoManagement = ({ privilegesData = {} }) => {
  const dispatch = useDispatch();
  const { ipoManagement = {} } = privilegesData || {};

  useEffect(() => {
    getadminPrivileges(dispatch);
  }, []);

  useEffect(() => {
    const redirectTo = checkAndReturnViewableComponent(
      privilegesData,
      ipoManagement
    );
    if (redirectTo) return history.push(redirectTo?.to);
  }, [privilegesData]);
  return (
    <div>
      <IpoManagementComp ipoManagement={ipoManagement} />
    </div>
  );
};

export default IpoManagement;
