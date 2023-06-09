import React, { useState, useEffect, Fragment, useCallback } from "react";
import TableComp from "../../common/TableComp/TableComp";
import axios from "axios";
import FormErrorMessage from "component/common/ErrorMessage";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom/cjs/react-router-dom";
import ReactSelect from "react-select";
import InputBox from "component/common/InputBox/InputBox";
import NormalButton from "component/common/NormalButton/NormalButton";
import "./style.scss";
import {
  getProductList,
  deleteProduct,
  bulkDeleteProduct,
} from "../../../service/Cms";
import DeleteModal from "component/common/DeleteModal/DeleteModal";
import { Toast } from "service/toast";
import { debounceFunction, history } from "helpers";
import Loader from "component/common/Loader";

const ProductManagementComp = ({ create, view, edit, remove }) => {
  const { register, handleSubmit, errors, reset, setError } = useForm({
    mode: "onChange",
  });
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [pageCount, setPageCount] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [modalVisible, setModalVisible] = useState({
    id: null,
    show: false,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [bulkDelete, setBulkDelete] = useState(false);
  const [deleteId, setDeleteId] = useState([]);

  const includedKeys = [
    {
      label: "Product Id",
      value: "productId",
    },
    {
      label: "Product Icon",
      value: "productDescription",
    },
    // {
    //   label: "Product Status",
    //   value: "isActive",
    // },
    {
      label: "Product Name",
      value: "productName",
    },
    {
      label: "Product Type",
      value: "productDescription",
    },
  ];

  const handlePageChange = (page) => {
    setCurrentPage(page);
    getProductsList(page);
  };

  const getProductsList = async (page) => {
    try {
      setIsLoading(true);
      let params = {
        page: page,
        limit: 10,
        search: search,
      };
      let response = await getProductList(params);
      if (response.status === 200 && response?.data?.data?.list.length > 0) {
        console.log("response", response?.data?.data);
        setData(response?.data?.data?.list);
        setPageCount(response?.data?.data?.pageMeta?.pageCount);
        setCurrentPage(response?.data?.data?.pageMeta?.currentPage);
      } else {
        setData([]);
      }
    } catch (err) {
      console.log("err :>> ", err);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    getProductsList(currentPage);
  }, [search]);

  const handleOpenModal = (id) => {
    setModalVisible({
      id: id,
      show: true,
    });
  };

  const handleDeleteItem = async () => {
    if (modalVisible.show && modalVisible.id) {
      let params = {
        productId: modalVisible.id,
      };
      let response = await deleteProduct(params);
      if (response.status === 200) {
        Toast({ type: "success", message: response.data.message });
        getProductsList(currentPage);
      }
    }
    setModalVisible({ show: false, id: null });
  };

  const handleSearchChange = useCallback(
    debounceFunction((value) => {
      setSearch(value);
    }, 500),
    []
  );

  const handleBulk = async (id) => {
    if (id.length > 0) {
      setBulkDelete(true);
      deleteId.length = 0;
      deleteId.push(...Object.values(id));
    } else {
      setBulkDelete(false);
    }
  };

  const handleBulkDelete = async () => {
    if (deleteId.length > 0) {
      let body = {
        ids: deleteId,
      };
      let response = await bulkDeleteProduct(body);
      if (response.status === 200) {
        Toast({ type: "success", message: response.data.message });
        getProductsList(currentPage);
      } else {
        Toast({ type: "error", message: response.data.message });
      }
    }
  };

  return (
    <Fragment>
      <div className="staff_table px-5 pt-4">
        <p className="staff_title m-0">ProductManagement</p>

        <div className="row align-items-center px-3">
          <div className="col-md-8 col-12">
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
                  value={search}
                  onChange={(e) => handleSearchChange(e.target.value)}
                />
              </div>
            </div>
          </div>
          <div className="col-md-2">
            {bulkDelete && (
              <NormalButton
                className="authButton1"
                label={"Delete"}
                onClick={handleBulkDelete}
              />
            )}
          </div>
          {/* {create && (
            <div className="col-md-2 col-12 p-0 m-0">
              <NormalButton
                className="loginButton"
                label={"Add Product"}
                onClick={() => {
                  localStorage.removeItem("editId");
                  history.push("/admin/product-management/add-product");
                }}
              />
            </div>
          )} */}
        </div>
        {isLoading ? (
          <Loader
            loading={isLoading}
            className="d-flex align-items-center justify-content-center"
          />
        ) : data.length > 0 ? (
          <div className="">
            <TableComp
              data={data}
              isCheck={true}
              EditAction={edit}
              // DeleteAction={remove}
              includedKeys={includedKeys}
              pageCount={pageCount}
              onPageChange={handlePageChange}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              editRouteName={"/admin/product-management/add-product"}
              handleOpenModal={handleOpenModal}
              onRowsSelect={handleBulk}
            />
          </div>
        ) : (
          <div className="d-flex align-items-center justify-content-center mt-5 pt-5">
            No Data Available
          </div>
        )}
        <div>
          {" "}
          <DeleteModal
            modalOpen={modalVisible.show}
            closeModal={() => setModalVisible({ id: null, show: false })}
            handleDelete={handleDeleteItem}
            DeleteMessage={"Are you sure you want to delete?"}
          />
        </div>
      </div>
    </Fragment>
  );
};

export default ProductManagementComp;
