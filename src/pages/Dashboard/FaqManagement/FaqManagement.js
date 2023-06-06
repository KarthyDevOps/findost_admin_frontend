import React, { useEffect }  from "react";
import FaqManagementComp from "component/Dashboard/FaqManagementComp/FaqManagementComp";
import { Redirect } from 'react-router-dom';
import { checkAndReturnViewableComponent } from 'helpers';

const FaqManagement = ({ privilegesData = {} }) => {
  const { faqManagement = {} } = privilegesData || {};

  useEffect(() => {
    const redirectTo = checkAndReturnViewableComponent(privilegesData, faqManagement);
    if (redirectTo) {
      console.log("toto", redirectTo)
      // return <Redirect to={redirectData.to} />;
    }
  }, []);

  return (
    <div>
      <FaqManagementComp {...faqManagement} />
    </div>
  );
};

export default FaqManagement;
