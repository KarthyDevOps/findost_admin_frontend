import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
// Internal Component
import SendNotificationComp from 'component/Dashboard/NotificationManagementComp/SendNotificationComp';
// Helpers
import { checkAndReturnViewableComponent, history } from 'helpers';
import { getadminPrivileges } from "helpers/privileges";

const SendNotification = ({ privilegesData = {} }) => {
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
    <div><SendNotificationComp /></div>
  )
}

export default SendNotification