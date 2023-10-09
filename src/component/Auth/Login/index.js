import { useForm } from "react-hook-form";
import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Toast } from "service/toast";
import { Link } from "react-router-dom";
import rectangle from "../../../assets/images/Rectangle.svg";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
// Styles
import "./style.scss";
// Images
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
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [emailId, setemailId] = useState("");
  const [password, setpassword] = useState("");
  const [formSubmitted, setFormSubmitted] = useState(false);
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
        setFormSubmitted(false);
      } else {
        Toast({ type: "error", message: response.data.message });
        setFormSubmitted(false);
      }
    } catch (e) {
      console.log("e :>> ", e);
      setFormSubmitted(false);
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
                    alt="Login-logo"
                  />

                  <h6 className="login">Login </h6>
                </div>
                <>
                  <div className="userbox mt-2">
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
                        pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      })}
                    />
                    <FormErrorMessage
                      error={errors.emailId}
                      messages={{
                        required: "Email is Required",
                        pattern: "Invalid Email Id ",
                      }}
                    />
                    <span className="userbox_icon">
                      <img src={username_icon} alt="icon"></img>
                    </span>
                  </div>
                </>

                <div className="passwordbox mt-3">
                  <InputBox
                    className="login_input"
                    placeholder="Password"
                    Iconic
                    errors={formSubmitted ? errors : {}}
                    type={isShowPassword ? "text" : "password"}
                    name="password"
                    onChange={setpassword}
                    register={register({
                      required: "Password is Required",
                      minLength: {
                        value: 8,
                      },
                      maxLength: {
                        value: 16,
                      },
                      pattern: {
                        value: /^(?=.*[A-Z])/,
                      },
                      validate: {
                        lowercase: (value) =>
                          /^(?=.*[a-z])/.test(value) ||
                          "Password must contain at least one lowercase letter",
                        containsDigit: (value) =>
                          /^(?=.*[0-9])/.test(value) ||
                          "Password must contain at least one numeric digit",
                        containsSpecial: (value) =>
                          /^(?=.*[!@#$%^&*])/.test(value) ||
                          "Password must contain at least one special character",
                      },
                    })}
                  />
                  {formSubmitted && (
                    <FormErrorMessage
                      error={errors.password}
                      messages={{
                        required: "Password is Required",
                        minLength: "Password must contain at least 8 letters",
                        maxLength:
                          "Password should contain at most 16 characters",
                        pattern:
                          "Password must contain at least one uppercase letter",
                        lowercase:
                          "Password must contain at least one lowercase letter",
                        containsDigit:
                          "Password must contain at least one Numeric",
                        containsSpecial:
                          "Password must contain at least one special character",
                      }}
                    />
                  )}

                  <span className="eyeIcons">
                    <img src={password_icon} alt="icon"></img>
                  </span>
                  <span className="eyeIcons">
                    {isShowPassword ? (
                      <span className="cursor-pointer">
                        <AiOutlineEye
                          onClick={() => setIsShowPassword(!isShowPassword)}
                          size={25}
                          color="#BDBDBD"
                        />
                      </span>
                    ) : (
                      <span className="cursor-pointer">
                        <AiOutlineEyeInvisible
                          onClick={() => setIsShowPassword(!isShowPassword)}
                          size={25}
                          color="#BDBDBD"
                        />
                      </span>
                    )}
                  </span>
                </div>

                <div className="forget ">
                  {errors.password ? (
                    <div className="mt-4">
                      <Link to="/auth/forget">
                        <span className="forget">Forgot Password?</span>
                      </Link>
                    </div>
                  ) : (
                    <Link to="/auth/forget">
                      <span className="forget">Forgot Password?</span>
                    </Link>
                  )}

                  <div
                    onClick={() => setFormSubmitted(true)}
                    className="login_btn  mt-3"
                  >
                    <NormalButton
                      loginButton1
                      label="Login"
                      onClick={handleSubmit(onSubmit)}
                    />
                  </div>

                  <div className="social col-lg-10 p-0 mt-3">
                    <p className=" "> Follow Us On </p>
                  </div>
                  <div className="social_logo">
                    <a
                      href="https://twitter.com/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <img src={twitter_logo} alt="twitter-logo" />
                    </a>
                    <a
                      href="https://www.facebook.com/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <img src={instagram_logo} alt="instagram-logo" />
                    </a>
                    <a
                      href="https://www.instagram.com/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <img src={facebook_logo} alt="facebook-logo" />
                    </a>
                  </div>
                  <div className="d-flex justify-content-center mt-3">
                    <Link to="/auth/disclaimer">
                      <span className="disclaimer">Disclaimer</span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            <div className="login_frame   col-lg-7">
              <div className="clip"></div>
              <div className="bg_slide">
                <img
                  className=" d-block mx-auto"
                  src={loginpage_frame}
                  alt=""
                ></img>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default LoginComp;
