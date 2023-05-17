import React, { useState, useEffect, Fragment } from "react";
import { BsArrowLeft } from "react-icons/bs";
import "./style.scss";
import InputBox from "component/common/InputBox/InputBox";
import { useForm } from "react-hook-form";
import FormErrorMessage from "component/common/ErrorMessage";
import ReactSelect from "react-select";
import CommonDatePicker from "component/common/CommonDatePicker/CommonDatePicker";
import TextEditor from "component/common/TextEditor/TextEditor";
import NormalButton from "component/common/NormalButton/NormalButton";
const AddFeedbackcomp = () => {
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
            Add Feedback
            </p>
          </div>
        </div>
        {/* <div> */}

        <div className="d-flex col-12   boder_box align-items-center">
          <div class="container ">
            <p className=""> Feedback Description</p>
           
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
                      <NormalButton cancel label='cancel'> </NormalButton>
                    </div>
                    <div className="col-2">
                     
                      <NormalButton addProductbtn label='Add Feedback'> </NormalButton>
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

export default AddFeedbackcomp;
