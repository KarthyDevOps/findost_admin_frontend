import React from "react";
import "./style.scss";

const LoginInput = (props) => {
  const {
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
  } = props;
  return (
    <>
      <input
        name={name}
        placeholder={placeholder}
        className={"inputBoxLogin"}
        ref={register}
        defaultValue={value}
        type={type}
        maxLength={maxlength}
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
    </>
  );
};

export default LoginInput;
