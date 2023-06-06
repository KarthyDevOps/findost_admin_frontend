import React, { useEffect } from 'react';
import KnowledgeCenterComp from 'component/Dashboard/KnowledgeCenterComp/KnowledgeCenterComp';
import { Redirect } from 'react-router-dom';
import { checkAndReturnViewableComponent } from 'helpers';

const KnowledgeCenter = ({ privilegesData = {} }) => {
  const { knowledgeCenterManagement = {} } = privilegesData || {};

  useEffect(() => {
    const redirectTo = checkAndReturnViewableComponent(privilegesData, knowledgeCenterManagement);
    if (redirectTo) {
      console.log("toto", redirectTo)
      // return <Redirect to={redirectData.to} />;
    }
  }, []);

  return (
    <div><KnowledgeCenterComp {...knowledgeCenterManagement} /></div>
  )
}

export default KnowledgeCenter