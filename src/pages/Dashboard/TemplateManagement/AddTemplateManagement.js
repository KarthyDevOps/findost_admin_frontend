import React, { useEffect } from 'react';
import AddTempleteManagementcomp from "component/Dashboard/Template Management/AddTemplateManagementcomp/AddTemplateManagementcomp";
import { Redirect } from 'react-router-dom';
import { checkAndReturnViewableComponent } from 'helpers';

const AddTemplateManagement = ({ privilegesData = {} }) => {
  const { templateManagement = {} } = privilegesData || {};

  useEffect(() => {
    const redirectTo = checkAndReturnViewableComponent(privilegesData, templateManagement);
    if (redirectTo) {
      console.log("toto", redirectTo)
      // return <Redirect to={redirectData.to} />;
    }
  }, []);

  return (
    <div>
      <AddTempleteManagementcomp {...templateManagement} />
    </div>
  );
};

export default AddTemplateManagement;
