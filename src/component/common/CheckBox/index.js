import React, { useState } from "react";
import "./style.scss";
const CheckBox = ({
  checked,
  name,
  label,
  onChange,
  value,
  classname = "",
  register,
}) => {
  const [boxValue, setBoxValue] = useState(false);

  const handleChange = e => {
    const val = e.target.value === "true" ? false : true;

    setBoxValue(val);
  };

  return (
    <div>
      <div className="d-flex align-items-center ">
        <input
          type="checkbox"
          name={name}
          // checked={checked}
          // value={value ? value : boxValue}
          // onChange={onChange ? onChange : handleChange}
          // className="m-3 cursor-pointer custom_checkbox"
          className={`${classname + " cursor-pointer custom_checkbox"}`}
          ref={register}
        />
        <label className="labelText mb-0 mt-2">{label}</label>
      </div>
    </div>
  );
};

export default CheckBox;
