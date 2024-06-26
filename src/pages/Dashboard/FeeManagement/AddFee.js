import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
// Internal Component
import AddFeeComp from "component/Dashboard/FeeManagementComp/AddFeeComp";
// Helpers
import { checkAndReturnViewableComponent, history } from "helpers";
import { getadminPrivileges } from "helpers/privileges";

const AddFee = ({ privilegesData = {} }) => {
  const dispatch = useDispatch();
  const { feeManagement = {} } = privilegesData || {};

  useEffect(() => {
    getadminPrivileges(dispatch);
  }, []);

  useEffect(() => {
    const redirectTo = checkAndReturnViewableComponent(
      privilegesData,
      feeManagement
    );
    if (redirectTo) return history.push(redirectTo?.to);
  }, [privilegesData]);

  // access for Fee management
  // const feeAccess = useSelector(
  //   (state) => state?.home?.privileges?.feeManagement
  // );

  return (
    <div>
      <AddFeeComp feeAccess={feeManagement} />
    </div>
  );
};

export default AddFee;
