import React, { useState, useEffect, useCallback } from "react";
import "./style.scss";
import InputBox from "component/common/InputBox/InputBox";
import NormalButton from "component/common/NormalButton/NormalButton";
import { history, debounceFunction } from "helpers";
import { useForm } from "react-hook-form";
import {
  getKnowledgeList,
  deleteKnowledge,
  bulkDeleteKnowledge,
} from "service/Cms";
import TableComp from "component/common/TableComp/TableComp";
import { Toast } from "service/toast";
import DeleteModal from "component/common/DeleteModal/DeleteModal";
import Loader from "component/common/Loader";
import CustomController from "component/common/Controller";
import NormalMultiSelect from "component/common/NormalMultiSelect";

const KnowledgeCenterComp = ({ create, view, edit, remove }) => {
  const { errors, control } = useForm({
    mode: "onChange",
  });
  const [pageCount, setPageCount] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTitle, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [deleteId, setDeleteId] = useState([]);
  const [Category, setCategory] = useState("");
  const [SubCategory, setSubCategory] = useState("");
  const [status, setStatus] = useState("");
  const [bulkDelete, setBulkDelete] = useState(false);
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
    },
    {
      label: "Status",
      value: "isActive",
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
  const statusOptions = [
    {
      label: "ACTIVE",
      value: "active",
    },
    {
      label: "InACTIVE",
      value: "inActive",
    },
  ];
  const CategoryOptions = [
    {
      label: "ONE",
      value: "one",
    },
    {
      label: "TWO",
      value: "two",
    },
    {
      label: "THREE",
      value: "three",
    },
  ];
  const SubCategoryOptions = [
    {
      label: "ONE",
      value: "one",
    },
    {
      label: "TWO",
      value: "two",
    },
    {
      label: "THREE",
      value: "three",
    },
  ];

  const fetchData = async (page) => {
    setIsLoading(true);
    try {
      let params = {
        page: page,
        limit: 10,
        search: searchTitle,
        category: Category,
        subCategory: SubCategory,
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
        knowledgeCenterId: modalVisible.id,
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
        fetchData(currentPage);
      }
    }
  };

  return (
    <div className="px-5 py-3 knowledge_center">
      <h6>Knowledge Center</h6>
      <div className="row align-items-center">
        <div className="col-2">
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
        <div className="col-2">
          <CustomController
            name={"Categoty"}
            control={control}
            error={errors?.Category}
            defaultValue={Category}
            rules={{ required: false }}
            render={({ onChange, ...fields }) => {
              return (
                <NormalMultiSelect
                  {...fields}
                  placeholder={"Select Category"}
                  options={CategoryOptions}
                  name="Category"
                  handleChange={(e, { value } = {}) => {
                    onChange(value);
                    setCategory(value);
                  }}
                />
              );
            }}
          />
        </div>
        <div className="col-2">
          <CustomController
            name={"SubCategoty"}
            control={control}
            error={errors?.SubCategory}
            defaultValue={SubCategory}
            rules={{ required: false }}
            render={({ onChange, ...fields }) => {
              return (
                <NormalMultiSelect
                  {...fields}
                  placeholder={"SubCategory"}
                  options={SubCategoryOptions}
                  name="SubCategoty"
                  handleChange={(e, { value } = {}) => {
                    onChange(value);
                    setSubCategory(value);
                  }}
                />
              );
            }}
          />
        </div>
        <div className="col-md-2">
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
                  placeholder={"Select Status"}
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
        <div className="col-2">
          {bulkDelete && remove && (
            <NormalButton
              className="authButton1"
              label={"Delete"}
              onClick={handleBulkDelete}
            />
          )}
        </div>
        {create && (
          <div className="col-2">
            <NormalButton
              className="loginButton"
              label={"Add New"}
              onClick={() => {
                localStorage.removeItem("editId");
                history.push("/admin/knowledge-center/add-knowledge");
              }}
            />
          </div>
        )}
        <div className=" mt-4 p-3">
          {isLoading ? (
            <Loader
              loading={isLoading}
              className="d-flex align-items-center justify-content-center"
            />
          ) : data.length > 0 ? (
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
          ) : (
            <div className="d-flex align-items-center justify-content-center ">
              No Data Available
            </div>
          )}
          <DeleteModal
            modalOpen={modalVisible.show}
            closeModal={() => setModalVisible({ id: null, show: false })}
            handleDelete={handleDeleteItem}
            DeleteMessage={"Are you sure you want to delete?"}
          />
        </div>
      </div>
    </div>
  );
};

export default KnowledgeCenterComp;
