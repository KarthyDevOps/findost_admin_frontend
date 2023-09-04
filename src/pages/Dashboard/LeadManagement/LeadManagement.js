import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

// Internal Component
import LeadManagementComp from "component/Dashboard/LeadManagement";
// helpers
import { checkAndReturnViewableComponent, history } from "helpers";
import { getadminPrivileges } from "helpers/privileges";

const LeadManagement = ({ privilegesData = {} }) => {
  const dispatch = useDispatch();
  const { leadManagement = {} } = privilegesData || {};

  useEffect(() => {
    getadminPrivileges(dispatch);
  }, []);

  useEffect(() => {
    const redirectTo = checkAndReturnViewableComponent(
      privilegesData,
      leadManagement
    );
    if (redirectTo) return history.push(redirectTo?.to);
  }, [privilegesData]);

  // access for Fee management
  // const leadAccess = useSelector(
  //   (state) => state?.home?.privileges?.leadManagement
  // );

  return (
    <div>
      <LeadManagementComp leadAccess={leadManagement} />
    </div>
  );
};

export default LeadManagement;
