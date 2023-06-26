import React, { useState, useEffect, Fragment } from "react";
//styles
import "./style.scss";
//internal components
import TableComp from "../../common/TableComp/TableComp";
import NormalButton from "component/common/NormalButton/NormalButton";
import Loader from "component/common/Loader";
import DeleteModal from "component/common/DeleteModal/DeleteModal";
import EmptyTable from "component/common/TableComp/EmptyTable";
//service
import {
  getContentList,
  deleteContentList,
  bulkDeleteContentList,
} from "service/Cms";
import { Toast } from "service/toast";
//helpers
import { history } from "helpers";

const ContentManagementComp = ({ create, view, edit, remove }) => {
  const [modalVisible, setModalVisible] = useState({ id: null, show: false });
  const [pageCount, setPageCount] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [data, setData] = useState([]);
  const [bulkDelete, setBulkDelete] = useState(false);
  const [deleteId, setDeleteId] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [pageSize, setPageSize] = useState(1);

  const includedKeys = [
    { label: "Page Id", value: "contentId", width: "30%" },
    { label: "Page Status", value: "isActive", width: "30%" },
    { label: "Page Title", value: "title" },
  ];

  const fetchData = async (page) => {
    try {
      setIsLoading(true);
      setBulkDelete(false);
      let params = {
        page: page ? page : 1,
        limit: 10,
      };
      let response = await getContentList(params);
      if (response.status === 200 && response?.data?.data?.list.length > 0) {
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

  const handleOpenModal = (id) => {
    setModalVisible({
      id: id,
      show: true,
    });
  };

  const handleDeleteItem = async () => {
    if (modalVisible.show) {
      let params = {
        id: modalVisible.id,
      };
      let response = await deleteContentList(params);
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
      let response = await bulkDeleteContentList(body);
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
      fetchData(currentPage);
    }
  }, []);

  return (
    <Fragment>
      <div className="staff_table px-5 py-3">
        <p className="staff_title m-0">Content Management</p>
        <>
          <div className="row mb-3 align-items-center justify-content-end">
            <div className=" col-2">
              {bulkDelete && remove && (
                <NormalButton
                  className="authButton1"
                  label={"Delete"}
                  onClick={handleOpenModal}
                />
              )}
            </div>
            <div className="col-2">
              <NormalButton
                loginButton1
                label={"Add Content"}
                onClick={() => {
                  localStorage.removeItem("editId");
                  history.push(
                    "/admin/content-management/editcontent-management"
                  );
                }}
              />
            </div>
          </div>
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
              currentPage={currentPage}
              onRowsSelect={handleBulk}
              onPageChange={handlePageChange}
              setCurrentPage={setCurrentPage}
              handleOpenModal={handleOpenModal}
              editRouteName={"/admin/content-management/editContent-management"}
            />
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
          <div>
            <DeleteModal
              modalOpen={modalVisible.show}
              closeModal={() => setModalVisible({ id: null, show: false })}
              handleDelete={
                deleteId.length > 0 ? handleBulkDelete : handleDeleteItem
              }
              DeleteMessage={"Are you sure you want to delete?"}
            />
          </div>
        </>
      </div>{" "}
    </Fragment>
  );
};

export default ContentManagementComp;
