import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
// Internal Component
import AddFeedbackcomp from "component/Dashboard/FeedbackManagement/AddFeedbackcomp/AddFeedbackcomp";
// Helpers
import { checkAndReturnViewableComponent, history } from 'helpers';
import { getadminPrivileges } from "helpers/privileges";

const AddFeedback = ({ privilegesData = {} }) => {
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
      <AddFeedbackcomp {...feedbackManagement} />
    </div>
  );
};

export default AddFeedback;
