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

const AddKnowledgeComp = () => {
  const { register, handleSubmit, errors, reset, setError } = useForm({
    mode: "onChange",
  });
  const [edit, setEdit] = useState(false);
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
          </div>
          <div className="col-4">
            <label>Category</label>
            <DropDown
              // value={value}
              placeholder="Select Category"
              // onChange={(e) => {}}
              // options={options}
            />
          </div>
          <div className="col-4">
            <label>Sub Category</label>
            <DropDown
              // value={value}
              placeholder="Select Sub Category"
              // onChange={(e) => {}}
              // options={options}
            />
          </div>
          <div className="col-4 my-3">
            <label>Content URL LinK</label>
            <InputBox
              className="add_staff"
              type={"text"}
              placeholder="Enter Content URL LinK"
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
            <DropDown
              // value={value}
              placeholder="Select Status"
              // onChange={(e) => {}}
              // options={options}
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
              //   onClick={DeletBulk}
            />
          </div>
          <div className="col-md-2">
            <NormalButton
              className="loginButton"
              label={edit ? "Update" : "Add Content"}
              //   onClick={DeletBulk}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddKnowledgeComp;
