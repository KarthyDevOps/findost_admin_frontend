import React, { useState, useEffect, useCallback } from "react";
// styles
import "./style.scss";
// internal components
import Loader from "component/common/Loader";
import TableComp from "../../common/TableComp/TableComp";
import DeleteModal from "component/common/DeleteModal/DeleteModal";
import NormalButton from "component/common/NormalButton/NormalButton";
import EmptyTable from "component/common/TableComp/EmptyTable";
// services
import { useForm } from "react-hook-form";
import { BsSearch } from "react-icons/bs";
import {
  getCalendarEventsList,
  deleteCalendarEvent,
  BulkDeleteCalendarEvent,
} from "service/Calendar";
import { Toast } from "service/toast";
// helpers
import { history, debounceFunction } from "helpers";
import InputBox from "component/common/InputBox/InputBox";

const CalendarManagementComp = ({ calendarAccess }) => {
  const { errors, control } = useForm({
    mode: "onChange",
  });
  const [data, setData] = useState([]);
  const [pageCount, setPageCount] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [bulkDelete, setBulkDelete] = useState(false);
  const [deleteId, setDeleteId] = useState([]);
  const [search, setSearch] = useState("");
  const [modalVisible, setModalVisible] = useState({
    id: null,
    show: false,
  });

  const includedKeys = [
    {
      label: "Event Image",
      value: "imageUrlS3",
      width: "50%",
    },
    {
      label: "Event Id",
      value: "adminScheduleId",
      width: "30%",
    },
    {
      label: "Event Name",
      value: "summary",
      width: "50%",
    },
    {
      label: "Event Date",
      value: "date",
      width: "50%",
    },
    {
      label: "Start Time",
      value: "startTime",
      width: "50%",
    },
    {
      label: "End Time",
      value: "endTime",
      width: "50%",
    },
    {
      label: "Meet Link",
      value: "description",
    },
  ];

  const getCalendarListApi = async (page) => {
    try {
      setIsLoading(true);
      let params = {
        page: page ? page : 1,
        limit: 10,
        search: search,
      };
      let response = await getCalendarEventsList(params);
      if (response.status === 200 && response?.data?.data?.list.length > 0) {
        setData(response?.data?.data?.list);
        localStorage.setItem("noOfLists", response?.data?.data?.list.length);
        setPageCount(response?.data?.data?.pageMeta?.pageCount);
        setCurrentPage(response?.data?.data?.pageMeta?.currentPage);
      } else {
        setData([]);
      }
    } catch (e) {
      console.log("e :>> ", e);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearchChange = useCallback(
    debounceFunction((value) => {
      setSearch(value);
    }, 500),
    []
  );

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
    try {
      if (modalVisible.show && modalVisible.id) {
        let params = {
          id: modalVisible.id,
        };
        let response = await deleteCalendarEvent(params);
        if (response.status === 200) {
          Toast({ type: "success", message: response.data.message });
          const activeLists = JSON.parse(localStorage.getItem("noOfLists"));
          if (activeLists === 1) {
            getCalendarListApi(currentPage > 1 ? currentPage - 1 : 1);
            localStorage.removeItem("noOfLists");
          } else {
            getCalendarListApi(currentPage);
            localStorage.removeItem("noOfLists");
          }
        }
      }
      setModalVisible({ show: false, id: null });
    } catch (e) {
      console.log("e :>> ", e);
    }
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
    try {
      if (deleteId.length > 0) {
        let body = {
          ids: deleteId,
        };
        let response = await BulkDeleteCalendarEvent(body);
        if (response.status === 200) {
          Toast({ type: "success", message: response.data.message });
          setBulkDelete(false);
          const activeLists = JSON.parse(localStorage.getItem("noOfLists"));
          if (activeLists === deleteId.length) {
            getCalendarListApi(currentPage > 1 ? currentPage - 1 : 1);
            localStorage.removeItem("noOfLists");
            deleteId.length = 0;
          } else {
            getCalendarListApi(currentPage);
            localStorage.removeItem("noOfLists");
            deleteId.length = 0;
          }
        } else {
          Toast({ type: "error", message: response.data.message });
        }
      }
    } catch (e) {
      console.log("e :>> ", e);
    }
    setModalVisible({ show: false, id: null });
  };

  useEffect(() => {
    if (localStorage.getItem("editPage")) {
      getCalendarListApi(localStorage.getItem("editPage"));
      localStorage.removeItem("editPage");
    } else {
      getCalendarListApi(1);
    }
  }, [search]);

  return (
    <>
      <div className="staff_table px-5 py-3">
        <p className="staff_title m-0">Calendar Management</p>
        <div className="d-flex align-items-center justify-content-between">
          <div
            className="pl-0 my-3 staff_Search cursor-pointer"
            style={{ width: "300px" }}
          >
            <InputBox
              className="login_input"
              type={"text"}
              placeholder="Search by Id, Event Name"
              errors={errors}
              name="search"
              Iconic
              value={search}
              onChange={(e) => handleSearchChange(e.target.value)}
            />
            <i className="search_iconic">
              <BsSearch size={18} style={{ color: "#7E7E7E" }} />
            </i>
          </div>
          <div className="d-flex justify-content-end">
            <div className="cursor-pointer mr-3" style={{ minWidth: "150px" }}>
              {bulkDelete && calendarAccess?.remove && (
                <NormalButton
                  className="authButton1"
                  label={"Delete"}
                  onClick={handleOpenModal}
                />
              )}
            </div>
            {calendarAccess?.create && (
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
            )}
          </div>
        </div>
        {isLoading ? (
          <Loader
            loading={isLoading}
            className="d-flex align-items-center justify-content-center"
          />
        ) : data.length > 0 ? (
          <div className="">
            <TableComp
              data={data}
              EditAction={calendarAccess?.edit}
              DeleteAction={calendarAccess?.remove}
              includedKeys={includedKeys}
              pageCount={pageCount}
              onPageChange={handlePageChange}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              editRouteName={"/admin/calendar-management/add-calendar"}
              handleOpenModal={handleOpenModal}
              onRowsSelect={handleBulk}
              calmanagement={true}
            />
          </div>
        ) : (
          <div className="">
            <EmptyTable
              EditAction={calendarAccess?.edit}
              DeleteAction={calendarAccess?.remove}
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
