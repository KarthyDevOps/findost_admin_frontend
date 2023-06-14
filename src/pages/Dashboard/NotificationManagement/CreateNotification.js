import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
// Internal Component
import CreateNotificationComp from 'component/Dashboard/NotificationManagementComp/CreateNotificationComp';
// Helpers
import { checkAndReturnViewableComponent, history } from 'helpers';
import { getadminPrivileges } from "helpers/privileges";

const CreateNotification = ({ privilegesData = {} }) => {
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
    <div><CreateNotificationComp {...notificationManagement} /></div>
  )
}

export default CreateNotification