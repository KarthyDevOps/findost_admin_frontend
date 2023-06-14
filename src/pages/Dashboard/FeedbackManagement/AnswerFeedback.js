import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
// Internal Component
import AnswerFeedbackcomp from 'component/Dashboard/FeedbackManagement/AnswerFeedback/AnswerFeedback';
// Helpers
import { checkAndReturnViewableComponent, history } from 'helpers';
import { getadminPrivileges } from "helpers/privileges";

const AnswerFeedback = ({ privilegesData = {} }) => {
  const dispatch = useDispatch();
  const { feedbackManagement = {} } = privilegesData || {};

  useEffect(() => {
    getadminPrivileges(dispatch);
  }, []);

  useEffect(() => {
    const redirectTo = checkAndReturnViewableComponent(privilegesData, feedbackManagement);
    if (redirectTo) return history.push(redirectTo?.to);
  }, [privilegesData]);

  return (
    <div>
      <AnswerFeedbackcomp {...feedbackManagement} />
    </div>
  )
}

export default AnswerFeedback