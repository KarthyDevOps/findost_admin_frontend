import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { BsArrowLeft } from "react-icons/bs";
//styles
import "./style.scss";
//internal components
import NormalButton from "component/common/NormalButton/NormalButton";
import InputBox from "component/common/InputBox/InputBox";
import TextEditor from "component/common/TextEditor/TextEditor";
import DropDown from "component/common/DropDown/DropDown";
import SuccessModal from "component/common/DeleteModal/SuccessModal";
import CustomController from "component/common/Controller";
import FormErrorMessage from "component/common/ErrorMessage";
//service
import { Toast } from "service/toast";
import { addFAQ, getFAQ, updateFAQ } from "service/Cms";
//helpers
import { history } from "helpers";

const AddFaqComp = ({ create, view, remove }) => {
  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    errors,
    control,
    reset,
    setError,
  } = useForm({
    mode: "onChange",
  });
  const [modal, setModal] = useState(false);
  const [edit, setEdit] = useState(false);
  const [FAQDetails, setFAQDetails] = useState({
    category: "",
    subcategory: "",
    status: "",
  });
  const options = [
    {
      label: "one",
      value: "one",
    },
    {
      label: "Two",
      value: "two",
    },
    {
      label: "Three",
      value: "three",
    },
  ];
  const status = [
    {
      label: "Active",
      value: "active",
    },
    {
      label: "Inactive",
      value: "inActive",
    },
  ];
  const id = localStorage.getItem("editId");

  useEffect(() => {
    setValue(
      "category",
      options.find((option) => option.value === FAQDetails.category)
    );
    setValue(
      "subcategory",
      options.find((option) => option.value === FAQDetails.subcategory)
    );
    setValue(
      "status",
      status.find((option) => option.value === FAQDetails.status)
    );
  }, [FAQDetails, setValue]);

  const getFAQDetails = async () => {
    try {
      const params = {
        faqId: id,
      };
      let response = await getFAQ(params);
      if (response.status === 200) {
        const data = response?.data.data;
        reset({
          title: data?.title,
          content: data?.answer,
        });
        setFAQDetails({
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
      getFAQDetails();
    }
  }, []);

  const onSubmit = async (data) => {
    setModal(true);
    if (!edit) {
      try {
        let body = {
          title: data.title,
          answer: data.content,
          subCategory: FAQDetails.subcategory,
          category: FAQDetails.category,
        };
        if (FAQDetails.status === "active") {
          body.isActive = true;
        } else {
          body.isActive = false;
        }
        let response = await addFAQ(body);
        if (response.status === 200) {
          setModal(true);
          const timeout = setTimeout(() => {
            setModal(false);
            reset(FAQDetails);
            history.push("/admin/faq-management");
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
          answer: data.content,
          subCategory: FAQDetails.subcategory,
          category: FAQDetails.category,
        };
        if (FAQDetails.status === "active") {
          body.isActive = true;
        } else {
          body.isActive = false;
        }
        let response = await updateFAQ(body, id);
        if (response.status === 200) {
          setModal(true);
          const timeout = setTimeout(() => {
            setModal(false);
            reset(FAQDetails);
            history.push("/admin/faq-management");
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
    <div className="add_faq px-5 py-3">
      <form>
        <div className="d-flex my-3 align-items-center justify-content-between">
          <div className="d-flex my-3 align-items-center">
            <i className="pr-3">
              <BsArrowLeft
                size={28}
                onClick={() => history.goBack()}
                style={{ cursor: "pointer" }}
              />
            </i>
            <p className="m-0">{edit ? "Edit FAQ" : "Add New FAQ"}</p>
          </div>
          {/* <div className="row gap-3 my-3">
            <div className="pr-3">
              <NormalButton className="authButton1" label={"Download Sample"} />
            </div>
            <div className="">
              <NormalButton className="loginButton" label={"Upload CSV"} />
            </div>
          </div> */}
        </div>
        <div className="Add_faq p-5">
          <div className="row">
            <div className="col-11 ">
              <label>FAQ Title</label>
              <InputBox
                className="add_staff"
                type={"text"}
                placeholder="Enter FAQ Title"
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
                  required: "Title is Required",
                  pattern: "Title is Invalid",
                }}
              />
            </div>
          </div>
          <div className="row my-4 mr-5 pr-4 ">
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
                messages={{ required: " Category is Required" }}
                render={({ onChange, ...field }) => {
                  return (
                    <DropDown
                      {...field}
                      name="category"
                      placeholder="Select Category"
                      options={options}
                      onChange={(option) => {
                        setFAQDetails((prevState) => ({
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
                error={errors.subcategory}
                value={status.find(
                  (option) => option.value === getValues("subcategory")
                )}
                rules={{ required: true }}
                messages={{ required: "Sub Category is Required" }}
                render={({ onChange, ...field }) => {
                  return (
                    <DropDown
                      {...field}
                      name="subcategory"
                      placeholder="Select Sub Category"
                      options={options}
                      onChange={(option) => {
                        setFAQDetails((prevState) => ({
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
            <div className="col-4 ">
              <label>FAQ Status</label>
              <CustomController
                name={"status"}
                control={control}
                error={errors.status}
                value={status.find(
                  (option) => option.value === getValues("status")
                )}
                rules={{ required: true }}
                messages={{ required: " Status is Required" }}
                render={({ onChange, ...field }) => {
                  return (
                    <DropDown
                      {...field}
                      name="status"
                      placeholder="Select Status"
                      options={status}
                      onChange={(option) => {
                        setFAQDetails((prevState) => ({
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
          <div className="col-12 p-0">
            <label>FAQ Status</label>
            <CustomController
              name={"content"}
              control={control}
              error={errors.content}
              rules={{ required: true }}
              messages={{
                required: "FAQ status is Required",
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
          <div className="d-flex align-items-center justify-content-end   p-0 pt-5">
            <div className="col-md-2">
              <NormalButton
                className="authButton1"
                label={"Cancel"}
                onClick={() => history.push("/admin/faq-management")}
              />
            </div>
            <div className="col-md-2 pl-3 p-0">
              <NormalButton
                className="loginButton"
                onClick={handleSubmit(onSubmit)}
                label={edit ? "Update" : "Add FAQ"}
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
            edit
              ? "FAQ Content Updated Successfully"
              : "New FAQ Added Successfully"
          }
        />
      </div>
    </div>
  );
};

export default AddFaqComp;
