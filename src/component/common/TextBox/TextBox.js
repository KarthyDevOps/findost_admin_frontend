import React from "react";

// Styles
import "./textbox.scss";

const TextBox = ({
  placeholder = "",
  register = {},
  name = "",
  error = "",
  messages,
  errors,
  isNotification = false,disabled,value
}) => {
  return (
    <>
      <textarea
        rows={2}
        cols={10}
        name={name}
        ref={register}
        placeholder={placeholder}
        className={isNotification ? "piscriptionTextBox" : "textBoxStyle"}
        autoComplete={"off"}
        disabled={disabled}
        value={value}
      ></textarea>
      <span className="text-danger fs-13">
        {error?.type && messages?.[error.type]}
        {errors?.[name] && errors[name]?.message}
      </span>
    </>
  );
};

export default TextBox;