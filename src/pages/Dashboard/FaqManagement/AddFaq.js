import React, { useEffect } from "react";
import AddFaqComp from "component/Dashboard/FaqManagementComp/AddFaqComp";
import { Redirect } from 'react-router-dom';
import { checkAndReturnViewableComponent } from 'helpers';

const AddFaq = ({ privilegesData = {} }) => {
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
      <AddFaqComp {...faqManagement} />
    </div>
  );
};

export default AddFaq;
