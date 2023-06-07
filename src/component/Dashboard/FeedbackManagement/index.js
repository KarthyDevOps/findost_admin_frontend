import React, { useState, useEffect, Fragment } from "react";
import TableComp from "../../common/TableComp/TableComp";
import { useForm } from "react-hook-form";
import InputBox from "component/common/InputBox/InputBox";
import NormalButton from "component/common/NormalButton/NormalButton";
import "./style.scss";
import DropDown from "component/common/DropDown/DropDown";
import CommonDatePicker from "component/common/CommonDatePicker/CommonDatePicker";
import { history } from "helpers";
import { getFeedbackList, deleteFeedback } from "service/Cms";
import DeleteModal from "component/common/DeleteModal/DeleteModal";
import { Toast } from "service/toast";

const FeedbackManagementComp = ({ create, view, edit, remove }) => {
  const { register, handleSubmit, errors, reset, setError } = useForm({
    mode: "onChange",
  });
  const [data, setData] = useState([]);
  const [searchStaff, setSearchStaff] = useState("");
  const [startdate, setstartdate] = useState("");
  const [enddate, setenddate] = useState("");
  const [pageCount, setPageCount] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
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
    let params = {
      page: page,
      limit: 10,
      search: "",
    };
    let response = await getFeedbackList(params);
    if (response.status === 200) {
      setData(response?.data?.data?.list);
      setPageCount(response?.data?.data?.pageMeta?.pageCount);
      setCurrentPage(response?.data?.data?.pageMeta?.currentPage);
    }
  };
  useEffect(() => {
    getFeedbackListApi(currentPage);
  }, []);

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
  };

  return (
    <Fragment>
      <div className="staff_table px-5 pt-4">
        <p className="staff_title m-0">FeedbackManagement</p>

        <div className="row align-items-center px-3">
          <div className="col-md-10 col-12">
            <div className="row align-items-center">
              <div className="col-md-4 p-0 my-4">
                <InputBox
                  className="login_input"
                  type={"text"}
                  placeholder="Search by Id, Name"
                  errors={errors}
                  name="search"
                  Iconic
                  Search
                  value={searchStaff}
                  // onChange={(e) => {
                  //   setsearch(e.target.value);
                  //   setactivePage(1);
                  // }}
                />
              </div>
              <div className="col-md-3">
                <DropDown placeholder={"Filter by Status"} />
              </div>

              <div className="col-md-2">
                <CommonDatePicker
                  value={startdate}
                  onChange={(text) => setstartdate(text)}
                  placeholder="Start Date"
                />
              </div>
              <div className="col-md-2">
                <CommonDatePicker
                  value={enddate}
                  onChange={(text) => setenddate(text)}
                  placeholder="End Date"
                />
              </div>
            </div>
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
        <div className="">
          <TableComp
            data={data}
            isCheck={true}
            ReadAction={edit}
            DeleteAction={remove}
            includedKeys={includedKeys}
            pageCount={pageCount}
            onPageChange={handlePageChange}
            setCurrentPage={setCurrentPage}
            editRouteName={"/admin/feedBack-management/answer-feedback"}
            handleOpenModal={handleOpenModal}
          />
        </div>
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
