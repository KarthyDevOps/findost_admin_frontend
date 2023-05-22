import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import "./style.scss";
import { AiOutlineCloseCircle } from "react-icons/ai";

import cloudIcon from "../../../assets/images/uploadcloud.svg";
import NormalButton from "../NormalButton/NormalButton";
function Dropzone({ onFileDrop }) {
  const [imageSrc, setImageSrc] = useState();

  const handleDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];
    const reader = new FileReader();

    reader.onload = () => {
      setImageSrc(reader.result);
      onFileDrop(reader.result);
    };

    reader.readAsDataURL(file);
  };
  const cancelImg = (e) => {
    e.stopPropagation();
    setImageSrc(null);
  };
  const { getRootProps, getInputProps } = useDropzone({ onDrop: handleDrop });

  return (
    <>
      <div {...getRootProps({ className: "dropzone" })}>
        <span className="cloud_icon">
          <img src={cloudIcon} alt="icon"></img>
        </span>
        <input {...getInputProps()} />
        {imageSrc ? (
          <>
            <img src={imageSrc} alt="Dropped" className="preview_image" />
          </>
        ) : (
          <div className="drag_text">
            <>
              <p>Drag your files here to start uploading or</p>
              <div className=" drag_btn ">
                <NormalButton addProductbtn label="Browse" />
              </div>
            </>
          </div>
        )}
      {imageSrc && (
        <span
          style={{
            position: "absolute",
            top: "0",
            right: "0",
            cursor: "pointer",
          }}
          // className={styles.removeOverlay}
          onClick={cancelImg}
        >
          <AiOutlineCloseCircle size={24} style={{ color: "red" }} />
        </span>
      )}
      </div>
    </>
  );
}

export default Dropzone;
