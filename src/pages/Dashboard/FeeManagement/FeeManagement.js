import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
// Internal Component
import FeeManagementComp from "component/Dashboard/FeeManagementComp/FeeManagementComp";
// Helpers
import { checkAndReturnViewableComponent, history } from "helpers";
import { getadminPrivileges } from "helpers/privileges";

const FeeManagement = ({ privilegesData = {} }) => {
  const dispatch = useDispatch();
  const { feeManagement = {} } = privilegesData || {};

  useEffect(() => {
    getadminPrivileges(dispatch);
  }, []);

  useEffect(() => {
    const redirectTo = checkAndReturnViewableComponent(
      privilegesData,
      feeManagement
    );
    if (redirectTo) return history.push(redirectTo?.to);
  }, [privilegesData]);

  return (
    <div>
      <FeeManagementComp feeAccess={feeManagement} />
    </div>
  );
};

export default FeeManagement;
