import React from "react";
import { Redirect } from 'react-router-dom';

import LoginComp from "component/Auth/Login";

const Login = () => {

  if (localStorage.getItem('token')) return <Redirect to={'/admin'} />;

  return (
    <div>
      <LoginComp />
    </div>
  );
};

export default Login;