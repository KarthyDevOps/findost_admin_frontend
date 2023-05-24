import React, { useState, useEffect, Fragment } from "react";
import { BsArrowLeft } from "react-icons/bs";
import "./style.scss";
import InputBox from "component/common/InputBox/InputBox";
import { useForm } from "react-hook-form";
import ReactQuill from "react-quill";
import "quill/dist/quill.snow.css";
import ReactSelect from "react-select";
import TextEditor from "component/common/TextEditor/TextEditor";
import { history } from "helpers";
import CommonDatePicker from "component/common/CommonDatePicker/CommonDatePicker";
import CustomController from "component/common/Controller";
import NormalButton from "component/common/NormalButton/NormalButton";
import DropDown from "component/common/DropDown/DropDown";
import FormErrorMessage from "component/common/ErrorMessage";

const AddProductcomp = () => {
  const { register, handleSubmit, errors, reset, setError, control } = useForm({
    mode: "onChange",
  });
  const [role, setRole] = useState("");
  const [status, setStatus] = useState("");
  const [edit, setEdit] = useState(false);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [content, setContent] = useState("");
  const [quill, setQuill] = useState("");

  const [editorState, setEditorState] = useState(null);

  const Quill = ReactQuill.Quill;
  var Block = Quill.import("blots/block");
  Block.tagName = "div";
  Quill.register(Block);

  const handleChange = (state) => {
    setEditorState(state);
  };

  const modules = {
    toolbar: [
      [{ size: ["small", false, "large", "huge"] }],
      ["bold", "italic", "underline", "strike"],

      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      [
        { align: "" },
        { align: "center" },
        { align: "right" },
        { align: "justify" },
      ],
      [{ color: [] }, { background: [] }],
      ["link", "image"],
      ["clean"],
    ],
    clipboard: {
      matchVisual: false,
    },
  };

  const onsubmit = (data) => {
    console.log("data :>> ", data);
  };

  return (
    <div className="container-fluid">
      <div className="addProduct col-12">
        <div className="row">
          <div className=" d-flex my-3 align-items-center ">
            <i className="px-4">
              <BsArrowLeft
                onClick={() => history.goBack()}
                style={{ cursor: "pointer" }}
                size={28}
              />
            </i>
            <p className="add_products_title m-0">
              {edit ? "Edit Product" : "Add Product"}
            </p>
          </div>
        </div>
        {/* <div> */}
        <form>
          <div className="d-flex col-12   boder_box align-items-center">
            <div class="container ">
              <p className="title_product">Product Details</p>
              <div class="row gx-5">
                <div class="col-4">
                  <label className="Product_description"> Product Name</label>
                  <InputBox
                    className="login_input"
                    type={"text"}
                    placeholder="Enter Product Name"
                    name="productName"
                    errors={errors}
                    register={register({
                      required: true,
                    })}
                  />
                  <FormErrorMessage
                    error={errors.productName}
                    messages={{
                      required: "Product Name is Required",
                    }}
                  />
                </div>
                <div class="col-4">
                  <label className="Product_description">Product Plan</label>
                  <CustomController
                    name={"productPlan"}
                    control={control}
                    error={errors.productPlan}
                    // defaultValue={city}
                    rules={{ required: true }}
                    messages={{ required: "Product Plan is Required" }}
                    render={({ onChange, ...field }) => {
                      return (
                        <DropDown
                          {...field}
                          placeholder="Enter Product Plan"
                          name="productPlan"
                          // value={status}
                          errors={errors.productPlan}
                          // options={options}
                          // onChange={(e) => setStatus(e)}
                        />
                      );
                    }}
                  />
                </div>
              </div>
              <div className="row gx-5">
                <div className="col">
                  <label className="Product_description ms-3">
                    Product Description
                  </label>
                  <div className="text_editor">
                    <ReactQuill
                      // className={`${styles.editors}`}
                      theme="snow"
                      value={quill}
                      defaultValue={quill}
                      onChange={setQuill}
                      modules={modules}
                      style={{ height: "300px", border: "none" }}
                    />

                    {/* <TextEditor content={content} setContent={setContent} /> */}
                  </div>
                </div>
              </div>
              <p className="title_product mt-5">Sub Product Details</p>

              <div className="row gx-5 mt-30">
                <div className="col-md-4">
                  <label className="Product_description">
                    {" "}
                    Sub Product Name
                  </label>

                  <InputBox
                    className="login_input"
                    type={"text"}
                    placeholder="Enter SubProduct Name"
                    errors={errors}
                    name="subProductName"
                    register={register({
                      required: true,
                    })}
                  />
                  <FormErrorMessage
                    error={errors.subProductName}
                    messages={{
                      required: "SubProduct Name is Required",
                    }}
                  />
                </div>
                <div className="col-md-4">
                  <label className="Product_description">
                    {" "}
                    Product Mapped Details
                  </label>
                  <CustomController
                    name={"status"}
                    control={control}
                    error={errors.status}
                    // defaultValue={city}
                    rules={{ required: true }}
                    messages={{
                      required: "Product Mapping Details is Required",
                    }}
                    render={({ onChange, ...field }) => {
                      return (
                        <DropDown
                          {...field}
                          placeholder="Filter by Status"
                          name="status"
                          // value={status}
                          errors={errors.status}
                          // options={options}
                          // onChange={(e) => setStatus(e)}
                        />
                      );
                    }}
                  />
                </div>

                <div className="col-md-2">
                  <label className="Product_description">
                    {" "}
                    Duration Details
                  </label>
                  <CustomController
                    name={"startDate"}
                    control={control}
                    error={errors.startDate}
                    // defaultValue={startDate}
                    rules={{ required: true }}
                    messages={{
                      required: "StartDate is Required",
                    }}
                    render={({ onChange, ...field }) => {
                      return (
                        <CommonDatePicker
                          {...field}
                          value={startDate}
                          name="startDate"
                          onChange={(text) => setStartDate(text)}
                          placeholder="Start Date"
                          errors={errors.startDate}
                        />
                      );
                    }}
                  />
                </div>
                <div className="end_date col-md-2 ">
                  <CustomController
                    name={"endDate"}
                    control={control}
                    error={errors.endDate}
                    // defaultValue={endDate}
                    rules={{ required: true }}
                    messages={{
                      required: "EndDate is Required",
                    }}
                    render={({ onChange, ...field }) => {
                      return (
                        <CommonDatePicker
                          {...field}
                          value={endDate}
                          name="endDate"
                          onChange={(text) => setEndDate(text)}
                          placeholder="End Date"
                          errors={errors.endDate}
                        />
                      );
                    }}
                  />
                </div>
                <div className="col-md-4">
                  <label className="Product_description"> City</label>
                  <CustomController
                    name={"city"}
                    control={control}
                    error={errors.city}
                    // defaultValue={city}
                    rules={{ required: true }}
                    messages={{ required: "City is Required" }}
                    render={({ onChange, ...field }) => {
                      return (
                        <DropDown
                          {...field}
                          placeholder="Select City"
                          name="status"
                          // value={status}
                          errors={errors.city}
                          // options={options}
                          // onChange={(e) => setStatus(e)}
                        />
                      );
                    }}
                  />
                </div>
                <div className="col-md-4">
                  <label className="Product_description">Country</label>
                  <CustomController
                    name={"country"}
                    control={control}
                    error={errors.country}
                    // defaultValue={city}
                    rules={{ required: true }}
                    messages={{ required: "Country is Required" }}
                    render={({ onChange, ...field }) => {
                      return (
                        <DropDown
                          {...field}
                          placeholder="Select Country"
                          name="country"
                          // value={status}
                          errors={errors.city}
                          // options={options}
                          // onChange={(e) => setStatus(e)}
                        />
                      );
                    }}
                  />
                </div>
              </div>
              <div className="row mt-4">
                <div className="col-12  d-flex justify-content-end">
                  <div className="col-2">
                    <NormalButton
                      onClick={() => history.goBack()}
                      cancel
                      label="cancel"
                    />{" "}
                  </div>
                  <div className="col-2">
                    <NormalButton
                      addProductbtn
                      label="Add Product"
                      onClick={handleSubmit(onsubmit)}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProductcomp;
