import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
// Internal Component
import AddFaqComp from "component/Dashboard/FaqManagementComp/AddFaqComp";
// Helpers
import { checkAndReturnViewableComponent, history } from 'helpers';
import { getadminPrivileges } from "helpers/privileges";

const AddFaq = ({ privilegesData = {} }) => {
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
      <AddFaqComp {...faqManagement} />
    </div>
  );
};

export default AddFaq;
