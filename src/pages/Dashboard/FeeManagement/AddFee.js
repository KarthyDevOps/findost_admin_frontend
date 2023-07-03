import React, { useEffect } from "react";
import { useSelector } from "react-redux";
// Internal Component
import AddFeeComp from "component/Dashboard/FeeManagementComp/AddFeeComp";

const AddFee = () => {
  // access for segment management
  const segmentAccess = useSelector(
    (state) => state?.home?.privileges?.segmentManagement
  );
  // access for segment management
  const registrationAccess = useSelector(
    (state) => state?.home?.privileges?.registersettingsManagement
  );

  return (
    <div>
      <AddFeeComp
        segmentAccess={segmentAccess}
        registrationAccess={registrationAccess}
      />
    </div>
  );
};

export default AddFee;
