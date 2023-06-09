import React, { useState, useEffect, Fragment } from "react";
import "./style.scss";
import InputBox from "component/common/InputBox/InputBox";
import { useForm } from "react-hook-form";
import TextEditor from "component/common/TextEditor/TextEditor";
import { history } from "helpers";
import Dropzone from "component/common/Dropzone";
import FormErrorMessage from "component/common/ErrorMessage";
import SuccessModal from "component/common/DeleteModal/SuccessModal";
import NormalButton from "component/common/NormalButton/NormalButton";
import CustomController from "component/common/Controller";
import { getSiteSetting, updateSiteSetting } from "service/Cms";
import { Toast } from "service/toast";
import Loader from "component/common/Loader/index";
const SiteSettingComp = ({ create, view, edit, remove }) => {
  const { register, handleSubmit, errors, control, reset, setError } = useForm({
    mode: "onChange",
  });
  const [modal, setModal] = useState(false);
  const [ProfileUrl, setprofileUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const handleFileDrop = async (droppedimage) => {
    // let body = new FormData();
    // for (let index = 0; index < droppedimage.length; index++) {
    //   const file = droppedimage[index];
    //   body.append("image", file);
    //   let response = await updateSiteSetting(body);
    //   if (response.status == 200) {
    //     setprofileUrl(response?.data?.siteFavIcon);
    //   }
    // }
  };
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
      };
      let response = await updateSiteSetting(body);
      if (response.status === 200) {
        setModal(true);
        const timeout = setTimeout(() => {
          setModal(false);
          reset();
          history.push("/admin/site-settings");
          getSiteDetails();
        }, 1000);
        return () => clearTimeout(timeout);
      } else {
        Toast({ type: "error", message: response.data.message });
        getSiteDetails();
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="container-fluid">
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
                        required: "URL is required",
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
                        label="cancel"
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
              successMsg={"New SiteSetting Updated Successfully"}
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
