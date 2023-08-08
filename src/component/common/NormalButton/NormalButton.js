import React, { Component } from "react";
import { Oval } from "react-loader-spinner";
// import styles from "./button.module.scss";
import "./normalButton.scss";

export class NormalButton extends Component {
  render() {
    const {
      className = "",
      label = "",
      onClick,
      id,
      addBnt,
      profileCreatNext,
      profileCreatNext1,
      profileCreatBack,
      uploadBrowseBtn,
      authButton1,
      type = "submit",
      disabled = false,
      authButton = false,
      loginButton = false,
      loginButton1 = false,
      tableBtn = false,
      rightIcon = "",
      leftIcon = "",
      btnSecondary = false,
      profileBtn = false,
      outlineBtn = false,
      cancel = false,
      addProductbtn = false,
      isLoading = false, // Add isLoading prop for button loader
    } = this.props;

    return (
      <div>
        <button
          id={id}
          type={type}
          className={`cursor-pointer 
                     ${authButton ? "authButton" : ""}
                     ${profileCreatNext ? "profileCreatNext" : ""}
                     ${profileCreatNext1 ? "profileCreatNext1" : ""}
                     ${authButton1 ? "authButton1" : ""}
                     ${profileCreatBack ? "profileCreatBack" : ""}
                     ${loginButton ? "loginButton" : ""}
                     ${loginButton1 ? "loginButton1" : ""}
                     ${addBnt ? "addBnt" : ""}
                     ${tableBtn ? "tableBtn" : ""}
                     ${btnSecondary ? "btnSecondary" : ""}
                     ${profileBtn ? "profileBtn" : ""}
                     ${outlineBtn ? "outlineBtn" : ""}
                     ${cancel ? "cancelBtn " : ""}
                     ${addProductbtn ? "addProductbtn " : ""}
                     ${uploadBrowseBtn ? "uploadBrowseBtn " : ""}
                     ${className}`}
          onClick={onClick}
          disabled={disabled || isLoading}
        >
          {isLoading ? (
            <span className="btn-loader  ">
              {" "}
              <>
                <Oval color="#ffffff" height={20} width={"100%"} />
              </>
              <>
                <span className="m-3">Loading</span>{" "}
              </>
            </span>
          ) : (
            <>
              {leftIcon !== "" ? (
                <span className={`btn-left-icon ${leftIcon}`}></span>
              ) : null}
              {label}
              {rightIcon !== "" ? (
                <span className={`btn-right-icon ${rightIcon}`}></span>
              ) : null}
            </>
          )}
        </button>
      </div>
    );
  }
}

export default NormalButton;
