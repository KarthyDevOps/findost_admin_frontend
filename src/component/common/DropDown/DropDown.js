import React from "react";
import ReactSelect from "react-select";
import "./style.scss";

const DropDown = (props) => {
  const { value, onChange, options, placeholder, isMulti } = props;

  const colourStyles = {
    dropdownIndicator: (styles) => ({
      ...styles,
      color: "#000000",
    }),
  };

  return (
    <ReactSelect
      isMulti={isMulti}
      value={value}
      onChange={onChange}
      options={options}
      isClearable
      components={{
        IndicatorSeparator: () => null,
      }}
      styles={colourStyles}
      placeholder={placeholder}
    />
  );
};

export default DropDown;
