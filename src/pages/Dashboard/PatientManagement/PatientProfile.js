import React from "react";
import { Redirect, useParams } from "react-router-dom";

import PatientProfileComp from "component/Dashboard/PatientManagementComp/PatientProfileComp";

const PatientProfile = ({ privilegesData }) => {
  const { id } = useParams();
  const params = new URLSearchParams(window.location.search);
  const uui = params.get("uui");
  
  if (!privilegesData?.patientManagement?.view)
    return <Redirect to={"/admin/dashboard"} />;

  return (
    <div>
      <PatientProfileComp patientId={id || uui} privileges={privilegesData} />
    </div>
  );
};

export default PatientProfile;
