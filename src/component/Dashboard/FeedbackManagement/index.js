import React, { useState, useEffect, Fragment } from "react";
import TableComp from "../../common/TableComp/TableComp";
import axios from "axios";
import FormErrorMessage from "component/common/ErrorMessage";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom/cjs/react-router-dom";
import ReactSelect from "react-select";
import InputBox from "component/common/InputBox/InputBox";
import NormalButton from "component/common/NormalButton/NormalButton";
import "./style.scss";
import DropDown from "component/common/DropDown/DropDown";
import CommonDatePicker from "component/common/CommonDatePicker/CommonDatePicker";

const FeedbackManagementComp = ({ create, view, edit, remove }) => {
  const { register, handleSubmit, errors, reset, setError } = useForm({
    mode: "onChange",
  });
  const [data, setData] = useState([
    {
      userId: "51322",
      status: "Open",
      dateandTime: "2023-05-04T16:06:03.636Z",
      userName: "Lauren_Crona",
      feedbackDescription: "Nemo dolorem eum aliquam non."
    },
    {
      userId: "51322",
      status: "Accepted",
      dateandTime: "2023-05-04T16:06:03.636Z",
      userName: "Lauren_Crona",
      feedbackDescription: "Nemo dolorem eum aliquam non."
    },
    {
      userId: "51322",
      status: "Inprogress",
      dateandTime: "2023-05-04T16:06:03.636Z",
      userName: "Lauren_Crona",
      feedbackDescription: "Nemo dolorem eum aliquam non."
    },
  ]);
  const [searchStaff, setSearchStaff] = useState("");
  const [status, setStatus] = useState("");
  const [startdate, setstartdate] = useState("");
  const [enddate, setenddate] = useState("");
  const [pageCount, setPageCount] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);

  const includedKeys = [
    {
      label: "User Id",
      value: "userId",
    },
    {
      label: "Status",
      value: "status",
    },
    {
      label: "Date and Time",
      value: "dateandTime",
    },
    {
      label: "Username",
      value: "userName",
    },
    {
      label: "Feedback Description",
      value: "feedbackDescription",
    },
  ];

  const handlePageChange = (page) => {
    setCurrentPage(page);
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
          {create && <div className="col-md-2 col-12 p-0 m-0">
            <Link to="/admin/feedBack-management/add-feedback">
              <NormalButton
                className="loginButton"
                label={"Add Feedback"}
              //   onClick={DeletBulk}
              />
            </Link>
          </div>}
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
          />
        </div>
      </div>
    </Fragment>
  );
};

export default FeedbackManagementComp;
