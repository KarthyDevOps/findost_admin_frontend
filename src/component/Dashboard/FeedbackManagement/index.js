import React, { useState, useEffect, Fragment, useCallback } from "react";
// styles
import "./style.scss";
// internal component
import TableComp from "../../common/TableComp/TableComp";
import InputBox from "component/common/InputBox/InputBox";
import NormalButton from "component/common/NormalButton/NormalButton";
import CustomController from "component/common/Controller";
import NormalMultiSelect from "component/common/NormalMultiSelect";
import CommonDatePicker from "component/common/CommonDatePicker/CommonDatePicker";
import DeleteModal from "component/common/DeleteModal/DeleteModal";
import Loader from "component/common/Loader";
// services
import { useForm } from "react-hook-form";
import {
  getFeedbackList,
  deleteFeedback,
  bulkDeleteFeedback,
} from "service/Cms";
import { Toast } from "service/toast";
import moment from "moment";
// helpers
import {
  debounceFunction,
  history,
  statusOptions,
  feedbackStatus,
} from "helpers";

const FeedbackManagementComp = ({ create, view, edit, remove }) => {
  const { errors, control } = useForm({
    mode: "onChange",
  });
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [startdate, setstartdate] = useState("");
  const [enddate, setenddate] = useState("");
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
      label: "User Id",
      value: "userId",
      width: "50%",
    },
    {
      label: "Status",
      value: "status",
      width: "50%",
    },
    {
      label: "Date and Time",
      value: "createdAt",
      width: "50%",
    },
    {
      label: "Username",
      value: "userName",
      width: "50%",
    },
    {
      label: "Feedback Description",
      value: "feedback",
    },
  ];

  const getFeedbackListApi = async (page) => {
    try {
      setIsLoading(true);
      setBulkDelete(false);
      let params = {
        page: page,
        limit: 10,
        search: search,
        status: status,
      };
      if (startdate) {
        params.startDate = moment(startdate).format("YYYY-MM-DD");
      }
      if (enddate) {
        params.endDate = moment(enddate).format("YYYY-MM-DD");
      }
      let response = await getFeedbackList(params);
      if (response.status === 200 && response?.data?.data?.list.length > 0) {
        setData(response?.data?.data?.list);
        setPageCount(response?.data?.data?.pageMeta?.pageCount);
        setCurrentPage(response?.data?.data?.pageMeta?.currentPage);
      } else {
        setData([]);
      }
    } catch (err) {
      console.log("err :>> ", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    getFeedbackListApi(page);
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
        let response = await deleteFeedback(params);
        if (response.status === 200) {
          Toast({ type: "success", message: response.data.message });
          getFeedbackListApi(currentPage);
        }
      }
      setModalVisible({ show: false, id: null });
    } catch (e) {
      console.log("e :>> ", e);
    }
  };

  const handleSearchChange = useCallback(
    debounceFunction((value) => {
      setSearch(value);
    }, 500),
    []
  );

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
        let response = await bulkDeleteFeedback(body);
        if (response.status === 200) {
          Toast({ type: "success", message: response.data.message });
          deleteId.length = 0;
          getFeedbackListApi(currentPage);
        } else {
          Toast({ type: "error", message: response.data.message });
        }
      }
      deleteId.length = 0;
    } catch (e) {
      console.log("e :>> ", e);
    }
    setModalVisible({ show: false, id: null });
  };

  useEffect(() => {
    getFeedbackListApi(currentPage);
  }, [search, startdate, enddate, status]);

  return (
    <Fragment>
      <div className="staff_table px-5 py-3">
        <p className="staff-title m-0">Feedback Management</p>
        <div className="flex align-items-center justify-content-between">
          <div className="flex align-items-center" style={{ gap: "1em" }}>
            <div
              className="pl-0 my-4 cursor-pointer"
              style={{ maxWidth: "230px" }}
            >
              <InputBox
                className="login_input"
                type={"text"}
                placeholder="Search by Id, Name"
                errors={errors}
                name="search"
                Iconic
                Search
                value={search}
                onChange={(e) => handleSearchChange(e.target.value)}
              />
            </div>
            <div style={{ minWidth: "150px" }}>
              <CustomController
                name={"status"}
                control={control}
                error={errors?.status}
                defaultValue={status}
                rules={{ required: false }}
                render={({ onChange, ...fields }) => {
                  return (
                    <NormalMultiSelect
                      {...fields}
                      placeholder={"Filter by Status"}
                      options={feedbackStatus}
                      name="status"
                      handleChange={(e, { value } = {}) => {
                        onChange(value);

                        setStatus(value);
                      }}
                    />
                  );
                }}
              />
            </div>
            <div style={{ minWidth: "120px" }}>
              <CommonDatePicker
                id="startDate"
                value={startdate}
                onChange={(date) => setstartdate(date)}
                placeholder="Start Date"
              />
            </div>
            <div style={{ minWidth: "120px" }}>
              <CommonDatePicker
                id="endDate"
                value={enddate}
                onChange={(date) => setenddate(date)}
                placeholder="End Date"
              />
            </div>
          </div>
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
            {create && (
              <div className="cursor-pointer" style={{ minWidth: "150px" }}>
                <NormalButton
                  className="loginButton"
                  label={"Add Feedback"}
                  onClick={() => {
                    localStorage.removeItem("editId");
                    history.push("/admin/feedBack-management/add-feedback");
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
              ReadAction={edit}
              DeleteAction={remove}
              includedKeys={includedKeys}
              pageCount={pageCount}
              onPageChange={handlePageChange}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              editRouteName={"/admin/feedBack-management/answer-feedback"}
              handleOpenModal={handleOpenModal}
              onRowsSelect={handleBulk}
            />
          </div>
        ) : (
          <div className="d-flex align-items-center justify-content-center mt-5 pt-5">
            No Data Available
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
            DeleteMessage={"Are you sure you want to delete?"}
          />
        </div>
      </div>
    </Fragment>
  );
};

export default FeedbackManagementComp;
