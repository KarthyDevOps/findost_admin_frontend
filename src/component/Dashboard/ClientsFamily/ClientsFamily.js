import React, { useState } from "react";
import "./style.scss";
import InputBox from "component/common/InputBox/InputBox";
import DropDown from "component/common/DropDown/DropDown";
import TableComp from "component/common/TableComp/TableComp";
const ClientsFamily = () => {
  const [pageCount, setPageCount] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [data, setData] = useState([
    {
      clientId: "51322",

      clientName: "Adrienne_Sauer",
      emailId: "Rowland_Nader@gmail.com",
      dateOfBirth: " Mar 20 1990",

      relativeName: "Maggie Metz",
      relationship: "married",
    },
    {
      clientId: "51322",

      clientName: "Ettie.OReilly97",
      emailId: "Rowland_Nader@gmail.com",
      dateOfBirth: "Mar 20 1990",

      relativeName: "Maggie",
      relationship: "married",
    },
    {
      clientId: "51322",

      clientName: "Adrienne_Sauer",
      emailId: "Rowland_Nader@gmail.com",
      dateOfBirth: "Mar 20 1990",

      relativeName: " Metz",
      relationship: "married",
    },
    {
      clientId: "51322",

      clientName: "Carlie_Conn",
      emailId: "Rowland_Nader@gmail.com",
      dateOfBirth: " Mar 20 1990",

      relativeName: "Rosie West",
      relationship: "married",
    },
    {
      clientId: "51322",

      clientName: "Adrienne_Sauer",
      emailId: "Rowland_Nader@gmail.com",
      dateOfBirth: "Mar 20 1990",

      relativeName: "Rosie ",
      relationship: "married",
    },
  ]);
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
      value: "emailId",
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
      value: "relationship",
    },
  ];
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

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
