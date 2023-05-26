import React, { useState, useEffect, Fragment } from "react";
import { BsArrowLeft } from "react-icons/bs";
import "./style.scss";
import NormalButton from "component/common/NormalButton/NormalButton";
import { history } from "helpers";
import DropDown from "component/common/DropDown/DropDown";
import { useForm } from "react-hook-form";
import CustomController from "component/common/Controller";

const SendNotificationComp = () => {
  const { register, handleSubmit, errors, reset, setError, control } = useForm({
    mode: "onChange",
  });
  const [title, setTitle] = useState("");
  const [users, setUsers] = useState([]);

  const options = [
    {
      label: "ONE",
      value: "one",
    },
    {
      label: "TWO",
      value: "two",
    },
    {
      label: "THREE",
      value: "three",
    },
  ];

  const onsubmit = (data) => {
    console.log("data :>> ", data);
  };

  const handleUser = (value) => {
    let updatedUsers = options.filter((user) => user.value !== value);
    setUsers(updatedUsers);
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
                error={errors.title}
                rules={{ required: true }}
                messages={{ required: "Notification Title is Required" }}
                render={({ onChange, ...field }) => {
                  return (
                    <DropDown
                      {...field}
                      placeholder="Select Notification Title"
                      name="title"
                      value={title}
                      errors={errors.title}
                      options={options}
                      onChange={(text) => onChange(() => setTitle(text))}
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
                      options={options}
                      onChange={(user) => onChange(() => setUsers(user))}
                    />
                  );
                }}
              />
              {console.log(users, "users")}
            </div>
            <div className="col-1"></div>
          </div>
          <div>
            <label>Select Users</label>
            <div className=" col-11 users_box p-3">
              {users.length > 0 &&
                users.map((user) => {
                  return (
                    <>
                      <span
                        style={{ background: " #F2F2F2", borderRadius: "6px" }}
                      >
                        {user.label}
                        <small onClick={(e) => handleUser(user.value)}>
                          &nbsp;&nbsp; X
                        </small>
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
              <textarea className="noti_content">
                Lorem ipsum dolor sit amet consectetur. Pellentesque diam
                facilisis dui felis morbi. Neque libero est vitae tempor.
                Viverra feugiat in nec et ultrices eros arcu. Venenatis
                venenatis quam donec nunc massa purus faucibus. Laoreet rhoncus
                elit suspendisse venenatis pellentesque hendrerit feugiat. Morbi
                faucibus feugiat sapien habitant at mauris risus. Viverra eu ut
                egestas bibendum euismod facilisis pellentesque sed.
              </textarea>
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
        </div>
      </form>
    </div>
  );
};

export default SendNotificationComp;
