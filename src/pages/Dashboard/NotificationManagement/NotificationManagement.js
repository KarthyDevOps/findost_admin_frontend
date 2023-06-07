import React, { useEffect } from 'react';
import NotificationManagementComp from 'component/Dashboard/NotificationManagementComp/NotificationManagementComp';
import { Redirect } from 'react-router-dom';
import { checkAndReturnViewableComponent } from 'helpers';

const NotificationManagement = ({ privilegesData = {} }) => {
  const { notificationManagement = {} } = privilegesData || {};

  useEffect(() => {
    const redirectTo = checkAndReturnViewableComponent(privilegesData, notificationManagement);
    if (redirectTo) {
      console.log("toto", redirectTo)
      // return <Redirect to={redirectData.to} />;
    }
  }, []);

  return (
    <div><NotificationManagementComp {...notificationManagement} /> </div>
  )
}

export default NotificationManagement