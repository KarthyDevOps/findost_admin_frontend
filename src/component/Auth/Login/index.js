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
import { LoginAPI } from "service/Auth";

// Helpers
import { history } from "helpers";
import Privileges from "helpers/privileges";
import { Encrypt } from "helpers";
import InputBox from "component/common/InputBox/InputBox";
import { adminData } from "reducer/home";

const LoginComp = () => {
  const { register, handleSubmit, errors, reset, setError } = useForm({
    mode: "onChange",
  });
  const [emailId, setemailId] = useState("");
  const [password, setpassword] = useState("");
  const dispatch = useDispatch();

  const onSubmit = async (inputs) => {
    try {
      let body = {
        email: inputs?.emailId,
        password: inputs?.password,
      };
      const response = await LoginAPI(body);
      if (response.status === 200) {
        localStorage.removeItem("token");
        localStorage.setItem("token", response?.data?.data?.token);
        Toast({ type: "success", message: response.data.message });
        reset({ emailId: "", password: "" });
        history.push("/admin/dashboard");
      } else {
        Toast({ type: "error", message: response.data.message });
      }
    } catch (e) {
      console.log("e :>> ", e);
    }
  };
  return (
    <form>
      <div className="login_page">
        <div className="container-fluid">
          <div className="row ">
            <div className=" login_filed col-lg-5 ">
              <div className="row page  mt-3">
                <div className="login_logo col-lg-12 ">
                  <img
                    className="mx-auto my-auto d-block"
                    src={login_logo}
                  ></img>

                  <h6 className="login ">Login </h6>
                </div>
                <>
                  <div className="userbox">
                    <InputBox
                      className="login_input"
                      type={"email"}
                      placeholder="Email Id"
                      Iconic
                      errors={errors}
                      onChange={setemailId}
                      name="emailId"
                      register={register({
                        required: true,
                        pattern: /\S+@\S+\.\S+/,
                      })}
                    />
                    <FormErrorMessage
                      error={errors.emailId}
                      messages={{
                        required: "Email is required",
                        pattern: "Invalid Email Id ",
                      }}
                    />
                    <span className="userbox_icon">
                      <img src={username_icon}></img>
                    </span>
                  </div>
                </>

                <div className="passwordbox ">
                  <InputBox
                    className="login_input"
                    placeholder="Password"
                    Iconic
                    errors={errors}
                    type={"password"}
                    name="password"
                    onChange={setpassword}
                    register={register({
                      required: true,
                      minLength: 8,
                      maxLength: 16,
                      pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?& ]{8,}$/s,
                    })}
                  />
                  <FormErrorMessage
                    error={errors.password}
                    messages={{
                      required: "Password is required",
                      validate: "Passwords do not match",
                      minLength: "Password must contain atleast 8 letters",
                      maxLength: "Password should must contain only 16",
                      pattern: "Password must contain a special character",
                    }}
                  />
                  <span className="passwordbox_icon">
                    <img src={password_icon}></img>
                  </span>
                </div>

                <div className="forget ">
                  <Link to="/auth/forget">
                    <span className="forget">Forget Password ?</span>
                  </Link>

                  <div className="login_btn  mt-3">
                    <NormalButton
                      loginButton
                      label="Login"
                      onClick={handleSubmit(onSubmit)}
                    />
                  </div>

                  <div className="social col-lg-10 ">
                    <p className=" "> Follow Us On </p>
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

export default LoginComp;
