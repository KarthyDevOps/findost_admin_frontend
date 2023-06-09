import React, { useState, useEffect, Fragment } from "react";
import "./style.scss";
import { BsArrowLeft } from "react-icons/bs";
import { Toast } from "service/toast";
import { history } from "helpers";
import { useForm } from "react-hook-form";
import InputBox from "component/common/InputBox/InputBox";
import DropDown from "component/common/DropDown/DropDown";
import TextEditor from "component/common/TextEditor/TextEditor";
import NormalButton from "component/common/NormalButton/NormalButton";
import Dropzone from "component/common/Dropzone";
import SuccessModal from "component/common/DeleteModal/SuccessModal";
import FormErrorMessage from "component/common/ErrorMessage";
import CustomController from "component/common/Controller";
import { addKnowledge, getKnowledge, updateKnowledge } from "service/Cms";

const AddKnowledgeComp = ({ create, view, remove }) => {
  const {
    register,
    handleSubmit,
    getValues,
    errors,
    setValue,
    reset,
    control,
  } = useForm({
    mode: "onChange",
  });
  const [modal, setModal] = useState(false);
  const [edit, setEdit] = useState(false);
  const [KnowledgeDetails, setKnowledgeDetails] = useState({
    category: "",
    subcategory: "",
    status: "",
  });
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
  const id = localStorage.getItem("editId");
  useEffect(() => {
    setValue(
      "category",
      options.find((option) => option.value === KnowledgeDetails.category)
    );
    setValue(
      "subcategory",
      options.find((option) => option.value === KnowledgeDetails.subcategory)
    );
    setValue(
      "status",
      status.find((option) => option.value === KnowledgeDetails.status)
    );
  }, [KnowledgeDetails, setValue]);
  const getKnowledgeDetails = async () => {
    try {
      const params = {
        knowledgeCenterId: id,
      };
      let response = await getKnowledge(params);
      if (response.status === 200) {
        const data = response?.data.data;
        reset({
          title: data?.title,
          content: data?.description,
          contentURL: data?.contentUrlLink,
        });
        setKnowledgeDetails({
          category: data.category,
          subcategory: data.subCategory,
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
      setEdit(true);
      getKnowledgeDetails();
    }
  }, []);

  const onSubmit = async (data) => {
    setModal(true);
    if (!edit) {
      try {
        let body = {
          title: data.title,
          subCategory: KnowledgeDetails.subcategory,
          category: KnowledgeDetails.category,
          description: data?.content,
          contentUrlLink: data?.contentURL,
        };
        if (KnowledgeDetails.status === "active") {
          body.isActive = true;
        } else {
          body.isActive = false;
        }
        let response = await addKnowledge(body);
        if (response.status === 200) {
          setModal(true);
          const timeout = setTimeout(() => {
            setModal(false);
            reset(KnowledgeDetails);
            history.push("/admin/knowledge-center");
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
          contentUrlLink: data?.contentURL,
          subCategory: KnowledgeDetails.subcategory,
          category: KnowledgeDetails.category,
          description: data?.content,
        };
        if (KnowledgeDetails.status === "active") {
          body.isActive = true;
        } else {
          body.isActive = false;
        }
        let response = await updateKnowledge(body, id);
        if (response.status === 200) {
          setModal(true);
          const timeout = setTimeout(() => {
            setModal(false);
            reset(KnowledgeDetails);
            history.push("/admin/knowledge-center");
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
    <div className="px-5 py-3 Add_knowledge">
      <div className="d-flex my-3 align-items-center">
        <i className="pr-3">
          <BsArrowLeft
            size={28}
            onClick={() => history.goBack()}
            style={{ cursor: "pointer" }}
          />
        </i>
        <p className="m-0">{"Knowledge Center"}</p>
      </div>
      <form>
        <div className="knowledge_body p-5">
          <div className="row">
            <div className="col-4">
              <label>Title</label>
              <InputBox
                className="add_staff"
                type={"text"}
                placeholder="Enter Title"
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
            <div className="col-4">
              <label>Category</label>
              <CustomController
                name={"category"}
                control={control}
                error={errors.category}
                value={options.find(
                  (option) => option.value === getValues("category")
                )}
                rules={{ required: true }}
                messages={{ required: "category is Required" }}
                render={({ onChange, ...field }) => {
                  return (
                    <DropDown
                      {...field}
                      name="category"
                      placeholder="Select Category"
                      options={options}
                      onChange={(option) => {
                        setKnowledgeDetails((prevState) => ({
                          ...prevState,
                          category: option.value,
                        }));
                        onChange(option.value);
                      }}
                    />
                  );
                }}
              />
            </div>
            <div className="col-4">
              <label>Sub Category</label>
              <CustomController
                name={"subcategory"}
                control={control}
                value={status.find(
                  (option) => option.value === getValues("subcategory")
                )}
                error={errors.subcategory}
                rules={{ required: true }}
                messages={{ required: "Subcategory is Required" }}
                render={({ onChange, ...field }) => {
                  return (
                    <DropDown
                      {...field}
                      name="subcategory"
                      placeholder="Select Sub Category"
                      options={options}
                      onChange={(option) => {
                        setKnowledgeDetails((prevState) => ({
                          ...prevState,
                          subcategory: option.value,
                        }));
                        onChange(option.value);
                      }}
                    />
                  );
                }}
              />
            </div>
            <div className="col-4 my-3">
              <label>Content URL LinK</label>
              <InputBox
                className="add_staff"
                type={"text"}
                placeholder="Enter Content URL LinK"
                name="contentURL"
                errors={errors}
                register={register({
                  required: true,
                  pattern: /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/,
                })}
              />
              <FormErrorMessage
                error={errors.contentURL}
                messages={{
                  required: "URL is required",
                  pattern: "Invalid URL",
                }}
              />
            </div>
            <div className="col-4 mt-3">
              <label className="Product_description">Upload Document</label>
              <Dropzone>
                {({ getRootProps, getInputProps }) => (
                  <div {...getRootProps({ className: "dropzone" })}>
                    <input {...getInputProps()} multiple={false} required />
                  </div>
                )}
              </Dropzone>
            </div>
            <div className="col-4 my-3">
              <label>Status</label>
              <CustomController
                name={"status"}
                control={control}
                error={errors.status}
                defaultValue={KnowledgeDetails.status}
                value={status.find(
                  (option) => option.value === getValues("status")
                )}
                rules={{ required: true }}
                messages={{ required: "Status is Required" }}
                render={({ onChange, ...field }) => {
                  return (
                    <DropDown
                      {...field}
                      name="status"
                      placeholder="Select status"
                      options={status}
                      onChange={(option) => {
                        setKnowledgeDetails((prevState) => ({
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
          <div>
            <label>Description</label>
            <CustomController
              name={"content"}
              control={control}
              error={errors.content}
              rules={{ required: true }}
              messages={{
                required: "Description is Required",
              }}
              render={({ onChange, ...field }) => {
                return (
                  <TextEditor
                    {...field}
                    name={"content"}
                    onChange={(content) => {
                      onChange(content);
                    }}
                  />
                );
              }}
            />
          </div>
          <div className="d-flex align-items-center justify-content-end my-5 py-3">
            <div className="col-md-2">
              <NormalButton
                className="authButton1"
                label={"Cancel"}
                onClick={() => history.goBack()}
              />
            </div>
            <div className="col-md-2">
              <NormalButton
                className="loginButton"
                onClick={handleSubmit(onSubmit)}
                label={edit ? "Update" : "Add Content"}
              />
            </div>
          </div>
        </div>
      </form>
      <div>
        <SuccessModal
          modalOpen={modal}
          onCancel={() => setModal(false)}
          successMsg={
            !edit
              ? "Knowledge Center Added Successfully"
              : "Knowledge Center update Successfully"
          }
        />
      </div>
    </div>
  );
};

export default AddKnowledgeComp;
