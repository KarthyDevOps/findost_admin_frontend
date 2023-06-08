import React, { useState, useEffect, Fragment } from "react";
import { BsArrowLeft } from "react-icons/bs";
import "./style.scss";
import InputBox from "component/common/InputBox/InputBox";
import { useForm } from "react-hook-form";
import FormErrorMessage from "component/common/ErrorMessage";
import TextEditor from "component/common/TextEditor/TextEditor";
import { history } from "helpers";
import { addTemplate, getTemplate, updateTemplate } from "service/Cms";
import NormalButton from "component/common/NormalButton/NormalButton";
import DropDown from "component/common/DropDown/DropDown";
import SuccessModal from "component/common/DeleteModal/SuccessModal";
import CustomController from "component/common/Controller";
import { Toast } from "service/toast";

const AddTempleteManagementcomp = ({ create, view, remove }) => {
  const {
    register,
    handleSubmit,
    setValue,
    errors,
    control,
    reset,
    setError,
    getValues,
  } = useForm({
    mode: "onChange",
  });

  const [modal, setModal] = useState(false);
  const [edit, setEdit] = useState(false);
  const [TemplateDetails, setTemplateDetails] = useState({
    type: "",
    status: "",
  });
  // console.log('first', TemplateDetails)
  const options = [
    {
      label: " PRE Template Message",
      value: "pre template message",
    },
    {
      label: " POST Template Message",
      value: "post template message",
    },
  ];
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

  const templateId = localStorage.getItem("editId");

  useEffect(() => {
    setValue(
      "type",
      options.find((option) => option.value === TemplateDetails.type)
    );
    setValue(
      "status",
      status.find((option) => option.value === TemplateDetails.status)
    );
  }, [TemplateDetails, setValue]);
  const getTemplateDetails = async () => {
    try {
      const params = {
        templateId: templateId,
      };
      let response = await getTemplate(params);

      if (response.status === 200) {
        const data = response?.data.data;
        reset({
          title: data?.title,
          content: data?.description,
        });
        console.log("data", data);
        // setValue("title", data.title);
        // setContent(data.description)
        setTemplateDetails({
          type: data.type,
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
    if (templateId) {
      setEdit(true);
      getTemplateDetails();
    }
  }, []);

  // const handleChange = (state) => {
  //   setEditorState(state);
  // };
  const onSubmit = async (data) => {
    setModal(true);

    if (!edit) {
      try {
        let body = {
          title: data.title,
          description: data.content,
          type: TemplateDetails.type,
        };
        if (TemplateDetails.status === "active") {
          body.isActive = true;
        } else {
          body.isActive = false;
        }
        let response = await addTemplate(body);
        if (response.status === 200) {
          setModal(true);
          const timeout = setTimeout(() => {
            setModal(false);
            reset(TemplateDetails);
            history.push("/admin/template-management");
          }, 1000);
          return () => clearTimeout(timeout);
        } else {
          Toast({ type: "error", message: response.data.message });
        }
      } catch (e) {
        console.log(e);
      }
    } else {
      try {
        let body = {
          title: data.title,
          description: data.content,
          type: TemplateDetails.type,
        };
        if (TemplateDetails.status === "active") {
          body.isActive = true;
        } else {
          body.isActive = false;
        }
        let response = await updateTemplate(body, templateId);
        if (response.status === 200) {
          setModal(true);
          const timeout = setTimeout(() => {
            setModal(false);
            reset(TemplateDetails);
            history.push("/admin/template-management");
          }, 1000);
          return () => clearTimeout(timeout);
        } else {
          Toast({ type: "error", message: response.data.message });
        }
      } catch (e) {
        console.log(e);
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
            <p className="add_products_title m-0">
              {!edit ? "Add Template" : "Template Management"}
            </p>
          </div>
        </div>
        {/* <div> */}
        <form>
          <div className="d-flex col-12   boder_box align-items-center">
            <div class="container ">
              <div class="row gx-5">
                <div class="col-4">
                  <label className="Product_description">Message Title</label>
                  <InputBox
                    className="login_input"
                    type={"text"}
                    placeholder="Enter Message Title"
                    name="title"
                    errors={errors}
                    register={register({
                      required: true,
                    })}
                  />
                  <FormErrorMessage
                    error={errors.title}
                    messages={{
                      required: "Title is required",
                    }}
                  />
                </div>
                <div class="col-4">
                  <label className="Product_description">Message Type</label>
                  <CustomController
                    name={"type"}
                    control={control}
                    error={errors.type}
                    // defaultValue={role}
                    rules={{ required: true }}
                    messages={{ required: "Message type is Required" }}
                    render={({ onChange, ...field }) => {
                      return (
                        <DropDown
                          {...field}
                          name="type"
                          placeholder="Active"
                          options={options}
                          onChange={(option) => {
                            setTemplateDetails((prevState) => ({
                              ...prevState,
                              type: option.value,
                            }));
                            onChange(option.value);
                          }}
                        />
                      );
                    }}
                  />
                </div>
                <div class="col-4">
                  <label className="Product_description">Message Status</label>
                  <CustomController
                    name={"status"}
                    control={control}
                    error={errors.status}
                    // defaultValue={role}
                    value={status.find(
                      (option) => option.value === getValues("status")
                    )}
                    rules={{ required: true }}
                    messages={{ required: "Message Status is Required" }}
                    render={({ onChange, ...field }) => {
                      return (
                        <DropDown
                          {...field}
                          name="status"
                          errors={errors.status}
                          placeholder="Active"
                          options={status}
                          onChange={(option) => {
                            setTemplateDetails((prevState) => ({
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
              <div className="row gx-5 mt-3">
                <div className="col">
                  <label className="Product_description ms-3">
                    Template Message Content
                  </label>
                  <div className="text_editor">
                    <CustomController
                      name={"content"}
                      control={control}
                      error={errors.content}
                      rules={{ required: true }}
                      messages={{
                        required: "Template message is Required",
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
                      label={!edit ? "Add Template" : "Update"}
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
            successMsg={
              edit
                ? "Template Message Content Updated Successfully"
                : "New Template Added Successfully"
            }
          />
        </div>
      </div>
    </div>
  );
};

export default AddTempleteManagementcomp;
