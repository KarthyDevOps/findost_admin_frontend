import React, { useEffect } from "react";
import { useSelector } from "react-redux";
// Internal Component
import FeeManagementComp from "component/Dashboard/FeeManagementComp/FeeManagementComp";

const FeeManagement = () => {
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
      <FeeManagementComp
        segmentAccess={segmentAccess}
        registrationAccess={registrationAccess}
      />
    </div>
  );
};

export default FeeManagement;
