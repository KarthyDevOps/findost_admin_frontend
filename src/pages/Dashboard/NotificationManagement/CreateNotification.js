import React, { useEffect } from 'react';
import CreateNotificationComp from 'component/Dashboard/NotificationManagementComp/CreateNotificationComp';
import { Redirect } from 'react-router-dom';
import { checkAndReturnViewableComponent } from 'helpers';

const CreateNotification = ({ privilegesData = {} }) => {
  const { notificationManagement = {} } = privilegesData || {};

  useEffect(() => {
    const redirectTo = checkAndReturnViewableComponent(privilegesData, notificationManagement);
    if (redirectTo) {
      console.log("toto", redirectTo)
      // return <Redirect to={redirectData.to} />;
    }
  }, []);

  return (
    <div><CreateNotificationComp {...notificationManagement} /></div>
  )
}

export default CreateNotification