import React, { useState,useEffect } from "react";
import "./style.scss";
import { Toast } from "service/toast";
import { getClient } from "service/Auth";
import InputBox from "component/common/InputBox/InputBox";
import DropDown from "component/common/DropDown/DropDown";
import TableComp from "component/common/TableComp/TableComp";
const ClientsFamily = () => {
  const [pageCount, setPageCount] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [data, setData] = useState([]);
 

  const includedKeys = [
    {
      label: "Client Id",
      value: "clientId",
    },
    {
      label: "Client Name",
      value: "clientName",
    },
    {
      label: "Email Id",
      value: "email",
    },
    {
      label: "Date of Birth",
      value: "dateOfBirth",
    },
    {
      label: "Relative Name",
      value: "relativeName",
    },
    {
      label: "Relationship",
      value: "relationShip",
    },
  ];
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
const getClientList = async () => {
    try {
      let params = {
        page: currentPage,
        limit: 10,
        search: "",
      };
      let response = await getClient(params);
      if (response.status === 200) {
        console.log("response", response?.data?.data);
        setData(response?.data?.data?.list);
        setPageCount(response?.data?.data?.pageMeta?.pageCount);
        setCurrentPage(response?.data?.data?.pageMeta?.currentPage);
      }
    } catch (err) {}
  };
  useEffect(() => {
    getClientList();
  }, []);
  

  return (
    <div className="px-5 py-3 clients_family">
      <h6>Client’s Family</h6>
      <div className="row align-items-center">
        <div className="col-4">
          <InputBox
            className="login_input Notification_input"
            type={"text"}
            placeholder="Search by Id, Username, Email"
            name="search"
            Iconic
            Search
            // value={search}
            // onChange={(e) => {
            //   setsearch(e.target.value);
            //   setactivePage(1);
            // }}
          />
        </div>
        <div className="col-2">
          <DropDown
            // value={value}
            placeholder="Filter by Role"
            // onChange={(e) => {}}
            // options={options}
          />
        </div>
        <div className="col-2">
          <DropDown
            // value={value}
            placeholder="Filter by Status"
            // onChange={(e) => {}}
            // options={options}
          />
        </div>
      </div>
      <div className=" mt-4 p-3">
        {data.length > 0 ? (
          <TableComp
            data={data}
            isCheck={true}
            EditAction={true}
            DeleteAction={false}
            includedKeys={includedKeys}
            pageCount={pageCount}
            onPageChange={handlePageChange}
            setCurrentPage={setCurrentPage}
            editRouteName={"/admin/clients-family/edit-client"}
          />
        ) : (
          <p className="text-center mt-5 fs-15">No Data Available</p>
        )}
      </div>
    </div>
  );
};

export default ClientsFamily;
