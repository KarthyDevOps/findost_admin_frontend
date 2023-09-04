import React, { useEffect } from "react";
import ViewApComp from "component/Dashboard/ApManagement/ViewAp/ViewApComp";
import { useDispatch } from "react-redux";
// Helpers
import { checkAndReturnViewableComponent, history } from "helpers";
import { getadminPrivileges } from "helpers/privileges";

const ViewApManagement = ({ privilegesData = {} }) => {
  const dispatch = useDispatch();
  const { apManagement = {} } = privilegesData || {};

  useEffect(() => {
    getadminPrivileges(dispatch);
  }, []);

  useEffect(() => {
    const redirectTo = checkAndReturnViewableComponent(
      privilegesData,
      apManagement
    );
    if (redirectTo) return history.push(redirectTo?.to);
  }, [privilegesData]);

  // access for AP management
  // const apAccess = useSelector(
  //   (state) => state?.home?.privileges?.apManagement
  // );
  return (
    <div>
      <ViewApComp apAccess={apManagement} />
    </div>
  );
};

export default ViewApManagement;
