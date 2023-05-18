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
const AnswerFeedbackcomp = () => {
  const { register, handleSubmit, errors, reset, setError } = useForm({
    mode: "onChange",
  });
  const [role, setRole] = useState("");
  const [status, setStatus] = useState("");
  const [edit, setEdit] = useState(false);
  const [startdate, setstartdate] = useState("");
  const [enddate, setenddate] = useState("");

  const [editorState, setEditorState] = useState(null);
  const [content, setContent] = useState("");

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
            <p className="add_products_title m-0">Feedback</p>
          </div>
        </div>
        {/* <div> */}

        <div className="d-flex col-12   boder_box align-items-center">
          <div class="container ">
            <div class="row gx-5">
              <div class="col-3">
                <label className="Product_description"> User Name</label>
                <div className="my-4" ></div>
              </div>
              <div class="col-9">
                <label className="Product_description">Description</label>
                <div className="my-4"></div>
              </div>
            </div>
            <p className=""> Feedback Answer</p>

            <div className="row gx-5">
              <div className="col">
                <div className="text_editor">
          <TextEditor content={content} setContent={setContent} />
                  
                </div>
              </div>
            </div>
            <div className="row mt-4">
              <div className="col-12  d-flex justify-content-end">
                <div className="col-2">
                  <NormalButton cancel label="cancel">
                    {" "}
                  </NormalButton>
                </div>
                <div className="col-2">
                  <NormalButton addProductbtn label="Answer">
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

export default AnswerFeedbackcomp;
