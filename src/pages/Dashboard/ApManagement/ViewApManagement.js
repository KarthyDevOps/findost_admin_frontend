import React from "react";
import ViewApComp from "component/Dashboard/ApManagement/ViewAp/ViewApComp";
import { useSelector } from "react-redux";

const ViewApManagement = () => {
    // access for AP management
    const apAccess = useSelector(
      (state) => state?.home?.privileges?.apManagement
    );
  return (
    <div>
      <ViewApComp apAccess={apAccess} />
    </div>
  );
};

export default ViewApManagement;
