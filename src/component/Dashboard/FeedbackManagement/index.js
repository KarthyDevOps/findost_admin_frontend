import React, { useState, useEffect, Fragment, useCallback } from "react";
// styles
import "./style.scss";
// internal component
import TableComp from "../../common/TableComp/TableComp";
import InputBox from "component/common/InputBox/InputBox";
import NormalButton from "component/common/NormalButton/NormalButton";
import DropDown from "component/common/DropDown/DropDown";
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
// helpers
import { debounceFunction, history } from "helpers";

const FeedbackManagementComp = ({ create, view, edit, remove }) => {
  const { errors } = useForm({
    mode: "onChange",
  });
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
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
    },
    // {
    //   label: "Status",
    //   value: "status",
    // },
    {
      label: "Date and Time",
      value: "createdAt",
    },
    {
      label: "Username",
      value: "userName",
    },
    {
      label: "Feedback Description",
      value: "feedback",
    },
  ];

  const getFeedbackListApi = async (page) => {
    try {
      setIsLoading(true);
      let params = {
        page: page,
        limit: 10,
        search: search,
      };
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
          feedbackId: modalVisible.id,
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
          getFeedbackListApi(currentPage);
        } else {
          Toast({ type: "error", message: response.data.message });
        }
      }
    } catch (e) {
      console.log("e :>> ", e);
    }
  };

  useEffect(() => {
    getFeedbackListApi(currentPage);
  }, [search]);

  return (
    <Fragment>
      <div className="staff_table px-5 pt-4">
        <p className="staff-title m-0">FeedbackManagement</p>
        <div className="row align-items-center px-3">
          <div className="col-md-8 col-12">
            <div className="row align-items-center">
              <div className="col-md-3 p-0 my-4">
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
              <div className="col-md-3">
                <DropDown placeholder={"Filter by Status"} />
              </div>
              <div className="col-md-3">
                <CommonDatePicker
                  value={startdate}
                  onChange={(text) => setstartdate(text)}
                  placeholder="Start Date"
                />
              </div>
              <div className="col-md-3">
                <CommonDatePicker
                  value={enddate}
                  onChange={(text) => setenddate(text)}
                  placeholder="End Date"
                />
              </div>
            </div>
          </div>
          <div className="col-md-2">
            {bulkDelete && remove && (
              <NormalButton
                className="authButton1"
                label={"Delete"}
                onClick={handleBulkDelete}
              />
            )}
          </div>
          {create && (
            <div className="col-md-2 col-12 p-0 m-0">
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
            handleDelete={handleDeleteItem}
            DeleteMessage={"Are you sure you want to delete?"}
          />
        </div>
      </div>
    </Fragment>
  );
};

export default FeedbackManagementComp;
