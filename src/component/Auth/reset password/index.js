import { useForm } from "react-hook-form";
import React, { useRef, useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Toast } from "service/toast";
// Styles
import "../Login/style.scss";
import login_logo from "../../../assets/images/findostLogo.svg";
import password_icon from "../../../assets/images/lock.svg";
import loginpage_frame from "../../../assets/images/Frame.svg";
// Internal components
import FormErrorMessage from "component/common/ErrorMessage";
import NormalButton from "component/common/NormalButton/NormalButton";
// Service
import { resetPassword } from "service/Auth";
// Helpers
import { history } from "helpers";
import InputBox from "component/common/InputBox/InputBox";

const ResetPassword = () => {
  const { register, handleSubmit, errors, reset, getValues } = useForm({
    mode: "onChange",
  });

  const urlParams = new URLSearchParams(window.location.search);
  const token = urlParams.get("token");
  // localStorage.setItem("token", token);

  const onSubmit = async (inputs) => {
    const body = {
      password: inputs.newPassword,
      confirmPassword: inputs.confirmPassword,
    };
    let response = await resetPassword(body,token);
    if (response.status === 200) {
      Toast({ type: "success", message: response.data.message });
      reset({ newPassword: "", confirmPassword: "" });
      history.push("/admin/dashboard");
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
                    type={"password"}
                    name="newPassword"
                    register={register({
                      required: true,
                      minLength: 8,
                      maxLength: 16,
                      pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?& ]{8,}$/s,
                    })}
                  />
                  <FormErrorMessage
                    error={errors.newPassword}
                    messages={{
                      required: "Password is required",
                      minLength: "Password must contain atleast 8 letters",
                      maxLength: "Password should must contain only 16",
                      pattern: "Password must contain a special character",
                    }}
                  />
                  <span className="newpassword_icon">
                    <img src={password_icon} alt=""></img>
                  </span>
                </div>
                <div className="newPassword_box my-3">
                  <InputBox
                    className="login_input "
                    placeholder="Confirm Password"
                    Iconic
                    errors={errors}
                    type={"password"}
                    name="confirmPassword"
                    register={register({
                      required: true,
                      minLength: 8,
                      maxLength: 16,
                      pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?& ]{8,}$/s,
                      validate: (value) => {
                        const { newPassword } = getValues();
                        return newPassword === value;
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
                      pattern: "Password must contain a special character",
                    }}
                  />
                  <span className="newpassword_icon">
                    <img src={password_icon} alt=""></img>
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
