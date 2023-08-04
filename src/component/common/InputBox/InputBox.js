import React from "react";
import {BsSearch} from "react-icons/bs"
import "./InputBox.scss";
const InputBox = (props) => {
  let {
    placeholder = "",
    register = {},
    value = "",
    type = "text",
    onChange,
    name = "",
    maxlength = "",
    icons = false,
    GB = false,
    onWheel = "",
    grayedBox = false,
    Iconic = false,
    disabled = false,
    maxLength,
    Search = false,
  } = props;
  return (
    <>
    <div className="input_head">
      <input
        disabled={disabled}
        name={name}
        placeholder={placeholder}
        className={
          disabled ? "inputBoxGrayed" :
          grayedBox
            ? "inputBoxGrayed"
            : Iconic
            ? "inputBoxStyle1"
            : "inputBoxStyle"
        }
        ref={register}
        defaultValue={value}
        type={type}
        maxLength={maxLength}
        onWheel={(event) => event.currentTarget.blur()}
        onChange={(e) => {
          const body = {
            target: {
              name: e.target.name,
              value: e.target.value,
            },
          };
          if (onChange) onChange(body);
        }}
        autoComplete={"off"}
      />
      {Iconic && Search ?  <i className="search_icon"><BsSearch size={18} style={{color : "#7E7E7E"}}/></i> : ""}
      </div>
    </>
  );
};

export default InputBox;
