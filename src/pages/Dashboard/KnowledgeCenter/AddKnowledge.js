import React, { useEffect } from 'react';
import AddKnowledgeComp from 'component/Dashboard/KnowledgeCenterComp/AddKnowledgeComp';
import { Redirect } from 'react-router-dom';
import { checkAndReturnViewableComponent } from 'helpers';

const AddKnowledge = ({ privilegesData = {} }) => {
  const { knowledgeCenterManagement = {} } = privilegesData || {};

  useEffect(() => {
    const redirectTo = checkAndReturnViewableComponent(privilegesData, knowledgeCenterManagement);
    if (redirectTo) {
      console.log("toto", redirectTo)
      // return <Redirect to={redirectData.to} />;
    }
  }, []);

  return (
    <div><AddKnowledgeComp {...knowledgeCenterManagement} /></div>
  )
}

export default AddKnowledge