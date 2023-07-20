import React, { useState, useEffect, useCallback } from "react";
import { useForm } from "react-hook-form";
//styles
import "./style.scss";
//internal components
import InputBox from "component/common/InputBox/InputBox";
import NormalButton from "component/common/NormalButton/NormalButton";
import TableComp from "component/common/TableComp/TableComp";
import DeleteModal from "component/common/DeleteModal/DeleteModal";
import Loader from "component/common/Loader";
import MultiSelect from "component/common/MultiSelect";
import CategoryModal from "component/common/CategoryModal/CategoryModal";
import SubCategoryModal from "component/common/CategoryModal/SubCategoryModal";
import EmptyTable from "component/common/TableComp/EmptyTable";
import CustomController from "component/common/Controller";
import NormalMultiSelect from "component/common/NormalMultiSelect";
//service
import {
  getFAQList,
  deleteFAQList,
  getCategoryList,
  getSubCategoryList,
  bulkDeleteFaq,
} from "service/Cms";
import { Toast } from "service/toast";
//helpers
import { history, debounceFunction } from "helpers";

const FaqManagementComp = ({ create, view, edit, remove }) => {
  const { errors, control } = useForm({
    mode: "onChange",
  });
  const [pageCount, setPageCount] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [data, setData] = useState([]);
  const [status, setStatus] = useState("");
  const [bulkDelete, setBulkDelete] = useState(false);
  const [deleteId, setDeleteId] = useState([]);
  const [active, setIsactive] = useState("");
  const [searchTitle, setSearch] = useState("");
  const [Category, setCategory] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [SubCategory, setSubCategory] = useState("");
  const [categoryModal, setCategoryModal] = useState(false);
  const [subCategoryModal, setSubCategoryModal] = useState(false);
  const [categoryList, setCategoryList] = useState([]);
  const [subCategoryList, setSubCategoryList] = useState([]);
  const [categoryId, setCategoryId] = useState("");
  const [categoryMasterId, setCategoryMasterId] = useState("");
  const [subCategoryId, setSubCategoryId] = useState("");
  const [modalVisible, setModalVisible] = useState({
    id: null,
    show: false,
  });
  const includedKeys = [
    {
      label: "Id",
      value: "faqId",
      width: "50%",
    },
    {
      label: "Status",
      value: "isActive",
      width: "50%",
    },
    {
      label: "Category",
      value: "category",
      width: "60%",
    },
    {
      label: "Sub Category",
      value: "subCategory",
      width: "60%",
    },
    {
      label: "FAQ Title",
      value: "title",
    },
    {
      label: "FAQ Answer",
      value: "answer",
    },
  ];
  const statusOptions = [
    {
      label: "Active",
      value: "active",
    },
    {
      label: "Inactive",
      value: "inActive",
    },
  ];

  const handlecategoryId = (option) => {
    let newCategory = categoryList.find((x) => x.name === option);
    setCategoryId(newCategory?.categoryId);
    setCategoryMasterId(newCategory?._id);
  };
  const handleSubcategoryId = (option) => {
    let newCategory = subCategoryList.find((x) => x.name === option);
    setSubCategoryId(newCategory?._id);
  };

  const listCategorys = async (page) => {
    try {
      let params = {
        page: page,
        type: "Faq",
      };
      let response = await getCategoryList(params);
      if (response.status === 200 && response?.data?.data?.list.length > 0) {
        setCategoryList(response?.data?.data?.list);
        console.log("first", response?.data?.data?.list);
      } else {
        setCategoryList([]);
      }
    } catch (e) {
      console.log("e :>> ", e);
    }
  };

  const listSubCategorys = async (page) => {
    try {
      let params = {
        page: page,
        
      };
      let response = await getSubCategoryList(params);
      if (response.status === 200 && response?.data?.data?.list.length > 0) {
        setSubCategoryList(response?.data?.data?.list);
      } else {
        setSubCategoryList([]);
      }
    } catch (e) {
      console.log("e :>> ", e);
    }
  };

  useEffect(() => {
    fetchData(currentPage);
  }, [searchTitle, Category, SubCategory, status]);

  useEffect(() => {
    listCategorys(currentPage);
    listSubCategorys(currentPage);
  }, []);

  const handleOpenModal = (id) => {
    setModalVisible({
      id: id,
      show: true,
    });
  };

  const fetchData = async (page) => {
    try {
      setIsLoading(true);
      setBulkDelete(false);
      let params = {
        page: page ? page : 1,
        limit: 10,
        search: searchTitle,
        category: categoryMasterId,
        subCategory: subCategoryId,
      };
      if (status) {
        status === "active"
          ? (params.isActive = true)
          : (params.isActive = false);
      }
      let response = await getFAQList(params);
      if (response.status === 200 && response?.data?.data?.list.length > 0) {
        setIsactive(response?.data?.data?.list[0].isactive);
        setData(response?.data?.data?.list);
        localStorage.setItem("noOfLists", response?.data?.data?.list.length);
        setPageCount(response?.data?.data?.pageMeta?.pageCount);
        setCurrentPage(response?.data?.data?.pageMeta?.currentPage);
      } else {
        setData([]);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page.selected);
    fetchData(page);
  };

  const handleDeleteItem = async () => {
    if (modalVisible.show && modalVisible.id) {
      let params = {
        id: modalVisible.id,
      };
      let response = await deleteFAQList(params);
      if (response.status === 200) {
        Toast({ type: "success", message: response.data.message });
        const activeLists = JSON.parse(localStorage.getItem("noOfLists"));
        if (activeLists === 1) {
          fetchData(currentPage > 1 ? currentPage - 1 : 1);
          localStorage.removeItem("noOfLists");
        } else {
          fetchData(currentPage);
          localStorage.removeItem("noOfLists");
        }
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
      let response = await bulkDeleteFaq(body);
      if (response.status === 200) {
        Toast({ type: "success", message: response.data.message });
        const activeLists = JSON.parse(localStorage.getItem("noOfLists"));
        if (activeLists === deleteId.length) {
          fetchData(currentPage > 1 ? currentPage - 1 : 1);
          localStorage.removeItem("noOfLists");
          deleteId.length = 0;
        } else {
          fetchData(currentPage);
          localStorage.removeItem("noOfLists");
          deleteId.length = 0;
        }
      }
    }
    setModalVisible({ show: false, id: null });
  };

  useEffect(() => {
    if (localStorage.getItem("editPage")) {
      fetchData(localStorage.getItem("editPage"));
      localStorage.removeItem("editPage");
    } else {
      fetchData(1);
    }
  }, [searchTitle, Category, SubCategory, status]);

  return (
    <div className="faq_head px-5 py-3">
      <h6>FAQ Management</h6>
      <div className="flex align-items-center justify-content-between">
        <span className="flex align-items-center" style={{ gap: "1em" }}>
          <div className="cursor-pointer my-2" style={{ width: "200px" }}>
            <InputBox
              className="login_input Notification_input"
              type={"text"}
              placeholder="Search by Id, Title"
              name="search"
              Iconic
              Search
              value={searchTitle}
              onChange={(e) => handleSearchChange(e.target.value)}
            />
          </div>
          <div className="cursor-pointer" style={{ minWidth: "180px" }}>
            <MultiSelect
              options={categoryList}
              placeholder="Filter by Category"
              onChange={(option) => {
                setCategory(option);
                handlecategoryId(option);
              }}
              id="category"
              plusSymbol={false}
            />
          </div>
          <div className="cursor-pointer" style={{ minWidth: "200px" }}>
            <MultiSelect
              subOptions={subCategoryList}
              placeholder="Filter by Sub Category"
              onChange={(option) => {
                setSubCategory(option);
                handleSubcategoryId(option);
              }}
              id="subCategory"
              plusSymbol={false}
            />
          </div>
          <div className="cursor-pointer" style={{ minWidth: "150px" }}>
            <CustomController
              name={"status"}
              control={control}
              error={errors?.status}
              defaultValue={status}
              rules={{ required: false }}
              render={({ onChange, ...fields }) => {
                return (
                  <NormalMultiSelect
                    {...fields}
                    placeholder={"Filter by Status"}
                    options={statusOptions}
                    name="status"
                    handleChange={(e, { value } = {}) => {
                      onChange(value);
                      setStatus(value);
                    }}
                  />
                );
              }}
            />
          </div>
        </span>
        <div className="flex align-items-center" style={{ gap: "1em" }}>
          <div className="cursor-pointer" style={{ minWidth: "150px" }}>
            {bulkDelete && remove && (
              <NormalButton
                className="authButton1"
                label={"Delete"}
                onClick={handleOpenModal}
              />
            )}
          </div>
          {create && (
            <div className="cursor-pointer" style={{ minWidth: "150px" }}>
              <NormalButton
                loginButton1
                label={"Add New FAQ"}
                onClick={() => {
                  localStorage.removeItem("editId");
                  history.push("/admin/faq-management/add-faq");
                }}
              />
            </div>
          )}
        </div>
      </div>
      <div className="row align-items-center">
        {isLoading ? (
          <Loader
            loading={isLoading}
            className="d-flex align-items-center justify-content-center mx-auto mt-5 pt-5"
          />
        ) : data?.length > 0 ? (
          <div className="mt-3 px-3">
            <TableComp
              data={data}
              EditAction={edit}
              DeleteAction={remove}
              includedKeys={includedKeys}
              pageCount={pageCount}
              currentPage={currentPage}
              handleOpenModal={handleOpenModal}
              onPageChange={handlePageChange}
              setCurrentPage={setCurrentPage}
              onRowsSelect={handleBulk}
              setBulkDelete={setBulkDelete}
              editRouteName={"/admin/faq-management/add-faq"}
            />
          </div>
        ) : (
          <div className="">
            <EmptyTable
              EditAction={edit}
              DeleteAction={remove}
              includedKeys={includedKeys}
            />
            <p className="d-flex align-items-center justify-content-center mt-5 pt-5">
              No Data Available
            </p>
          </div>
        )}
        <DeleteModal
          modalOpen={modalVisible.show}
          closeModal={() => setModalVisible({ id: null, show: false })}
          handleDelete={
            deleteId.length > 0 ? handleBulkDelete : handleDeleteItem
          }
          DeleteMessage={"Are you sure you want to delete ?"}
        />
      </div>
      <div>
        <CategoryModal
          modalOpen={categoryModal}
          onCancel={() => setCategoryModal(false)}
          refresh={() => listCategorys(currentPage)}
        />
      </div>
      <div>
        <SubCategoryModal
          modalOpen={subCategoryModal}
          onCancel={() => setSubCategoryModal(false)}
          categoryId={categoryId}
          refresh={() => listSubCategorys(currentPage)}
        />
      </div>
    </div>
  );
};

export default FaqManagementComp;
