import React, { useState, useEffect, Fragment } from "react";
import { BsArrowLeft } from "react-icons/bs";
import "./style.scss";
import { history } from "helpers";
import { useForm } from "react-hook-form";
import InputBox from "component/common/InputBox/InputBox";
import DropDown from "component/common/DropDown/DropDown";
import TextEditor from "component/common/TextEditor/TextEditor";
import NormalButton from "component/common/NormalButton/NormalButton";
import Dropzone from "component/common/Dropzone";
import SuccessModal from "component/common/DeleteModal/SuccessModal";
import FormErrorMessage from "component/common/ErrorMessage";
import CustomController from "component/common/Controller";
const AddKnowledgeComp = () => {
  const { register, handleSubmit, errors, reset, setError, control } = useForm({
    mode: "onChange",
  });
  const [modal, setModal] = useState(false);
  const [edit, setEdit] = useState(false);

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
    <div className="px-5 py-3 Add_knowledge">
      <div className="d-flex my-3 align-items-center">
        <i className="pr-3">
          <BsArrowLeft
            size={28}
            onClick={() => history.goBack()}
            style={{ cursor: "pointer" }}
          />
        </i>
        <p className="m-0">{"Knowledge Center"}</p>
      </div>
      <form>
        <div className="knowledge_body p-5">
          <div className="row">
            <div className="col-4">
              <label>Title</label>
              <InputBox
                className="add_staff"
                type={"text"}
                placeholder="Enter Title"
                //   errors={errors}
                name="title"
                errors={errors}
                register={register({
                  required: true,
                })}
                //   value={searchStaff}
                // onChange={(e) => {
                //   setsearch(e.target.value);
                //   setactivePage(1);
                // }}
              />
              <FormErrorMessage
                error={errors.title}
                messages={{
                  required: "Title is required",
                }}
              />
            </div>
            <div className="col-4">
              <label>Category</label>
              <CustomController
                name={"category"}
                control={control}
                error={errors.category}
                // defaultValue={role}
                rules={{ required: true }}
                messages={{ required: "category is Required" }}
                render={({ onChange, ...field }) => {
                  return (
                    <DropDown
                      // value={value}
                      name="category"
                      placeholder="Select Category"
                      // onChange={(e) => {}}
                      // options={options}
                    />
                  );
                }}
              />
            </div>
            <div className="col-4">
              <label>Sub Category</label>
              <CustomController
                name={"subcategory"}
                control={control}
                error={errors.subcategory}
                // defaultValue={role}
                rules={{ required: true }}
                messages={{ required: "Subcategory is Required" }}
                render={({ onChange, ...field }) => {
                  return (
                    <DropDown
                      // value={value}
                      name="subcategory"
                      placeholder="Select Sub Category"
                      // onChange={(e) => {}}
                      // options={options}
                    />
                  );
                }}
              />
            </div>
            <div className="col-4 my-3">
              <label>Content URL LinK</label>
              <InputBox
                className="add_staff"
                type={"text"}
                placeholder="Enter Content URL LinK"
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
            <div className="col-4 mt-3">
              <label className="Product_description">Upload Document</label>

              <Dropzone
              // onFileDrop={handleFileDrop}
              >
                {({ getRootProps, getInputProps }) => (
                  <div {...getRootProps({ className: "dropzone" })}>
                    <input {...getInputProps()} multiple={false} required />
                  </div>
                )}
              </Dropzone>
            </div>
            <div className="col-4 my-3">
              <label>Status</label>
              <CustomController
                name={"status"}
                control={control}
                error={errors.status}
                // defaultValue={role}
                rules={{ required: true }}
                messages={{ required: "Status is Required" }}
                render={({ onChange, ...field }) => {
                  return (
                    <DropDown
                      // value={value}
                      name="status"
                      placeholder="Select status"
                      // onChange={(e) => {}}
                      // options={options}
                    />
                  );
                }}
              />
            </div>
          </div>
          <div>
            <label>Description</label>
            <TextEditor />
          </div>
          <div className="d-flex align-items-center justify-content-end my-5 py-3">
            <div className="col-md-2">
              <NormalButton
                className="authButton1"
                label={"Cancel"}
                onClick={() => history.goBack()}
              />
            </div>
            <div className="col-md-2">
              <NormalButton
                className="loginButton"
                onClick={handleSubmit(onSubmit)}
                label={edit ? "Update" : "Add Content"}
                //   onClick={DeletBulk}
              />
            </div>
          </div>
        </div>
      </form>
      <div>
        <SuccessModal
          modalOpen={modal}
          onCancel={() => setModal(false)}
          successMsg={
            edit
              ? "Knowledge Center Content Added Successfully"
              : "Knowledge Center Content update Successfully"
          }
        />
      </div>
    </div>
  );
};

export default AddKnowledgeComp;
