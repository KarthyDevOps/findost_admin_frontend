import React, { useEffect } from 'react';
import { useDispatch } from "react-redux";
// Internal Component
import ProductManagementComp from 'component/Dashboard/ProductManagement';
// Helpers
import { checkAndReturnViewableComponent, history } from 'helpers';
import { getadminPrivileges } from "helpers/privileges";

const ProductManagement = ({ privilegesData = {} }) => {
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
      <ProductManagementComp {...productManagement} />
       
    </div>
  )
}

export default ProductManagement