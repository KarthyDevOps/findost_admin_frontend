import React from "react";

// Styles
import "./style.scss";

const UploadImageTextBox = ({
  label,
  handleChange = {},
  name = "",
  register,
  accept,
}) => {
  return (
    <div>
      <div className="uploadImageBox">
        <label htmlFor={name} className="btn">
          <div className="add-file-btn d-flex align-items-center justify-content-between">
            <div>
              <img src={""} alt="upload" />
            </div>
            <div>
              <span className="add-file-btn ml-3">{label}</span>
            </div>
          </div>
        </label>
      </div>
      <input
        id={name}
        style={{ visibility: "hidden", display: "none" }}
        onChange={handleChange}
        type="file"
        name={name}
        ref={register}
        accept={accept}
      />
    </div>
  );
};

export default UploadImageTextBox;