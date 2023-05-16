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
import CommonDatePicker from "component/common/CommonDatePicker/CommonDatePicker";
const FeedbackManagementComp = () => {
  const { register, handleSubmit, errors, reset, setError } = useForm({
    mode: "onChange",
  });
  const [data, setData] = useState([]);
  const [searchStaff, setSearchStaff] = useState("");
  const [role, setRole] = useState("");
  const [status, setStatus] = useState("");
  const [startdate, setstartdate] = useState("");
  const [enddate, setenddate] = useState("");
  useEffect(() => {
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
                <ReactSelect
                  value={role}
                  //   onChange={(value) => setservice(value)}
                  //   options={seviceList}
                  isClearable
                  placeholder={"Filter by Status"}
                />
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
          <div className="col-md-2 col-12 p-0 m-0">
            <Link to='/admin/add-feedback'>
            <NormalButton
              className="loginButton"
              label={"Add Feedback"}
              //   onClick={DeletBulk}
              />
              </Link>
          </div>
        </div>
        <div className="">
          <TableComp data={data} itemsPerPage={10} isCheck={true} />
        </div>
      </div>
    </Fragment>
  );
};

export default FeedbackManagementComp;
