import React, { useState, useEffect, Fragment, useCallback } from "react";
import TableComp from "../../common/TableComp/TableComp";
import axios from "axios";
import InputBox from "component/common/InputBox/InputBox";
import { useForm } from "react-hook-form";
import NormalButton from "component/common/NormalButton/NormalButton";
import "./style.scss";
import { history } from "helpers";
import { BsSearch } from "react-icons/bs";
import DropDown from "component/common/DropDown/DropDown";

const StaffManagementComp = () => {
  const { register, handleSubmit, errors, reset, setError } = useForm({
    mode: "onChange",
  });

  const [data, setData] = useState([]);
  const [searchStaff, setSearchStaff] = useState("");
  const [role, setRole] = useState("");
  const [status, setStatus] = useState("");
  const [pageCount, setPageCount] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);

  const includedKeys = [
    {
      label: "Id",
      value: "_id",
    },
    {
      label: "Name",
      value: "name",
    },
    {
      label: "BrandImage",
      value: "brandImage",
    },
    {
      label: "Updated",
      value: "updatedAt",
    },
    {
      label: "Created",
      value: "createdAt",
    },
  ];

  useEffect(() => {
    fetchData();
  }, [currentPage]);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `http://doodlebluelive.com:2129/api/v1/static/brand?limit=10&page=${currentPage}`
      );
      console.log("response.data :>> ", response.data.data.list);
      setData(response.data.data.list);
      setPageCount(response.data.data.pageMeta.totalPages);
    } catch (error) {
      console.log(error);
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <Fragment>
      <div className="staff_table px-5 pt-2">
        <p className="staff_title m-0">Staff Management</p>
        <div className="row align-items-center px-3">
          <div className="col-md-10 col-12">
            <div className="row align-items-center">
              <div className="col-md-4 p-0 my-4 staff_Search">
                <InputBox
                  className="login_input"
                  type={"text"}
                  placeholder="Search by Id, Username, Email"
                  errors={errors}
                  name="search"
                  Iconic
                  value={searchStaff}
                  // onChange={(e) => {
                  //   setsearch(e.target.value);
                  //   setactivePage(1);
                  // }}
                />
                <i className="search_iconic">
                  <BsSearch size={18} style={{ color: "#7E7E7E" }} />
                </i>
              </div>
              <div className="col-md-3">
                <DropDown
                  // value={value}
                  placeholder="Filter by Role"
                  // onChange={(e) => {}}
                  // options={options}
                />
              </div>

              <div className="col-md-3">
                <DropDown
                  // value={value}
                  placeholder="Filter by Status"
                  // onChange={(e) => {}}
                  // options={options}
                />
              </div>
            </div>
          </div>
          <div className="col-md-2 col-12 p-0 m-0">
            <NormalButton
              className="loginButton"
              label={"Add Staff"}
              onClick={() => history.push("/admin/staff-management/add-staff")}
            />
          </div>
        </div>
        <div className="">
          <TableComp
            data={data}
            isCheck={true}
            EditAction={true}
            DeleteAction={true}
            includedKeys={includedKeys}
            pageCount={pageCount}
            onPageChange={handlePageChange}
            setCurrentPage={setCurrentPage}
          />
        </div>
      </div>
    </Fragment>
  );
};

export default StaffManagementComp;
