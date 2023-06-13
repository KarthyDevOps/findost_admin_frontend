import React, { useState, useEffect, useCallback, Fragment } from "react";
import { useForm } from "react-hook-form";
import { BsSearch } from "react-icons/bs";
//styles
import "./style.scss";
//internal components
import NormalButton from "component/common/NormalButton/NormalButton";
import InputBox from "component/common/InputBox/InputBox";
import TableComp from "../../common/TableComp/TableComp";
import Loader from "component/common/Loader";
import CustomController from "component/common/Controller";
import NormalMultiSelect from "component/common/NormalMultiSelect";
import DeleteModal from "component/common/DeleteModal/DeleteModal";
//services
import {
  bulkDeletetemplateList,
  deletetemplateList,
  getTemplateList,
} from "service/Cms";
import { Toast } from "service/toast";
//helpers
import { history, debounceFunction } from "helpers";

const TemplateManagementComp = ({ create, view, edit, remove }) => {
  const { register, handleSubmit, errors, control, reset, setError } = useForm({
    mode: "onChange",
  });
  const [pageCount, setPageCount] = useState(1);
  const [searchTitle, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [data, setData] = useState([]);
  const [FilterType, setFilterType] = useState("");
  const [deleteId, setDeleteId] = useState([]);
  const [bulkDelete, setBulkDelete] = useState(false);
  const [active, setIsactive] = useState("");
  const [modalVisible, setModalVisible] = useState({
    id: null,
    show: false,
  });
  const includedKeys = [
    {
      label: "Template Id",
      value: "templateId",
    },
    {
      label: "Status",
      value: "isActive",
    },
    {
      label: "Message Type",
      value: "type",
    },
    {
      label: "Message Title",
      value: "title",
    },
    {
      label: "Message Description",
      value: "description",
    },
  ];
  const FilterOption = [
    {
      label: " PRE Template Message",
      value: "pre template message",
    },
    {
      label: " POST Template Message",
      value: "post template message",
    },
  ];

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

  const fetchData = async (page) => {
    try {
      setIsLoading(true);
      let params = {
        page: page,
        limit: 10,
        search: searchTitle,
        messageType: FilterType,
      };
      let response = await getTemplateList(params);
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
  }, [searchTitle, FilterType]);

  const handleDeleteItem = async () => {
    if (modalVisible.show && modalVisible.id) {
      let params = {
        id: modalVisible.id,
      };
      let response = await deletetemplateList(params);
      if (response.status === 200) {
        Toast({ type: "success", message: response.data.message });
        fetchData(currentPage);
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
      let response = await bulkDeletetemplateList(body);
      if (response.status === 200) {
        Toast({ type: "success", message: response.data.message });
        fetchData(currentPage);
      }
    }
  };

  return (
    <Fragment>
      <div className="staff_table px-5 pt-2">
        <p className="staff_title m-0">Template Management</p>
        <div className="row align-items-center px-3">
          <div className="col-md-12 col-12">
            <div className="row align-items-center">
              <div className="col-md-4 p-0 my-4 staff_Search">
                <InputBox
                  className="login_input"
                  type={"text"}
                  placeholder="Search by Template Id, Message Title"
                  errors={errors}
                  name="search"
                  Iconic
                  value={searchTitle}
                  onChange={(e) => handleSearchChange(e.target.value)}
                />
                <i className="search_iconic">
                  <BsSearch size={18} style={{ color: "#7E7E7E" }} />
                </i>
              </div>
              <div className="col-3">
                <CustomController
                  name={"SubCategoty"}
                  control={control}
                  error={errors?.SubCategory}
                  defaultValue={FilterType}
                  rules={{ required: false }}
                  render={({ onChange, ...fields }) => {
                    return (
                      <NormalMultiSelect
                        {...fields}
                        placeholder={"Filter by Message Type"}
                        options={FilterOption}
                        name="SubCategoty"
                        handleChange={(e, { value } = {}) => {
                          onChange(value);
                          setFilterType(value);
                        }}
                      />
                    );
                  }}
                />
              </div>
              <div className="col-1"></div>
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
                <div className="col-2 p-0 m-0">
                  <NormalButton
                    className="loginButton"
                    label={"Add Template "}
                    onClick={() => {
                      localStorage.removeItem("editId");
                      history.push("/admin/template-management/add-template");
                    }}
                  />
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="">
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
              onRowsSelect={handleBulk}
              currentPage={currentPage}
              onPageChange={handlePageChange}
              setCurrentPage={setCurrentPage}
              handleOpenModal={handleOpenModal}
              editRouteName={"/admin/template-management/add-template"}
            />
          ) : (
            <div className="d-flex align-items-center justify-content-center mt-5 pt-5">
              No Data Available
            </div>
          )}
        </div>
        <DeleteModal
          modalOpen={modalVisible.show}
          closeModal={() => setModalVisible({ id: null, show: false })}
          handleDelete={handleDeleteItem}
          DeleteMessage={"Are you sure you want to delete ?"}
        />
      </div>
    </Fragment>
  );
};

export default TemplateManagementComp;
