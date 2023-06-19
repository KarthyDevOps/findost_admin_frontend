import { useForm } from "react-hook-form";
import React, { useRef, useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
// Styles
import "../Login/style.scss";
import login_logo from "../../../assets/images/findostLogo.svg";
import password_icon from "../../../assets/images/lock.svg";
import loginpage_frame from "../../../assets/images/Frame.svg";
// Internal components
import FormErrorMessage from "component/common/ErrorMessage";
import NormalButton from "component/common/NormalButton/NormalButton";
import InputBox from "component/common/InputBox/InputBox";
// Service
import { resetPassword } from "service/Auth";
// Helpers
import { history } from "helpers";
import { Toast } from "service/toast";

const ResetPassword = () => {
  const { register, handleSubmit, errors, reset, getValues } = useForm({
    mode: "onChange",
  });
  const [isShowPassword, setIsShowPassword] = useState(false);

  const urlParams = new URLSearchParams(window.location.search);
  const token = urlParams.get("token");
  // localStorage.setItem("token", token);

  const onSubmit = async (inputs) => {
    const body = {
      password: inputs.newPassword,
      confirmPassword: inputs.confirmPassword,
    };
    let response = await resetPassword(body, token);
    if (response.status === 200) {
      Toast({ type: "success", message: response.data.message });
      reset({ newPassword: "", confirmPassword: "" });
      history.push("/auth/login");
    } else {
      Toast({ type: "error", message: response.data.message });
    }
  };
  return (
    <form>
      <div className="">
        <div className="container-fluid">
          <div className="row ">
            <div className=" login_filed  col-lg-5 ">
              <div className="row page  mt-3">
                <div className="login_logo col-lg-12 ">
                  <img
                    className="mx-auto d-block"
                    src={login_logo}
                    alt=""
                  ></img>
                  <h6 className="login ">Reset Password </h6>
                </div>
                <div className="newPassword_box mb-3">
                  <InputBox
                    className="login_input "
                    placeholder="New Password"
                    Iconic
                    errors={errors}
                    type={isShowPassword ? "text" : "password"}
                    name="newPassword"
                    register={register({
                      required: "Password is required",
                      minLength: {
                        value: 8,
                        message: "Password must contain at least 8 characters",
                      },
                      maxLength: {
                        value: 16,
                        message:
                          "Password must contain a maximum of 16 characters",
                      },
                      pattern: {
                        value: /^(?=.*[A-Z])(?=.*[a-z])/,
                        message:
                          "Password must contain at least one uppercase and lowercase letter",
                      },
                      validate: {
                        containsDigit: (value) =>
                          /^(?=.*[0-9])/.test(value) ||
                          "Password must contain at least one digit",
                        containsSpecial: (value) =>
                          /^(?=.*[!@#$%^&*])/.test(value) ||
                          "Password must contain at least one special character",
                      },
                    })}
                  />
                  <FormErrorMessage
                    error={errors.newPassword}
                    messages={{
                      required: "Password is required",
                      validate: "Passwords do not match",
                      minLength: "Password must contain atleast 8 letters",
                      maxLength: "Password should must contain only 16",
                      pattern:
                        "Password must contain at least one uppercase and lowercase letter",
                      containsDigit: "Password must contain at least one digit",
                      containsSpecial:
                        "Password must contain at least one special character",
                    }}
                  />
                  <span className="newpassword_icon">
                    <img src={password_icon} alt=""></img>
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
                <div className="newPassword_box my-3">
                  <InputBox
                    className="login_input "
                    placeholder="Confirm Password"
                    Iconic
                    errors={errors}
                    type={isShowPassword ? "text" : "password"}
                    name="confirmPassword"
                    register={register({
                      required: "Password is required",
                      minLength: {
                        value: 8,
                        message: "Password must contain at least 8 characters",
                      },
                      maxLength: {
                        value: 16,
                        message:
                          "Password must contain a maximum of 16 characters",
                      },
                      pattern: {
                        value: /^(?=.*[A-Z])(?=.*[a-z])/,
                        message:
                          "Password must contain at least one uppercase and lowercase letter",
                      },
                      validate: (value) => {
                        const { newPassword } = getValues();
                        return newPassword === value;
                      },
                      validate: {
                        containsDigit: (value) =>
                          /^(?=.*[0-9])/.test(value) ||
                          "Password must contain at least one digit",
                        containsSpecial: (value) =>
                          /^(?=.*[!@#$%^&*])/.test(value) ||
                          "Password must contain at least one special character",
                      },
                    })}
                  />
                  <FormErrorMessage
                    error={errors.confirmPassword}
                    messages={{
                      required: "Password is required",
                      validate: "Passwords do not match",
                      minLength: "Password must contain atleast 8 letters",
                      maxLength: "Password should must contain only 16",
                      pattern:
                        "Password must contain at least one uppercase and lowercase letter",
                      containsDigit: "Password must contain at least one digit",
                      containsSpecial:
                        "Password must contain at least one special character",
                    }}
                  />
                  <span className="newpassword_icon">
                    <img src={password_icon} alt=""></img>
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
                  <div className="login_btn  mt-4">
                    <NormalButton
                      loginButton
                      label="confirm"
                      onClick={handleSubmit(onSubmit)}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="login_frame ms-4 ps-5  col-lg-7">
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

export default ResetPassword;
