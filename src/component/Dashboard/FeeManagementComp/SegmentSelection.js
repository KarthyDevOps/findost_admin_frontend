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
import EmptyTable from "component/common/TableComp/EmptyTable";
//service
import { Toast } from "service/toast";
//helpers
import { history, debounceFunction } from "helpers";

const SegmentSelection = ({
  create,
  view,
  edit,
  remove,
  currentPage,
  setCurrentPage,
  pageCount,
  setPageCount,
}) => {
  const { errors, control } = useForm({
    mode: "onChange",
  });

  const [data, setData] = useState([]);
  const [bulkDelete, setBulkDelete] = useState(false);
  const [deleteId, setDeleteId] = useState([]);
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState({
    id: null,
    show: false,
  });

  const includedKeys = [
    {
      label: "Id",
      value: "id",
      width: "50%",
    },

    {
      label: "Segment",
      value: "Segments",
      // width: "60%",
    },
    {
      label: "Charges",
      value: "Charges",
      // width: "60%",
    },
  ];

  const handleOpenModal = (id) => {
    setModalVisible({
      id: id,
      show: true,
    });
  };

  const fetchData = async (page) => {
    // try {
    //   setIsLoading(true);
    //   setBulkDelete(false);
    //   let params = {
    //     page: page ? page : 1,
    //     limit: 10,
    //     search: search,
    //   };
    //   let response = await getFAQList(params);
    //   if (response.status === 200 && response?.data?.data?.list.length > 0) {
    //     setData(response?.data?.data?.list);
    //     localStorage.setItem("noOfLists", response?.data?.data?.list.length);
    //     setPageCount(response?.data?.data?.pageMeta?.pageCount);
    //     setCurrentPage(response?.data?.data?.pageMeta?.currentPage);
    //   } else {
    //     setData([]);
    //   }
    // } catch (error) {
    //   console.log(error);
    // } finally {
    //   setIsLoading(false);
    // }
  };

  const handlePageChange = (page) => {
    fetchData(page);
  };

  const handleDeleteItem = async () => {
    // if (modalVisible.show && modalVisible.id) {
    //   let params = {
    //     id: modalVisible.id,
    //   };
    //   let response = await deleteFAQList(params);
    //   if (response.status === 200) {
    //     Toast({ type: "success", message: response.data.message });
    //     const activeLists = JSON.parse(localStorage.getItem("noOfLists"));
    //     if (activeLists === 1) {
    //       fetchData(currentPage > 1 ? currentPage - 1 : 1);
    //       localStorage.removeItem("noOfLists");
    //     } else {
    //       fetchData(currentPage);
    //       localStorage.removeItem("noOfLists");
    //     }
    //   }
    // }
    // setModalVisible({ show: false, id: null });
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
    // if (deleteId.length > 0) {
    //   let body = {
    //     ids: deleteId,
    //   };
    //   let response = await bulkDeleteFaq(body);
    //   if (response.status === 200) {
    //     Toast({ type: "success", message: response.data.message });
    //     const activeLists = JSON.parse(localStorage.getItem("noOfLists"));
    //     if (activeLists === deleteId.length) {
    //       fetchData(currentPage > 1 ? currentPage - 1 : 1);
    //       localStorage.removeItem("noOfLists");
    //       deleteId.length = 0;
    //     } else {
    //       fetchData(currentPage);
    //       localStorage.removeItem("noOfLists");
    //       deleteId.length = 0;
    //     }
    //   }
    // }
    // setModalVisible({ show: false, id: null });
  };

  useEffect(() => {
    if (localStorage.getItem("editPage")) {
      fetchData(localStorage.getItem("editPage"));
      localStorage.removeItem("editPage");
    } else {
      fetchData(1);
    }
  }, [search]);

  return (
    <div className="faq_head">
      <div className="d-flex align-items-center justify-content-between">
        <div className="cursor-pointer my-4">
          <InputBox
            className="login_input Notification_input"
            type={"text"}
            placeholder="Search by Id,Segment"
            name="search"
            Iconic
            Search
            value={search}
            onChange={(e) => handleSearchChange(e.target.value)}
          />
        </div>
        <div className="flex align-items-center" style={{ gap: "1em" }}>
          <div className="cursor-pointer">
            {bulkDelete && remove && (
              <NormalButton
                className="authButton1"
                label={"Delete"}
                onClick={handleOpenModal}
              />
            )}
          </div>
          {
            <div className="cursor-pointer">
              <NormalButton
                loginButton1
                label={"Add Segment"}
                onClick={() => {
                  localStorage.removeItem("editId");
                  history.push("/admin/fee-management/add-fee");
                }}
              />
            </div>
          }
        </div>
      </div>
      <div className="row align-items-center">
        {isLoading ? (
          <Loader
            loading={isLoading}
            className="d-flex align-items-center justify-content-center mx-auto mt-5 pt-5"
          />
        ) : data?.length > 0 ? (
          <div className=" px-3">
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
              editRouteName={"/admin/fee-management/add-fee"}
            />
          </div>
        ) : (
          <div className=" px-3">
            <EmptyTable
              EditAction={true}
              DeleteAction={true}
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
          DeleteMessage={"Are you sure you want to delete segment?"}
        />
      </div>
    </div>
  );
};

export default SegmentSelection;
