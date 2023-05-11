import React from "react";

import "./InputBox.scss";

const InputBox = props => {
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
    disabled = false,
    maxLength,
  } = props;
  return (
    <>
      <input
        disabled={disabled}
        name={name}
        placeholder={placeholder}
        className={grayedBox ? "inputBoxGrayed" : "inputBoxStyle"}
        ref={register}
        defaultValue={value}
        type={type}
        maxLength={maxLength}
        onWheel={event => event.currentTarget.blur()}
        onChange={e => {
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

export default InputBox;
