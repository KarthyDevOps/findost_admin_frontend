import React, { useState, useEffect } from "react";
// styles
import "./style.scss";
// images
import closeIcon from "assets/images/closeIcon.svg";
// internal components
import NormalButton from "component/common/NormalButton/NormalButton";
import DropDown from "component/common/DropDown/DropDown";
import CustomController from "component/common/Controller";
import NormalMultiSelect from "component/common/NormalMultiSelect";
import FormErrorMessage from "component/common/ErrorMessage";
import TextBox from "component/common/TextBox/TextBox";
import SuccessModal from "component/common/DeleteModal/SuccessModal";
// services
import { BsArrowLeft } from "react-icons/bs";
import { useForm } from "react-hook-form";
import {
  addNotificationHistory,
  getNotificationHistory,
  updateNotificationHistory,
} from "service/Communication";
import { Toast } from "service/toast";
// helpers
import { history, options } from "helpers";

const SendNotificationComp = () => {
  const { register, handleSubmit, errors, reset, control, getValues } = useForm(
    {
      mode: "onChange",
    }
  );
  const [edit, setEdit] = useState(false);
  const [users, setUsers] = useState([]);
  const [modal, setModal] = useState(false);
  const id = localStorage.getItem("editId");

  const getHistoryDetails = async () => {
    try {
      let params = {
        id: id,
      };
      let response = await getNotificationHistory(params);
      if (response.status === 200) {
        console.log("response.data.data :>> ", response?.data?.data?.title);
        reset({
          title: response?.data?.data?.title,
          content: response?.data?.data?.description,
        });
        setUsers(
          options.filter((user) => {
            const userValues = Object.values(response?.data?.data?.userId);
            return userValues.includes(user.value);
          })
        );
        console.log("users :>> ", users);
      } else {
        Toast({ type: "error", message: response.data.message });
      }
    } catch (e) {
      console.log("e :>> ", e);
    }
  };

  const onsubmit = async (data) => {
    if (!edit) {
      try {
        const body = {
          title: data.title,
          description: data.content,
          userId: data.users.map((user) => user.value),
        };
        let response = await addNotificationHistory(body);
        if (response.status === 200) {
          setModal(true);
          const timeout = setTimeout(() => {
            setModal(false);
            reset({ title: "", content: "", users: [] });
            history.push("/admin/notification-management?tab=1");
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
          userId: users.map((x) => x.value),
        };
        let response = await updateNotificationHistory(body, id);
        if (response.status === 200) {
          setModal(true);
          const timeout = setTimeout(() => {
            setModal(false);
            reset({ title: "", content: "", users: [] });
            history.push("/admin/notification-management?tab=1");
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

  const handleUser = (index) => {
    users.splice(index, 1);
    setUsers([...users]);
  };

  useEffect(() => {
    if (id) {
      setEdit(true);
      getHistoryDetails();
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
        <p className="m-0">Send Notification</p>
      </div>
      <form>
        <div className="noti_body  p-5">
          <div className="row">
            <div className="col-md-5 my-3">
              <label>Notification Title</label>
              <CustomController
                name={"title"}
                control={control}
                error={errors?.title}
                defaultValue={getValues("title")}
                rules={{ required: true }}
                messages={{ required: "Notification Title is Required" }}
                render={({ onChange, ...fields }) => {
                  return (
                    <NormalMultiSelect
                      {...fields}
                      placeholder={"Select Notification Title"}
                      options={options}
                      name="title"
                      handleChange={(e, { value } = {}) => {
                        onChange(value);
                      }}
                    />
                  );
                }}
              />
            </div>

            <div className="col-md-6 my-3">
              <label>Select Users</label>
              <CustomController
                name={"users"}
                control={control}
                error={errors.users}
                rules={{ required: true }}
                defaultValue={users}
                messages={{ required: "Select Users is Required" }}
                render={({ onChange, ...field }) => {
                  return (
                    <DropDown
                      {...field}
                      isMulti
                      placeholder="Select Users"
                      name="users"
                      value={users}
                      errors={errors.users}
                      controlShouldRenderValue={false}
                      options={options}
                      onChange={(user) => {
                        onChange(user);
                        setUsers(user);
                      }}
                    />
                  );
                }}
              />
            </div>
            <div className="col-1"></div>
          </div>
          <div>
            <label>Select Users</label>
            <div className=" col-11 users_box p-3">
              {users.length > 0 &&
                users.map((user, index) => {
                  return (
                    <>
                      <span
                        style={{
                          background: " #F2F2F2",
                          borderRadius: "6px",
                          padding: "10px",
                          margin: "10px",
                        }}
                      >
                        {user.value} &nbsp;&nbsp;
                        <img
                          src={closeIcon}
                          alt=""
                          onClick={(e) => handleUser(index)}
                          className="cursor-pointer"
                        />
                      </span>
                    </>
                  );
                })}
            </div>
            <div className="col-1"></div>
          </div>
          <div className="my-3">
            <label>Notification Content</label>
            <div className=" col-11 content_box p-0">
              <TextBox
                cols={5}
                error={errors}
                name="content"
                register={register({
                  required: true,
                })}
              />
              <FormErrorMessage
                error={errors.content}
                messages={{
                  required: "Notification Content is required",
                }}
              />
            </div>
            <div className="col-1"></div>
          </div>
          <div className="d-flex align-items-center justify-content-end my-3">
            <div className="col-md-2">
              <NormalButton
                className="authButton1"
                label={"Cancel"}
                onClick={() => history.push("/admin/notification-management")}
              />
            </div>
            <div className="col-md-3">
              <NormalButton
                className="loginButton"
                label={"Send Notification"}
                onClick={handleSubmit(onsubmit)}
              />
            </div>
          </div>
          <div>
            <SuccessModal
              modalOpen={modal}
              onCancel={() => setModal(false)}
              successMsg={"Notification Sent Successfully"}
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default SendNotificationComp;
