import React from "react";
import { Redirect } from 'react-router-dom';

import Forgetpassword from 'component/Auth/Forgetpassword';

const Forget_Password = () => {

  if (localStorage.getItem('token')) return <Redirect to={'/admin'} />;

  return (
    <div>
      <Forgetpassword />
    </div>
  );
};

export default Forget_Password;