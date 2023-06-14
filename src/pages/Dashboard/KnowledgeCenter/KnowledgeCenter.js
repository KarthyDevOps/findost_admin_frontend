import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
// Internal Component
import KnowledgeCenterComp from 'component/Dashboard/KnowledgeCenterComp/KnowledgeCenterComp';
// Helpers
import { checkAndReturnViewableComponent, history } from 'helpers';
import { getadminPrivileges } from "helpers/privileges";

const KnowledgeCenter = ({ privilegesData = {} }) => {
  const dispatch = useDispatch();
  const { knowledgeCenterManagement = {} } = privilegesData || {};

  useEffect(() => {
    getadminPrivileges(dispatch);
  }, []);

  useEffect(() => {
    const redirectTo = checkAndReturnViewableComponent(privilegesData, knowledgeCenterManagement);
    if (redirectTo) return history.push(redirectTo?.to);
  }, [privilegesData]);

  return (
    <div><KnowledgeCenterComp {...knowledgeCenterManagement} /></div>
  )
}

export default KnowledgeCenter