import React, { Component } from "react";
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
      authButton1,
      type = "submit",
      disabled = false,
      authButton = false,
      loginButton = false,
      tableBtn = false,
      rightIcon = "",
      leftIcon="",
      btnSecondary = false,
      profileBtn = false,
      outlineBtn = false,
      cancel =false,
      addProductbtn= false,
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
                     ${addBnt ? "addBnt" : ""}
                     ${tableBtn ? "tableBtn" : ""}
                     ${btnSecondary ? "btnSecondary" : ""}
                     ${profileBtn ? "profileBtn" : ""}
                     ${outlineBtn ? "outlineBtn" : ""}
                     ${cancel? 'cancelBtn ':''}
                     ${addProductbtn? 'addProductbtn ':''}
                   
                     ${className}`}
          onClick={onClick}
          disabled={disabled}
        >
          {leftIcon !== "" ? (
            <span className={`btn-left-icon ${leftIcon}`}></span>
          ) : null}
          {label}
          {rightIcon !== "" ? (
            <span className={`btn-right-icon ${rightIcon}`}></span>
          ) : null}
        </button>
      </div>
    );
  }
}

export default NormalButton;
