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
import { getProductList, deleteProduct } from "../../../service/Cms";
import DeleteModal from "component/common/DeleteModal/DeleteModal";
import { Toast } from "service/toast";
import { history } from "helpers";

const ProductManagementComp = ({ create, view, edit, remove }) => {
  const { register, handleSubmit, errors, reset, setError } = useForm({
    mode: "onChange",
  });
  const [data, setData] = useState([]);
  const [searchStaff, setSearchStaff] = useState("");
  const [pageCount, setPageCount] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [modalVisible, setModalVisible] = useState({
    id: null,
    show: false,
  });

  const includedKeys = [
    {
      label: "Product Id",
      value: "productId",
    },
    {
      label: "Product Status",
      value: "isActive",
    },
    {
      label: "Product Name",
      value: "productName",
    },
    {
      label: "Product Description",
      value: "productDescription",
    },
  ];

  const handlePageChange = (page) => {
    setCurrentPage(page);
    getProductList(page)
  };

  const getProductsList = async (page) => {
    try {
      let params = {
        page: page,
        limit: 10,
        search: "",
      };
      let response = await getProductList(params);
      if (response.status === 200) {
        console.log("response", response?.data?.data);
        setData(response?.data?.data?.list);
        setPageCount(response?.data?.data?.pageMeta?.pageCount);
        setCurrentPage(response?.data?.data?.pageMeta?.currentPage);
      }
    } catch (err) { }
  };
  useEffect(() => {
    getProductsList(currentPage);
  }, []);

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
          {create && <div className="col-md-2 col-12 p-0 m-0">
            <NormalButton
              className="loginButton"
              label={"Add Product"}
              onClick={() => {
                localStorage.removeItem("editId");
                history.push("/admin/product-management/add-product");
              }}
            />
          </div>}
        </div>
        <div className="">
          <TableComp
            data={data}
            isCheck={true}
            EditAction={edit}
            DeleteAction={remove}
            includedKeys={includedKeys}
            pageCount={pageCount}
            onPageChange={handlePageChange}
            setCurrentPage={setCurrentPage}
            editRouteName={"/admin/product-management/add-product"}
            handleOpenModal={handleOpenModal}
          />
        </div>
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
