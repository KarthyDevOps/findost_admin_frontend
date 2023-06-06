import React, { useEffect } from "react";
import ContentManagementComp from "component/Dashboard/ContentManagement";
import { Redirect } from 'react-router-dom';
import { checkAndReturnViewableComponent } from 'helpers';

const ContentManagement = ({ privilegesData = {} }) => {
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
      <ContentManagementComp {...contentManagement} />
    </div>
  );
};

export default ContentManagement;
