import React from "react";

export function AuthLayout(props) {
  return (
    <div>
      <div className="login-wrapper">{props.children}</div>
    </div>
  );
}

// export default AuthLayout;
