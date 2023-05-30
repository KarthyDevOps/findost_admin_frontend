import React, { useState, useEffect, Fragment } from "react";
import TableComp from "../../common/TableComp/TableComp";
import InputBox from "component/common/InputBox/InputBox";
import { useForm } from "react-hook-form";
import NormalButton from "component/common/NormalButton/NormalButton";
import "./style.scss";
import { history } from "helpers";
import { BsSearch } from "react-icons/bs";
import DropDown from "component/common/DropDown/DropDown";
import { getStaff, deleteStaff } from "service/Auth";
import DeleteModal from "component/common/DeleteModal/DeleteModal";
import { Toast } from "service/toast";

const StaffManagementComp = () => {
  const { register, handleSubmit, errors, reset, setError } = useForm({
    mode: "onChange",
  });

  const [data, setData] = useState([]);
  const [searchStaff, setSearchStaff] = useState("");
  const [pageCount, setPageCount] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [active, setIsactive] = useState("");
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

  const getStaffList = async () => {
    let params = {
      page: currentPage,
      limit: 10,
      search: "",
    };
    let response = await getStaff(params);
    if (response.status === 200) {
      console.log("response", response?.data?.data?.list);
      setIsactive(response?.data?.data?.list[0].isactive);
      setData(response?.data?.data?.list);
      setPageCount(response?.data?.data?.pageMeta?.pageCount);
      setCurrentPage(response?.data?.data?.pageMeta?.currentPage);
    }
  };
  useEffect(() => {
    getStaffList();
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
    if (modalVisible.show && modalVisible.id) {
      let params = {
        id: modalVisible.id,
      };
      let response = await deleteStaff(params);
      if (response.status === 200) {
        Toast({ type: "success", message: response.data.message });
        getStaffList();
      }
    }
    setModalVisible({ show: false, id: null });
  };

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
                  // onChange={(e) => {
                  //   setsearch(e.target.value);
                  //   setactivePage(1);
                  // }}
                />
                <i className="search_iconic">
                  <BsSearch size={18} style={{ color: "#7E7E7E" }} />
                </i>
              </div>
              <div className="col-md-3">
                <DropDown
                  // value={value}
                  placeholder="Filter by Role"
                  // onChange={(e) => {}}
                  // options={options}
                />
              </div>

              <div className="col-md-3">
                <DropDown
                  // value={value}
                  placeholder="Filter by Status"
                  // onChange={(e) => {}}
                  // options={options}
                />
              </div>
            </div>
          </div>
          <div className="col-md-2 col-12 p-0 m-0">
            <NormalButton
              className="loginButton"
              label={"Add Staff"}
              onClick={() => history.push("/admin/staff-management/add-staff")}
            />
          </div>
        </div>
        <div className="">
          <TableComp
            data={data}
            isCheck={true}
            EditAction={true}
            DeleteAction={true}
            includedKeys={includedKeys}
            pageCount={pageCount}
            onPageChange={handlePageChange}
            setCurrentPage={setCurrentPage}
            editRouteName={"/admin/staff-management/add-staff"}
            handleOpenModal={handleOpenModal}
          />
        </div>
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
