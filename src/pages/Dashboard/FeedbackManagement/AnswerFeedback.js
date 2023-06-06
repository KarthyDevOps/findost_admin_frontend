import React, { useEffect } from 'react';
import AnswerFeedbackcomp from 'component/Dashboard/FeedbackManagement/AnswerFeedback/AnswerFeedback';
import { Redirect } from 'react-router-dom';
import { checkAndReturnViewableComponent } from 'helpers';

const AnswerFeedback = ({ privilegesData = {} }) => {
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
      <AnswerFeedbackcomp {...feedbackManagement} />
    </div>
  )
}

export default AnswerFeedback