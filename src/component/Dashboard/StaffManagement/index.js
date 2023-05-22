import React, { useState, useEffect, Fragment } from "react";
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
  // const response = {
  //   data: {
  //     list: [
  //       {
  //         UserId: 1,
  //         UserName: "Katlynn.Cremindbakjsbk",
  //         // EmailId: "Baby_Hyatt@gmail.com",
  //         // ClientName: "Adrienne_Sa",
  //         // RoleName: "Staffqejbfqwekjfqjke",
  //         // status: "activeqekjfbqweofbquebfj",
  //         // Title : "kdbsksbdkqebfweqjkfqwelj",
  //         // Category : "khckhwkwhhfbwqekfwhk",
  //         DateandTime : "2023-05-04T16:06:03.636Z",
  //       },
  //       // {
  //       //   UserId: 2,
  //       //   UserName: "Katlynn.Cremin",
  //       //   EmailId: "Baby_Hyatt@gmail.com",
  //       //   ClientName: "Adrienne_Sauer",
  //       //   RoleName: "Staff",
  //       //   status: "inActive",
  //       //   Title : "kdbsksbdk",
  //       //   Category : "khckhwkwhh",
  //       //   DateandTime : "2023-05-04T16:06:03.636Z",
  //       // },
  //       // {
  //       //   UserId: 3,
  //       //   UserName: "Katlynn.Cremin",
  //       //   EmailId: "Baby_Hyatt@gmail.com",
  //       //   ClientName: "Adrienne_Sauer",
  //       //   RoleName: "Staff",
  //       //   status: "active",
  //       //   Title : "kdbsksbdk",
  //       //   Category : "khckhwkwhh",
  //       //   DateandTime : "2023-05-04T16:06:03.636Z",
  //       // },
  //       // {
  //       //   UserId: 4,
  //       //   UserName: "Katlynn.Cremin",
  //       //   EmailId: "Baby_Hyatt@gmail.com",
  //       //   ClientName: "Adrienne_Sauer",
  //       //   RoleName: "Staff",
  //       //   status: "active",
  //       //   Title : "kdbsksbdk",
  //       //   Category : "khckhwkwhh",
  //       //   DateandTime : "2023-05-04T16:06:03.636Z",
  //       // },
  //       // {
  //       //   UserId: 5,
  //       //   UserName: "Katlynn.Cremin",
  //       //   EmailId: "Baby_Hyatt@gmail.com",
  //       //   ClientName: "Adrienne_Sauer",
  //       //   RoleName: "Staff",
  //       //   status: "inActive",
  //       //   Title : "kdbsksbdk",
  //       //   Category : "khckhwkwhh",
  //       //   DateandTime : "12-5-23",
  //       // },
  //       // {
  //       //   UserId: 6,
  //       //   UserName: "Katlynn.Cremin",
  //       //   EmailId: "Baby_Hyatt@gmail.com",
  //       //   ClientName: "Adrienne_Sauer",
  //       //   RoleName: "Staff",
  //       //   status: "active",
  //       //   Title : "kdbsksbdk",
  //       //   Category : "khckhwkwhh",
  //       //   DateandTime : "12-5-23",
  //       // },
  //       // {
  //       //   UserId: 7,
  //       //   UserName: "Katlynn.Cremin",
  //       //   EmailId: "Baby_Hyatt@gmail.com",
  //       //   ClientName: "Adrienne_Sauer",
  //       //   RoleName: "Staff",
  //       //   status: "active",
  //       //   Title : "kdbsksbdk",
  //       //   Category : "khckhwkwhh",
  //       //   DateandTime : "12-5-23",
  //       // },
  //       // {
  //       //   UserId: 8,
  //       //   UserName: "Katlynn.Cremin",
  //       //   EmailId: "Baby_Hyatt@gmail.com",
  //       //   ClientName: "Adrienne_Sauer",
  //       //   RoleName: "Staff",
  //       //   status: "inActive",
  //       //   Title : "kdbsksbdk",
  //       //   Category : "khckhwkwhh",
  //       //   DateandTime : "12-5-23",
  //       // },
  //       // {
  //       //   UserId: 9,
  //       //   UserName: "Katlynn.Cremin",
  //       //   EmailId: "Baby_Hyatt@gmail.com",
  //       //   ClientName: "Adrienne_Sauer",
  //       //   RoleName: "Staff",
  //       //   status: "active",
  //       //   Title : "kdbsksbdk",
  //       //   Category : "khckhwkwhh",
  //       //   DateandTime : "12-5-23",
  //       // },
  //       // {
  //       //   UserId: 10,
  //       //   UserName: "Katlynn.Cremin",
  //       //   EmailId: "Baby_Hyatt@gmail.com",
  //       //   ClientName: "Adrienne_Sauer",
  //       //   RoleName: "Staff",
  //       //   status: "active",
  //       //   Title : "kdbsksbdk",
  //       //   Category : "khckhwkwhh",
  //       //   DateandTime : "12-5-23",
  //       // },
  //       // {
  //       //   UserId: 11,
  //       //   UserName: "Katlynn.Cremin",
  //       //   EmailId: "Baby_Hyatt@gmail.com",
  //       //   ClientName: "Adrienne_Sauer",
  //       //   RoleName: "Staff",
  //       //   status: "active",
  //       //   Title : "kdbsksbdk",
  //       //   Category : "khckhwkwhh",
  //       //   DateandTime : "12-5-23",
  //       // },
  //       // {
  //       //   UserId: 12,
  //       //   UserName: "Katlynn.Cremin",
  //       //   EmailId: "Baby_Hyatt@gmail.com",
  //       //   ClientName: "Adrienne_Sauer",
  //       //   RoleName: "Staff",
  //       //   status: "active",
  //       //   Title : "kdbsksbdk",
  //       //   Category : "khckhwkwhh",
  //       //   DateandTime : "12-5-23",
  //       // },
  //       // {
  //       //   UserId: 13,
  //       //   UserName: "Katlynn.Cremin",
  //       //   EmailId: "Baby_Hyatt@gmail.com",
  //       //   ClientName: "Adrienne_Sauer",
  //       //   RoleName: "Staff",
  //       //   status: "inActive",
  //       //   Title : "kdbsksbdk",
  //       //   Category : "khckhwkwhh",
  //       //   DateandTime : "12-5-23",
  //       // },
  //       // {
  //       //   UserId: 14,
  //       //   UserName: "Katlynn.Cremin",
  //       //   EmailId: "Baby_Hyatt@gmail.com",
  //       //   ClientName: "Adrienne_Sauer",
  //       //   RoleName: "Staff",
  //       //   status: "active",
  //       //   Title : "kdbsksbdk",
  //       //   Category : "khckhwkwhh",
  //       //   DateandTime : "12-5-23",
  //       // },
  //       // {
  //       //   UserId: 15,
  //       //   UserName: "Katlynn.Cremin",
  //       //   EmailId: "Baby_Hyatt@gmail.com",
  //       //   ClientName: "Adrienne_Sauer",
  //       //   RoleName: "Staff",
  //       //   status: "active",
  //       //   Title : "kdbsksbdk",
  //       //   Category : "khckhwkwhh",
  //       //   DateandTime : "12-5-23",
  //       // },
  //     ],
  //     pageMeta: {
  //       size: 10,
  //       page: 1,
  //       total: 10,
  //       totalPages: 1,
  //     },
  //   },
  // };
  const [data, setData] = useState([]);
  const [searchStaff, setSearchStaff] = useState("");
  const [role, setRole] = useState("");
  const [status, setStatus] = useState("");
  const includedKeys = ["_id", "name","brandImage","updatedAt" , "createdAt" , "isActive"];
  const [pageCount, setPageCount] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);

  const changes = {
    "name": "newName",
    "createdAt": "newCreatedAt",
    "isActive": "newIsActive"
  };
 
  Object.keys(changes).forEach(key => {
    const keyIndex = includedKeys.indexOf(key);
  
    if (keyIndex !== -1) {
      includedKeys[keyIndex] = changes[key];
    }
  });
  
  console.log(includedKeys,"keys");

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
          />
        </div>
      </div>
    </Fragment>
  );
};

export default StaffManagementComp;
