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
import CustomController from "component/common/Controller";
import NormalMultiSelect from "component/common/NormalMultiSelect";
//service
import {
  getKnowledgeList,
  deleteKnowledge,
  getCategoryList,
  getSubCategoryList,
  bulkDeleteKnowledge,
} from "service/Cms";
import { Toast } from "service/toast";
//helpers
import { history, debounceFunction } from "helpers";
import EmptyTable from "component/common/TableComp/EmptyTable";

const KnowledgeCenterComp = ({ create, view, edit, remove }) => {
  const { errors, control } = useForm({
    mode: "onChange",
  });
  const [pageCount, setPageCount] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTitle, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [deleteId, setDeleteId] = useState([]);
  const [status, setStatus] = useState("");
  const [bulkDelete, setBulkDelete] = useState(false);
  const [Category, setCategory] = useState("");
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
  const [active, setIsactive] = useState("");
  const [data, setData] = useState([]);
  const includedKeys = [
    {
      label: "Id",
      value: "knowledgeCenterId",
      width: "50%",
    },
    {
      label: "Status",
      value: "isActive",
      width: "50%",
    },
    {
      label: "Title",
      value: "title",
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
      label: "Description",
      value: "description",
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
    listCategorys(currentPage);
    listSubCategorys(currentPage);
  }, []);

  const fetchData = async (page) => {
    setIsLoading(true);
    setBulkDelete(false);
    try {
      let params = {
        page: page,
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
      let response = await getKnowledgeList(params);
      if (response.status === 200 && response?.data?.data?.list.length > 0) {
        setIsactive(response?.data?.data?.list[0].isactive);
        setData(response?.data?.data?.list);
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

  useEffect(() => {
    fetchData(currentPage);
  }, [searchTitle, Category, SubCategory, status]);

  const handleOpenModal = (id) => {
    setModalVisible({
      id: id,
      show: true,
    });
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
      let response = await deleteKnowledge(params);
      if (response.status === 200) {
        Toast({ type: "success", message: response.data.message });
        fetchData();
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
      let response = await bulkDeleteKnowledge(body);
      if (response.status === 200) {
        Toast({ type: "success", message: response.data.message });
        deleteId.length = 0;
        fetchData(currentPage);
      }
    }
    setModalVisible({ show: false, id: null });
  };

  return (
    <div className="px-5 py-3 knowledge_center">
      <p>Knowledge Center</p>
      <div className="flex align-items-center justify-content-between">
        <span className="flex align-items-center" style={{ gap: "1em" }}>
          <div className="cursor-pointer my-2" style={{ width: "230px" }}>
            <InputBox
              className="login_input Notification_input"
              type={"text"}
              placeholder="Search by Id, Title, Email"
              name="search"
              Iconic
              Search
              value={searchTitle}
              onChange={(e) => handleSearchChange(e.target.value)}
            />
          </div>
          <div className="cursor-pointer" style={{ width: "170px" }}>
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
          <div className="cursor-pointer" style={{ width: "200px" }}>
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
          <div className="cursor-pointer" style={{ width: "150px" }}>
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
          <div className="cursor-pointer" style={{ minWidth: "140px" }}>
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
                label={"Add New"}
                onClick={() => {
                  localStorage.removeItem("editId");
                  history.push("/admin/knowledge-center/add-knowledge");
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
        ) : data.length > 0 ? (
          <div className="mt-3 px-3">
            <TableComp
              data={data}
              EditAction={edit}
              DeleteAction={remove}
              includedKeys={includedKeys}
              pageCount={pageCount}
              handleOpenModal={handleOpenModal}
              onPageChange={handlePageChange}
              onRowsSelect={handleBulk}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              editRouteName={"/admin/knowledge-center/add-knowledge"}
            />
          </div>
        ) : (
          <div className="">
            <EmptyTable
              EditAction={edit}
              DeleteAction={remove}
              includedKeys={includedKeys}
            />
            <h6 className="d-flex align-items-center justify-content-center mt-5 pt-5">
              No Data Available
            </h6>
          </div>
        )}
        <div className=" mt-4 p-3">
          <DeleteModal
            modalOpen={modalVisible.show}
            closeModal={() => setModalVisible({ id: null, show: false })}
            handleDelete={
              deleteId.length > 0 ? handleBulkDelete : handleDeleteItem
            }
            DeleteMessage={"Are you sure you want to delete?"}
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
    </div>
  );
};

export default KnowledgeCenterComp;
