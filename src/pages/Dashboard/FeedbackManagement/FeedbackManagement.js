import React, { useEffect } from "react";
import FeedbackManagementComp from "component/Dashboard/FeedbackManagement";
import { Redirect } from 'react-router-dom';
import { checkAndReturnViewableComponent } from 'helpers';

const FeedbackManagement = ({ privilegesData = {} }) => {
  const { feedbackManagement = {} } = privilegesData || {};

  useEffect(() => {
    const redirectTo = checkAndReturnViewableComponent(privilegesData, feedbackManagement);
    if (redirectTo) {
      console.log("toto", redirectTo)
      // return <Redirect to={redirectData.to} />;
    }
  }, []);
  return (
    <div>
      <FeedbackManagementComp {...feedbackManagement} />
    </div>
  );
};

export default FeedbackManagement;
