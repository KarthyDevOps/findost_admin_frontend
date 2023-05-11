import React from "react";

import "./formInput.scss";

const FormInput = props => {
  const {
    placeholder = "",
    register = {},
    value = "",
    name = "",
    maxlength = "",
    isprefix = false,
    disabled = false,
    className = "",
    errors,
    type,
    maxLength,
    onKeyDown,
  } = props;
  return (
    <>
      {isprefix ? (
        <span>
          <span className="prefixText">Https: </span>
        </span>
      ) : null}

      <input
        name={name}
        type={type}
        ref={register}
        disabled={disabled}
        defaultValue={value}
        maxLength={maxlength}
        placeholder={placeholder}
        onKeyDown={onKeyDown}
        onWheel={event => event.currentTarget.blur()}
        className={isprefix ? "prefixBox" : `${className} formInputBox`}
        autoComplete={"off"}
      />
      <span style={{ color: "#ff3333", fontSize: "12px", marginTop: "2px" }}>
        {errors?.[name] && errors[name]?.message}{" "}
      </span>
    </>
  );
};

export default FormInput;
