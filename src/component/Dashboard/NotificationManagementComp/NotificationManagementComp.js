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
  const [templatedata, setTemplateData] = useState([
    {
      notificationId: "51322",
      dateandTime: "2023-05-04T16:06:03.636Z",
      notificationTitle: "mission-critical",
      notificationDescription: "Nemo dolorem eum aliquam non.",
    },
    {
      notificationId: "51322",
      dateandTime: "2023-05-04T16:06:03.636Z",
      notificationTitle: "cross-platform",
      notificationDescription: "Nemo dolorem eum aliquam non.",
    },
    {
      notificationId: "51322",
      dateandTime: "2023-05-04T16:06:03.636Z",
      notificationTitle: "transparent",
      notificationDescription: "Nemo dolorem eum aliquam non.",
    },
  ]);
  const [historydata, setHistoryData] = useState([
    {
      notificationId: "51322",
      notificationSentStatus: "Failed",
      dateandTime: "2023-05-04T16:06:03.636Z",
      notificationTitle: "mission-critical",
      notificationContent: "Nemo dolorem eum aliquam non.",
    },
    {
      notificationId: "51322",
      notificationSentStatus: "Success",
      dateandTime: "2023-05-04T16:06:03.636Z",
      notificationTitle: "cross-platform",
      notificationContent: "Nemo dolorem eum aliquam non.",
    },
    {
      notificationId: "51322",
      notificationSentStatus: "Success",
      dateandTime: "2023-05-04T16:06:03.636Z",
      notificationTitle: "transparent",
      notificationContent: "Nemo dolorem eum aliquam non.",
    },
  ]);

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

  const [pageCount, setPageCount] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);

  const templateKeys = [
    {
      label: "Notification Id",
      value: "notificationId",
    },
    {
      label: "Date and Time",
      value: "dateandTime",
    },
    {
      label: "Notification Title",
      value: "notificationTitle",
    },
    {
      label: "Notification Description",
      value: "notificationDescription",
    },
  ];

  const historyKeys = [
    {
      label: "Notification Id",
      value: "notificationId",
    },
    {
      label: "Notification Sent Status",
      value: "notificationSentStatus",
    },
    {
      label: "Date and Time",
      value: "dateandTime",
    },
    {
      label: "Notification Title",
      value: "notificationTitle",
    },
    {
      label: "Notification Content",
      value: "notificationContent",
    },
  ];

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

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
                onClick={() =>
                  history.push(
                    "/admin/notification-management/create-notification"
                  )
                }
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
                onClick={() =>
                  history.push(
                    "/admin/notification-management/send-notification"
                  )
                }
              />
            </div>
          </div>
        </>
      )}
      {activeTab === 0 ? (
        <div className="">
          <TableComp
            data={templatedata}
            isCheck={true}
            EditAction={true}
            DeleteAction={true}
            includedKeys={templateKeys}
            pageCount={pageCount}
            onPageChange={handlePageChange}
            setCurrentPage={setCurrentPage}
            editRouteName={"/admin/notification-management/create-notification"}
          />
        </div>
      ) : (
        <div className="">
          <TableComp
            data={historydata}
            isCheck={true}
            EditAction={false}
            DeleteAction={false}
            includedKeys={historyKeys}
            pageCount={pageCount}
            onPageChange={handlePageChange}
            setCurrentPage={setCurrentPage}
            editRouteName={"/admin/notification-management/send-notification"}
          />
        </div>
      )}
      <div></div>
    </div>
  );
};

export default NotificationManagementComp;
