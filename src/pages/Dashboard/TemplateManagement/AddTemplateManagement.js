import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
// Internal Component
import AddTempleteManagementcomp from "component/Dashboard/Template Management/AddTemplateManagementcomp/AddTemplateManagementcomp";
// Helpers
import { checkAndReturnViewableComponent, history } from 'helpers';
import { getadminPrivileges } from "helpers/privileges";

const AddTemplateManagement = ({ privilegesData = {} }) => {
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
      <AddTempleteManagementcomp {...templateManagement} />
    </div>
  );
};

export default AddTemplateManagement;
