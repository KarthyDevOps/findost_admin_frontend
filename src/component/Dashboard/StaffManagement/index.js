import React, { useState, useEffect, Fragment, useCallback } from "react";
import TableComp from "../../common/TableComp/TableComp";
import InputBox from "component/common/InputBox/InputBox";
import { useForm } from "react-hook-form";
import NormalButton from "component/common/NormalButton/NormalButton";
import "./style.scss";
import { history, debounceFunction } from "helpers";
import { BsSearch } from "react-icons/bs";
import DropDown from "component/common/DropDown/DropDown";
import { getStaffList, deleteStaff } from "service/Auth";
import DeleteModal from "component/common/DeleteModal/DeleteModal";
import { Toast } from "service/toast";
import Loader from "component/common/Loader";
import CustomController from "component/common/Controller";
import NormalMultiSelect from "component/common/NormalMultiSelect";

const StaffManagementComp = ({ create, view, edit, remove }) => {
  const { register, handleSubmit, errors, reset, control } = useForm({
    mode: "onChange",
  });

  const [data, setData] = useState([]);
  const [searchStaff, setSearchStaff] = useState("");
  const [role, setRole] = useState("");
  const [status, setStatus] = useState("");
  const [pageCount, setPageCount] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [active, setIsactive] = useState("");
  const [modalVisible, setModalVisible] = useState({
    id: null,
    show: false,
  });
  const [isLoading, setIsLoading] = useState(false);

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

  const roleOptions = [
    {
      label: "SUPER_ADMIN",
      value: "SUPER ADMIN",
    },
    {
      label: "ADMIN",
      value: "ADMIN",
    },
    {
      label: "STAFF",
      value: "STAFF",
    },
    {
      label: "SUB_Admin",
      value: "SUB ADMIN",
    },
  ];

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
      if (response.status === 200 && response?.data?.data?.list) {
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

  useEffect(() => {
    getStaffListApi(currentPage);
  }, [searchStaff, role, status]);

  const handlePageChange = (page) => {
    setCurrentPage(page.selected);
    getStaffListApi(page);
  };

  const handleOpenModal = (id) => {
    setModalVisible({
      id: id,
      show: true,
    });
  };

  const handleDeleteItem = async () => {
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
  };

  const handleSearchChange = useCallback(
    debounceFunction((value) => {
      setSearchStaff(value);
    }, 500),
    []
  );

  return (
    <Fragment>
      <div className="staff_table px-5 pt-2">
        <p className="staff_title m-0">Staff Management</p>
        <div className="row align-items-center px-3">
          <div className="col-md-10 col-12">
            <div className="row align-items-center">
              <div className="col-md-4 p-0 my-4 staff_Search">
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
              <div className="col-md-3">
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
              <div className="col-md-3">
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
          </div>
          {create && (
            <div className="col-md-2 col-12 p-0 m-0">
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
        {console.log("data :>> ", data)}
        {isLoading ? (
          <Loader
            loading={isLoading}
            className="d-flex align-items-center justify-content-center"
          />
        ) : data.length > 0 ? (
          <div className="">
            <TableComp
              data={data}
              isCheck={true}
              EditAction={edit}
              DeleteAction={remove}
              includedKeys={includedKeys}
              pageCount={pageCount}
              onPageChange={handlePageChange}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              editRouteName={"/admin/staff-management/add-staff"}
              handleOpenModal={handleOpenModal}
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
            handleDelete={handleDeleteItem}
            DeleteMessage={"Are you sure you want to delete Staff?"}
          />
        </div>
      </div>
    </Fragment>
  );
};

export default StaffManagementComp;
