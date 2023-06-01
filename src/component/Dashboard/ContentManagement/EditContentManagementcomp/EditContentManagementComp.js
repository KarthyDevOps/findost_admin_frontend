import React, { useState, useEffect, Fragment } from "react";
import { BsArrowLeft } from "react-icons/bs";
import "./style.scss";
import InputBox from "component/common/InputBox/InputBox";
import { useForm } from "react-hook-form";
import FormErrorMessage from "component/common/ErrorMessage";
// import ReactSelect from "react-select";
// import CommonDatePicker from "component/common/CommonDatePicker/CommonDatePicker";
import TextEditor from "component/common/TextEditor/TextEditor";
import { history } from "helpers";
import { editContent, updateContent } from "service/Cms";
import CustomController from "component/common/Controller";
// import FormErrorMessage from "component/common/ErrorMessage";
import SuccessModal from "component/common/DeleteModal/SuccessModal";
import NormalButton from "component/common/NormalButton/NormalButton";
import DropDown from "component/common/DropDown/DropDown";
import { Toast } from "service/toast";
const EditContentManagementComp = () => {
  const {
    register,
    handleSubmit,
    errors,
    control,
    setValue,
    reset,
    setError,

    getValues,
  } = useForm({
    mode: "onChange",
  });

  const [content, setContent] = useState();
// console.log(content)
  const [modal, setModal] = useState(false);
  const [edit, setedit] = useState(false);
  const [editorState, setEditorState] = useState(null);
  const [contentDetails, setcontentDetails] = useState({
    status: "",
  });

  const status = [
    {
      label: "ACTIVE",
      value: "active",
    },
    {
      label: "InACTIVE",
      value: "inActive",
    },
  ];
  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get("Editid");

  useEffect(() => {
    if (urlParams.has("Editid")) {
      setedit(true);
      getContentList();
    }
  }, []);

  useEffect(() => {
    setValue(
      "status",
      status.find((option) => option.value === contentDetails.status)
    );
  }, [contentDetails, setValue]);
  console.log("contentDetails :>> ", contentDetails);

  const getContentList = async () => {
    try {
      const params = {
        id: id,
      };
      let response = await editContent(params);
      if (response.status === 200) {
        const data = response?.data?.data;
        setValue("title", data.title);
        console.log(data.isActive, "val");
        setContent(data.description);
        setcontentDetails({
          status: data.isActive ? "active" : "inActive",
        });
      } else {
        Toast({ type: "error", message: response.data.message });
      }
    } catch (e) {
      console.log("e :>> ", e);
    }
  };
  // const handleChange = (state) => {
  //   setEditorState(state);
  // };
  const onSubmit = async (data) => {
    console.log("data", data);
    if (edit) {
      try {
        let body = {
          title: data.title,
          description: content,
          contentId:66876,
        };
        if (contentDetails.status === "active") {
          body.isActive = true;
        } else {
          body.isActive = false;
        }
        console.log(body, id, "hh");
        let response = await updateContent(body, id);
        if (response.status === 200) {
          setModal(true);
          const timeout = setTimeout(() => {
            setModal(false);
            reset(contentDetails);
            history.push("/admin/content-management");
          }, 1000);
          return () => clearTimeout(timeout);
        } else {
          Toast({ type: "error", message: response.data.message });
        }
      } catch (e) {
        console.log(e, "eee");
      }
    }
  };
  return (
    <div className="container-fluid">
      <div className="addProduct col-12">
        <div className="row">
          <div className=" d-flex my-3 align-items-center ">
            <i className="px-4">
              <BsArrowLeft
                size={28}
                onClick={() => history.goBack()}
                style={{ cursor: "pointer" }}
              />
            </i>
            <p className="add_products_title m-0">Content Management</p>
          </div>
        </div>
        {/* <div> */}

        <form>
          <div className="d-flex col-12   boder_box align-items-center">
            <div class="container ">
              <div class="row gx-5">
                <div class="col-4">
                  <label className="Product_description"> Page Title</label>
                  <InputBox
                    className="login_input"
                    type={"text"}
                    placeholder="Privacy Policy"
                    name="title"
                    defaultValue={contentDetails.title}
                    errors={errors}
                    register={register({
                      required: true,
                    })}
                  />
                  <FormErrorMessage
                    error={errors.title}
                    messages={{
                      required: "Privacy Policy is required",
                    }}
                  />
                </div>
                <div class="col-4">
                  <label className="Product_description">Page Status</label>
                  <CustomController
                    name={"status"}
                    control={control}
                    error={errors.status}
                    rules={{ required: true }}
                    // defaultValue={staffDetails.role}
                    value={status.find(
                      (option) => option.value === getValues("status")
                    )}
                    messages={{ required: "Page Status is Required" }}
                    render={({ onChange, ...field }) => {
                      return (
                        <DropDown
                          {...field}
                          placeholder="Active"
                          name="status"
                          errors={errors.status}
                          options={status}
                          onChange={(option) => {
                            setcontentDetails((prevState) => ({
                              ...prevState,
                              status: option.value,
                            }));
                            // onChange(option.value);
                          }}
                        />
                      );
                    }}
                  />
                </div>
              </div>
              <div className="row gx-5">
                <div className="col">
                  <label className="Product_description ms-3">
                    Page Content
                  </label>
                  <div className="text_editor">
                    <CustomController
                      name={"TextEditor"}
                      control={control}
                      error={errors.TextEditor}
                      rules={{ required: true }}
                      value={status.find(
                        (option) => option.value === getValues("status")
                      )}
                      messages={{
                        required: "Page content is Required",
                      }}
                      render={({ onChange, ...field }) => {
                        return (
                          <TextEditor
                            content={content}
                            {...field}
                            onChange={(text) =>
                              onChange(() => setContent(text))
                            }
                          />
                        );
                      }}
                    />
                  </div>
                </div>
              </div>
              <div className="row mt-4">
                <div className="col-12  d-flex justify-content-end">
                  <div className="col-2">
                    <NormalButton
                      onClick={() => history.goBack()}
                      cancel
                      label="cancel"
                    >
                      {" "}
                    </NormalButton>
                  </div>
                  <div className="col-2">
                    <NormalButton
                      addProductbtn
                      onClick={handleSubmit(onSubmit)}
                      // onClick={alert("jjjjj")}
                      label="Update"
                    >
                      {" "}
                    </NormalButton>
                    {/* <NormalButton addProductbtn label='Update'> </NormalButton> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
        <div>
          <SuccessModal
            modalOpen={modal}
            onCancel={() => setModal(false)}
            successMsg={"Privacy Policy Content Updated Successfully"}
          />
        </div>
      </div>
    </div>
  );
};

export default EditContentManagementComp;
