import React, { useEffect } from "react";
import ClientFamily from "component/Dashboard/ClientsFamily/ClientsFamily";
import { Redirect } from 'react-router-dom';
import { checkAndReturnViewableComponent } from 'helpers';

const ClientsFamilyPage = ({ privilegesData = {} }) => {
  const { clientFamilyManagement = {} } = privilegesData || {};

  useEffect(() => {
    const redirectTo = checkAndReturnViewableComponent(privilegesData, clientFamilyManagement);
    if (redirectTo) {
      console.log("toto", redirectTo)
      // return <Redirect to={redirectData.to} />;
    }
  }, [])

  return (
    <div>
      <ClientFamily {...clientFamilyManagement} />
    </div>
  );
};

export default ClientsFamilyPage;
