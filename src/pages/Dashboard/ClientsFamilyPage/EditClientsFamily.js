import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
// Internal Component
import EditClientsFamilyComp from 'component/Dashboard/ClientsFamily/EditClientsFamilyComp'
// Helpers
import { checkAndReturnViewableComponent, history } from 'helpers';
import { getadminPrivileges } from "helpers/privileges";


const EditClientsFamily = ({ privilegesData = {} }) => {
  const dispatch = useDispatch();
  const { clientFamilyManagement = {} } = privilegesData || {};

  useEffect(() => {
    getadminPrivileges(dispatch);
  }, []);

  useEffect(() => {
    const redirectTo = checkAndReturnViewableComponent(privilegesData, clientFamilyManagement);
    if (redirectTo) return history.push(redirectTo?.to);
  }, [privilegesData]);

  return (
    <div><EditClientsFamilyComp  {...clientFamilyManagement} /></div>
  )
}

export default EditClientsFamily