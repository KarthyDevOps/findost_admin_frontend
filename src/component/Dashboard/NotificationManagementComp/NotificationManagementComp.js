import React, { useState, useEffect, useCallback } from "react";
// styles
import "./style.scss";
// internal component
import InputBox from "component/common/InputBox/InputBox";
import NormalButton from "component/common/NormalButton/NormalButton";
import TableComp from "../../common/TableComp/TableComp";
import Loader from "component/common/Loader";
import DeleteModal from "component/common/DeleteModal/DeleteModal";
// services
import {
  getNotificationTemplateList,
  deleteNotificationTemplate,
  getNotificationHistoryList,
  BulkDeleteNotificationHistory,
  deleteNotificationHistory,
  bulkDeleteNotificationTemplate,
} from "service/Communication";
import { Toast } from "service/toast";
// helpers
import { debounceFunction, history } from "helpers";
import EmptyTable from "component/common/TableComp/EmptyTable";

const NotificationManagementComp = ({ create, view, edit, remove }) => {
  const [activeTab, setActiveTab] = useState(0);
  const [search, setSearch] = useState("");
  const [templatedata, setTemplateData] = useState();
  const [historydata, setHistoryData] = useState();
  const [pageCount, setPageCount] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [bulkDelete, setBulkDelete] = useState(false);
  const [deleteId, setDeleteId] = useState([]);
  const [modalVisible, setModalVisible] = useState({
    id: null,
    show: false,
  });

  var url = new URL(document.URL);
  const params = url.searchParams;
  const tabValue = +params.get("tab") ?? 0;

  const handleTab = (tab) => {
    setActiveTab(tab);
    history.push(`notification-management?tab=${tab}`);
  };

  const templateKeys = [
    {
      label: "Notification Id",
      value: "notificationTemplateId",
      width: "50%",
    },
    {
      label: "Date and Time",
      value: "createdAt",
    },
    {
      label: "Notification Title",
      value: "title",
      width: "50%",
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
      width: "50%",
    },
    // {
    //   label: "Notification Sent Status",
    //   value: "notificationSentStatus",
    // },
    {
      label: "Date and Time",
      value: "createdAt",
    },
    {
      label: "Notification Title",
      value: "title",
      width: "50%",
    },
    {
      label: "Notification Content",
      value: "description",
    },
  ];

  const getTemplateList = async (page) => {
    try {
      setIsLoading(true);
      setBulkDelete(false);
      let params = {
        page: page,
        limit: 10,
        search: search,
      };
      let response = await getNotificationTemplateList(params);
      if (response.status === 200 && response?.data?.data?.list.length > 0) {
        setTemplateData(response?.data?.data?.list);
        setPageCount(response?.data?.data?.pageMeta?.pageCount);
        setCurrentPage(response?.data?.data?.pageMeta?.currentPage);
      } else {
        setTemplateData([]);
      }
    } catch (err) {
      console.log("err :>> ", err);
    } finally {
      setIsLoading(false);
    }
  };

  const getHistoryList = async (page) => {
    try {
      setIsLoading(true);
      setBulkDelete(false);
      let params = {
        page: page,
        limit: 10,
        search: search,
      };
      let response = await getNotificationHistoryList(params);
      if (response.status === 200 && response?.data?.data?.list.length > 0) {
        setHistoryData(response?.data?.data?.list);
        setPageCount(response?.data?.data?.pageMeta?.pageCount);
        setCurrentPage(response?.data?.data?.pageMeta?.currentPage);
      } else {
        setHistoryData([]);
      }
    } catch (err) {
      console.log("err :>> ", err);
    } finally {
      setIsLoading(false);
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
      if (activeTab === 0) {
        let params = {
          id: modalVisible.id,
        };
        let response = await deleteNotificationTemplate(params);
        if (response.status === 200) {
          Toast({ type: "success", message: response.data.message });
          getTemplateList(currentPage);
        }
      } else {
        let params = {
          id: modalVisible.id,
        };
        let response = await deleteNotificationHistory(params);
        if (response.status === 200) {
          Toast({ type: "success", message: response.data.message });
          getHistoryList(currentPage);
        }
      }
    }
    setModalVisible({ show: false, id: null });
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    if (activeTab === 0) {
      getTemplateList(page);
    } else {
      getHistoryList(page);
    }
  };

  const handleSearchChange = useCallback(
    debounceFunction((value) => {
      setSearch(value);
    }, 500),
    []
  );

  const handleBulk = async (id) => {
    if (id.length > 0) {
      setBulkDelete(true);
      deleteId.length = 0;
      deleteId.push(...Object.values(id));
    } else {
      setBulkDelete(false);
    }
  };

  const handleBulkDelete = async () => {
    if (activeTab === 0) {
      if (deleteId.length > 0) {
        let body = {
          ids: deleteId,
        };
        let response = await bulkDeleteNotificationTemplate(body);
        if (response.status === 200) {
          Toast({ type: "success", message: response.data.message });
          getTemplateList(currentPage);
        } else {
          Toast({ type: "error", message: response.data.message });
        }
      }
      deleteId.length = 0;
    } else {
      if (deleteId.length > 0) {
        let body = {
          ids: deleteId,
        };
        let response = await BulkDeleteNotificationHistory(body);
        if (response.status === 200) {
          Toast({ type: "success", message: response.data.message });
          getHistoryList(currentPage);
        } else {
          Toast({ type: "error", message: response.data.message });
        }
      }
      deleteId.length = 0;
    }
    setModalVisible({ show: false, id: null });
  };

  useEffect(() => {
    handleTab(tabValue);
    if (tabValue === 1) {
      getHistoryList(currentPage);
    } else {
      getTemplateList(currentPage);
    }
  }, [tabValue, search]);

  return (
    <div className="notification_container px-5 py-3">
      <p className="m-0">Notification Management</p>
      <div className="Tab_design pt-3 p-0">
        <div
          className={
            activeTab === 0 ? "Tab_design_active" : "Tab_design_inActive"
          }
          onClick={() => {
            handleTab(0);
            setCurrentPage(1);
          }}
        >
          Notification Template
        </div>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <div
          className={
            activeTab === 1 ? "Tab_design_active" : "Tab_design_inActive"
          }
          onClick={() => {
            handleTab(1);
            setCurrentPage(1);
          }}
        >
          Notification History
        </div>
      </div>
      {activeTab === 0 ? (
        <>
          <div className="row align-items-center">
            <div className="col-md-3 my-3">
              <InputBox
                className="login_input Notification_input"
                type={"text"}
                placeholder="Search by Id"
                name="search"
                Iconic
                Search
                value={search}
                onChange={(e) => handleSearchChange(e.target.value)}
              />
            </div>
            <div className="col-md-5 p-0"></div>
            <div className="col-md-2">
              {bulkDelete && remove && (
                <NormalButton
                  className="authButton1"
                  label={"Delete"}
                  onClick={handleOpenModal}
                />
              )}
            </div>
            {create && (
              <div className="col-md-2 m-0">
                <NormalButton
                  loginButton1
                  label={"Create Notification"}
                  onClick={() => {
                    localStorage.removeItem("editId");
                    history.push(
                      "/admin/notification-management/create-notification"
                    );
                  }}
                />
              </div>
            )}
          </div>
        </>
      ) : (
        <>
          <div className="row p-0 align-items-center">
            <div className="col-md-3 my-3">
              <InputBox
                className="login_input Notification_input"
                type={"text"}
                placeholder="Search by Id"
                name="search"
                Iconic
                Search
                value={search}
                onChange={(e) => handleSearchChange(e.target.value)}
              />
            </div>
            <div className="col-md-5"></div>
            <div className="col-md-2">
              {bulkDelete && remove && (
                <NormalButton
                  className="authButton1"
                  label={"Delete"}
                  onClick={handleOpenModal}
                />
              )}
            </div>
            {create && (
              <div className="col-md-2 m-0">
                <NormalButton
                  loginButton1
                  label={"Send Notification"}
                  onClick={() => {
                    localStorage.removeItem("editId");
                    history.push(
                      "/admin/notification-management/send-notification"
                    );
                  }}
                />
              </div>
            )}
          </div>
        </>
      )}
      {isLoading ? (
        <Loader
          loading={isLoading}
          className="d-flex align-items-center justify-content-center"
        />
      ) : (
        <div>
          {activeTab === 0 && templatedata && templatedata.length > 0 ? (
            <TableComp
              data={templatedata}
              EditAction={edit}
              DeleteAction={remove}
              includedKeys={templateKeys}
              pageCount={pageCount}
              onPageChange={handlePageChange}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              editRouteName="/admin/notification-management/create-notification"
              handleOpenModal={handleOpenModal}
              onRowsSelect={handleBulk}
            />
          ) : (
            activeTab === 0 && (
              <div className="">
                <EmptyTable
                  EditAction={edit}
                  DeleteAction={remove}
                  includedKeys={templateKeys}
                />
                <span className="d-flex align-items-center justify-content-center mt-5 pt-5">
                  No Data Available
                </span>
              </div>
            )
          )}

          {activeTab === 1 && historydata && historydata.length > 0 ? (
            <TableComp
              data={historydata}
              EditAction={edit}
              DeleteAction={remove}
              includedKeys={historyKeys}
              pageCount={pageCount}
              onPageChange={handlePageChange}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              editRouteName="/admin/notification-management/send-notification"
              handleOpenModal={handleOpenModal}
              onRowsSelect={handleBulk}
            />
          ) : (
            activeTab === 1 && (
              <div className="">
                <EmptyTable
                  EditAction={edit}
                  DeleteAction={remove}
                  includedKeys={historyKeys}
                />
                <span className="d-flex align-items-center justify-content-center mt-5 pt-5">
                  No Data Available
                </span>
              </div>
            )
          )}
        </div>
      )}
      <div>
        {" "}
        <DeleteModal
          modalOpen={modalVisible.show}
          closeModal={() => setModalVisible({ id: null, show: false })}
          handleDelete={
            deleteId.length > 0 ? handleBulkDelete : handleDeleteItem
          }
          DeleteMessage={
            activeTab === 0
              ? "Are you sure you want to delete ?"
              : "Are you sure you want to delete ?"
          }
        />
      </div>
    </div>
  );
};

export default NotificationManagementComp;
