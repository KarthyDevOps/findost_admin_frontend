import React, { useState, useEffect, useCallback } from "react";
// styles
import "./style.scss";
// internal components
import Loader from "component/common/Loader";
import CustomController from "component/common/Controller";
import NormalMultiSelect from "component/common/NormalMultiSelect";
import TableComp from "../../common/TableComp/TableComp";
import InputBox from "component/common/InputBox/InputBox";
import DeleteModal from "component/common/DeleteModal/DeleteModal";
import NormalButton from "component/common/NormalButton/NormalButton";
// services
import { useForm } from "react-hook-form";
import { BsSearch } from "react-icons/bs";
import { getStaffList, deleteStaff, bulkDeleteStaff } from "service/Auth";
// helpers
import { history, debounceFunction, statusOptions, roleOptions } from "helpers";
import { Toast } from "service/toast";

const StaffManagementComp = ({ create, view, edit, remove }) => {
  const { errors, control } = useForm({
    mode: "onChange",
  });

  const [data, setData] = useState([]);
  const [searchStaff, setSearchStaff] = useState("");
  const [role, setRole] = useState("");
  const [status, setStatus] = useState("");
  const [pageCount, setPageCount] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [active, setIsactive] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [bulkDelete, setBulkDelete] = useState(false);
  const [deleteId, setDeleteId] = useState([]);
  const [modalVisible, setModalVisible] = useState({
    id: null,
    show: false,
  });

  const includedKeys = [
    {
      label: "User Id",
      value: "adminId",
    },
    {
      label: "Username",
      value: "name",
    },
    {
      label: "Email Id",
      value: "email",
    },
    {
      label: "Role Name",
      value: "role",
    },
    {
      label: "Status",
      value: "isActive",
    },
  ];

  const getStaffListApi = async (page) => {
    try {
      setIsLoading(true);
      setBulkDelete(false);

      let params = {
        page: page,
        limit: 10,
        search: searchStaff,
        role: role,
      };
      if (status) {
        status === "active"
          ? (params.isActive = true)
          : (params.isActive = false);
      }
      let response = await getStaffList(params);
      if (response.status === 200 && response?.data?.data?.list.length > 0) {
        setIsactive(response?.data?.data?.list[0].isactive);
        setData(response?.data?.data?.list);
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

  const handlePageChange = (page) => {
    setCurrentPage(page);
    getStaffListApi(page);
  };

  const handleOpenModal = (id) => {
    setModalVisible({
      id: id,
      show: true,
    });
  };

  const handleDeleteItem = async () => {
    try {
      if (modalVisible.show && modalVisible.id) {
        let params = {
          id: modalVisible.id,
        };
        let response = await deleteStaff(params);
        if (response.status === 200) {
          Toast({ type: "success", message: response.data.message });
          getStaffListApi(currentPage);
        }
      }
      setModalVisible({ show: false, id: null });
    } catch (e) {
      console.log("e :>> ", e);
    }
  };

  const handleSearchChange = useCallback(
    debounceFunction((value) => {
      setSearchStaff(value);
    }, 500),
    []
  );

  const handleBulk = (id) => {
    if (id.length > 0) {
      setBulkDelete(true);
      deleteId.length = 0;
      deleteId.push(...Object.values(id));
    } else {
      setBulkDelete(false);
    }
  };

  const handleBulkDelete = async () => {
    try {
      if (deleteId.length > 0) {
        let body = {
          ids: deleteId,
        };
        let response = await bulkDeleteStaff(body);
        if (response.status === 200) {
          Toast({ type: "success", message: response.data.message });
          getStaffListApi(currentPage);
        } else {
          Toast({ type: "error", message: response.data.message });
        }
      }
    } catch (e) {
      console.log("e :>> ", e);
    }
    setModalVisible({ show: false, id: null });
  };

  useEffect(() => {
    getStaffListApi(currentPage);
  }, [searchStaff, role, status]);

  return (
    <>
      <div className="staff_table px-5 py-3">
        <p className="staff_title m-0">Staff Management</p>
        <div className="flex align-items-center justify-content-between">
          <div className="flex align-items-center" style={{ gap: "1em" }}>
            <div
              className="pl-0 my-4 staff_Search cursor-pointer"
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
            <div style={{ width: "150px" }}>
              <CustomController
                name={"role"}
                control={control}
                error={errors?.role}
                defaultValue={role}
                rules={{ required: false }}
                render={({ onChange, ...fields }) => {
                  return (
                    <NormalMultiSelect
                      {...fields}
                      placeholder={"Select Role"}
                      options={roleOptions}
                      name="role"
                      handleChange={(e, { value } = {}) => {
                        onChange(value);
                        setRole(value);
                      }}
                    />
                  );
                }}
              />
            </div>
            <div style={{ width: "150px" }}>
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
          </div>
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
                  className="loginButton"
                  label={"Add Staff"}
                  onClick={() => {
                    localStorage.removeItem("editId");
                    history.push("/admin/staff-management/add-staff");
                  }}
                />
              </div>
            )}
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
              EditAction={edit}
              DeleteAction={remove}
              includedKeys={includedKeys}
              pageCount={pageCount}
              onPageChange={handlePageChange}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              editRouteName={"/admin/staff-management/add-staff"}
              handleOpenModal={handleOpenModal}
              onRowsSelect={handleBulk}
            />
          </div>
        ) : (
          <div className="d-flex align-items-center justify-content-center mt-5 pt-5">
            No Data Available
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

export default StaffManagementComp;
