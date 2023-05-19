import React, { useState, useEffect, Fragment } from "react";
import { BsArrowLeft } from "react-icons/bs";
import { history } from "helpers";
import "./style.scss";
import DropDown from "component/common/DropDown/DropDown";
import { useForm } from "react-hook-form";
import InputBox from "component/common/InputBox/InputBox";
import DatePick from "component/common/DatePicker";
import NormalButton from "component/common/NormalButton/NormalButton";

const EditClientsFamilyComp = () => {
  const { register, handleSubmit, errors, reset, setError } = useForm({
    mode: "onChange",
  });
  return (
    <div className="px-5 py-3">
      <div className="edit_client d-flex my-3 align-items-center ">
        <i className="pr-3">
          <BsArrowLeft
            size={28}
            onClick={() => history.goBack()}
            style={{ cursor: "pointer" }}
          />
        </i>
        <p className="m-0">{"Client’s Family"}</p>
      </div>
      <div className="client_box p-5">
        <div className="row ">
          <div className="col-md-4">
            <label>Client Name</label>
            <InputBox
              className="add_staff"
              type={"text"}
              placeholder="Enter Client Name"
              //   errors={errors}
              name="name"
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
          <div className="col-md-4">
            <label>Email Id</label>
            <InputBox
              className="add_staff"
              type={"text"}
              placeholder="Enter Email Id"
              //   errors={errors}
              name="email"
              errors={errors}
              register={register({
                required: true,
                pattern: /\S+@\S+\.\S+/,
              })}

              //   value={searchStaff}
              // onChange={(e) => {
              //   setsearch(e.target.value);
              //   setactivePage(1);
              // }}
            />
          </div>
          <div className="col-md-4">
            <label>Date of Birth</label>
            <DatePick />
          </div>
          <div className="col-md-4 my-3">
            <label>Relative Name</label>
            <InputBox
              className="add_staff"
              type={"text"}
              placeholder="Enter Relative Name"
              //   errors={errors}
              name="name"
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
          <div className="col-md-4 my-3">
            <label>Relationship</label>
            <DropDown
              // value={value}
              placeholder="Select Relationship"
              register={register({
                required: true,
              })}
              name="role"
              errors={errors}
              // onChange={(e) => {}}
              // options={options}
            />
          </div>
        </div>
        <div className="d-flex align-items-center justify-content-end my-5">
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
              label={"Update"}
              //   onClick={DeletBulk}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditClientsFamilyComp;
