import React, { useState, useEffect, Fragment } from "react";
import TableComp from "../../common/TableComp/TableComp";
import axios from "axios";
import FormErrorMessage from "component/common/ErrorMessage";
import { useForm } from "react-hook-form";

import "./style.scss";
import DeleteModal from "component/common/DeleteModal/DeleteModal";
import { getContentList, deleteContentList } from "service/Cms";
import { Toast } from "service/toast";

const ContentManagementComp = () => {
  const { register, handleSubmit, errors, reset, setError } = useForm({
    mode: "onChange",
  });
  const [modalVisible, setModalVisible] = useState({
    id: null,
    show: false,
  });
  const [pageCount, setPageCount] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);

  const [data, setData] = useState([]);

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
    }
  };

  useEffect(() => fetchData(), []);

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
          <TableComp
            data={data}
            isCheck={false}
            // ReadAction={true}
            EditAction={true}
            DeleteAction={true}
            includedKeys={includedKeys}
            pageCount={pageCount}
            onPageChange={handlePageChange}
            setCurrentPage={setCurrentPage}
            handleOpenModal={handleOpenModal}
            editRouteName={"/admin/content-management/editcontent-management"}
          />

          <div>
            <DeleteModal
              modalOpen={modalVisible.show}
              closeModal={() => setModalVisible({ id: null, show: false })}
              handleDelete={handleDeleteItem}
              DeleteMessage={"Are you sure you want to delete Page Title?"}
            />
          </div>
        </div>
      </div>{" "}
    </Fragment>
  );
};

export default ContentManagementComp;
