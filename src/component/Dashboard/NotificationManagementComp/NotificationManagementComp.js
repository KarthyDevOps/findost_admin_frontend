import React, { useState, useEffect } from "react";
import "./style.scss";
import { history } from "helpers";
import InputBox from "component/common/InputBox/InputBox";
import NormalButton from "component/common/NormalButton/NormalButton";
import axios from "axios";
import TableComp from "../../common/TableComp/TableComp";
import DeleteModal from "component/common/DeleteModal/DeleteModal";
import {
  getNotificationTemplateList,
  deleteNotificationTemplate,
  getNotificationHistoryList,
} from "service/Communication";
import { Toast } from "service/toast";

const NotificationManagementComp = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [search, setSearch] = useState("");
  const [templatedata, setTemplateData] = useState();
  const [historydata, setHistoryData] = useState();
  const [pageCount, setPageCount] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [modalVisible, setModalVisible] = useState({
    id: null,
    show: false,
  });

  const handleTab = (tab) => {
    setActiveTab(tab);
    history.push(`notification-management?tab=${tab}`);
  };

  var url = new URL(document.URL);
  const params = url.searchParams;
  const tabValue = +params.get("tab") ?? 0;

  useEffect(() => {
    handleTab(tabValue);
    // setActiveTab(tabValue);
    if (tabValue === 1) {
      getHistoryList();
    } else {
      getTemplateList();
    }
  }, [tabValue]);

  console.log("tabValue :>> ", tabValue);

  const templateKeys = [
    {
      label: "Notification Id",
      value: "notificationTemplateId",
    },
    {
      label: "Date and Time",
      value: "createdAt",
    },
    {
      label: "Notification Title",
      value: "title",
    },
    {
      label: "Notification Description",
      value: "description",
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

  const getTemplateList = async () => {
    let params = {
      page: currentPage,
      limit: 10,
      search: "",
    };
    let response = await getNotificationTemplateList(params);
    if (response.status === 200) {
      setTemplateData(response?.data?.data?.list);
      setPageCount(response?.data?.data?.pageMeta?.pageCount);
      setCurrentPage(response?.data?.data?.pageMeta?.currentPage);
    } else {
    }
  };

  const getHistoryList = async () => {
    let params = {
      page: currentPage,
      limit: 10,
      search: "",
    };
    let response = await getNotificationHistoryList(params);
    if (response.status === 200) {
      setHistoryData(response?.data?.data?.list);
      setPageCount(response?.data?.data?.pageMeta?.pageCount);
      setCurrentPage(response?.data?.data?.pageMeta?.currentPage);
    }
  };

  const handleOpenModal = (id) => {
    setModalVisible({
      id: id,
      show: true,
    });
  };

  const handleDeleteItem = async () => {
    if (modalVisible.show && modalVisible.id) {
      let params = {
        notificationTemplateId: modalVisible.id,
      };
      let response = await deleteNotificationTemplate(params);
      if (response.status === 200) {
        Toast({ type: "success", message: response.data.message });
        getTemplateList();
      }
    }
    setModalVisible({ show: false, id: null });
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
                onClick={() => {
                  localStorage.removeItem("editId");
                  history.push(
                    "/admin/notification-management/create-notification"
                  );
                }}
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
                onClick={() => {
                  localStorage.removeItem("editId");
                  history.push(
                    "/admin/notification-management/send-notification"
                  );
                }}
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
            handleOpenModal={handleOpenModal}
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
            handleOpenModal={handleOpenModal}
          />
        </div>
      )}
      <div>
        {" "}
        <DeleteModal
          modalOpen={modalVisible.show}
          closeModal={() => setModalVisible({ id: null, show: false })}
          handleDelete={handleDeleteItem}
          DeleteMessage={
            activeTab === 0
              ? "Are you sure you want to delete Notification Template?"
              : "Are you sure you want to delete Notification History?"
          }
        />
      </div>
    </div>
  );
};

export default NotificationManagementComp;
