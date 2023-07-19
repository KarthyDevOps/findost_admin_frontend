import React, { useState, useEffect } from "react";
import "./style.scss";
import { BsArrowLeft } from "react-icons/bs";
import { history } from "helpers";
import CourseForm from "component/common/CourceForm";
import NormalButton from "component/common/NormalButton/NormalButton";
import closeIcon from "assets/images/closeIcon.png";

const CourseComp = () => {
  const [modules, setModules] = useState([]);
  const [module, setModule] = useState([]);
  const [moduleDetails, setModuleDetails] = useState({
    title: "",
  });

  const handleAddModule = () => {
    setModules((prevComponents) => [...prevComponents, <CourseForm />]);
  };

  const handleRemoveModule = (index) => {
    setModules((prevComponents) =>
      prevComponents.filter((_, i) => i !== index)
    );
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
            onClick={() => handleAddModule()}
          />
        </div>
      </div>
      {modules.map((module, i) => {
        return (
          <div key={i} className="">
            <div>{module}</div>
            <div onClick={() => handleRemoveModule(i)}>
              <img src={closeIcon} alt="" />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default CourseComp;
