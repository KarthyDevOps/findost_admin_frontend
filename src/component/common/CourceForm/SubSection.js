import React from "react";
import "./style.scss";
import { useForm } from "react-hook-form";
import InputBox from "../InputBox/InputBox";
import FormErrorMessage from "../ErrorMessage";
import NormalButton from "../NormalButton/NormalButton";
import closeIcon from "assets/images/closeIcon.png";

const SubSection = ({ handleAddsection }) => {
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
  return (
    <div className="course-form">
      <div className="sub-section p-3 mb-3">
        <div className="col-10">
          <label>Sub Section Title</label>
          <InputBox
            className="add_staff"
            type={"text"}
            placeholder="Enter Sub Section Title"
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
              required: "Sub Section Title is Required",
              pattern: "Sub Section Title is Invalid",
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
                required: "Link is Required",
                pattern: "Link is Invalid",
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubSection;
