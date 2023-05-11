import React, { Component } from "react";
import Select, { components } from "react-select";

class SelectComponent extends Component {
  render() {
    let {
      name,
      className,
      value = "",
      label = "",
      handleChange,
      options = [],
      arrow = false,
      grayed = false,
      isMulti = false,
      isGrayed = false,
      disabled = false,
      placeholder = "",
      isClearable = false,
      borderRadius = false,
      isSearchable = false
    } = this.props;

    const DropdownIndicator = (props) => {
      return (
        components.DropdownIndicator && (
          <components.DropdownIndicator {...props}>
            <span>
              {!disabled && <img src={"dropDownIcon"} style={{ width: "100%" }} />}
            </span>
          </components.DropdownIndicator>
        )
      );
    };

    const customStyles = {
      placeholder: (base) => ({
        ...base,
        fontSize: 14,
        color: "#000",
        fontWeight: 500,
        lineHeight: 16,
        opacity: 0.8
      }),
      indicatorSeparator: (base) => ({
        ...base,
        display: "none"
      }),
      dropdownIndicator: (base) => ({
        ...base,
        padding: 0,
        height: "26px",
        width: "26px",
        color: "black",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
      }),
      singleValue: (base) => ({
        ...base,
        color: "#222222",
        fontWeight: 600
      }),
      control: (base) => ({
        ...base,
        borderRadius: borderRadius ? 50 : 4,
        border: "1px solid #C7C7C7",
        boxShadow: "0 !important",
        outline: "0 ",
        background: grayed ? "#F1F1F1" : "transparent",
        height: 43,
        paddingRight: 10,
        boxShadow: "0px 0px 1px rgba(0, 0, 0, 0.25)"
      })
    };

    return (
      <div className={`${arrow ? "select-section" : "Select"}`}>
        {label !== "" ? (
          <div>
            <label className="font-weight-normal mb-1">{label}</label>
          </div>
        ) : null}
        <>
          <Select
            {...(this.props || {})}
            name={name}
            value={value}
            options={options}
            isMulti={isMulti}
            styles={customStyles}
            className={className}
            isDisabled={disabled}
            onChange={handleChange}
            classNamePrefix="Select"
            placeholder={placeholder}
            isClearable={isClearable}
            isSearchable={isSearchable}
            components={{ DropdownIndicator }}
          />
        </>
      </div>
    );
  }
}

export default SelectComponent;
