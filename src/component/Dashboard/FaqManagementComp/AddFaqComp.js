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
import SuccessModal from "component/common/DeleteModal/SuccessModal";
import CustomController from "component/common/Controller";
import FormErrorMessage from "component/common/ErrorMessage";
const AddFaqComp = () => {
  const { register, handleSubmit, errors, control, reset, setError } = useForm({
    mode: "onChange",
  });
  const [modal, setModal] = useState(false);
  const [edit, setEdit] = useState(false);
  const [content, setContent] = useState("");

  const options = [
    {
      label: "ONE",
      value: "one",
    },
    {
      label: "TWO",
      value: "two",
    },
    {
      label: "THREE",
      value: "three",
    },
  ];

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
    <div className="add_faq px-5 py-3">
      <form>
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
                name="title"
                errors={errors}
                register={register({
                  required: true,
                })}
              />
              <FormErrorMessage
                error={errors.title}
                messages={{
                  required: "Title is required",
                }}
              />
            </div>
          </div>
          <div className="row my-4">
            <div className="col-3">
              <label>Category</label>
              <CustomController
                name={"category"}
                control={control}
                error={errors.category}
                // defaultValue={role}
                rules={{ required: true }}
                messages={{ required: " Category is Required" }}
                render={({ onChange, ...field }) => {
                  return (
                    <DropDown
                      // value={value}
                      name="category"
                      placeholder="Select Category"
                      errors={errors.status}
                      value={options.value}
                      options={options}
                      onChange={(option) => onChange(option.value)}
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
                messages={{ required: "  Sub Category is Required" }}
                render={({ onChange, ...field }) => {
                  return (
                    <DropDown
                      // value={value}
                      name="subcategory"
                      placeholder="Select Sub Category"
                      errors={errors.status}
                      value={options.value}
                      options={options}
                      onChange={(option) => onChange(option.value)}
                    />
                  );
                }}
              />
            </div>
            <div className="col-3">
              <label>FAQ Status</label>
              <CustomController
                name={"select"}
                control={control}
                error={errors.select}
                // defaultValue={role}
                rules={{ required: true }}
                messages={{ required: " Status is Required" }}
                render={({ onChange, ...field }) => {
                  return (
                    <DropDown
                      // value={value}
                      name="select"
                      placeholder="Select Status"
                      errors={errors.status}
                      value={options.value}
                      options={options}
                      onChange={(option) => onChange(option.value)}
                    />
                  );
                }}
              />
            </div>
          </div>
          <div className="col-12 p-0">
            <label>FAQ Status</label>
            <CustomController
              name={"TextEditor"}
              control={control}
              error={errors.TextEditor}
              // defaultValue={endDate}
              rules={{ required: true }}
              messages={{
                required: "FAQ status is Required",
              }}
              render={({ onChange, ...field }) => {
                return (
                  <TextEditor
                    {...field}
                    content={content}
                    errors={errors.TextEditor}
                    onChange={(text) => onChange(() => setContent(text))}
                  />
                );
              }}
            />
          </div>
          <div className="d-flex align-items-center justify-content-end my-5 pt-3">
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
                label={edit ? "Update" : "Add FAQ"}
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
              ? "FAQ Content Updated Successfully"
              : "New FAQ Added Successfully"
          }
        />
      </div>
    </div>
  );
};

export default AddFaqComp;
