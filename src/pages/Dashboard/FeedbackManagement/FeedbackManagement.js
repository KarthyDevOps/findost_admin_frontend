import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
// Internal Component
import FeedbackManagementComp from "component/Dashboard/FeedbackManagement";
// Helpers
import { checkAndReturnViewableComponent, history } from 'helpers';
import { getadminPrivileges } from "helpers/privileges";

const FeedbackManagement = ({ privilegesData = {} }) => {
  const dispatch = useDispatch();
  const { feedbackManagement = {} } = privilegesData || {};

  useEffect(() => {
    getadminPrivileges(dispatch);
  }, []);

  useEffect(() => {
    const redirectTo = checkAndReturnViewableComponent(privilegesData, feedbackManagement);
    if (redirectTo) return history.push(redirectTo?.to);
  }, []);

  return (
    <div>
      <FeedbackManagementComp {...feedbackManagement} />
    </div>
  );
};

export default FeedbackManagement;
