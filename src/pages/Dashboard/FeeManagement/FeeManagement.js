import React, { useEffect } from "react";
import { useSelector } from "react-redux";
// Internal Component
import FeeManagementComp from "component/Dashboard/FeeManagementComp/FeeManagementComp";

const FeeManagement = () => {
  // access for Fee management
  const feeAccess = useSelector(
    (state) => state?.home?.privileges?.feeManagement
  );

  return (
    <div>
      <FeeManagementComp feeAccess={feeAccess} />
    </div>
  );
};

export default FeeManagement;
