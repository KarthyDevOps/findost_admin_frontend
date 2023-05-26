import React, { useState, useEffect, Fragment } from "react";
import { BsArrowLeft } from "react-icons/bs";
import "./style.scss";
import InputBox from "component/common/InputBox/InputBox";
import { useForm } from "react-hook-form";
import TextEditor from "component/common/TextEditor/TextEditor";
import NormalButton from "component/common/NormalButton/NormalButton";
import { history } from "helpers";
import FormErrorMessage from "component/common/ErrorMessage";
import CustomController from "component/common/Controller";

const CreateNotificationComp = () => {
  const { register, handleSubmit, errors, reset, setError, control } = useForm({
    mode: "onChange",
  });
  const [content, setContent] = useState("");
  const [edit, setEdit] = useState(false);

  const onSubmit = (data) => {
    console.log("data :>> ", data);
  };

  return (
    <div className="px-5">
      <div className="Noti_header d-flex my-3 align-items-center ">
        <i className="pr-3">
          <BsArrowLeft
            size={28}
            onClick={() => history.goBack()}
            style={{ cursor: "pointer" }}
          />
        </i>
        <p className="m-0">
          {edit ? "Edit Notification" : "Create Notification"}
        </p>
      </div>
      <form>
        <div className="noti_body p-5">
          <div>
            <label>Notification Title</label>
            <InputBox
              className="add_staff"
              type={"text"}
              placeholder="Enter Notification Title"
              name="title"
              errors={errors}
              register={register({
                required: true,
              })}
            />
            <FormErrorMessage
              error={errors.title}
              messages={{
                required: "Notification Title is Required",
              }}
            />
          </div>
          <div className="pt-3">
            <label>Notification Content</label>
            <CustomController
              name={"content"}
              control={control}
              error={errors.content}
              rules={{ required: true }}
              messages={{
                required: "Notification Content is Required",
              }}
              render={({ onChange, ...field }) => {
                return (
                  <TextEditor
                    {...field}
                    content={content}
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
                onClick={() => history.push("/admin/notification-management")}
              />
            </div>
            <div className="col-md-2">
              <NormalButton
                className="loginButton"
                label={edit ? "Update" : "Create"}
                onClick={handleSubmit(onSubmit)}
              />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreateNotificationComp;
