import React, { useState, useEffect } from "react";
import "./style.scss";
import { history } from "helpers";
import InputBox from "component/common/InputBox/InputBox";
import NormalButton from "component/common/NormalButton/NormalButton";
import axios from "axios";
import TableComp from "../../common/TableComp/TableComp";
import DeleteModal from "component/common/DeleteModal/DeleteModal";

const NotificationManagementComp = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [search, setSearch] = useState("");
  const [data, setData] = useState([]);

  const handleTab = (tab) => {
    setActiveTab(tab);
    history.push(`notification-management?tab=${tab}`);
  };

  var url = new URL(document.URL);
  const params = url.searchParams;
  const tabValue = +params.get("tab");

  useEffect(() => {
    setActiveTab(tabValue);
  }, [tabValue]);

  useEffect(() => {
    handleTab(tabValue ?? "NotificationTemplate");
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://jsonplaceholder.typicode.com/posts"
        );
        setData(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="notification_container px-5">
      <p className="m-0 pt-3">Notification Management</p>
      <div className="Tab_design pt-3 p-0">
        <div
          className={
            activeTab === 0 ? "Tab_design_active" : "Tab_design_inActive"
          }
          onClick={() => {
            handleTab(0);
          }}
        >
          Notification Template
        </div>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <div
          className={
            activeTab === 1 ? "Tab_design_active" : "Tab_design_inActive"
          }
          onClick={() => {
            handleTab(1);
          }}
        >
          Notification History
        </div>
      </div>
      {activeTab === 0 ? (
        <>
          <div className="row align-items-center">
            <div className="col-md-3 my-4">
              <InputBox
                className="login_input Notification_input"
                type={"text"}
                placeholder="Search by Id"
                name="search"
                Iconic
                Search
                value={search}
                // onChange={(e) => {
                //   setsearch(e.target.value);
                //   setactivePage(1);
                // }}
              />
            </div>
            <div className="col-md-7 p-0"></div>
            <div className="col-md-2 m-0">
              <NormalButton
                className="loginButton"
                label={"Create Notification"}
                onClick={() => history.push("/admin/create-notification?tab=0")}
              />
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="row p-0 align-items-center">
            <div className="col-md-3 my-4">
              <InputBox
                className="login_input Notification_input"
                type={"text"}
                placeholder="Search by Id"
                name="search"
                Iconic
                Search
                value={search}
                // onChange={(e) => {
                //   setsearch(e.target.value);
                //   setactivePage(1);
                // }}
              />
            </div>
            <div className="col-md-7"></div>
            <div className="col-md-2 m-0">
              <NormalButton
                className="loginButton"
                label={"Send Notification"}
                onClick={() => history.push("/admin/send-notification?tab=1")}
              />
            </div>
          </div>
        </>
      )}
      {data && activeTab === "NotificationTemplate" ? (
        <div className="">
          {/* <TableComp data={data} itemsPerPage={10} isCheck={false} /> */}
        </div>
      ) : (
        // <TableComp data={data} itemsPerPage={10} isCheck={false} />
        ""
      )}
      <div></div>
    </div>
  );
};

export default NotificationManagementComp;
