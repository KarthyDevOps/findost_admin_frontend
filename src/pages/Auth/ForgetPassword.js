import React from "react";
import { Redirect } from 'react-router-dom';

import LoginComp from "component/Auth/Login";
import Forgetpassword from 'component/Auth/Forgetpassword'
const Login = () => {

  if (localStorage.getItem('token')) return <Redirect to={'/admin'} />;

  return (
    <div>
      <Forgetpassword />
    </div>
  );
};

export default Login;