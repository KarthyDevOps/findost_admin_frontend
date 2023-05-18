import { useForm } from "react-hook-form";
import React, { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { Toast } from "service/toast";
import { Link } from "react-router-dom";
// Styles
import "../Login/style.scss";
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

const Forgetpassword = (props, type = "text", label) => {
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
    history.push("/auth/resetpassword");
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="login_page">
        <div className="container-fluid">
          <div className="row ">
            <div className=" login_filed col-lg-5 ">
              <div className="row page  mt-3">
                <div className="login_logo col-lg-12 ">
                  <img className="mx-auto d-block" src={login_logo}></img>

                  <h6 className="login ">Forgot password</h6>
                  {/* <h6 className="login ">Reset Password </h6> */}
                  {/* <h6 className="login ">Login </h6> */}

                  <p className="text-center">Please provide registed email id to send reset link</p>
                </div>

                <div className="userbox">
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
                </div>

                <div className="forget ">
                  <Link to="/auth/login">
                    <span className="forget">Login Instead</span>
                  </Link>
                  <div className="login_btn  mt-3">
                    {/* <NormalButton loginButton label="Login" /> */}
                    <NormalButton loginButton label="Send Reset Link" />
                    {/* <NormalButton loginButton label="confirm" /> */}
                  </div>
                </div>
              </div>
            </div>

            
            <div className="login_frame ms-4 ps-5  col-lg-7">
              <div className="clip"></div>
              <div className="bg_slide">
                <img className=" d-block mx-auto" src={loginpage_frame}></img>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default Forgetpassword;
