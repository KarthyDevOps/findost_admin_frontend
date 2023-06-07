import React, { useEffect } from "react";
import EditContentManagementComp from "component/Dashboard/ContentManagement/EditContentManagementcomp/EditContentManagementComp";
import { Redirect } from 'react-router-dom';
import { checkAndReturnViewableComponent } from 'helpers';

const EditContentManagement = ({ privilegesData = {} }) => {
  const { contentManagement = {} } = privilegesData || {};

  useEffect(() => {
    const redirectTo = checkAndReturnViewableComponent(privilegesData, contentManagement);
    if (redirectTo) {
      console.log("toto", redirectTo)
      // return <Redirect to={redirectData.to} />;
    }
  }, []);

  return (
    <div>
      <EditContentManagementComp {...contentManagement} />
    </div>
  );
};

export default EditContentManagement;
