import React, { useEffect } from 'react';
import { useDispatch } from "react-redux";
// Internal Component
import FaqManagementComp from "component/Dashboard/FaqManagementComp/FaqManagementComp";
// Helpers
import { checkAndReturnViewableComponent, history } from 'helpers';
import { getadminPrivileges } from "helpers/privileges";

const FaqManagement = ({ privilegesData = {} }) => {
  const dispatch = useDispatch();
  const { faqManagement = {} } = privilegesData || {};

  useEffect(() => {
    getadminPrivileges(dispatch);
  }, []);

  useEffect(() => {
    const redirectTo = checkAndReturnViewableComponent(privilegesData, faqManagement);
    if (redirectTo) return history.push(redirectTo?.to);
  }, [privilegesData]);

  return (
    <div>
      <FaqManagementComp {...faqManagement} />
    </div>
  );
};

export default FaqManagement;
