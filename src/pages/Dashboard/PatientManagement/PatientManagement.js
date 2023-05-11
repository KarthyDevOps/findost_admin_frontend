import React from "react";
import { Redirect } from "react-router-dom";

import PatientManagementComp from "component/Dashboard/PatientManagementComp";

const PatientManagement = ({
  privilegesData: { patientManagement } = {},
  privilegesData,
}) => {
  if (!patientManagement?.view) return <Redirect to={"/admin/dashboard"} />;

  return (
    <div>
      <PatientManagementComp
        privileges={patientManagement}
        privilegesData={privilegesData}
        headerText={"Patient Management"}
      />
    </div>
  );
};

export default PatientManagement;
