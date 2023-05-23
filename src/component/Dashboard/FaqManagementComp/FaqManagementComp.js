import React, { useState, useEffect, useRef } from "react";
import "./style.scss";
import InputBox from "component/common/InputBox/InputBox";
import ReactSelect from "react-select";
import NormalButton from "component/common/NormalButton/NormalButton";
import { history } from "helpers";
import DropDown from "component/common/DropDown/DropDown";

const FaqManagementComp = () => {
  // useEffect(() => {
  //   if (modalVisible) {
  //     const timer = setTimeout(() => {
  //       setModalVisible(false);
  //     }, 1000);

  //     return () => clearTimeout(timer);
  //   }
  // }, [modalVisible]);
  return (
    <div className="faq_head px-5 py-3">
      <h6>FAQ Management</h6>
      <div className="row align-items-center">
        <div className="col-3">
          <InputBox
            className="login_input Notification_input"
            type={"text"}
            placeholder="Search by Id, Title"
            name="search"
            Iconic
            Search
            // value={search}
            // onChange={(e) => {
            //   setsearch(e.target.value);
            //   setactivePage(1);
            // }}
          />
        </div>
        <div className="col-2">
          <DropDown
            // value={value}
            placeholder="Filter by Category"
            // onChange={(e) => {}}
            // options={options}
          />
        </div>
        <div className="col-2">
          <DropDown
            // value={value}
            placeholder="Filter by Sub Category"
            // onChange={(e) => {}}
            // options={options}
          />
        </div>
        <div className="col-2">
          <DropDown
            // value={value}
            placeholder="Filter by Status"
            // onChange={(e) => {}}
            // options={options}
          />
        </div>
        <div className="col-1"></div>
        <div className="col-2">
          <NormalButton
            className="loginButton"
            label={"Add New FAQ"}
            onClick={() => history.push("/admin/faq-management/add-faq")}
          />
        </div>
        <div></div>
      </div>
    </div>
  );
};

export default FaqManagementComp;
