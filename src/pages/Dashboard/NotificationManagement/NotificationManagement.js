import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
// Internal Component
import NotificationManagementComp from 'component/Dashboard/NotificationManagementComp/NotificationManagementComp';
// Helpers
import { checkAndReturnViewableComponent, history } from 'helpers';
import { getadminPrivileges } from "helpers/privileges";

const NotificationManagement = ({ privilegesData = {} }) => {
  const dispatch = useDispatch();
  const { notificationManagement = {} } = privilegesData || {};

  useEffect(() => {
    getadminPrivileges(dispatch);
  }, []);

  useEffect(() => {
    const redirectTo = checkAndReturnViewableComponent(privilegesData, notificationManagement);
    if (redirectTo) return history.push(redirectTo?.to);
  }, [privilegesData]);

  return (
    <div><NotificationManagementComp {...notificationManagement} /> </div>
  )
}

export default NotificationManagement