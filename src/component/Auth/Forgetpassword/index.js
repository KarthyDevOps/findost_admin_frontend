import { useForm } from "react-hook-form";
import React, { useRef, useState } from "react";
// Styles
import "../Login/style.scss";
import username_icon from "../../../assets/images/user.svg";
import login_logo from "../../../assets/images/findostLogo.svg";
import loginpage_frame from "../../../assets/images/Frame.svg";
// Internal components
import FormErrorMessage from "component/common/ErrorMessage";
import NormalButton from "component/common/NormalButton/NormalButton";
import InputBox from "component/common/InputBox/InputBox";
// Service
import { Toast } from "service/toast";
import { forgotPassword } from "service/Auth";
// Helpers
import { history } from "helpers";

const Forgetpassword = () => {
  const { register, handleSubmit, errors, reset, setError } = useForm({
    mode: "onChange",
  });

  const onSubmit = async (inputs) => {
    try {
      const body = {
        email: inputs.emailId,
      };
      let response = await forgotPassword(body);
      if (response.status === 200) {
        Toast({ type: "success", message: response.data.message });
        reset({ emailId: "" });
      } else {
        Toast({ type: "error", message: response.data.message });
        history.push("/auth/forget")
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
                    className="mx-auto d-block"
                    src={login_logo}
                    alt=""
                  ></img>
                  <h6 className="login ">Forgot password</h6>
                  <p className="text-center">
                    Please provide registed email id to send reset link
                  </p>
                </div>
                <div className="userbox mt-3">
                  <InputBox
                    className="login_input"
                    placeholder="Email Id"
                    Iconic
                    errors={errors}
                    name="emailId"
                    register={register({
                      required: true,
                      pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    })}
                  />
                  <FormErrorMessage
                    error={errors.emailId}
                    messages={{
                      required: "Email Id is required",
                      pattern: "Invalid Email Id",
                    }}
                  />
                  <span className="userbox_icon">
                    <img src={username_icon} alt=""></img>
                  </span>
                </div>
                <div className="forget ">
                  <span
                    onClick={() => history.push("/auth/login")}
                    className="forget cursor-pointer"
                  >
                    Login Instead
                  </span>
                  <div className="login_btn  mt-3">
                    <NormalButton
                      loginButton
                      label="Send Reset Link"
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

export default Forgetpassword;
