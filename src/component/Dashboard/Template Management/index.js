import React, { useState, useEffect, useCallback, Fragment } from "react";
import TableComp from "../../common/TableComp/TableComp";
import axios from "axios";
import InputBox from "component/common/InputBox/InputBox";
import { useForm } from "react-hook-form";
import ReactSelect from "react-select";
// import InputBox from "component/common/InputBox/InputBox";
import NormalButton from "component/common/NormalButton/NormalButton";
import "./style.scss";
import { getTemplateList, deletetemplateList } from "service/Cms";
import { history, debounceFunction } from "helpers";
import { BsSearch } from "react-icons/bs";
import DropDown from "component/common/DropDown/DropDown";
import { Toast } from "service/toast";
// import { debounceFunction } from "helpers/debounce";
import Loader from "component/common/Loader";

import DeleteModal from "component/common/DeleteModal/DeleteModal";

const TemplateManagementComp = ({ create, view, edit, remove }) => {
  const { register, handleSubmit, errors, reset, setError } = useForm({
    mode: "onChange",
  });
  const [pageCount, setPageCount] = useState(1);
  const [searchTitle, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [data, setData] = useState([]);
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
    setIsLoading(true);

    try {
      let params = {
        page: page,
        limit: 10,
        search: searchTitle,
      };
      const response = await getTemplateList(params);
      console.log(response.data.data.list, "response");
      setIsactive(response?.data?.data?.list[0].isactive);
      setData(response?.data?.data?.list);
      setPageCount(response?.data?.data?.pageMeta?.pageCount);
      setCurrentPage(response?.data?.data?.pageMeta?.currentPage);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchData(currentPage);
  }, [searchTitle]);

  const handleDeleteItem = async () => {
    if (modalVisible.show && modalVisible.id) {
      let params = {
        templateId: modalVisible.id,
      };
      let response = await deletetemplateList(params);
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
  return (
    <Fragment>
      <div className="staff_table px-5 pt-2">
        <p className="staff_title m-0">Template Management</p>

        <div className="row align-items-center px-3">
          <div className="col-md-10 col-12">
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
              <div className="col-md-3">
                <DropDown placeholder={"Filter by Message Type"} />
              </div>
            </div>
          </div>
          {create && (
            <div className="col-md-2 col-12 p-0 m-0">
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
        <div className="">
          {isLoading ? (
            <Loader
              loading={isLoading}
              className="d-flex align-items-center justify-content-center"
            />
          ) : data.length > 0 ? (
            <TableComp
              data={data}
              isCheck={true}
              EditAction={edit}
              DeleteAction={remove}
              includedKeys={includedKeys}
              pageCount={pageCount}
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
