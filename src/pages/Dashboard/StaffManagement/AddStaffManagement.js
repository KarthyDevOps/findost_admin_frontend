import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
// Internal Component
import AddStaff from 'component/Dashboard/StaffManagement/AddStaff/AddStaff';
// Helpers
import { checkAndReturnViewableComponent, history } from 'helpers';
import { getadminPrivileges } from "helpers/privileges";

const AddStaffManagement = ({ privilegesData = {} }) => {
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
    <div><AddStaff {...staffManagement} /></div>
  )
}

export default AddStaffManagement