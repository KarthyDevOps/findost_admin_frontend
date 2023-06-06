import React, { useEffect } from 'react';
import StaffManagementComp from 'component/Dashboard/StaffManagement';
import { Redirect } from 'react-router-dom';
import { checkAndReturnViewableComponent } from 'helpers';

const StaffManagemnet = ({ privilegesData = {} }) => {
  const { staffManagement = {} } = privilegesData || {};

  useEffect(() => {
    const redirectTo = checkAndReturnViewableComponent(privilegesData, staffManagement);
    if (redirectTo) {
      console.log("toto", redirectTo)
      // return <Redirect to={redirectData.to} />;
    }
  }, []);
  return (
    <div>
      <StaffManagementComp {...staffManagement} />
    </div>
  )
}

export default StaffManagemnet