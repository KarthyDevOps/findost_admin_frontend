import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
// Internal Component
import ClientFamily from "component/Dashboard/ClientsFamily/ClientsFamily";
// Helpers
import { checkAndReturnViewableComponent, history } from 'helpers';
import { getadminPrivileges } from "helpers/privileges";

const ClientsFamilyPage = ({ privilegesData = {} }) => {
  const dispatch = useDispatch();
  const { clientFamilyManagement = {} } = privilegesData || {};

  useEffect(() => {
    getadminPrivileges(dispatch);
  }, []);

  useEffect(() => {
    const redirectTo = checkAndReturnViewableComponent(privilegesData, clientFamilyManagement);
    if (redirectTo) return history.push(redirectTo?.to);
  }, [privilegesData])

  return (
    <div>
      <ClientFamily {...clientFamilyManagement} />
    </div>
  );
};

export default ClientsFamilyPage;
