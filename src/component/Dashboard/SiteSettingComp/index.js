import React, { useState, useEffect, Fragment } from "react";
import "./style.scss";
import InputBox from "component/common/InputBox/InputBox";
import { useForm } from "react-hook-form";
import cloudIcon from "../../../assets/images/uploadcloud.svg";
import TextEditor from "component/common/TextEditor/TextEditor";
import { history } from "helpers";
import Dropzone from "component/common/Dropzone";
import { AiOutlineCloseCircle } from "react-icons/ai";
import FormErrorMessage from "component/common/ErrorMessage";
import { useDropzone } from "react-dropzone";
// import "react-dropzone/dist/styles.css";
import SuccessModal from "component/common/DeleteModal/SuccessModal";
import NormalButton from "component/common/NormalButton/NormalButton";
import CustomController from "component/common/Controller";
const SiteSettingComp = () => {
  const { register, handleSubmit, errors, control, reset, setError } = useForm({
    mode: "onChange",
  });

  const [content, setContent] = useState("");
  const [modal, setModal] = useState(false);
  const [edit, setEdit] = useState(false);

  const handleFileDrop = (fileData) => {
    // Handle the dropped file data here
    console.log(fileData);
  };
  const onSubmit = (data) => {
    // console.log("data :>> ", data);
    // console.log("data :>> ", managementCheckedItems);
    // console.log("role :>> ", role);
    // console.log("status :>> ", status);
    setModal(true);

    const timeout = setTimeout(() => {
      setModal(false);
    }, 1000);

    return () => clearTimeout(timeout);
  };

  return (
    <div className="container-fluid">
      <div className="addProduct col-12">
        <div className="row">
          <div className=" d-flex my-1 align-items-center ">
            <p className="add_products_title mx-3">Site Settings</p>
          </div>
        </div>
        {/* <div> */}
        <form>
          <div className="d-flex col-12   boder_box align-items-center">
            <div className="container ">
              <div className="row gx-5">
                <div className="col-4">
                  <label className="Product_description">Site URL</label>
                  <InputBox
                    className="login_input"
                    type={"text"}
                    placeholder="Enter Site Name"
                    //   errors={errors}
                    name="URL"
                    errors={errors}
                    register={register({
                      required: true,

                      pattern: /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/,
                    })}
                  />
                  <FormErrorMessage
                    error={errors.URL}
                    messages={{
                      required: "URL is required",
                      pattern: "Invalid URL",
                    }}
                  />
                </div>
                <div className="col-4">
                  <label className="Product_description"> Support Number</label>
                  <InputBox
                    className="login_input"
                    type={"number"}
                    placeholder="Enter Support Number"
                    errors={errors}
                    name="supportNumber"
                    register={register({
                      required: true,
                      pattern: /^(\+\d{1,3}[- ]?)?\d{10}$/,
                    })}
                  />
                  <FormErrorMessage
                    error={errors.supportNumber}
                    messages={{
                      required: "Support Number is required",
                      pattern: "Invalid Number",
                    }}
                  />
                </div>
                <div className="col-4">
                  <label className="Product_description">Support Email</label>
                  <InputBox
                    className="login_input"
                    type={"text"}
                    errors={errors}
                    name="emailId"
                    placeholder="Enter Support Email"
                    register={register({
                      required: true,
                      pattern: /\S+@\S+\.\S+/,
                    })}
                  />
                  <FormErrorMessage
                    error={errors.emailId}
                    messages={{
                      required: "Mail ID is required",
                      pattern: "Invalid Mail ID",
                    }}
                  />
                </div>
                {/* <div className="col-4 mt-4">
                <label className="Product_description">Site Logo</label>

                <div
                  {...getRootfileProps()}
                  className={`dropzone ${isDragActive ? "active" : ""}`}
                >
                  <span className="cloud_icon">
                    <img src={cloudIcon} alt="icon"></img>
                  </span>
                  <input {...getInputfileProps()} />
                  {SiteimageSrc ? (
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
              </div> */}
                <div className="col-4 mt-4">
                  <label className="Product_description">Site Fav Logo</label>
                  {/* <CustomController
                    name={"logo"}
                    control={control}
                    error={errors.logo}
                    // defaultValue={role}
                    rules={{ required: true }}
                    messages={{ required: "site logo is Required" }}
                    render={({ onChange, ...field }) => {
                      return ( */}
                        <Dropzone onFileDrop={handleFileDrop} name="logo">
                          {({ getRootProps, getInputProps }) => (
                            <div {...getRootProps({ className: "dropzone" })}>
                              <input
                                {...getInputProps()}
                                multiple={false}
                                required
                              />
                            </div>
                          )}
                        </Dropzone>
                      {/* );
                    }}
                  /> */}
                </div>
                <div className="col-4 mt-4">
                  <label className="Product_description">Site Logo</label>
{/* 
                  <CustomController
                    name={"drop"}
                    control={control}
                    error={errors.drop}
                    // defaultValue={role}
                    rules={{ required: true }}
                    messages={{ required: "site logo is Required" }}
                    render={({ onChange, ...field }) => {
                      return ( */}
                        <Dropzone onFileDrop={handleFileDrop} name="drop">
                          {({ getRootProps, getInputProps }) => (
                            <div {...getRootProps({ className: "dropzone" })}>
                              <input
                                {...getInputProps()}
                                multiple={false}
                                required
                              />
                            </div>
                          )}
                        </Dropzone>
                      {/* );
                    }}
                  /> */}
                </div>

                {/* <div className="col-4 mt-4">
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
              </div> */}
              </div>
              <div className="row gx-5 mt-3">
                <div className="col">
                  <label className="Product_description ms-3">
                    Copyright Text
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
                    <NormalButton
                      addProductbtn
                      label="Add Template"
                      onClick={handleSubmit(onSubmit)}
                    >
                      {" "}
                    </NormalButton>
                    {/* <NormalButton addProductbtn label='Update'> </NormalButton> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
        <div>
          <SuccessModal
            modalOpen={modal}
            onCancel={() => setModal(false)}
            successMsg={"New Staff Updated Successfully"}
          />
        </div>
      </div>
    </div>
  );
};

export default SiteSettingComp;
