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

import NormalButton from "component/common/NormalButton/NormalButton";
import DropDown from "component/common/DropDown/DropDown";
const AddProductcomp = () => {
  const { register, handleSubmit, errors, reset, setError } = useForm({
    mode: "onChange",
  });
  const [role, setRole] = useState("");
  const [status, setStatus] = useState("");
  const [edit, setEdit] = useState(false);
  const [startdate, setstartdate] = useState("");
  const [enddate, setenddate] = useState("");
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
              <div class="col-4">
                <label className="Product_description">Product Plan</label>
                <DropDown placeholder={"Enter Product Plan"} />
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

            <div className="  row gx-5 mt-30 ">
              <div className="col-md-4 ">
                <label className="Product_description"> Sub Product Name</label>

                <InputBox
                  className="login_input"
                  type={"text"}
                  placeholder="Search by Id, Name"
                  errors={errors}
                  name="search"
                  Iconic
                  Search
                  // value={searchStaff}
                  // onChange={(e) => {
                  //   setsearch(e.target.value);
                  //   setactivePage(1);
                  // }}
                />
              </div>
              <div className="col-md-4">
                <label className="Product_description">
                  {" "}
                  Product Mapped Details
                </label>
                <DropDown placeholder="Filter by Status" />
              </div>

              <div className=" col-md-2">
                <label className="Product_description"> Duration Details</label>

                <CommonDatePicker
                  value={startdate}
                  onChange={(text) => setstartdate(text)}
                  placeholder="Start Date"
                />
              </div>
              <div className="  end_date col-md-2 ">
                <CommonDatePicker
                  value={enddate}
                  onChange={(text) => setenddate(text)}
                  placeholder="End Date"
                />
              </div>
              <div className="col-md-4">
                <label className="Product_description"> City</label>
                <DropDown placeholder={"Select City"} />
              </div>
              <div className="col-md-4">
                <label className="Product_description">Country</label>

                <DropDown placeholder={"India"} />
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
                  <NormalButton addProductbtn label="Add Product">
                    {" "}
                  </NormalButton>
                  {/* <NormalButton addProductbtn label='Update'> </NormalButton> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddProductcomp;
