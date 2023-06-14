import React from "react";
import ReactSelect from "react-select";
import "./style.scss";

const DropDown = (props) => {
  const {
    value,
    onChange,
    options,
    placeholder,
    isMulti,
    controlShouldRenderValue,
  } = props;

  const colourStyles = {
    option: (styles => ({
      ...styles,
      cursor: "pointer"
    })),
    dropdownIndicator: (styles) => ({
      ...styles,
      color: "#000000",
      cursor: "pointer",
    }),
    // control: (base) => ({
    //   ...base,
    //   cursor: "pointer",
    //   fontFamily: "Helvetica",
    // }),
  };

  return (
    <ReactSelect
      isMulti={isMulti}
      value={value}
      onChange={onChange}
      options={options}
      isClearable={false}
      controlShouldRenderValue={controlShouldRenderValue}
      components={{
        IndicatorSeparator: () => null,
      }}
      styles={colourStyles}
      placeholder={placeholder}
    />
  );
};

export default DropDown;
