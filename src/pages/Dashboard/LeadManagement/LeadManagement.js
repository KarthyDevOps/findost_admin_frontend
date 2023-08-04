import React, { useEffect } from "react";
import { useSelector } from "react-redux";

// Internal Component
import LeadManagementComp from "component/Dashboard/LeadManagement";

const LeadManagement = () => {

  // access for Fee management
  const leadAccess = useSelector(
    (state) => state?.home?.privileges?.leadManagement
  );

  return (
    <div>
      <LeadManagementComp leadAccess={leadAccess} />
    </div>
  );
};

export default LeadManagement;
