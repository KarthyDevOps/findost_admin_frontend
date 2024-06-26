import React, { useState, useEffect, Fragment, useCallback } from "react";
import { useForm } from "react-hook-form";
//styles
import "./style.scss";
//internal components
import InputBox from "component/common/InputBox/InputBox";
import NormalButton from "component/common/NormalButton/NormalButton";
import TableComp from "../../common/TableComp/TableComp";
import DeleteModal from "component/common/DeleteModal/DeleteModal";
import Loader from "component/common/Loader";
import EmptyTable from "component/common/TableComp/EmptyTable";
//service
import {
  getProductList,
  deleteProduct,
  bulkDeleteProduct,
} from "../../../service/Cms";
import { Toast } from "service/toast";
//helpers
import { debounceFunction } from "helpers";

const ProductManagementComp = ({ create, view, edit, remove }) => {
  const { errors } = useForm({ mode: "onChange" });
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [pageCount, setPageCount] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [modalVisible, setModalVisible] = useState({ id: null, show: false });
  const [isLoading, setIsLoading] = useState(false);
  const [bulkDelete, setBulkDelete] = useState(false);
  const [deleteId, setDeleteId] = useState([]);
  const includedKeys = [
    {
      label: "Product Id",
      value: "productId",
      width: "50%",
    },
    {
      label: "Product Icon",
      value: "productIconS3",
    },

    {
      label: "Product Name",
      value: "productName",
    },
    {
      label: "Product Type",
      value: "productType",
    },
  ];

  const getProductsList = async (page) => {
    try {
      setIsLoading(true);
      setBulkDelete(false);
      let params = {
        page: page,
        limit: 10,
        search: search,
      };
      let response = await getProductList(params);
      if (response.status === 200 && response?.data?.data?.list.length > 0) {
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

  const handleOpenModal = (id) => {
    setModalVisible({
      id: id,
      show: true,
    });
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    getProductsList(page);
  };

  const handleDeleteItem = async () => {
    if (modalVisible.show && modalVisible.id) {
      let params = {
        id: modalVisible.id,
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
    setModalVisible({ show: false, id: null });
  };

  useEffect(() => {
    if (localStorage.getItem("editPage")) {
      getProductsList(localStorage.getItem("editPage"));
      localStorage.removeItem("editPage");
    } else {
      getProductsList(1);
    }
  }, [search]);

  return (
    <Fragment>
      <div className="staff_table px-5 py-3">
        <p className="staff_title m-0">Product Management</p>
        <div className="row align-items-center px-3">
          <div className="col-md-8 col-12">
            <div className="row align-items-center">
              <div className="col-md-4 p-0 my-3">
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
                onClick={handleOpenModal}
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
          <div className="">
            <EmptyTable EditAction={edit} includedKeys={includedKeys} />
            <p className="d-flex align-items-center justify-content-center mt-5 pt-5">
              No Data Available
            </p>
          </div>
        )}
        <div>
          {" "}
          <DeleteModal
            modalOpen={modalVisible.show}
            closeModal={() => setModalVisible({ id: null, show: false })}
            handleDelete={
              deleteId.length > 0 ? handleBulkDelete : handleDeleteItem
            }
            DeleteMessage={"Are you sure you want to delete?"}
          />
        </div>
      </div>
    </Fragment>
  );
};

export default ProductManagementComp;
