import React from "react";
import { Redirect } from 'react-router-dom';
import ResetPassword from "component/Auth/reset password";
import LoginComp from "component/Auth/Login";
import Forgetpassword from 'component/Auth/Forgetpassword'
const Reset_Password = () => {

  if (localStorage.getItem('token')) return <Redirect to={'/admin'} />;

  return (
    <div>
      <ResetPassword/>
    </div>
  );
};

export default Reset_Password;