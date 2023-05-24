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

const ProductManagementComp = () => {
  const { register, handleSubmit, errors, reset, setError } = useForm({
    mode: "onChange",
  });
  const [data, setData] = useState([
    {
      ProductId: "51322",
      ProductStatus: "inactive",
      ProductName: "Bedfordshire",
      ProductDescription: "Nemo dolorem eum aliquam non.",
    },
    {
      ProductId: "99751",
      ProductStatus: "active",
      ProductName: "innovative",
      ProductDescription: "Nesciunt et voluptas a illo voluptates commodi.",
    },
    {
      ProductId: "21548",
      ProductStatus: "active",
      ProductName: "Markets",
      ProductDescription:
        "Quod et architecto consequatur ducimus sit sit facilis.",
    },
  ]);
  const [searchStaff, setSearchStaff] = useState("");
  const [pageCount, setPageCount] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);

  const includedKeys = [
    {
      label: "Product Id",
      value: "ProductId",
    },
    {
      label: "Product Status",
      value: "ProductStatus",
    },
    {
      label: "Product Name",
      value: "ProductName",
    },
    {
      label: "Product Description",
      value: "ProductDescription",
    },
  ];

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <Fragment>
      <div className="staff_table px-5 pt-4">
        <p className="staff_title m-0">ProductManagement</p>

        <div className="row align-items-center px-3">
          <div className="col-md-10 col-12">
            <div className="row align-items-center">
              <div className="col-md-4 p-0 my-4">
                <InputBox
                  className="login_input"
                  type={"text"}
                  placeholder="Search by Id, Name"
                  errors={errors}
                  name="search"
                  Iconic
                  Search
                  value={searchStaff}
                  // onChange={(e) => {
                  //   setsearch(e.target.value);
                  //   setactivePage(1);
                  // }}
                />
              </div>
            </div>
          </div>
          <div className="col-md-2 col-12 p-0 m-0">
            <Link to="/admin/product-management/add-product">
              <NormalButton
                className="loginButton"
                label={"Add Product"}
                //   onClick={DeletBulk}
              />
            </Link>
          </div>
        </div>
        <div className="">
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
              editRouteName={"/admin/product-management/add-product"}
            />
          ) : (
            <p className="text-center mt-5 fs-15">No Data Available</p>
          )}
        </div>
      </div>
    </Fragment>
  );
};

export default ProductManagementComp;
