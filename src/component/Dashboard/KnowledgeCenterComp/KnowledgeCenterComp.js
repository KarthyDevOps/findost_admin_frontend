import DropDown from "component/common/DropDown/DropDown";
import InputBox from "component/common/InputBox/InputBox";
import NormalButton from "component/common/NormalButton/NormalButton";
import { history } from "helpers";
import React, { useState } from "react";
import "./style.scss";
import TableComp from "component/common/TableComp/TableComp";

const KnowledgeCenterComp = () => {
  const [pageCount, setPageCount] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [data, setData] = useState([
    {
      templateId: "51322",
      status: "inactive",
      title: "real_time",
      category: "Template Message",
      subCategory: "open source",

      description: "Nemo dolorem eum aliquam non.",
    },
    {
      templateId: "51322",
      status: "active",
      title: "real_time",
      category: "Template Message",
      subCategory: "source",

      description: "Nemo dolorem eum aliquam non.",
    },
    {
      templateId: "51322",
      status: "active",
      title: "real_time",
      category: "Template Message",
      subCategory: "open source",

      description: "Nemo dolorem eum aliquam non.",
    },
    {
      templateId: "51322",
      status: "active",

      title: "real_time",
      category: "Template Message",
      subCategory: " edge",

      description: "Nemo dolorem eum aliquam non.",
    },
    {
      templateId: "51322",
      status: "active",
      title: "real_time",
      category: "Template Message",
      subCategory: "source",

      description: "Nemo dolorem eum aliquam non.",
    },
  ]);
  const includedKeys = [
    {
      label: "Id",
      value: "templateId",
    },
    {
      label: "Status",
      value: "status",
    },
    {
      label: "Title",
      value: "title",
    },
    {
      label: "Category",
      value: "category",
    },
    {
      label: "Sub Category",
      value: "subCategory",
    },

    {
      label: "Description",
      value: "description",
    },
  ];
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="px-5 py-3 knowledge_center">
      <h6>Knowledge Center</h6>
      <div className="row align-items-center">
        <div className="col-3">
          <InputBox
            className="login_input Notification_input"
            type={"text"}
            placeholder="Search by Id, Title, Email"
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
            placeholder="Filter by Category"
            // onChange={(e) => {}}
            // options={options}
          />
        </div>
        <div className="col-2">
          <DropDown
            // value={value}
            placeholder="Filter by Sub Category"
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
        <div className="col-1"></div>
        <div className="col-2">
          <NormalButton
            className="loginButton"
            label={"Add New"}
            onClick={() =>
              history.push("/admin/knowledge-center/add-knowledge")
            }
          />
        </div>
        <div className=" mt-4 p-3">
          {data.length > 0 ? (
            <TableComp
              data={data}
              isCheck={true}
              EditAction={true}
              DeleteAction={true}
              includedKeys={includedKeys}
              pageCount={pageCount}
              onPageChange={handlePageChange}
              setCurrentPage={setCurrentPage}
              editRouteName={"/admin/knowledge-center/add-knowledge"}
            />
          ) : (
            <p className="text-center mt-5 fs-15">No Data Available</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default KnowledgeCenterComp;
