import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
// Internal Component
import StaffManagementComp from 'component/Dashboard/StaffManagement';
// Helpers
import { checkAndReturnViewableComponent, history } from 'helpers';
import { getadminPrivileges } from "helpers/privileges";

const StaffManagemnet = ({ privilegesData = {} }) => {
  const dispatch = useDispatch();
  const { staffManagement = {} } = privilegesData || {};

  useEffect(() => {
    getadminPrivileges(dispatch);
  }, []);

  useEffect(() => {
    const redirectTo = checkAndReturnViewableComponent(privilegesData, staffManagement);
    if (redirectTo) return history.push(redirectTo?.to);
  }, [privilegesData]);

  return (
    <div>
      <StaffManagementComp {...staffManagement} />
    </div>
  )
}

export default StaffManagemnet