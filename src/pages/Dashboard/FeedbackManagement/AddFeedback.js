import React, { useEffect } from "react";
import AddFeedbackcomp from "component/Dashboard/FeedbackManagement/AddFeedbackcomp/AddFeedbackcomp";
import { Redirect } from 'react-router-dom';
import { checkAndReturnViewableComponent } from 'helpers';

const AddFeedback = ({ privilegesData = {} }) => {
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
      <AddFeedbackcomp {...feedbackManagement} />
    </div>
  );
};

export default AddFeedback;
