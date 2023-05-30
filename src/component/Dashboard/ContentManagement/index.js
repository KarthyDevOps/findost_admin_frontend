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
import { getContentList } from "service/Cms";

const ContentManagementComp = () => {
  const { register, handleSubmit, errors, reset, setError } = useForm({
    mode: "onChange",
  });
  const [searchStaff, setSearchStaff] = useState("");
  const [role, setRole] = useState("");
  const [status, setStatus] = useState("");
  const [pageCount, setPageCount] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);

  const [data, setData] = useState([]);

  const includedKeys = [
    {
      label: "Page Id",
      value: "contentId",
    },
    {
      label: "Page Status",
      value: "isActive",
    },
    {
      label: "Page Title",
      value: "title",
    },

  ];
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const fetchData = async () => {
    try {
      let params = {
        page: currentPage,
        limit: 10,
        search: "",
      };
      const response = await getContentList(params);
      console.log(response.data.data.list, "response");
      setData(response?.data?.data?.list);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => fetchData(), []);

  return (
    <Fragment>
      <div className="staff_table px-5 pt-4">
        <p className="staff_title m-0">Content Management</p>

        <div className="">
          {data.length > 0 ? (
            <TableComp
              data={data}
              isCheck={false}
              // ReadAction={true}
              EditAction={true}
              DeleteAction={true}
              includedKeys={includedKeys}
              pageCount={pageCount}
              onPageChange={handlePageChange}
              setCurrentPage={setCurrentPage}
              editRouteName={"/admin/content-management/editcontent-Management"}
            />
          ) : (
            <p className="text-center mt-5 fs-15">No Data Available</p>
          )}
        </div>
      </div>
    </Fragment>
  );
};

export default ContentManagementComp;
