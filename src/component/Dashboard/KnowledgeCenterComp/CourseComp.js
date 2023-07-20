import React, { useState, useEffect } from "react";
import "./style.scss";
import { BsArrowLeft } from "react-icons/bs";
import { history } from "helpers";
import NormalButton from "component/common/NormalButton/NormalButton";
import closeIcon from "assets/images/closeIcon.png";
import { useForm } from "react-hook-form";
import FormErrorMessage from "component/common/ErrorMessage";
import InputBox from "component/common/InputBox/InputBox";

const CourseComp = ({ setCourse,forms,setForms }) => {
  const { register, handleSubmit, errors, control, setValue, reset } = useForm({
    mode: "onChange",
  });

  console.log('formskdsbcksdbh :>> ', forms);

  // const [forms, setForms] = useState([
  //   {
  //     mainTitle: "",
  //     subSections: [{ title: "", durationHr: "", durationMin: "", link: "" }],
  //   },
  // ]);

  const handleAddTitle = () => {
    setForms([
      ...forms,
      {
        mainTitle: "",
        subSections: [{ title: "", durationHr: "", durationMin: "", link: "" }],
      },
    ]);
  };

  const handleAddSubSection = (index) => {
    const updatedForms = [...forms];
    updatedForms[index].subSections.push({
      title: "",
      durationHr: "",
      durationMin: "",
      link: "",
    });
    setForms(updatedForms);
  };

  const handleMainTitleChange = (index, value) => {
    const updatedForms = [...forms];
    updatedForms[index].mainTitle = value;
    setForms(updatedForms);
  };

  const handleSubSectionChange = (mainIndex, subIndex, fieldName, value) => {
    const updatedForms = [...forms];
    updatedForms[mainIndex].subSections[subIndex][fieldName] = value;
    setForms(updatedForms);
  };

  const onSubmit = () => {
    console.log("Form Data:", forms);
    // setCourseDetails(forms)
  };

  return (
    <div className="px-5 py-3 Add_knowledge">
      <div className="row align-items-center justify-content-between mb-4">
        <div className=" col-4 d-flex my-3 align-items-center">
          <i className="pr-3">
            <BsArrowLeft
              size={28}
              onClick={() => history.goBack()}
              style={{ cursor: "pointer" }}
            />
          </i>
          <p className="m-0">{"Course Modules"}</p>
        </div>
        <div className="col-2">
          <NormalButton
            className="authButton1"
            label={"Add Title"}
            onClick={() => handleAddTitle()}
          />
        </div>
      </div>
      <form
        onSubmit={() => {
          handleSubmit(onSubmit);
          setCourse(false)
        }}
      >
        <div className="course-form p-5 mt-2">
          {forms.map((form, mainIndex) => (
            <div key={mainIndex}>
              <div className="row align-items-center mb-5">
                <div className="col-9">
                  <label>Title</label>
                  <InputBox
                    className="add_staff"
                    type="text"
                    placeholder="Enter Title"
                    value={form.mainTitle}
                    onChange={(e) =>
                      handleMainTitleChange(mainIndex, e.target.value)
                    }
                    ref={register({
                      required: "Title is Required",
                      pattern: {
                        value: /^(?!\s*$).+/,
                        message: "Title is Invalid",
                      },
                    })}
                  />
                  <FormErrorMessage
                    error={errors[`forms[${mainIndex}].mainTitle`]}
                  />
                </div>
                <div className="col-3">
                  <NormalButton
                    className="loginButton"
                    label="Add Sub section"
                    onClick={() => handleAddSubSection(mainIndex)}
                  />
                </div>
              </div>
              {form.subSections.map((subSection, subIndex) => (
                <div key={subIndex} className="sub-section p-3 mb-3">
                  <div className="col-10">
                    <label>Sub Section Title</label>
                    <InputBox
                      className="add_staff"
                      type="text"
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
                      ref={register({
                        required: "Sub Section Title is Required",
                        pattern: {
                          value: /^(?!\s*$).+/,
                          message: "Sub Section Title is Invalid",
                        },
                      })}
                    />
                    <FormErrorMessage
                      error={
                        errors[
                          `forms[${mainIndex}].subSections[${subIndex}].title`
                        ]
                      }
                    />
                  </div>
                  <div className="row mt-2 p-3">
                    <div className="col-2">
                      <label>Duration (in hr)</label>
                      <InputBox
                        className="add_staff"
                        type={"text"}
                        placeholder="(in hr)"
                        name="durationHrs"
                        onChange={(e) =>
                          handleSubSectionChange(
                            mainIndex,
                            subIndex,
                            "durationHr",
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
                        error={errors.durationHrs}
                        messages={{
                          required: "Duration is Required",
                          pattern: "Duration is Invalid",
                        }}
                      />
                    </div>
                    <div className="col-2">
                      <label>Duration ( in min)</label>
                      <InputBox
                        className="add_staff"
                        type={"text"}
                        placeholder="( in min)"
                        name="durationMins"
                        onChange={(e) =>
                          handleSubSectionChange(
                            mainIndex,
                            subIndex,
                            "durationMin",
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
                        error={errors.durationMins}
                        messages={{
                          required: "Duration is Required",
                          pattern: "Duration is Invalid",
                        }}
                      />
                    </div>
                    <div className="col-6">
                      <label>Link</label>
                      <InputBox
                        className="add_staff"
                        type={"text"}
                        placeholder="Enter Link"
                        name="link"
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
                          pattern: /^(?!\s*$).+/,
                        })}
                      />
                      <FormErrorMessage
                        error={errors.link}
                        messages={{
                          required: "Link is Required",
                          pattern: "Link is Invalid",
                        }}
                      />
                    </div>
                  </div>
                  <div className="sub-section-overlay">
                    <img src={closeIcon} alt="Close" />
                  </div>
                </div>
              ))}
            </div>
          ))}
          <div className="cource-form-overlay">
            <img src={closeIcon} alt="Close" />
          </div>
        </div>
        <div>
          <NormalButton className="loginButton" label="Submit" type="submit" />
        </div>
      </form>
    </div>
  );
};

export default CourseComp;
