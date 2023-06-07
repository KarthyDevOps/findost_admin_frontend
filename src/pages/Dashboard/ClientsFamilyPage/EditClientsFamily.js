import React, { useEffect } from 'react'
import EditClientsFamilyComp from 'component/Dashboard/ClientsFamily/EditClientsFamilyComp'
import { Redirect } from 'react-router-dom';
import { checkAndReturnViewableComponent } from 'helpers';

const EditClientsFamily = ({ privilegesData = {} }) => {
  const { clientFamilyManagement = {} } = privilegesData || {};

  useEffect(() => {
    const redirectTo = checkAndReturnViewableComponent(privilegesData, clientFamilyManagement);
    if (redirectTo) {
      console.log("toto", redirectTo)
      // return <Redirect to={redirectData.to} />;
    }
  }, [])

  return (
    <div><EditClientsFamilyComp  {...clientFamilyManagement} /></div>
  )
}

export default EditClientsFamily