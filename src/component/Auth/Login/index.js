import { useForm } from "react-hook-form";
import React, { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { Toast } from "service/toast";
import { Link } from "react-router-dom";
import rectangle from "../../../assets/images/Rectangle.svg";
// Styles
import "./style.scss";
import instagram_logo from "../../../assets/images/instagram_icon.svg";
import facebook_logo from "../../../assets/images/facebook_icon.svg";
import twitter_logo from "../../../assets/images/twitter_icon.svg";
import username_icon from "../../../assets/images/user.svg";
import login_logo from "../../../assets/images/findostLogo.svg";
import password_icon from "../../../assets/images/lock.svg";
import loginpage_frame from "../../../assets/images/Frame.svg";
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
import InputBox from "component/common/InputBox/InputBox";

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
      <div className="">
        <div className="container-fluid">
          <div className="row ">
            <div className="  col-lg-5 ">
              <div className="row page  mt-3">
                <div className="login_logo col-lg-12 ">
                  <img className="mx-auto d-block" src={login_logo}></img>

                  {/* <h6 className="login ">Forgot password</h6> */}
                  {/* <h6 className="login ">Reset Password </h6> */}
                  <h6 className="login ">Login </h6>

                  {/* <p>Please provide registed email id to send reset link</p> */}
                </div>
                <>
                  {/* user name box */}
                  <div className="userbox">
                    <InputBox
                      className="login_input"
                      type={"text"}
                      placeholder="user name"
                      Iconic
                      errors={errors}
                      name="username"
                      register={register({
                        required: true,
                        pattern: /^[a-zA-Z0-9]+$/,
                      })}
                    />
                    <FormErrorMessage
                      error={errors.username}
                      messages={{
                        required: "User name is required",
                        pattern: "Invalid User name ",
                      }}
                    />
                    <span className="userbox_icon">
                      <img src={username_icon}></img>
                    </span>
                  </div>
                </>
                {/* email.id */}

                {/* <div className="userbox">
                    <InputBox
                      className="login_input"
                      placeholder="Email Id"
                      Iconic
                  errors={errors}

                      name="emailId"
                        register={register({
                          required: true,
                          pattern: /\S+@\S+\.\S+/,
                        })}
                    />
                     <FormErrorMessage
                  error={errors.emailId}
                  messages={{
                    required: "Mail ID is required",
                    pattern: "Invalid Mail ID",
                  }}
                />
                    <span className="userbox_icon">
                      <img src={username_icon}></img>
                    </span>
                  </div> */}

                {/* password box */}
                <div className="passwordbox">
                  <InputBox
                    className="login_input"
                    placeholder="Password"
                    Iconic
                    errors={errors}
                    type={"password"}
                    name="password"
                    register={register({
                      required: true,
                    })}
                  />
                  <FormErrorMessage
                    error={errors.password}
                    messages={{
                      required: "Password is required",
                    }}
                  />
                  <span className="passwordbox_icon">
                    <img src={password_icon}></img>
                  </span>
                </div>

                {/* Reset password */}

                {/* <div className="newPassword_box">
                      <InputBox
                        className="login_input"
                        placeholder="new Password"
                        Iconic
                  errors={errors}

                        type={ "password"}
                      name="password"
                      register={register({
                        required: true,
                      })}
                      />
                      <span className="newpassword_icon">
                        <img src={password_icon}></img>
                      </span>
                    </div> */}

                {/* <div className="newPassword_box">
                    <InputBox
                      className="login_input"
                      placeholder="confirm Password"
                      Iconic
                  errors={errors}

                      type={ "password"}
                      name="password"
                      register={register({
                        required: true,
                      })}
                    />
                       <FormErrorMessage
                  error={errors.password}
                  messages={{
                    required: "Password is required",
                  }}
                />
                    <span className="newpassword_icon">
                      <img src={password_icon}></img>
                    </span>
                  </div> */}
                <div className="forget ">
                  <Link to="/auth/forget">
                    <span className="forget">Forget Password ?</span>
                  </Link>
                  <Link to="#">
                    {/* <span className="forget">Login Instead</span> */}
                  </Link>
                  <div className="login_btn  mt-3">
                    <NormalButton loginButton label="Login" />
                    {/* <NormalButton loginButton label="Send Reset Link" /> */}
                    {/* <NormalButton loginButton label="confirm" /> */}
                  </div>

                  <div className="social col-lg-10 ">
                    <p className=" "> Follows Us On </p>
                  </div>
                  <div className="social_logo">
                    <img src={twitter_logo}></img>
                    <img src={instagram_logo}></img>
                    <img src={facebook_logo}></img>
                  </div>
                </div>
              </div>
            </div>

            <div className="login_frame   col-lg-7">
              <div className="container ">
                <div className="bg_slide ">
                  <img className=" d-block mx-auto" src={loginpage_frame}></img>
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
