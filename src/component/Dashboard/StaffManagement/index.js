import React, { useState, useEffect, Fragment } from "react";
import TableComp from "../../common/TableComp/TableComp";
import axios from "axios";
import FormErrorMessage from "component/common/ErrorMessage";
import { useForm } from "react-hook-form";
import InputBox from "component/common/InputBox/InputBox";
import NormalButton from "component/common/NormalButton/NormalButton";
import "./style.scss";
import { history } from "helpers";
import { BsSearch } from "react-icons/bs";
import DropDown from "component/common/DropDown/DropDown";

const StaffManagementComp = () => {
  const { register, handleSubmit, errors, reset, setError } = useForm({
    mode: "onChange",
  });
  const array = [
    {
      UserId: 1,
      UserName: "Katlynn.Cremin",
      EmailId: "Baby_Hyatt@gmail.com",
      RoleName: "Staff",
      status: "active",
    },
    {
      UserId: 2,
      UserName: "Katlynn.Cremin",
      EmailId: "Baby_Hyatt@gmail.com",
      RoleName: "Staff",
      status: "inActive",
    },
    {
      UserId: 3,
      UserName: "Katlynn.Cremin",
      EmailId: "Baby_Hyatt@gmail.com",
      RoleName: "Staff",
      status: "active",
    },
  ];
  const [data, setData] = useState(array);
  const [searchStaff, setSearchStaff] = useState("");
  const [role, setRole] = useState("");
  const [status, setStatus] = useState("");
  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await axios.get(
  //         "https://jsonplaceholder.typicode.com/posts"
  //       );
  //       setData(response.data);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };
  //   fetchData();
  // }, []);

  const colourStylesRow = {
    dropdownIndicator: (styles) => ({
      ...styles,
      color: "#000000",
    }),
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
              onClick={() => history.push("/admin/add-staff")}
            />
          </div>
        </div>
        <div className="">
          {data.length > 0 ? (
            <TableComp
              data={data}
              itemsPerPage={10}
              isCheck={true}
              actions={true}
            />
          ) : (
            <p className="text-center mt-5 fs-15">No Data Available</p>
          )}
        </div>
        {console.log(data, "kkhkk")}
      </div>
    </Fragment>
  );
};

export default StaffManagementComp;
