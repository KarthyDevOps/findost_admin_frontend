import React, { useState, useEffect, Fragment } from "react";
import { BsArrowLeft } from "react-icons/bs";
import "./style.scss";
import { history } from "helpers";
import NormalButton from "component/common/NormalButton/NormalButton";
import InputBox from "component/common/InputBox/InputBox";
import { useForm } from "react-hook-form";
import ReactSelect from "react-select";
import TextEditor from "component/common/TextEditor/TextEditor";
import DropDown from "component/common/DropDown/DropDown";

const AddFaqComp = () => {
  const { register, handleSubmit, errors, reset, setError } = useForm({
    mode: "onChange",
  });
  const [edit, setEdit] = useState(false);

  return (
    <div className="add_faq px-5 py-3">
      <div className="d-flex my-3 align-items-center justify-content-between">
        <div className="d-flex my-3 align-items-center">
          <i className="pr-3">
            <BsArrowLeft
              size={28}
              onClick={() => history.goBack()}
              style={{ cursor: "pointer" }}
            />
          </i>
          <p className="m-0">{edit ? "Edit FAQ" : "Add New FAQ"}</p>
        </div>
        <div className="row gap-3 my-3">
          <div className="pr-3">
            <NormalButton
              className="authButton1"
              label={"Download Sample"}
              //   onClick={DeletBulk}
            />
          </div>
          <div className="">
            <NormalButton
              className="loginButton"
              label={"Upload CSV"}
              //   onClick={DeletBulk}
            />
          </div>
        </div>
      </div>
      <div className="Add_faq p-5">
        <div className="row">
          <div className="col-10">
            <label>FAQ Title</label>
            <InputBox
              className="add_staff"
              type={"text"}
              placeholder="Enter FAQ Title"
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
        </div>
        <div className="row my-4">
          <div className="col-3">
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
          <div className="col-3">
            <label>FAQ Status</label>
            <DropDown
              // value={value}
              placeholder="Select Status"
              // onChange={(e) => {}}
              // options={options}
            />
          </div>
        </div>
        <div className="col-12 p-0">
          <label>FAQ Status</label>
          <TextEditor />
        </div>
        <div className="d-flex align-items-center justify-content-end my-3">
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
              label={edit ? "Update" : "Add FAQ"}
              //   onClick={DeletBulk}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddFaqComp;
