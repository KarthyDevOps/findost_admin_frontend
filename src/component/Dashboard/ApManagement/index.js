import React, { useState, useEffect, useCallback } from "react";
import "./style.scss";
import DeleteModal from "component/common/DeleteModal/DeleteModal";
import InputBox from "component/common/InputBox/InputBox";
import EmptyTable from "component/common/TableComp/EmptyTable";
import TableComp from "component/common/TableComp/TableComp";
import { getUserList } from "service/Auth";
import { useForm } from "react-hook-form";
import { history, debounceFunction, statusOptions, roleOptions } from "helpers";
import NormalButton from "component/common/NormalButton/NormalButton";
import { BsSearch } from "react-icons/bs";
import Loader from "component/common/Loader";

const ApManagementComp = ({ apAccess }) => {
  const { errors, control } = useForm({
    mode: "onChange",
  });

  const [data, setData] = useState([]);
  const [searchStaff, setSearchStaff] = useState("");
  const [pageCount, setPageCount] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [bulkDelete, setBulkDelete] = useState(false);
  const [deleteId, setDeleteId] = useState([]);
  const [modalVisible, setModalVisible] = useState({
    id: null,
    show: false,
  });

  const includedKeys = [
    // {
    //   label: "User Id",
    //   value: "authorizedPersonId",
    // },
    {
      label: "AP Name",
      value: "name",
      width : "40%",
    },
    {
      label: "Email Id",
      value: "email",
      width : "50%",
    },
    {
      label: "Phone Number",
      value: "mobileNumber",
      width : "30%",
    },
    {
      label: "Occupation",
      value: "role",
    },
    // {
    //   label: "Payment Status",
    //   value: "paymentDetails.paymentStatus",
    // },
    // {
    //   label: "Status",
    //   value: "isActive",
    // },
  ];

  const getApList = async (page) => {
    try {
      setIsLoading(true);
      setBulkDelete(false);

      let params = {
        page: page ? page : 1,
        limit: 10,
        search: searchStaff,
      };
      let response = await getUserList(params);
      if (response.status === 200 && response?.data?.data?.list.length > 0) {
        setData(response?.data?.data?.list);
        localStorage.setItem("noOfLists", response?.data?.data?.list.length);
        setPageCount(response?.data?.data?.pageMeta?.pageCount);
        setCurrentPage(response?.data?.data?.pageMeta?.currentPage);
      } else {
        setData([]);
      }
    } catch (e) {
      console.log("e :>> ", e);
    } finally {
      setIsLoading(false);
    }
  };

  const handleOpenModal = (id) => {
    setModalVisible({
      id: id,
      show: true,
    });
  };

  const handleDeleteItem = async () => {
    // try {
    //   if (modalVisible.show && modalVisible.id) {
    //     let params = {
    //       id: modalVisible.id,
    //     };
    //     let response = await deleteStaff(params);
    //     if (response.status === 200) {
    //       Toast({ type: "success", message: response.data.message });
    //       const activeLists = JSON.parse(localStorage.getItem("noOfLists"));
    //       if (activeLists === 1) {
    //         getStaffListApi(currentPage > 1 ? currentPage - 1 : 1);
    //         localStorage.removeItem("noOfLists");
    //       } else {
    //         getStaffListApi(currentPage);
    //         localStorage.removeItem("noOfLists");
    //       }
    //     }
    //   }
    //   setModalVisible({ show: false, id: null });
    // } catch (e) {
    //   console.log("e :>> ", e);
    // }
  };

  const handleSearchChange = useCallback(
    debounceFunction((value) => {
      setSearchStaff(value);
    }, 500),
    []
  );

  const handleBulk = (id) => {
    // if (id.length > 0) {
    //   setBulkDelete(true);
    //   deleteId.length = 0;
    //   deleteId.push(...Object.values(id));
    // } else {
    //   setBulkDelete(false);
    // }
  };

  const handleBulkDelete = async () => {
    // try {
    //   if (deleteId.length > 0) {
    //     let body = {
    //       ids: deleteId,
    //     };
    //     let response = await bulkDeleteStaff(body);
    //     if (response.status === 200) {
    //       Toast({ type: "success", message: response.data.message });
    //       const activeLists = JSON.parse(localStorage.getItem("noOfLists"));
    //       if (activeLists === deleteId.length) {
    //         getStaffListApi(currentPage > 1 ? currentPage - 1 : 1);
    //         localStorage.removeItem("noOfLists");
    //         deleteId.length = 0;
    //       } else {
    //         getStaffListApi(currentPage);
    //         localStorage.removeItem("noOfLists");
    //         deleteId.length = 0;
    //       }
    //     } else {
    //       Toast({ type: "error", message: response.data.message });
    //     }
    //   }
    // } catch (e) {
    //   console.log("e :>> ", e);
    // }
    // setModalVisible({ show: false, id: null });
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    getApList(page);
  };

  useEffect(() => {
    getApList(1);
  }, [searchStaff]);

  return (
    <>
      <div className="staff_table px-5 py-3">
        <p className="staff_title m-0">Ap Management</p>
        <div className="flex align-items-center justify-content-between">
          <div className="flex align-items-center" style={{ gap: "1em" }}>
            <div
              className="pl-0 my-3 staff_Search cursor-pointer"
              style={{ width: "300px" }}
            >
              <InputBox
                className="login_input"
                type={"text"}
                placeholder="Search by Id, Username, Email"
                errors={errors}
                name="search"
                Iconic
                value={searchStaff}
                onChange={(e) => handleSearchChange(e.target.value)}
              />
              <i className="search_iconic">
                <BsSearch size={18} style={{ color: "#7E7E7E" }} />
              </i>
            </div>
          </div>
          <div className="flex align-items-center" style={{ gap: "1em" }}>
            <div className="cursor-pointer" style={{ minWidth: "150px" }}>
              {bulkDelete && apAccess?.remove && (
                <NormalButton
                  className="authButton1"
                  label={"Delete"}
                  onClick={handleOpenModal}
                />
              )}
            </div>
          </div>
        </div>
        {isLoading ? (
          <Loader
            loading={isLoading}
            className="d-flex align-items-center justify-content-center"
          />
        ) : data.length > 0 ? (
          <div className="">
            <TableComp
              data={data}
              ReadAction={apAccess?.view}
              DeleteAction={apAccess?.remove}
              includedKeys={includedKeys}
              pageCount={pageCount}
              onPageChange={handlePageChange}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              handleOpenModal={handleOpenModal}
              onRowsSelect={handleBulk}
              editRouteName={"/admin/ap-management/view-ap-management"}
              management={true}
            />
          </div>
        ) : (
          <div className="">
            <EmptyTable
              ReadAction={apAccess?.view}
              DeleteAction={apAccess?.remove}
              includedKeys={includedKeys}
            />
            <p className="d-flex align-items-center justify-content-center mt-5 pt-5">
              No Data Available
            </p>
          </div>
        )}
        <div>
          {" "}
          <DeleteModal
            modalOpen={modalVisible.show}
            closeModal={() => setModalVisible({ id: null, show: false })}
            handleDelete={
              deleteId.length > 0 ? handleBulkDelete : handleDeleteItem
            }
            DeleteMessage={"Are you sure you want to delete Staff?"}
          />
        </div>
      </div>
    </>
  );
};

export default ApManagementComp;
