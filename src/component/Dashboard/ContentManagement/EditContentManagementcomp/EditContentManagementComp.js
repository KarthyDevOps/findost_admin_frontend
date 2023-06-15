import React, { useState, useEffect } from "react";
import { BsArrowLeft } from "react-icons/bs";
import { useForm } from "react-hook-form";
//styles
import "./style.scss";
//internal components
import InputBox from "component/common/InputBox/InputBox";
import FormErrorMessage from "component/common/ErrorMessage";
import TextEditor from "component/common/TextEditor/TextEditor";
import CustomController from "component/common/Controller";
import SuccessModal from "component/common/DeleteModal/SuccessModal";
import NormalButton from "component/common/NormalButton/NormalButton";
import DropDown from "component/common/DropDown/DropDown";
//service
import { addContent, getContent, updateContent } from "service/Cms";
import { Toast } from "service/toast";
//helpers
import { history } from "helpers";

const EditContentManagementComp = ({ create, view, remove }) => {
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
  const [modal, setModal] = useState(false);
  const [edit, setedit] = useState(false);
  const [contentDetails, setcontentDetails] = useState({
    status: "",
  });
  const status = [
    {
      label: "Active",
      value: "active",
    },
    {
      label: "InActive",
      value: "inActive",
    },
  ];
  const id = localStorage.getItem("editId");

  useEffect(() => {
    setValue(
      "status",
      status.find((option) => option.value === contentDetails.status)
    );
  }, [contentDetails, setValue]);

  const getContentList = async () => {
    try {
      const params = {
        id: id,
      };
      let response = await getContent(params);
      if (response.status === 200) {
        const data = response?.data?.data;
        reset({
          title: data?.title,
          content: data?.description,
        });
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

  useEffect(() => {
    if (id) {
      setedit(true);
      getContentList();
    }
  }, []);

  const onSubmit = async (data) => {
    console.log("data", data);
    if (edit) {
      try {
        let body = {
          title: data.title,
          description: data.content,
        };
        if (contentDetails.status === "active") {
          body.isActive = true;
        } else {
          body.isActive = false;
        }
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
    } else {
      try {
        let body = {
          title: data.title,
          description: data.content,
        };
        if (contentDetails.status === "active") {
          body.isActive = true;
        } else {
          body.isActive = false;
        }
        let response = await addContent(body);
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
        <form>
          <div className="d-flex col-12   boder_box align-items-center">
            <div class="container ">
              <div class="row gx-5">
                <div class="col-4">
                  <label className="Product_description"> Page Title</label>
                  <InputBox
                    className="login_input"
                    type={"text"}
                    placeholder="Title"
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
                    value={status.find(
                      (option) => option.value === getValues("status")
                    )}
                    messages={{ required: "Page Status is Required" }}
                    render={({ onChange, ...field }) => {
                      return (
                        <DropDown
                          {...field}
                          placeholder="status"
                          name="status"
                          errors={errors.status}
                          options={status}
                          onChange={(option) => {
                            setcontentDetails((prevState) => ({
                              ...prevState,
                              status: option.value,
                            }));
                            onChange(option.value);
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
                      name={"content"}
                      control={control}
                      defaultValue={getValues("content")}
                      error={errors.content}
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
                            {...field}
                            onChange={(content) => {
                              onChange(content);
                            }}
                            name={"content"}
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
                      label={edit ? "Update" : "Add content"}
                    ></NormalButton>
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
            successMsg={
              edit
                ? "Privacy Policy Content Updated Successfully"
                : "Privacy Policy Content Added Successfully"
            }
          />
        </div>
      </div>
    </div>
  );
};

export default EditContentManagementComp;
