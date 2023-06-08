import React, { useState, useEffect } from "react";
import "./style.scss";
import { getClientList } from "service/Auth";
import InputBox from "component/common/InputBox/InputBox";
import DropDown from "component/common/DropDown/DropDown";
import TableComp from "component/common/TableComp/TableComp";
import { debounceFunction } from "helpers/debounce";
const ClientsFamily = ({ create, view, edit, remove }) => {
  const [pageCount, setPageCount] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");

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

  const fetchClientList = async (search) => {
    try {
      let params = {
        page: currentPage,
        limit: 10,
        search,
      };
      let response = await getClientList(params);
      if (response.status === 200) {
        console.log("response", response?.data?.data);
        setData(response?.data?.data?.list);
        setPageCount(response?.data?.data?.pageMeta?.pageCount);
        setCurrentPage(response?.data?.data?.pageMeta?.currentPage);
      }
    } catch (err) {}
  };

  useEffect(() => {
    fetchClientList();
  }, []);
  const searchValues = (e) => {
    setSearch(e.target.value);
    debounceFunction(() => fetchClientList(e.target.value), 1200);
  };

  return (
    <div className="px-5 py-3 clients_family">
      <h6>Client’s Family</h6>
      <div className="row align-items-center">
        <div className="col-4">
          <InputBox
            className="login_input Notification_input"
            type={"text"}
            value={search}
            onChange={(e) => {
              searchValues(e);
            }}
            placeholder="Search by Id, Username, Email"
            name="search"
            Iconic
            Search
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
        <TableComp
          data={data}
          isCheck={true}
          EditAction={edit}
          DeleteAction={remove}
          includedKeys={includedKeys}
          pageCount={pageCount}
          onPageChange={handlePageChange}
          setCurrentPage={setCurrentPage}
          editRouteName={"/admin/clients-family/edit-client"}
        />
      </div>
    </div>
  );
};

export default ClientsFamily;
