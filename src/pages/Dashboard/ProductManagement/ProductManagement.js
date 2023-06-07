import React, { useEffect } from 'react';
import ProductManagementComp from 'component/Dashboard/ProductManagement';
import { Redirect } from 'react-router-dom';
import { checkAndReturnViewableComponent } from 'helpers';

const ProductManagement = ({ privilegesData = {} }) => {
  const { productManagement = {} } = privilegesData || {};

  useEffect(() => {
    const redirectTo = checkAndReturnViewableComponent(privilegesData, productManagement);
    if (redirectTo) {
      console.log("toto", redirectTo)
      // return <Redirect to={redirectData.to} />;
    }
  }, []);

  return (
    <div>
      <ProductManagementComp {...productManagement} />
    </div>
  )
}

export default ProductManagement