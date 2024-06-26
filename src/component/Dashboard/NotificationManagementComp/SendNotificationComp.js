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
  getNotificationTemplateList,
  updateNotificationHistory,
} from "service/Communication";
import { getUserList } from "service/Auth";
import { Toast } from "service/toast";
// helpers
import { InitialSpaceNotAllowed, history, options } from "helpers";
import InputBox from "component/common/InputBox/InputBox";

const SendNotificationComp = () => {
  const {
    register,
    handleSubmit,
    errors,
    reset,
    control,
    getValues,
    setValue,
  } = useForm({
    mode: "onChange",
  });
  const [edit, setEdit] = useState(false);
  const [users, setUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [modal, setModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [titleData, setTitleData] = useState([]);
  const [descriptionData, setDescriptionData] = useState([]);

  const id = localStorage.getItem("editId");

  const ListUsers = async () => {
    try {
      let params = {
        all: true,
      };
      let response = await getUserList(params);
      if (response.status === 200) {
        let usersArray = [];
        usersArray = response?.data?.data?.list.map((user) => ({
          label: user?.accountName,
          value: user?.BOUserId,
        }));
        setUsers(usersArray);
      }
    } catch (e) {
      console.log("e :>> ", e);
    }
  };



  const getTemplateList = async (page) => {
    try {
      let params = {
        // page: 1,
        // limit: 10,
        // search: search,
        returnAll: true,
      };
      let response = await getNotificationTemplateList(params);
      if (response.status === 200 && response?.data?.data?.list.length > 0) {
        let updateArr = [];
        updateArr = response?.data?.data?.list;
        let titleList = updateArr?.map((x) => ({
          value: x?.title,
          label: x?.title,
        }));
        setTitleData(titleList);
        setDescriptionData(response?.data?.data?.list);
      } else {
        setTitleData([]);
      }
    } catch (err) {
      console.log("err :>> ", err);
    }
  };

  const setContent = (title) => {
    let notiTitle = title;
    let desObj = descriptionData?.find((x) => x?.title === notiTitle);
    if (desObj && desObj.description) {
      const strippedDescription = desObj.description.replace(
        /<\/?[^>]+(>|$)/g,
        ""
      );
      setValue("content", strippedDescription);
    }
  };

  const getHistoryDetails = async (users) => {
    try {
      let params = {
        id: id,
      };
      let response = await getNotificationHistory(params);
      if (response.status === 200) {
        reset({
          title: response?.data?.data?.title,
          content: response?.data?.data?.description,
        });
        if (users) {
          let userIds = response.data?.data?.authorizedPersonId;
          let newSel = users?.filter((user) => userIds.includes(user.value));
          setSelectedUsers(newSel);
        }
      } else {
        Toast({ type: "error", message: response.data.message });
      }
    } catch (e) {
      console.log("e :>> ", e);
    }
  };

  const onSubmit = async (data) => {
    console.log('data', data)
    if (!edit) {
      try {
        if (selectedUsers.length === 0) {
          Toast({ type: "error", message: "Please select a Users" });
          return;
        }
        setLoading(true);
        const body = {
          title: data.title,
          description: getValues("content"),
          authorizedPersonId: selectedUsers.map((x) => x.value),
        };
        let response = await addNotificationHistory(body);
        if (response.status === 200) {
          setModal(true);
          setTimeout(() => {
            setModal(false);
            reset({ title: "", content: "", users: [] });
            history.push("/admin/notification-management?tab=2");
          }, 2000);
          setLoading(false);
        } else {
          setLoading(false);

          Toast({ type: "error", message: response.data.message });
        }
      } catch (e) {
        console.log("e :>> ", e);
      }
    } else {
      
      try {
        if (selectedUsers.length === 0) {
          Toast({ type: "error", message: "Please select a Users" });
          return;
        }
        setLoading(true);
        const body = {
          title: data.title,
          description: getValues("content"),
          authorizedPersonId: selectedUsers.map((x) => x.value),
        };
        let response = await updateNotificationHistory(body, id);
        if (response.status === 200) {
          setModal(true);
          setTimeout(() => {
            setModal(false);
            reset({ title: "", content: "", users: [] });
            history.push("/admin/notification-management?tab=2");
          }, 2000);
          setLoading(false);
        } else {
          setLoading(false);
          Toast({ type: "error", message: response.data.message });
        }
      } catch (e) {
        console.log("e :>> ", e);
      }
    }
  };

  const handleUser = (id) => {
    let updatedUsers = selectedUsers.filter((x) => x.value !== id);
    setSelectedUsers(updatedUsers);
  };

  useEffect(() => {
    ListUsers();
    getTemplateList();
    if (id) {
      setEdit(true);
      getHistoryDetails();
    }
  }, []);

  useEffect(() => {
    if (users.length > 0 && id) {
      getHistoryDetails(users);
    }
  }, [users]);

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
                messages={{
                  required: "Notification Title is Required",
                }}
                render={({ onChange, ...fields }) => {
                  return (
                    <NormalMultiSelect
                      {...fields}
                      key={getValues("title")}
                      placeholder={"Select Notification Title"}
                      options={titleData}
                      name="title"
                      value={getValues("title")}
                      handleChange={(e, { value, label } = {}) => {
                        onChange(value);
                        setValue("title", value);
                        setContent(value);
                      }}
                    />
                  );
                }}
              />
              {/* <InputBox
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
                  pattern: "Please Enter a Valid Title",
                }}
              /> */}
            </div>

            <div className="col-md-6 my-3">
              <label>Select Users</label>
              <CustomController
                name={"users"}
                control={control}
                error={errors?.users}
                // defaultValue={}
                rules={{ required: selectedUsers.length > 0 ? false : true }}
                messages={{ required: "Select Users is Required" }}
                render={({ onChange, ...fields }) => {
                  return (
                    <NormalMultiSelect
                      {...fields}
                      placeholder={"Select Users"}
                      options={users}
                      name="users"
                      value={selectedUsers.map((x) => x.value)}
                      handleChange={(e) => {
                        onChange(e?.target?.value);
                        setSelectedUsers(e?.target?.value);
                      }}
                      isSearchable={true}
                      isMulti={true}
                      isClearable={false}
                      notification={true}
                    />
                  );
                }}
              />
              {console.log('users', users)}
            </div>
            <div className="col-1"></div>
          </div>
          <div className="my-3">
            <label>Select Users</label>
            <div className=" col-11 users_box p-3">
              {selectedUsers.length > 0 &&
                selectedUsers.map((user, index) => {
                  return (
                    <>
                      <span key={index} className="user_item">
                        {user?.label} &nbsp;&nbsp;
                        <img
                          src={closeIcon}
                          alt=""
                          onClick={(e) => handleUser(user?.value)}
                          className="cursor-pointer"
                        />
                      </span>
                    </>
                  );
                })}
            </div>
            <div className="col-1"></div>
          </div>
          <div className="my-4">
            <label>Notification Content</label>
            <div className=" col-11 content_box p-0">
              <TextBox
                cols={5}
                error={errors}
                name="content"
                isNotification
                value={getValues("content")}
                disabled={getValues("content")}
                register={register({
                  required: true,
                  // pattern: InitialSpaceNotAllowed,
                })}
              />
              {console.log('getValues("content")', getValues("content"))}
              <FormErrorMessage
                error={errors.content}
                messages={{
                  required: "Notification Content is Required",
                  pattern: "Please Enter a valid content",
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
                onClick={() =>
                  history.push("/admin/notification-management?tab=1")
                }
              />
            </div>
            <div className="col-md-3">
              <NormalButton
                className="loginButton"
                label={edit ? "Update" : "Send Notification"}
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
                  ? "Notification Update Successfully"
                  : "Notification Sent Successfully"
              }
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default SendNotificationComp;
