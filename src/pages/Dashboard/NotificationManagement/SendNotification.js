import React, { useEffect } from 'react';
import SendNotificationComp from 'component/Dashboard/NotificationManagementComp/SendNotificationComp';
import { Redirect } from 'react-router-dom';
import { checkAndReturnViewableComponent } from 'helpers';

const SendNotification = ({ privilegesData = {} }) => {
  const { notificationManagement = {} } = privilegesData || {};

  useEffect(() => {
    const redirectTo = checkAndReturnViewableComponent(privilegesData, notificationManagement);
    if (redirectTo) {
      console.log("toto", redirectTo)
      // return <Redirect to={redirectData.to} />;
    }
  }, []);

  return (
    <div><SendNotificationComp /></div>
  )
}

export default SendNotification