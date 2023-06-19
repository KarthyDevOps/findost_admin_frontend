import React, { useState, useEffect, useCallback } from "react";
//styles
import "./style.scss";
//internal components
import InputBox from "component/common/InputBox/InputBox";
import TableComp from "component/common/TableComp/TableComp";
import Loader from "component/common/Loader";
import DeleteModal from "component/common/DeleteModal/DeleteModal";
import NormalButton from "component/common/NormalButton/NormalButton";
import EmptyTable from "component/common/TableComp/EmptyTable";
//service
import { bulkDeleteClient, deleteClient, getClientList } from "service/Auth";
import { Toast } from "service/toast";
//helper
import { debounceFunction } from "helpers";

const ClientsFamily = ({ create, view, edit, remove }) => {
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

  const fetchClientList = async (page) => {
    try {
      setIsLoading(true);
      setBulkDelete(false);

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
        deleteId.length = 0;
        fetchClientList(currentPage);
      }
    }
    setModalVisible({ show: false, id: null });
  };

  useEffect(() => {
    fetchClientList(currentPage);
  }, [searchStaff, role, status]);

  return (
    <div className="px-5 py-3 clients_family">
      <h6>Client’s Family</h6>
      <div className="flex justify-content-between align-items-center my-4">
        <div className="cursor-pointer" style={{ width: "300px" }}>
          <InputBox
            className="login_input Notification_input"
            type={"text"}
            value={searchStaff}
            onChange={(e) => handleSearchChange(e.target.value)}
            placeholder="Search by Id, Name, Email"
            name="search"
            Iconic
            Search
          />
        </div>
        <div className="cursor-pointer" style={{ minWidth: "150px" }}>
          {bulkDelete && (
            <NormalButton
              className="authButton1"
              label={"Delete"}
              onClick={handleOpenModal}
            />
          )}
        </div>
      </div>
      <div className="row align-items-center">
        {isLoading ? (
          <Loader
            loading={isLoading}
            className="d-flex align-items-center justify-content-center mx-auto mt-5 pt-5"
          />
        ) : data.length > 0 ? (
          <div className="mt-4 px-3">
            <TableComp
              data={data}
              EditAction={edit}
              // DeleteAction={remove}
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
          </div>
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
      </div>
      <div>
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
  );
};

export default ClientsFamily;
