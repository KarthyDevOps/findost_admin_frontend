import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
// Internal Component
import EditContentManagementComp from "component/Dashboard/ContentManagement/EditContentManagementcomp/EditContentManagementComp";
// Helpers
import { checkAndReturnViewableComponent, history } from 'helpers';
import { getadminPrivileges } from "helpers/privileges";

const EditContentManagement = ({ privilegesData = {} }) => {
  const dispatch = useDispatch();
  const { contentManagement = {} } = privilegesData || {};

  useEffect(() => {
    getadminPrivileges(dispatch);
  }, []);

  useEffect(() => {
    const redirectTo = checkAndReturnViewableComponent(privilegesData, contentManagement);
    if (redirectTo) return history.push(redirectTo?.to);
  }, []);

  return (
    <div>
      <EditContentManagementComp {...contentManagement} />
    </div>
  );
};

export default EditContentManagement;
