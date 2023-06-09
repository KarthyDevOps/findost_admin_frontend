import React, { useState, useEffect, useCallback } from "react";
import "./style.scss";
import { bulkDeleteClient, deleteClient, getClientList } from "service/Auth";
import Loader from "component/common/Loader";
import { debounceFunction } from "helpers";
import NormalMultiSelect from "component/common/NormalMultiSelect";
import CustomController from "component/common/Controller";
import { useForm } from "react-hook-form";
import DeleteModal from "component/common/DeleteModal/DeleteModal";
import { Toast } from "service/toast";
import NormalButton from "component/common/NormalButton/NormalButton";

import InputBox from "component/common/InputBox/InputBox";
import TableComp from "component/common/TableComp/TableComp";
// import { debounceFunction } from "helpers/debounce";
const ClientsFamily = ({ create, view, edit, remove }) => {
  const { register, handleSubmit, errors, reset, control } = useForm({
    mode: "onChange",
  });

  const [pageCount, setPageCount] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchStaff, setSearchStaff] = useState("");
  const [role, setRole] = useState("");
  const [status, setStatus] = useState("");
  const [bulkDelete, setBulkDelete] = useState(false);
  const [deleteId, setDeleteId] = useState([]);
  const [modalVisible, setModalVisible] = useState({
    id: null,
    show: false,
  });
  const includedKeys = [
    {
      label: "Client Id",
      value: "clientId",
    },
    {
      label: "Client Name",
      value: "clientName",
    },
    {
      label: "Email Id",
      value: "email",
    },
    {
      label: "Date of Birth",
      value: "dateOfBirth",
    },
    {
      label: "Relative Name",
      value: "relativeName",
    },
    {
      label: "Relationship",
      value: "relationShip",
    },
  ];

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

  const fetchClientList = async (page) => {
    setIsLoading(true);

    try {
      let params = {
        page: page,
        limit: 10,
        search: searchStaff,
      };
      let response = await getClientList(params);
      if (response.status === 200 && response?.data?.data?.list) {
        console.log("response", response?.data?.data);
        setData(response?.data?.data?.list);
        setPageCount(response?.data?.data?.pageMeta?.pageCount);
        setCurrentPage(response?.data?.data?.pageMeta?.currentPage);
      } else {
        setData([]);
      }
    } catch (err) {
      console.log("err", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchClientList(currentPage);
  }, [searchStaff, role, status]);

  const handlePageChange = (page) => {
    setCurrentPage(page.selected);
    fetchClientList(page);
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
      let response = await deleteClient(params);
      if (response.status === 200) {
        Toast({ type: "success", message: response.data.message });
        fetchClientList(currentPage);
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
      let response = await bulkDeleteClient(body);
      if (response.status === 200) {
        Toast({ type: "success", message: response.data.message });
        fetchClientList(currentPage);
      }
    }
  };

  return (
    <div className="px-5 py-3 clients_family">
      <h6>Client’s Family</h6>
      <div className="row align-items-center">
        <div className="col-4">
          <InputBox
            className="login_input Notification_input"
            type={"text"}
            value={searchStaff}
            onChange={(e) => handleSearchChange(e.target.value)}
            placeholder="Search by Id, Username, Email"
            name="search"
            Iconic
            Search
          />
        </div>
        <div className="col-md-2">
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
                  placeholder={"Filter by Role"}
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
        <div className="col-md-2">
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
                  placeholder={"Filter by Status"}
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
        <div className="col-2"></div>
        <div className="col-md-2">
            {bulkDelete && (
              <NormalButton
                className="authButton1"
                label={"Delete"}
                onClick={handleBulkDelete}
              />
            )}
          </div>
      </div>
      <div className=" mt-4 p-3">
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
            currentPage={currentPage}
            setBulkDelete={setBulkDelete}
            handleOpenModal={handleOpenModal}
            onRowsSelect={handleBulk}
            onPageChange={handlePageChange}
            setCurrentPage={setCurrentPage}
            editRouteName={"/admin/clients-family/edit-client"}
          />
        ) : (
          <div className="d-flex align-items-center justify-content-center ">
            No Data Available
          </div>
        )}
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
  );
};

export default ClientsFamily;
