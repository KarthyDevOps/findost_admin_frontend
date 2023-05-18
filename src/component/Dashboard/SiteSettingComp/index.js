import React, { useState, useEffect, Fragment } from "react";
import "./style.scss";
import InputBox from "component/common/InputBox/InputBox";
import { useForm } from "react-hook-form";
import cloudIcon from "../../../assets/images/uploadcloud.svg";
import TextEditor from "component/common/TextEditor/TextEditor";
import { history } from "helpers";
import Dropzone from "component/common/Dropzone";
import { AiOutlineCloseCircle } from "react-icons/ai";

import { useDropzone } from "react-dropzone";
// import "react-dropzone/dist/styles.css";

import NormalButton from "component/common/NormalButton/NormalButton";
const SiteSettingComp = () => {
  const { register, handleSubmit, errors, reset, setError } = useForm({
    mode: "onChange",
  });

  const [content, setContent] = useState("");

  const [editorState, setEditorState] = useState(null);
  const [petProfileUrl, setpetProfileUrl] = useState(null);

  const [SiteimageSrc, setsiteImageSrc] = useState(null);
  const [SiteFavimageSrc, setsitefavImageSrc] = useState(null);

  const {
    getRootProps: getRootfileProps,
    getInputProps: getInputfileProps,
    isDragActive,
  } = useDropzone({
    accept: "image/*",
    onDrop: (acceptedFile) => {
      setsiteImageSrc(
        Object.assign(acceptedFile[0], {
          preview: URL.createObjectURL(acceptedFile[0]),
        })
      );
    },
  });
  const {
    getRootProps: getRootGalleryProps,
    getInputProps: getInputfavProps,
  } = useDropzone({
    accept: "image/*",
    onDrop: (acceptedFile) => {
      setsitefavImageSrc(
        Object.assign(acceptedFile[0], {
          preview: URL.createObjectURL(acceptedFile[0]),
        })
      );
    },
  });

  // const handleDrop =  (acceptedFiles) => {
  //   const file = acceptedFiles[0];
  //   const reader = new FileReader();

  //   reader.onload = () => {
  //     setsiteImageSrc(reader.result);
  //   };

  //   reader.readAsDataURL(file);
  // };

  return (
    <div className="container-fluid">
      <div className="addProduct col-12">
        <div className="row">
          <div className=" d-flex my-1 align-items-center ">
            <p className="add_products_title mx-3">Site Settings</p>
          </div>
        </div>
        {/* <div> */}

        <div className="d-flex col-12   boder_box align-items-center">
          <div class="container ">
            <div class="row gx-5">
              <div class="col-4">
                <label className="Product_description">Site URL</label>
                <InputBox
                  className="login_input"
                  type={"text"}
                  placeholder="Enter Site Name"
                  //   errors={errors}
                  name="text"
                />
              </div>
              <div class="col-4">
                <label className="Product_description"> Support Number</label>
                <InputBox
                  className="login_input"
                  type={"text"}
                  placeholder="Enter Support Number"
                  //   errors={errors}
                  name="text"
                />
              </div>
              <div class="col-4">
                <label className="Product_description">Support Email</label>
                <InputBox
                  className="login_input"
                  type={"text"}
                  placeholder="Enter Support Email"
                  //   errors={errors}
                  name="text"
                />
              </div>
              <div className="col-4 mt-4">
                <label className="Product_description">Site Logo</label>

                <div
                  {...getRootfileProps()}
                  className={`dropzone ${isDragActive ? "active" : ""}`}
                >
                  <span className="cloud_icon">
                    <img src={cloudIcon} alt="icon"></img>
                  </span>
                  <input {...getInputfileProps()} />
                  {SiteimageSrc  ? (
                    
                    <>
                    <img
                      // src={SiteimageSrc}
                      src={SiteimageSrc.preview}
                      // alt="Dropped"
                      className="preview_image"
                    />
                    <span
                    style={{ position: "absolute", top: "0", right: "0" }}
                    // className={styles.removeOverlay}
                    onClick={() => setsiteImageSrc(null)}
                    >
                    <AiOutlineCloseCircle
                    size={24}
                    style={{ color: "red" }}
                    />
                    </span>
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
                </div>
              </div>
              {/* <Dropzone
                onDrop={handleDrop}
                accept="image/png, image/jpeg, image/jpg"
                maxSize={3072000}
                errors={errors}
                {...register("dropZoneField", {
                  required: petProfileUrl ? false : true,
                })}
              >
                {({ getRootProps, getInputProps }) => (
                  <div {...getRootProps({ className: 'dropzone' })}>
                    <>
                      <input {...getInputProps()} multiple={false} required />
                      <p>Drag & Drop</p>
                      <p>or</p>
                      <p className="browse_file_text">Browse file</p>
                    </>
                  </div>
                )}
              </Dropzone> */}
              <div className="col-4 mt-4">
                <label className="Product_description">Site Fav Logo</label>

                <div
                  {...getRootGalleryProps()}
                  className={`dropzone ${isDragActive ? "active" : ""}`}
                >
                  <span className="cloud_icon">
                    <img src={cloudIcon}></img>
                  </span>
                  <input {...getInputfavProps()} />
                  {SiteFavimageSrc ? (
                    <>
                    <img
                      //  src={SiteFavimageSrc}
                      src={SiteFavimageSrc.preview}
                      alt="Dropped"
                      className="preview_image"
                    />
                    
                      <span
                      style={{ position: "absolute", top: "0", right: "0" }}
                      // className={styles.removeOverlay}
                      onClick={() => setsitefavImageSrc(null)}
                      >
                      <AiOutlineCloseCircle
                      size={24}
                      style={{ color: "red" }}
                      />
                      </span>
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
                </div>
              </div>
            </div>
            <div className="row gx-5 mt-3">
              <div className="col">
                <label className="Product_description ms-3">
                  Template Message Content
                </label>
                <div className="text_editor">
                  <TextEditor content={content} setContent={setContent} />
                </div>
              </div>
            </div>
            <div className="row mt-4">
              <div className="col-12  d-flex justify-content-end">
                <div className="col-2">
                  <NormalButton
                    onClick={() => history.goBack()}
                    cancel
                    label="cancel"
                  >
                    {" "}
                  </NormalButton>
                </div>
                <div className="col-2">
                  <NormalButton addProductbtn label="Add Template">
                    {" "}
                  </NormalButton>
                  {/* <NormalButton addProductbtn label='Update'> </NormalButton> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SiteSettingComp;
