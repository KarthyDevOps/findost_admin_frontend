import React from "react";
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
  return (
    <div>
      <div className="d-flex justify-content-center align-items-center ">
        <input
          type="checkbox"
          name={name}
          checked={value}
          onChange={onChange}
          className={`${classname + " cursor-pointer custom_checkbox"}`}
          ref={register}
        />
        <label className="labelText mb-0 mt-2">{label}</label>
      </div>
    </div>
  );
};

export default CheckBox;
