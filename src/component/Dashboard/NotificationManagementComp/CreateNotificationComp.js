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
import {
  addNotificationTemplate,
  getNotificationTemplate,
  updateNotificationTemplate,
} from "service/Communication";
import SuccessModal from "component/common/DeleteModal/SuccessModal";
import { Toast } from "service/toast";

const CreateNotificationComp = ({ create, view, remove }) => {
  const {
    register,
    handleSubmit,
    errors,
    reset,
    setError,
    control,
    getValues,
  } = useForm({
    mode: "onChange",
  });
  const [edit, setEdit] = useState(false);
  const [modal, setModal] = useState(false);

  const id = localStorage.getItem("editId");

  useEffect(() => {
    if (id) {
      setEdit(true);
      getTemplateDetails();
    }
  }, []);

  const getTemplateDetails = async () => {
    try {
      let params = {
        notificationTemplateId: id,
      };
      let response = await getNotificationTemplate(params);
      if (response.status === 200) {
        console.log("response.data.data :>> ", response?.data?.data?.title);
        reset({
          title: response?.data?.data?.title,
          content: response?.data?.data?.description,
        });
      } else {
        Toast({ type: "error", message: response.data.message });
      }
    } catch (e) {
      console.log("e :>> ", e);
    }
  };

  const onSubmit = async (data) => {
    if (!edit) {
      try {
        const body = {
          title: data.title,
          description: data.content,
        };
        let response = await addNotificationTemplate(body);
        if (response.status === 200) {
          setModal(true);
          const timeout = setTimeout(() => {
            setModal(false);
            reset({ title: "", content: "" });
            history.push("/admin/notification-management?tab=0");
          }, 1000);
          return () => clearTimeout(timeout);
        } else {
          Toast({ type: "error", message: response.data.message });
        }
      } catch (e) {
        console.log("e :>> ", e);
      }
    } else {
      try {
        const body = {
          title: data.title,
          description: data.content,
        };
        let response = await updateNotificationTemplate(body, id);
        if (response.status === 200) {
          setModal(true);
          const timeout = setTimeout(() => {
            setModal(false);
            reset({ title: "", content: "" });
            history.push("/admin/notification-management");
          }, 1000);
          return () => clearTimeout(timeout);
        } else {
          Toast({ type: "error", message: response.data.message });
        }
      } catch (e) {
        console.log("e :>> ", e);
      }
    }
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
              error={errors?.content}
              defaultValue={getValues("content")}
              rules={{ required: true }}
              messages={{ required: "Notification Content is Required" }}
              render={({ onChange, ...fields }) => {
                return (
                  <TextEditor
                    {...fields}
                    onChange={(content) => {
                      onChange(content);
                    }}
                    name={"content"}
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
          <div>
            <SuccessModal
              modalOpen={modal}
              onCancel={() => setModal(false)}
              successMsg={
                edit
                  ? "Notification Template Content Updated Successfully"
                  : "New Notification Template Added Successfully"
              }
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreateNotificationComp;
