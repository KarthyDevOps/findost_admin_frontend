import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
// Internal Component
import TemplateManagementComp from "component/Dashboard/Template Management";
// Helpers
import { checkAndReturnViewableComponent, history } from 'helpers';
import { getadminPrivileges } from "helpers/privileges";

const TemplateManagement = ({ privilegesData = {} }) => {
  const dispatch = useDispatch();
  const { templateManagement = {} } = privilegesData || {};

  useEffect(() => {
    getadminPrivileges(dispatch);
  }, []);

  useEffect(() => {
    const redirectTo = checkAndReturnViewableComponent(privilegesData, templateManagement);
    if (redirectTo) return history.push(redirectTo?.to);
  }, [privilegesData]);

  return (
    <div>
      <TemplateManagementComp {...templateManagement} />
    </div>
  );
};

export default TemplateManagement;
