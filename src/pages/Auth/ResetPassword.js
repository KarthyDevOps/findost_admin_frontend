import React from "react";
import { Redirect } from 'react-router-dom';
import ResetPassword from "component/Auth/reset password";

const Reset_Password = () => {

  if (localStorage.getItem('token')) return <Redirect to={'/admin'} />;

  return (
    <div>
      <ResetPassword />
    </div>
  );
};

export default Reset_Password;