import React, { useEffect } from "react";
import { useSelector } from "react-redux";
// Internal Component
import AddFeeComp from "component/Dashboard/FeeManagementComp/AddFeeComp";

const AddFee = () => {
  // access for Fee management
  const feeAccess = useSelector(
    (state) => state?.home?.privileges?.feeManagement
  );

  return (
    <div>
      <AddFeeComp feeAccess={feeAccess} />
    </div>
  );
};

export default AddFee;
