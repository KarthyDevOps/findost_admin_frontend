import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
// Internal Component
import AddKnowledgeComp from 'component/Dashboard/KnowledgeCenterComp/AddKnowledgeComp';
// Helpers
import { checkAndReturnViewableComponent, history } from 'helpers';
import { getadminPrivileges } from "helpers/privileges";

const AddKnowledge = ({ privilegesData = {} }) => {
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
    <div><AddKnowledgeComp {...knowledgeCenterManagement} /></div>
  )
}

export default AddKnowledge