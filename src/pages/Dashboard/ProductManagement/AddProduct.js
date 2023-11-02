import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
// Internal Component
import AddProductcomp from 'component/Dashboard/ProductManagement/AddProductcomp/AddProductcomp';
// Helpers
import { checkAndReturnViewableComponent, history } from 'helpers';
import { getadminPrivileges } from "helpers/privileges";

const AddProduct = ({ privilegesData = {} }) => {
  const dispatch = useDispatch();
  const { productManagement = {} } = privilegesData || {};

  useEffect(() => {
    getadminPrivileges(dispatch);
  }, []);

  useEffect(() => {
    const redirectTo = checkAndReturnViewableComponent(privilegesData, productManagement);
    if (redirectTo) return history.push(redirectTo?.to);
  }, [privilegesData]);

  return (
    <div>
      <AddProductcomp {...productManagement} />
      
    </div>
  )
}

export default AddProduct