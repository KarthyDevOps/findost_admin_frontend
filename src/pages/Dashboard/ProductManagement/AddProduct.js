import React, { useEffect } from 'react';
import AddProductcomp from 'component/Dashboard/ProductManagement/AddProductcomp/AddProductcomp';
import { Redirect } from 'react-router-dom';
import { checkAndReturnViewableComponent } from 'helpers';

const AddProduct = ({ privilegesData = {} }) => {
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
      <AddProductcomp {...productManagement} />
    </div>
  )
}

export default AddProduct