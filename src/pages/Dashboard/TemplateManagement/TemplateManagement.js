import React, { useEffect } from 'react';
import TemplateManagementComp from "component/Dashboard/Template Management";
import { Redirect } from 'react-router-dom';
import { checkAndReturnViewableComponent } from 'helpers';

const TemplateManagement = ({ privilegesData = {} }) => {
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
      <TemplateManagementComp {...templateManagement} />
    </div>
  );
};

export default TemplateManagement;
