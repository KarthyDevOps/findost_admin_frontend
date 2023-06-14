import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
// Internal Component
import ContentManagementComp from "component/Dashboard/ContentManagement";
// Helpers
import { checkAndReturnViewableComponent, history } from 'helpers';
import { getadminPrivileges } from "helpers/privileges";

const ContentManagement = ({ privilegesData = {} }) => {
  const dispatch = useDispatch();
  const { contentManagement = {} } = privilegesData || {};

  useEffect(() => {
    getadminPrivileges(dispatch);
  }, []);

  useEffect(() => {
    const redirectTo = checkAndReturnViewableComponent(privilegesData, contentManagement);
    if (redirectTo) return history.push(redirectTo?.to);
  }, [privilegesData]);

  return (
    <div>
      <ContentManagementComp {...contentManagement} />
    </div>
  );
};

export default ContentManagement;
