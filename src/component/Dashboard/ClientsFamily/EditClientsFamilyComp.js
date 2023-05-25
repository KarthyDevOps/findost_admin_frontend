import React, { useState, useEffect, Fragment } from "react";
import { BsArrowLeft } from "react-icons/bs";
import { history } from "helpers";
import "./style.scss";
import FormErrorMessage from "component/common/ErrorMessage";
import DropDown from "component/common/DropDown/DropDown";
import { useForm } from "react-hook-form";
import InputBox from "component/common/InputBox/InputBox";
import DatePick from "component/common/DatePicker";
import NormalButton from "component/common/NormalButton/NormalButton";
import CommonDatePicker from "component/common/CommonDatePicker/CommonDatePicker";
import CustomController from "component/common/Controller";
const EditClientsFamilyComp = () => {
  const { register, handleSubmit, errors, reset, setError,control } = useForm({
    mode: "onChange",
  });
  const [date, setdate] = useState("");
const onSubmit=()=>{

}
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
      <form>

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
            <FormErrorMessage
              error={errors.name}
              messages={{
                required: "Client Name is required",
              }}
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
              <FormErrorMessage
              error={errors.email}
              messages={{
                required: "Email is required",
                pattern:'Invalid Email'
              }}
            />
          </div>
          <div className="col-lg-2">
            <label>Date of Birth</label>
            <div className="date_of_birth">
              <CommonDatePicker
                value={date}
                onChange={(text) => setdate(text)}
                placeholder="DOB"
              />
            </div>
          </div>
          <div className="col-md-4 my-3">
            <label>Relative Name</label>
            <InputBox
              className="add_staff"
              type={"text"}
              placeholder="Enter Relative Name"
              //   errors={errors}
              name="relativename"
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
              error={errors.relativename}
              messages={{
                required: "Relative Name is required",
              }}
            />
          </div>
          <div className="col-md-4 my-3">
            <label>Relationship</label>
            <CustomController
                name={"select"}
                control={control}
                error={errors.select}
                // defaultValue={role}
                rules={{ required: true }}
                messages={{ required: "Select RelationShip is Required" }}
                render={({ onChange, ...field }) => {
                  return (
                    <DropDown
                    // value={value}
                    name="select"
                    placeholder="Select RelationShip"
                    
                      // onChange={(e) => {}}
                      // options={options}
                    />
                  );
                }}
              />

          </div>
        </div>
        <div className="d-flex align-items-center justify-content-end my-5">
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
              label={"Update"}
              onClick={handleSubmit(onSubmit)}
              //   onClick={DeletBulk}
            />
          </div>
        </div>
      </div>
      </form>
    </div>
  );
};

export default EditClientsFamilyComp;
