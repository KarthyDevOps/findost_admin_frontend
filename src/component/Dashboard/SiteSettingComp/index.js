import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import Dropzone from "react-dropzone";
import { AiOutlineCloseCircle } from "react-icons/ai";
//styles
import "./style.scss";
//assets
import cloudIcon from "../../../assets/images/uploadcloud.svg";
//internal components
import InputBox from "component/common/InputBox/InputBox";
import TextEditor from "component/common/TextEditor/TextEditor";
import FormErrorMessage from "component/common/ErrorMessage";
import SuccessModal from "component/common/DeleteModal/SuccessModal";
import Loader from "component/common/Loader/index";
import NormalButton from "component/common/NormalButton/NormalButton";
import CustomController from "component/common/Controller";
//service
import { getSiteSetting, updateSiteSetting } from "service/Cms";
import { Toast } from "service/toast";
import { uploadImage } from "service/Auth";
//helpers
import { history } from "helpers";
const SiteSettingComp = ({ create, view, edit, remove }) => {
  const { register, handleSubmit, errors, control, reset, setError } = useForm({
    mode: "onChange",
  });
  const [modal, setModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [SiteFavLogoUrl, setSiteFavLogoUrl] = useState("");
  const [SiteFavLogo, setSiteFavLogo] = useState("");
  const [SiteLogoUrl, setSiteLogoUrl] = useState("");
  const [SiteLogo, setSiteLogo] = useState("");

  const id = localStorage.getItem("editId");

  const getSiteDetails = async () => {
    try {
      const params = {
        id: id,
      };
      let response = await getSiteSetting(params);
      if (response.status === 200) {
        const data = response?.data.data;
        if (data.length > 0) {
          setLoading(false);
        } else {
          setLoading(true);
        }
        reset({
          siteUrl: data?.siteUrl,
          emailId: data?.supportEmail,
          supportNumber: data?.supportNumber,
          content: data?.copyrightsText,
        });
        setSiteFavLogo(data?.siteFavIconS3);
        setSiteFavLogoUrl(data?.siteFavIcon);
        setSiteLogoUrl(data?.sitelogo);
        setSiteLogo(data?.sitelogoS3);

        console.log("sitedata", data);
      } else {
        Toast({ type: "error", message: response.data.message });
      }
    } catch (e) {
      console.log("e :>> ", e);
    }
  };

  useEffect(() => {
    getSiteDetails();
  }, []);

  const onSubmit = async (data) => {
    try {
      let body = {
        copyrightsText: data.content,
        supportEmail: data.emailId,
        supportNumber: data.supportNumber,
        siteUrl: data.siteUrl,
        siteFavIcon: SiteFavLogoUrl,
        sitelogo: SiteLogoUrl,
      };
      let response = await updateSiteSetting(body,id);
      if (response.status === 200) {
        setModal(true);
        const timeout = setTimeout(() => {
          setModal(false);
          reset();
          history.push("/admin/site-settings");
          getSiteDetails();
        }, 2000);
        return () => clearTimeout(timeout);
      } else {
        Toast({ type: "error", message: response.data.message });
        getSiteDetails();
      }
    } catch (e) {
      console.log(e);
    }
  };
  const handleDrop = async (droppedimage) => {
    let body = new FormData();
    for (let index = 0; index < droppedimage.length; index++) {
      const file = droppedimage[index];
      body.append("data", file);
      let response = await uploadImage(body);
      if (response.status == 200) {
        setSiteFavLogoUrl(response?.data?.data?.data?.key);
        setSiteFavLogo(response?.data?.data?.data?.s3URL);
      }
    }
  };
  const handleDropLogo = async (droppedimage) => {
    let body = new FormData();
    for (let index = 0; index < droppedimage.length; index++) {
      const file = droppedimage[index];
      body.append("data", file);
      let response = await uploadImage(body);
      if (response.status == 200) {
        setSiteLogoUrl(response?.data?.data?.data?.key);
        setSiteLogo(response?.data?.data?.data?.s3URL);
      }
    }
  };
  const deleteFavLogo = (e) => {
    e.stopPropagation();
    setSiteFavLogo(null);
  };
  const deleteLogo = (e) => {
    e.stopPropagation();
    setSiteLogo(null);
  };

  return (
    <div className="container-fluid px-5 py-3">
      {loading ? (
        <div className="addProduct col-12">
          <div className="row">
            <div className=" d-flex my-1 align-items-center ">
              <p className="add_products_title mx-3">Site Settings</p>
            </div>
          </div>
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
                      name="siteUrl"
                      errors={errors}
                      register={register({
                        required: true,
                        pattern: /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/,
                      })}
                    />
                    <FormErrorMessage
                      error={errors.siteUrl}
                      messages={{
                        required: "URL is Required",
                        pattern: "Invalid URL",
                      }}
                    />
                  </div>
                  <div className="col-4">
                    <label className="Product_description">
                      {" "}
                      Support Number
                    </label>
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
                        required: "Support Number is Required",
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
                        pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      })}
                    />
                    <FormErrorMessage
                      error={errors.emailId}
                      messages={{
                        required: "Mail ID is Required",
                        pattern: "Invalid Mail ID",
                      }}
                    />
                  </div>

                  <div className="col-4 mt-4">
                    <label className="Product_description">Site Logo</label>

                    <Dropzone
                      onDrop={handleDrop}
                      accept=".png, .jpeg, .jpg, "
                      maxSize={3072000}
                      errors={errors}
                      {...register("dropZoneLogoField", {
                        required: SiteFavLogo ? false : true,
                      })}
                    >
                      {({ getRootProps, getInputProps }) => (
                        <div {...getRootProps({ className: "dropzone" })}>
                          <div className=" border border-secondary-subtle   ">
                            <input {...getInputProps()} multiple={false} />
                            {SiteFavLogo ? (
                              <>
                                <img
                                  src={SiteFavLogo}
                                  alt="SiteFavLogo"
                                  className="preview_image"
                                ></img>
                              </>
                            ) : (
                              <>
                                <span className="cloud_icon">
                                  <img src={cloudIcon} alt="icon"></img>
                                </span>
                                <p className="drag_text">
                                  Drag your files here to start uploading or
                                </p>
                                <div className=" drag_btn ">
                                  <NormalButton
                                    onClick={(e) => e.preventDefault()}
                                    addProductbtn
                                    label="Browse"
                                  />
                                </div>
                              </>
                            )}
                            {SiteFavLogo && (
                              <span
                                style={{
                                  position: "absolute",
                                  top: "10px",
                                  right: "10px",
                                  cursor: "pointer",
                                  zIndex: 1000,
                                }}
                                // className={styles.removeOverlay}
                                onClick={deleteFavLogo}
                              >
                                <AiOutlineCloseCircle
                                  size={24}
                                  style={{ color: "red" }}
                                />
                              </span>
                            )}
                          </div>
                        </div>
                      )}
                    </Dropzone>
                    {!SiteFavLogo && (
                      <FormErrorMessage
                        error={errors.dropZoneLogoField}
                        messages={{
                          required: "Site Logo is Required",
                        }}
                      />
                    )}
                  </div>
                  <div className="col-4 mt-4">
                    <label className="Product_description">Site Fav Logo</label>
                    <Dropzone
                      onDrop={handleDropLogo}
                      accept=".png, .jpeg, .jpg, "
                      maxSize={3072000}
                      errors={errors}
                      {...register("dropZoneFavLogoField", {
                        required: SiteLogo ? false : true,
                      })}
                    >
                      {({ getRootProps, getInputProps }) => (
                        <div {...getRootProps({ className: "dropzone" })}>
                          <div className=" border border-secondary-subtle   ">
                            <input {...getInputProps()} multiple={false} />
                            {SiteLogo ? (
                              <>
                                <img
                                  src={SiteLogo}
                                  alt="SiteFavLogo"
                                  className="preview_image"
                                ></img>
                              </>
                            ) : (
                              <>
                                <span className="cloud_icon">
                                  <img src={cloudIcon} alt="icon"></img>
                                </span>
                                <p className="drag_text">
                                  Drag your files here to start uploading or
                                </p>
                                <div className=" drag_btn ">
                                  <NormalButton
                                    onClick={(e) => e.preventDefault()}
                                    addProductbtn
                                    label="Browse"
                                  />
                                </div>
                              </>
                            )}
                            {SiteLogo && (
                              <span
                                style={{
                                  position: "absolute",
                                  top: "10px",
                                  right: "10px",
                                  cursor: "pointer",
                                  zIndex: 1000,
                                }}
                                // className={styles.removeOverlay}
                                onClick={deleteLogo}
                              >
                                <AiOutlineCloseCircle
                                  size={24}
                                  style={{ color: "red" }}
                                />
                              </span>
                            )}
                          </div>
                        </div>
                      )}
                    </Dropzone>
                    {!SiteLogo && (
                      <FormErrorMessage
                        error={errors.dropZoneFavLogoField}
                        messages={{
                          required: "Site Fav Logo is Required",
                        }}
                      />
                    )}
                  </div>
                </div>
                <div className="row gx-5 mt-3">
                  <div className="col">
                    <label className="Product_description ms-3">
                      Copyright Text
                    </label>
                    <div className="text_editor">
                      <CustomController
                        name={"content"}
                        control={control}
                        error={errors.TextEditor}
                        rules={{ required: true }}
                        messages={{
                          required: "Copyright is Required",
                        }}
                        render={({ onChange, ...field }) => {
                          return (
                            <TextEditor
                              {...field}
                              placeholder="Enter Answer Here"
                              onChange={(content) => {
                                onChange(content);
                              }}
                              name={"content"}
                            />
                          );
                        }}
                      />
                    </div>
                  </div>
                </div>
                <div className="row mt-4">
                  <div className="col-12  d-flex justify-content-end">
                    <div className="col-2">
                      <NormalButton
                        onClick={() => history.goBack()}
                        cancel
                        label="Cancel"
                      >
                        {" "}
                      </NormalButton>
                    </div>
                    <div className="col-2">
                      <NormalButton
                        addProductbtn
                        label="Save"
                        onClick={handleSubmit(onSubmit)}
                      >
                        {" "}
                      </NormalButton>
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
              successMsg={"New Site Setting Updated Successfully"}
            />
          </div>
        </div>
      ) : (
        <>
          <Loader
            loading={!loading}
            className="d-flex align-items-center justify-content-center"
          />
        </>
      )}
    </div>
  );
};

export default SiteSettingComp;
