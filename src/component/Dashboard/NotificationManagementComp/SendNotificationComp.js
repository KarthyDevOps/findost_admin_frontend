import React, { useState, useEffect, Fragment } from "react";
import { BsArrowLeft } from "react-icons/bs";
import "./style.scss";
import NormalButton from "component/common/NormalButton/NormalButton";
import { history } from "helpers";
import DropDown from "component/common/DropDown/DropDown";
import { useForm } from "react-hook-form";
import CustomController from "component/common/Controller";
import NormalMultiSelect from "component/common/NormalMultiSelect";
import FormErrorMessage from "component/common/ErrorMessage";
import closeIcon from "assets/images/closeIcon.svg";
import TextBox from "component/common/TextBox/TextBox";
import { addNotificationHistory } from "service/Communication";
import { Toast } from "service/toast";
import SuccessModal from "component/common/DeleteModal/SuccessModal";

const SendNotificationComp = ({ create, view, edit, remove }) => {
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
  const [users, setUsers] = useState([]);
  const [modal, setModal] = useState(false);

  const options = [
    {
      label: "option1",
      value: "option1",
    },
    {
      label: "option2",
      value: "option2",
    },
    {
      label: "option3",
      value: "option3",
    },
  ];

  const onsubmit = async (data) => {
    console.log("data :>> ", data);
    try {
      const body = {
        title: data.title,
        description: data.content,
        userId: data.users.map(user => user.value),
      };
      let response = await addNotificationHistory(body);
      if (response.status === 200) {
        setModal(true);
        const timeout = setTimeout(() => {
          setModal(false);
          reset({ title: "", content: "", users: [] });
          // history.push("/admin/notification-management?tab=1");
        }, 1000);
        return () => clearTimeout(timeout);
      } else {
        Toast({ type: "error", message: response.data.message });
      }
    } catch (e) {
      console.log("e :>> ", e);
    }
  };

  const handleUser = (index) => {
    users.splice(index, 1);
    setUsers([...users]);
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
              {/* <CustomController
                name={"users"}
                control={control}
                error={errors?.users}
                defaultValue={getValues("users")}
                rules={{ required: true }}
                messages={{ required: "Select Users is Required" }}
                render={({ onChange, ...fields }) => {
                  return (
                    <NormalMultiSelect
                      {...fields}
                      placeholder={"Select Users"}
                      options={options}
                      name="users"
                      handleChange={(e, { value } = {}) => {
                        onChange(value);
                      }}
                    />
                  );
                }}
              /> */}
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
                        {user.label} &nbsp;&nbsp;
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
