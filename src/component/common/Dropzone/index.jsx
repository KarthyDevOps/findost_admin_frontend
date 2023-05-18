import React from "react";
import { useDropzone } from "react-dropzone";
import classes from "./styles.module.scss";

function Dropzone() {
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    maxFiles: 1,
  });

  const files = acceptedFiles.map((file) => (
    <li key={file.path}>
      {file.path} - {file.size} bytes
    </li>
  ));

  return (
    <>
      <lable className="formLabel pb-3">Upload Pet Photo</lable>
      <div {...getRootProps({ className: classes.container })}>
        <input {...getInputProps({ className: classes.input })} />
        <p>Drag & Drop or Browse File</p>
      </div>
      <ul>{files}</ul>
    </>
  );
}

export default Dropzone;
