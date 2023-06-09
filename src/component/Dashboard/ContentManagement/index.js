import React, { useState, useEffect, Fragment } from "react";
import TableComp from "../../common/TableComp/TableComp";
import NormalButton from "component/common/NormalButton/NormalButton";
import { history } from "helpers";

import "./style.scss";
import DeleteModal from "component/common/DeleteModal/DeleteModal";
import { getContentList, deleteContentList } from "service/Cms";
import { Toast } from "service/toast";
import Loader from "component/common/Loader";

const ContentManagementComp = ({ create, view, edit, remove }) => {
  const [modalVisible, setModalVisible] = useState({
    id: null,
    show: false,
  });
  const [pageCount, setPageCount] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);

  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const includedKeys = [
    {
      label: "Page Id",
      value: "contentId",
    },
    {
      label: "Page Status",
      value: "isActive",
    },
    {
      label: "Page Title",
      value: "title",
    },
  ];

  const fetchData = async () => {
    try {
      setIsLoading(true);

      let params = {
        page: currentPage,
        limit: 10,
        search: "",
      };
      const response = await getContentList(params);
      console.log(response.data.data.list, "response");
      setData(response?.data?.data?.list);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handlePageChange = (page) => {
    setCurrentPage(page);
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
        contentId: modalVisible.id,
      };
      console.log(params, "gg");
      let response = await deleteContentList(params);
      if (response.status === 200) {
        Toast({ type: "success", message: response.data.message });
        // deleteContentList();
        fetchData();
      }
    }
    setModalVisible({ show: false, id: null });
  };

  return (
    <Fragment>
      <div className="staff_table px-5 pt-4">
        <p className="staff_title m-0">Content Management</p>
        <div className="">
          {/* {create && */}
          <div className="float-right col-2">
            <NormalButton
              className="loginButton"
              label={"Add Content"}
              onClick={() => {
                localStorage.removeItem("editId");
                history.push(
                  "/admin/content-management/editcontent-management"
                );
              }}
            />
          </div>
          {isLoading ? (
            <Loader
              loading={isLoading}
              className="d-flex align-items-center justify-content-center"
            />
          ) : data.length > 0 ? (
            <TableComp
              data={data}
              isCheck={false}
              // ReadAction={true}
              EditAction={edit}
              DeleteAction={remove}
              includedKeys={includedKeys}
              pageCount={pageCount}
              onPageChange={handlePageChange}
              setCurrentPage={setCurrentPage}
              handleOpenModal={handleOpenModal}
              editRouteName={"/admin/content-management/editcontent-management"}
            />
          ) : (
            <div className="d-flex align-items-center justify-content-center mt-5 pt-5">
              No Data Available
            </div>
          )}
          <div>
            <DeleteModal
              modalOpen={modalVisible.show}
              closeModal={() => setModalVisible({ id: null, show: false })}
              handleDelete={handleDeleteItem}
              DeleteMessage={"Are you sure you want to delete?"}
            />
          </div>
        </div>
      </div>{" "}
    </Fragment>
  );
};

export default ContentManagementComp;
