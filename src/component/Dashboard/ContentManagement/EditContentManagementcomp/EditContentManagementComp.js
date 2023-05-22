import React, { useState, useEffect, Fragment } from "react";
import { BsArrowLeft } from "react-icons/bs";
import "./style.scss";
import InputBox from "component/common/InputBox/InputBox";
import { useForm } from "react-hook-form";
import FormErrorMessage from "component/common/ErrorMessage";
import ReactSelect from "react-select";
import CommonDatePicker from "component/common/CommonDatePicker/CommonDatePicker";
import TextEditor from "component/common/TextEditor/TextEditor";
import { history } from "helpers";
import NormalButton from "component/common/NormalButton/NormalButton";
import DropDown from "component/common/DropDown/DropDown";
const EditContentManagementComp = () => {
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
            <BsArrowLeft size={28}   onClick={() => history.goBack()} style={{cursor : "pointer"}}/>
          </i>
          <p className="add_products_title m-0">
          Content Management
          </p>
        </div>
      </div>
      {/* <div> */}

      <div className="d-flex col-12   boder_box align-items-center">
        <div class="container ">
      
          <div class="row gx-5">
            <div class="col-4">
              <label className="Product_description"> Page Title</label>
              <InputBox
                className="login_input"
                type={"text"}
                placeholder="Privacy Policy"
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
              <label className="Product_description">Page Status</label>
             <DropDown
                placeholder={"Active"}
             />
            </div>
          </div>
          <div className="row gx-5">
            <div className="col">
              <label className="Product_description ms-3">
              Page Content
              </label>
              <div className="text_editor">
              <TextEditor content={content} setContent={setContent} />

              </div>
            </div>
          </div>
          <div className="row mt-4">
                <div className="col-12  d-flex justify-content-end">
                  <div className="col-2">
                    <NormalButton  onClick={() => history.goBack()} cancel label='cancel'> </NormalButton>
                  </div>
                  <div className="col-2">
                   
                    <NormalButton addProductbtn label='Update'> </NormalButton>
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

export default EditContentManagementComp;
