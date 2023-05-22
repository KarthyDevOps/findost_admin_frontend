import React, { useState, useEffect, Fragment } from "react";
import { BsArrowLeft } from "react-icons/bs";
import "./style.scss";
import InputBox from "component/common/InputBox/InputBox";
import { useForm } from "react-hook-form";
import TextEditor from "component/common/TextEditor/TextEditor";
import NormalButton from "component/common/NormalButton/NormalButton";
import { history } from "helpers";

const CreateNotificationComp = () => {
  const { register, handleSubmit, errors, reset, setError } = useForm({
    mode: "onChange",
  }); 
  const [content, setContent] = useState("");
  const [edit, setEdit] = useState(false);

  return (
    <div className="px-5">
      <div className="Noti_header d-flex my-3 align-items-center ">
        <i className="pr-3">
          <BsArrowLeft size={28} onClick={() => history.goBack()} style={{cursor : "pointer"}} />
        </i>
        <p className="m-0">
          {edit ? "Edit Notification" : "Create Notification"}
        </p>
      </div>
      <div className="noti_body p-5">
        <div>
          <label>Notification Title</label>
          <InputBox
            className="add_staff"
            type={"text"}
            placeholder="Enter Notification Title"
            //   errors={errors}
            name="title"
            // errors={errors}
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
        <div className="pt-3">
          <label>Notification Content</label>
          <TextEditor content={content} setContent={setContent} />
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
              label={edit ? "Update" : "Create"}
              //   onClick={DeletBulk}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateNotificationComp;
