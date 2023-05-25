import React, { useState, useEffect, useRef } from "react";
import "./style.scss";
import InputBox from "component/common/InputBox/InputBox";
import ReactSelect from "react-select";
import NormalButton from "component/common/NormalButton/NormalButton";
import { history } from "helpers";
import DropDown from "component/common/DropDown/DropDown";
import TableComp from "component/common/TableComp/TableComp";
const FaqManagementComp = () => {


  const [pageCount, setPageCount] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [data, setData] = useState([
    {
      templateId: "51322",
      status: "inactive",
      category: "Template Message",
      subCategory: "open source",
      faqTitle:"real-time",
      faqAnswer:'Nemo dolorem eum aliquam non.'
    },
    {
      templateId: "51322",
      status: "active",
      category: "Template Message",
      subCategory: "source",
      faqTitle:"real-time",
      faqAnswer:'Nemo dolorem eum aliquam non.'
    },
    {
      templateId: "51322",
      status: "active",
      category: "Template Message",
      subCategory: "open source",
      faqTitle:"real-time",
      faqAnswer:'Nemo dolorem eum aliquam non.'
    },
    {
      templateId: "51322",
      status: "active",
      category: "Template Message",
      subCategory: " edge",
      faqTitle:"real-time",
      faqAnswer:'Nemo dolorem eum aliquam non.'
    },
    {
      templateId: "51322",
      status: "active",
      category: "Template Message",
      subCategory: "source",
      faqTitle:"real-time",
      faqAnswer:'Nemo dolorem eum aliquam non.'
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
      label: "Category",
      value: "category",
    },
    {
      label: "Sub Category",
      value: "subCategory",
    },
    {
      label: "FAQ Title",
      value: "faqTitle",
    },
    {
      label: "FAQ Answer",
      value: "faqAnswer",
    },
  ];
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  // useEffect(() => {
  //   if (modalVisible) {
  //     const timer = setTimeout(() => {
  //       setModalVisible(false);
  //     }, 1000);

  //     return () => clearTimeout(timer);
  //   }
  // }, [modalVisible]);
  return (
    <div className="faq_head px-5 py-3">
      <h6>FAQ Management</h6>
      <div className="row align-items-center">
        <div className="col-3">
          <InputBox
            className="login_input Notification_input"
            type={"text"}
            placeholder="Search by Id, Title"
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
            label={"Add New FAQ"}
            onClick={() => history.push("/admin/faq-management/add-faq")}
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
             editRouteName={"/admin/faq-management/add-faq"}
           />
          ) : (
            <p className="text-center mt-5 fs-15">No Data Available</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default FaqManagementComp;
