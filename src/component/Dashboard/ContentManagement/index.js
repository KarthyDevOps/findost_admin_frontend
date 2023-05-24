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

const ContentManagementComp = () => {
  const { register, handleSubmit, errors, reset, setError } = useForm({
    mode: "onChange",
  });
  const [searchStaff, setSearchStaff] = useState("");
  const [role, setRole] = useState("");
  const [status, setStatus] = useState("");
  const [pageCount, setPageCount] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);


  const [data, setData] = useState([
    {
      pagesId: "51322",
      status: "Inactive",
      dateandTime: "2023-05-04T16:06:03.636Z",
      pagetitle: "privacy policy",
      feedbackDescription:"Nemo dolorem eum aliquam non."
    },
    {
      pagesId: "51322",
      status: "active",
      dateandTime: "2023-05-04T16:06:03.636Z",
      pagetitle: "terms and condition",
      feedbackDescription:"Nemo dolorem eum aliquam non."
    },
    {
      pagesId: "51322",
      status: "active",
      dateandTime: "2023-05-04T16:06:03.636Z",
      pagetitle: "Benefits and Process",
      feedbackDescription:"Nemo dolorem eum aliquam non."
    },
  ]);

  const includedKeys = [
    {
      label: "Pages Id",
      value: "pagesId",
    },
    {
      label: "Page Status",
      value: "status",
    },
   
    {
      label: "Page Title",
      value: "pagetitle",
    },
   
  ];
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://jsonplaceholder.typicode.com/posts"
        );
        // setData(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);
  return (
    <Fragment>
      <div className="staff_table px-5 pt-4">
        <p className="staff_title m-0">Content Management</p>

       
        <div className="">
          {data.length > 0 ? (
            
            <TableComp
            data={data}
            // isCheck={true}
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
