import React, { useState, useEffect, Fragment } from "react";
// styles
import "./style.scss";
// internal components
import Loader from "component/common/Loader";
import TableComp from "../../common/TableComp/TableComp";
import DeleteModal from "component/common/DeleteModal/DeleteModal";
import NormalButton from "component/common/NormalButton/NormalButton";
import EmptyTable from "component/common/TableComp/EmptyTable";
// services
// import { getStaffList, deleteStaff, bulkDeleteStaff } from "service/Auth";
import { Toast } from "service/toast";
// helpers
import { history } from "helpers";

const CalendarManagementComp = ({ create, view, edit, remove }) => {
  const [data, setData] = useState([]);
  const [pageCount, setPageCount] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [bulkDelete, setBulkDelete] = useState(false);
  const [deleteId, setDeleteId] = useState([]);
  const [modalVisible, setModalVisible] = useState({
    id: null,
    show: false,
  });

  const includedKeys = [
    {
      label: "Event Image",
      value: "adminId",
    },
    {
      label: "Event Id",
      value: "adminId",
    },
    {
      label: "Event Name",
      value: "name",
    },
    {
      label: "Start Date",
      value: "email",
    },
    {
      label: "End Date",
      value: "role",
    },
    {
      label: "Meet Link",
      value: "isActive",
    },
  ];

  const getCalendarListApi = async (page) => {
    // try {
    //   setIsLoading(true);
    //   setBulkDelete(false);
    //   let params = {
    //     page: page ? page : 1,
    //     limit: 10,
    //   };
    //   let response = await getStaffList(params);
    //   if (response.status === 200 && response?.data?.data?.list.length > 0) {
    //     setData(response?.data?.data?.list);
    //     localStorage.setItem("noOfLists", response?.data?.data?.list.length);
    //     setPageCount(response?.data?.data?.pageMeta?.pageCount);
    //     setCurrentPage(response?.data?.data?.pageMeta?.currentPage);
    //   } else {
    //     setData([]);
    //   }
    // } catch (e) {
    //   console.log("e :>> ", e);
    // } finally {
    //   setIsLoading(false);
    // }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    getCalendarListApi(page);
  };

  const handleOpenModal = (id) => {
    setModalVisible({
      id: id,
      show: true,
    });
  };

  const handleDeleteItem = async () => {
    // try {
    //   if (modalVisible.show && modalVisible.id) {
    //     let params = {
    //       id: modalVisible.id,
    //     };
    //     let response = await deleteStaff(params);
    //     if (response.status === 200) {
    //       Toast({ type: "success", message: response.data.message });
    //       const activeLists = JSON.parse(localStorage.getItem("noOfLists"));
    //       if (activeLists === 1) {
    //         getCalendarListApi(currentPage > 1 ? currentPage - 1 : 1);
    //         localStorage.removeItem("noOfLists");
    //       } else {
    //         getCalendarListApi(currentPage);
    //         localStorage.removeItem("noOfLists");
    //       }
    //     }
    //   }
    //   setModalVisible({ show: false, id: null });
    // } catch (e) {
    //   console.log("e :>> ", e);
    // }
  };

  const handleBulk = (id) => {
    if (id.length > 0) {
      setBulkDelete(true);
      deleteId.length = 0;
      deleteId.push(...Object.values(id));
    } else {
      setBulkDelete(false);
    }
  };

  const handleBulkDelete = async () => {
    // try {
    //   if (deleteId.length > 0) {
    //     let body = {
    //       ids: deleteId,
    //     };
    //     let response = await bulkDeleteStaff(body);
    //     if (response.status === 200) {
    //       Toast({ type: "success", message: response.data.message });
    //       const activeLists = JSON.parse(localStorage.getItem("noOfLists"));
    //       if (activeLists === deleteId.length) {
    //         getCalendarListApi(currentPage > 1 ? currentPage - 1 : 1);
    //         localStorage.removeItem("noOfLists");
    //         deleteId.length = 0;
    //       } else {
    //         getCalendarListApi(currentPage);
    //         localStorage.removeItem("noOfLists");
    //         deleteId.length = 0;
    //       }
    //     } else {
    //       Toast({ type: "error", message: response.data.message });
    //     }
    //   }
    // } catch (e) {
    //   console.log("e :>> ", e);
    // }
    // setModalVisible({ show: false, id: null });
  };

  useEffect(() => {
    if (localStorage.getItem("editPage")) {
      getCalendarListApi(localStorage.getItem("editPage"));
      localStorage.removeItem("editPage");
    } else {
      getCalendarListApi(1);
    }
  }, []);
  return (
    <>
      <div className="staff_table px-5 py-3">
        <p className="staff_title m-0">Calendar Management</p>
        <div className="flex align-items-center justify-content-end">
          <div className="flex align-items-center" style={{ gap: "1em" }}>
            <div className="cursor-pointer" style={{ minWidth: "150px" }}>
              {bulkDelete && remove && (
                <NormalButton
                  className="authButton1"
                  label={"Delete"}
                  onClick={handleOpenModal}
                />
              )}
            </div>
            {/* {create && ( */}
              <div className="cursor-pointer" style={{ minWidth: "150px" }}>
                <NormalButton
                  className="loginButton1"
                  label={"Create Event"}
                  onClick={() => {
                    localStorage.removeItem("editId");
                    history.push("/admin/calendar-management/add-calendar");
                  }}
                />
              </div>
            {/* )} */}
          </div>
        </div>
        {isLoading ? (
          <Loader
            loading={isLoading}
            className="d-flex align-items-center justify-content-center"
          />
        ) : data.length > 0 ? (
          <div className="my-4">
            <TableComp
              data={data}
              EditAction={edit}
              DeleteAction={remove}
              includedKeys={includedKeys}
              pageCount={pageCount}
              onPageChange={handlePageChange}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              editRouteName={"/admin/calendar-management/add-calendar"}
              handleOpenModal={handleOpenModal}
              onRowsSelect={handleBulk}
            />
          </div>
        ) : (
          <div className="my-4">
            <EmptyTable
              EditAction={true}
              DeleteAction={true}
              includedKeys={includedKeys}
            />
            <p className="d-flex align-items-center justify-content-center mt-5 pt-5">
              No Data Available
            </p>
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
            DeleteMessage={"Are you sure you want to delete Event?"}
          />
        </div>
      </div>
    </>
  );
};

export default CalendarManagementComp;
