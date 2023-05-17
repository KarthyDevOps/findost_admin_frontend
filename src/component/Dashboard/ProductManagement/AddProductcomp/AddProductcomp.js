import React, { useState, useEffect, Fragment } from "react";
import { BsArrowLeft } from "react-icons/bs";
import "./style.scss";
import InputBox from "component/common/InputBox/InputBox";
import { useForm } from "react-hook-form";
import FormErrorMessage from "component/common/ErrorMessage";
import ReactSelect from "react-select";
// import TextEditor from "./EditorCmp";
import CommonDatePicker from "component/common/CommonDatePicker/CommonDatePicker";
// import DatePick from "component/common/DatePicker";
import TextEditor from "component/common/TextEditor/TextEditor";

import NormalButton from "component/common/NormalButton/NormalButton";
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

  const [editorState, setEditorState] = useState(null);

  const handleChange = (state) => {
    setEditorState(state);
  };
  return (
    <div className="container-fluid">
      <div className="addProduct col-12">
        <div className="row">
          <div className=" d-flex my-3 align-items-center ">
            <i className="px-4">
              <BsArrowLeft size={28} />
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
                <ReactSelect
                  value={role}
                  //   onChange={(value) => setservice(value)}
                  //   options={seviceList}
                  isClearable
                  placeholder={"Enter Product Plan"}
                />
              </div>
            </div>
            <div className="row gx-5">
              <div className="col">
                <label className="Product_description ms-3">
                Add Feedback
                </label>
                <div className="text_editor">
                <TextEditor content={content} setContent={setContent} />

                </div>
              </div>
            </div>
            <div className="row mt-4">
                  <div className="col-12  d-flex justify-content-end">
                    <div className="col-2">
                      <NormalButton cancel label='cancel'> </NormalButton>
                    </div>
                    <div className="col-2">
                     
                      <NormalButton addProductbtn label='Add Product'> </NormalButton>
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
