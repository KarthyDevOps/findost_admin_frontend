import { useForm } from "react-hook-form";
import React, { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { Toast } from "service/toast";
// Styles
import "./style.scss";

// Internal components
import LoginInput from "component/common/LoginInput";
import FormErrorMessage from "component/common/ErrorMessage";
import NormalButton from "component/common/NormalButton/NormalButton";

// Service
import { SignInAPI } from "service/Auth";

// Helpers
import { history } from "helpers";
import Privileges from "helpers/privileges";
import { Encrypt } from "helpers";

const LoginComp = (props, type = "text", label) => {
  const { register, handleSubmit, errors, reset, setError } = useForm({
    mode: "onChange",
  });
  const [emailId, setemailId] = useState("");
  const [password, setpassword] = useState("");
  const dispatch = useDispatch();

  const onSubmit = async (inputs) => {

    // const { data: { status, data } = {} } = await SignInAPI({
    //   emailId: inputs?.emailId,
    //   password: Encrypt(inputs?.password),
    // });
    
    // if (status !== 200 || !data?.token) {
    //   if (data && /email/gi.test(data))
    //     setError("emailId", { type: "invalid", shouldFocus: true });
    //   if (data && /password/gi.test(data))
    //     setError("password", { type: "passowordNotMatch", shouldFocus: true });

    //   if (status === 400 && data) {
    //     Toast({ type: "error", message: data });
    //   }
    //   return;
    // }

    // localStorage.removeItem("token");
    // localStorage.setItem("token", data?.token);
    // await dispatch(Privileges());
    // reset({ emailId: "", password: "" });
    history.push("/admin/dashboard");
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="inner-image">
        <div className="container-fluid">
          <div className="row no-gutter">
            <div className=" col-md-4 col-lg-7 bg-image">
              <div className="container">
                <div className="row py-3 text-center d-none d-md-none d-lg-block ">
                  <div className="col-md-9 col-lg-8 mx-auto"></div>
                </div>
                <div className="container pt-3 px-0 px-md-0 px-lg-5">
                  <img src={"meradoc"} className="logoWeb" />
                </div>

                <div className="row py-5 ml-5 mt-4">
                  <div>
                    <div>
                      <h4 className="welcome">Welcome to </h4>
                    </div>
                    <div>
                      <h4 className="title">
                        Admin
                      </h4>
                    </div>
                  </div>

                  <div className="right-footer">
                    <p className="footer-right">
                      “Loren Ipsum content here”
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="login col-md-8 col-lg-5">
              <div className=" d-flex align-items-center">
                <div className="container ">
                  <div className="row py-5 text-center">
                    <div className="col-md-6 col-lg-6 mx-auto"></div>
                  </div>
                  <div className="row ">
                    <div className="col-md-9 col-lg-9 mx-auto p-0">
                      <h2 className="login-heading">Welcome to Admin</h2>
                      <h4 className="mt-3">Admin Login</h4>

                      <div className="mt-5">
                        <LoginInput
                          errors={errors}
                          type={"text"}
                          value={emailId}
                          placeholder="Email ID"
                          name="emailId"
                          onChange={setemailId}
                          register={register({
                            required: true,
                            pattern: /\S+@\S+\.\S+/,
                          })}
                        />
                        <FormErrorMessage
                          error={errors?.emailId?.message || errors.emailId}
                          messages={{
                            required: "Email is required",
                            pattern: "Invalid Mail ID",
                            invalid: "Invalid Email ID",
                          }}
                        />
                      </div>
                      <div className="mt-4">
                        <LoginInput
                          errors={errors}
                          value={password}
                          placeholder="Password"
                          type="password"
                          name="password"
                          onChange={setpassword}
                          register={register({
                            required: true,
                          })}
                        />
                        <FormErrorMessage
                          error={errors.password}
                          messages={{
                            required: "Password is required",
                            passowordNotMatch: "Password Didn't Match",
                          }}
                        />
                      </div>

                      <div className="mt-5">
                        <NormalButton
                          loginButton
                          label="Log In"
                          //onClick={handleSubmit(onSubmit)}
                        />
                      </div>
                      {/* <div className="footer py-5">
                      <label className="account">
                        Don’t have an account?
                        <Link to="/auth/sign-up" className="signUp-link">
                          Sign Up
                        </Link>
                      </label>
                    </div> */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default LoginComp;
