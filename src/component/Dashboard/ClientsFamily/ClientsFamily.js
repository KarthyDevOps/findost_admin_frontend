import React from "react";
import "./style.scss";
import InputBox from "component/common/InputBox/InputBox";
import DropDown from "component/common/DropDown/DropDown";

const ClientsFamily = () => {
  return (
    <div className="px-5 py-3 clients_family">
      <h6>Client’s Family</h6>
      <div className="row align-items-center">
        <div className="col-4">
          <InputBox
            className="login_input Notification_input"
            type={"text"}
            placeholder="Search by Id, Username, Email"
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
            placeholder="Filter by Role"
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
      </div>
    </div>
  );
};

export default ClientsFamily;
