import React, { useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { checkAndReturnViewableComponent } from 'helpers';
import AddStaff from 'component/Dashboard/StaffManagement/AddStaff/AddStaff';

const AddStaffManagement = ({ privilegesData = {} }) => {
  const { staffManagement = {} } = privilegesData || {};

  useEffect(() => {
    const redirectTo = checkAndReturnViewableComponent(privilegesData, staffManagement);
    if (redirectTo) {
      console.log("toto", redirectTo)
      // return <Redirect to={redirectData.to} />;
    }
  }, []);

  return (
    <div><AddStaff {...staffManagement} /></div>
  )
}

export default AddStaffManagement