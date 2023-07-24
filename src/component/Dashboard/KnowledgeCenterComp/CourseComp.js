import React, { useState, useEffect } from "react";
import "./style.scss";
import { BsArrowLeft } from "react-icons/bs";
import { history } from "helpers";
import NormalButton from "component/common/NormalButton/NormalButton";
import closeIcon from "assets/images/closeIcon.png";
import { useForm } from "react-hook-form";
import FormErrorMessage from "component/common/ErrorMessage";
import InputBox from "component/common/InputBox/InputBox";

const CourseComp = ({
  setCourse,
  backtoForm,
  forms,
  setForms,
  errors,
  register,
}) => {
  const handleAddTitle = (e) => {
    e.preventDefault();
    setForms([
      ...forms,
      {
        title: "",
        list: [{ title: "", hrs: "", min: "", link: "" }],
      },
    ]);
  };

  const handleAddSubSection = (index, e) => {
    e.preventDefault();
    const updatedForms = [...forms];
    updatedForms[index].list.push({
      title: "",
      hrs: "",
      min: "",
      link: "",
    });
    setForms(updatedForms);
  };

  const handleRemoveTitle = (index) => {
    const updatedForms = [...forms];
    updatedForms.splice(index, 1);
    setForms(updatedForms);
  };

  const handleRemoveSubSection = (mainIndex, subIndex) => {
    const updatedForms = [...forms];
    updatedForms[mainIndex].list.splice(subIndex, 1);
    setForms(updatedForms);
  };

  const handleMainTitleChange = (index, value) => {
    const updatedForms = [...forms];
    updatedForms[index].title = value;
    setForms(updatedForms);
  };

  const handleSubSectionChange = (mainIndex, subIndex, fieldName, value) => {
    const updatedForms = [...forms];
    updatedForms[mainIndex].list[subIndex][fieldName] = value;
    setForms(updatedForms);
  };

  return (
    <div className="px-5 py-3 Add_knowledge">
      <div className="row align-items-center justify-content-between mb-4">
        <div className=" col-4 d-flex my-3 align-items-center">
          <i className="pr-3">
            <BsArrowLeft
              size={28}
              onClick={(e) => {
                e.preventDefault();
                backtoForm();
                setCourse(false);
              }}
              style={{ cursor: "pointer" }}
            />
          </i>
          <p className="m-0">{"Course Modules"}</p>
        </div>
        <div className="col-2">
          <NormalButton
            className="authButton1"
            label={"Add Title"}
            onClick={(e) => handleAddTitle(e)}
          />
        </div>
      </div>

      {forms.map((form, mainIndex) => (
        <>
          <div className="course-form p-5 mt-5">
            <div key={mainIndex}>
              <div className="row align-items-center mb-5">
                <div className="col-9">
                  <label>Title</label>
                  <InputBox
                    className="add_staff"
                    type="text"
                    name={`forms[${mainIndex}].title`}
                    placeholder="Enter Title"
                    value={form.title}
                    onChange={(e) =>
                      handleMainTitleChange(mainIndex, e.target.value)
                    }
                    errors={errors}
                    register={register({
                      required: "true",
                      pattern: /^(?!\s*$).+/,
                    })}
                  />
                  <FormErrorMessage
                    error={
                      errors.forms &&
                      errors.forms[mainIndex] &&
                      errors?.forms[mainIndex]?.title
                    }
                    messages={{
                      required: " Title is Required",
                      pattern: " Title is Invalid",
                    }}
                  />
                </div>
                <div className="col-3">
                  <NormalButton
                    className="loginButton"
                    label="Add Sub section"
                    onClick={(e) => {
                      handleAddSubSection(mainIndex, e);
                      setCourse(true);
                    }}
                  />
                </div>
              </div>
              {form.list.map((subSection, subIndex) => (
                <div key={subIndex} className="sub-section p-3 mb-3">
                  <div className="col-10">
                    <label>Sub Section Title</label>
                    <InputBox
                      className="add_staff"
                      type="text"
                      name={`forms[${mainIndex}].list[${subIndex}].title`}
                      placeholder="Enter Sub Section Title"
                      value={subSection.title}
                      onChange={(e) =>
                        handleSubSectionChange(
                          mainIndex,
                          subIndex,
                          "title",
                          e.target.value
                        )
                      }
                      errors={errors}
                      register={register({
                        required: true,
                        pattern: /^(?!\s*$).+/,
                      })}
                    />
                    <FormErrorMessage
                      error={
                        errors.forms &&
                        errors.forms[mainIndex] &&
                        errors.forms[mainIndex].list &&
                        errors.forms[mainIndex].list[subIndex] &&
                        errors.forms[mainIndex].list[subIndex].title
                      }
                      messages={{
                        required: "SubTitle is Required",
                        pattern: "SubTitle is Invalid",
                      }}
                    />
                  </div>
                  <div className="row mt-2 p-3">
                    <div className="col-2">
                      <label>Duration (in hr)</label>
                      <InputBox
                        className="add_staff"
                        type={"text"}
                        placeholder="(in hr)"
                        name={`forms[${mainIndex}].list[${subIndex}].hrs`}
                        value={subSection.hrs}
                        onChange={(e) =>
                          handleSubSectionChange(
                            mainIndex,
                            subIndex,
                            "hrs",
                            e.target.value
                          )
                        }
                        errors={errors}
                        register={register({
                          required: true,
                          pattern: /^[0-9]+$/,
                        })}
                      />
                      <FormErrorMessage
                        error={
                          errors.forms &&
                          errors.forms[mainIndex] &&
                          errors.forms[mainIndex].list &&
                          errors.forms[mainIndex].list[subIndex] &&
                          errors.forms[mainIndex].list[subIndex].hrs
                        }
                        messages={{
                          required: "Hrs is Required",
                          pattern: "Please enter numbers only for hours",
                        }}
                      />
                    </div>
                    <div className="col-2">
                      <label>Duration ( in min)</label>
                      <InputBox
                        className="add_staff"
                        type={"text"}
                        placeholder="( in min)"
                        name={`forms[${mainIndex}].list[${subIndex}].min`}
                        value={subSection.min}
                        onChange={(e) =>
                          handleSubSectionChange(
                            mainIndex,
                            subIndex,
                            "min",
                            e.target.value
                          )
                        }
                        errors={errors}
                        register={register({
                          required: true,
                          pattern: /^[0-9]+$/,
                        })}
                      />
                      <FormErrorMessage
                        error={
                          errors.forms &&
                          errors.forms[mainIndex] &&
                          errors.forms[mainIndex].list &&
                          errors.forms[mainIndex].list[subIndex] &&
                          errors.forms[mainIndex].list[subIndex].min
                        }
                        messages={{
                          required: "Mins is Required",
                          pattern: "Please enter numbers only for mins",
                        }}
                      />
                    </div>
                    <div className="col-6">
                      <label>Link</label>
                      <InputBox
                        className="add_staff"
                        type={"text"}
                        placeholder="Enter Link"
                        name={`forms[${mainIndex}].list[${subIndex}].link`}
                        value={subSection.link}
                        onChange={(e) =>
                          handleSubSectionChange(
                            mainIndex,
                            subIndex,
                            "link",
                            e.target.value
                          )
                        }
                        errors={errors}
                        register={register({
                          required: true,
                          pattern: /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i,
                        })}
                      />
                      <FormErrorMessage
                        error={
                          errors.forms &&
                          errors.forms[mainIndex] &&
                          errors.forms[mainIndex].list &&
                          errors.forms[mainIndex].list[subIndex] &&
                          errors.forms[mainIndex].list[subIndex].link
                        }
                        messages={{
                          required: "Link is Required",
                          pattern: "Link is Invalid",
                        }}
                      />
                    </div>
                  </div>
                  <div
                    onClick={() => handleRemoveSubSection(mainIndex, subIndex)}
                    className="sub-section-overlay cursor-pointer"
                  >
                    <img src={closeIcon} alt="Close" />
                  </div>
                </div>
              ))}
            </div>
            <div
              onClick={() => handleRemoveTitle(mainIndex)}
              className="cource-form-overlay cursor-pointer"
            >
              <img src={closeIcon} alt="Close" />
            </div>
          </div>
        </>
      ))}
    </div>
  );
};

export default CourseComp;
