import React, { useState, useEffect } from "react";
import "./style.scss";
import { useForm } from "react-hook-form";
import InputBox from "../InputBox/InputBox";
import FormErrorMessage from "../ErrorMessage";
import NormalButton from "../NormalButton/NormalButton";
import closeIcon from "assets/images/closeIcon.png";
import SubSection from "./SubSection";

const CourseForm = ({ handleRemoveModule }) => {
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

  const [sections, setSections] = useState([]);

  const handleAddsection = () => {
    setSections((prevComponents) => [...prevComponents, <SubSection />]);
  };
  return (
    <div className="course-form p-5 mt-2">
      <div className="row align-items-center mb-5">
        <div className="col-9">
          <label>Title</label>
          <InputBox
            className="add_staff"
            type={"text"}
            placeholder="Enter Title"
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
        <div className="col-3">
          {" "}
          <label></label>
          <NormalButton
            className="loginButton"
            onClick={handleAddsection}
            label={"Add Sub section"}
            // isLoading={loading}
          />
        </div>
      </div>
      {sections.map((section, i) => {
        return (
          <div key={i} className="">
            <div>{section}</div>
            <div onClick={() => handleRemoveModule(i)}>
              <img src={closeIcon} alt="" />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default CourseForm;
