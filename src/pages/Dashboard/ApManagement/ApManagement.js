import React from "react";
import ApManagementComp from "component/Dashboard/ApManagement/index";
import { useSelector } from "react-redux";

const ApManagement = () => {
  // access for AP management
  const apAccess = useSelector(
    (state) => state?.home?.privileges?.apManagement
  );
  return (
    <div>
      <ApManagementComp apAccess={apAccess} />
    </div>
  );
};

export default ApManagement;
