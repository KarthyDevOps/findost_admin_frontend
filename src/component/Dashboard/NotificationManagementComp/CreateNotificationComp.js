import React, { useState, useEffect } from "react";
// styles
import "./style.scss";
// internal components
import InputBox from "component/common/InputBox/InputBox";
import TextEditor from "component/common/TextEditor/TextEditor";
import NormalButton from "component/common/NormalButton/NormalButton";
import FormErrorMessage from "component/common/ErrorMessage";
import CustomController from "component/common/Controller";
import SuccessModal from "component/common/DeleteModal/SuccessModal";
// services
import { BsArrowLeft } from "react-icons/bs";
import { useForm } from "react-hook-form";
import {
  addNotificationTemplate,
  getNotificationTemplate,
  updateNotificationTemplate,
} from "service/Communication";
import { Toast } from "service/toast";
// helpers
import { history } from "helpers";

const CreateNotificationComp = ({ create, view, remove }) => {
  const { register, handleSubmit, errors, reset, control, getValues } = useForm(
    {
      mode: "onChange",
    }
  );
  const [edit, setEdit] = useState(false);
  const [quill, setQuill] = useState("");
  const [loading, setLoading] = useState(false);

  const [modal, setModal] = useState(false);
  const id = localStorage.getItem("editId");

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
        setQuill(response?.data?.data?.description);
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
        if (quill.replace(/(\<\w*\/?\w*>)/g, "").trim() == "") {
          Toast({ type: "error", message: "Notification Content is Required" });
          return;
        }
        setLoading(true);

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
          setLoading(false);
          return () => clearTimeout(timeout);
        } else {
          Toast({ type: "error", message: response.data.message });
        }
      } catch (e) {
        console.log("e :>> ", e);
      }
    } else {
      try {
        if (quill.replace(/(\<\w*\/?\w*>)/g, "").trim() == "") {
          Toast({ type: "error", message: "Notification Content is Required" });
          return;
        }
        setLoading(true);
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
          setLoading(false);

          return () => clearTimeout(timeout);
        } else {
          setLoading(false);

          Toast({ type: "error", message: response.data.message });
        }
      } catch (e) {
        console.log("e :>> ", e);
      }
    }
  };

  useEffect(() => {
    if (id) {
      setEdit(true);
      getTemplateDetails();
    }
  }, []);

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
                pattern: /^(?!\s*$).+/,
              })}
            />
            <FormErrorMessage
              error={errors.title}
              messages={{
                required: "Notification Title is Required",
                pattern: "Please enter a Valid Title",
              }}
            />
          </div>
          <div className="pt-4">
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
                      setQuill(content);
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
            <div className="col-md-2 pr-0">
              <NormalButton
                className="loginButton"
                label={edit ? "Update" : "Create"}
                isLoading={loading}
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
