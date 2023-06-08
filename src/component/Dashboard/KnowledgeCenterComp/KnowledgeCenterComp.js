import React, { useState, useEffect, useCallback } from "react";
import DropDown from "component/common/DropDown/DropDown";
import InputBox from "component/common/InputBox/InputBox";
import NormalButton from "component/common/NormalButton/NormalButton";
import { history, debounceFunction } from "helpers";
import { getKnowledgeList, deleteKnowledge } from "service/Cms";
import "./style.scss";
import TableComp from "component/common/TableComp/TableComp";
import { Toast } from "service/toast";
import DeleteModal from "component/common/DeleteModal/DeleteModal";
import Loader from "component/common/Loader";

const KnowledgeCenterComp = ({ create, view, edit, remove }) => {
  const [pageCount, setPageCount] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTitle, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState({
    id: null,
    show: false,
  });
  const [active, setIsactive] = useState("");
  const [data, setData] = useState([]);

  const includedKeys = [
    {
      label: "Id",
      value: "knowledgeCenterId",
    },
    {
      label: "Status",
      value: "isActive",
    },
    {
      label: "Title",
      value: "title",
    },
    {
      label: "Category",
      value: "category",
    },
    {
      label: "Sub Category",
      value: "subCategory",
    },

    {
      label: "Description",
      value: "description",
    },
  ];

  const handleOpenModal = (id) => {
    setModalVisible({
      id: id,
      show: true,
    });
  };

  const handlePageChange = (page) => {
    setCurrentPage(page.selected);
    fetchData(page);
  };
  const fetchData = async (page) => {
    setIsLoading(true);

    try {
      let params = {
        page: page,
        limit: 10,
        search: searchTitle,
      };
      const response = await getKnowledgeList(params);
      console.log(response.data.data.list, "response");
      setIsactive(response?.data?.data?.list[0].isactive);
      setData(response?.data?.data?.list);
      setPageCount(response?.data?.data?.pageMeta?.pageCount);
      setCurrentPage(response?.data?.data?.pageMeta?.currentPage);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData(currentPage);
  }, [searchTitle]);

  const handleDeleteItem = async () => {
    if (modalVisible.show && modalVisible.id) {
      let params = {
        knowledgeCenterId: modalVisible.id,
      };
      let response = await deleteKnowledge(params);
      if (response.status === 200) {
        Toast({ type: "success", message: response.data.message });
        fetchData();
      }
    }
    setModalVisible({ show: false, id: null });
  };
  const handleSearchChange = useCallback(
    debounceFunction((value) => {
      setSearch(value);
    }, 500),
    []
  );
  return (
    <div className="px-5 py-3 knowledge_center">
      <h6>Knowledge Center</h6>
      <div className="row align-items-center">
        <div className="col-3">
          <InputBox
            className="login_input Notification_input"
            type={"text"}
            placeholder="Search by Id, Title, Email"
            name="search"
            Iconic
            Search
            value={searchTitle}
            onChange={(e) => handleSearchChange(e.target.value)}
          />
        </div>
        <div className="col-2">
          <DropDown
            // value={value}
            placeholder="Filter by Category"
            // onChange={(e) => {}}
            // options={options}
          />
        </div>
        <div className="col-2">
          <DropDown
            // value={value}
            placeholder="Filter by Sub Category"
            // onChange={(e) => {}}
            // options={options}
          />
        </div>
        <div className="col-2">
          <DropDown
            // value={value}
            placeholder="Filter by Status"
            // onChange={(e) => {}}
            // options={options}
          />
        </div>
        <div className="col-1"></div>
        {create && (
          <div className="col-2">
            <NormalButton
              className="loginButton"
              label={"Add New"}
              onClick={() => {
                localStorage.removeItem("editId");
                history.push("/admin/knowledge-center/add-knowledge");
              }}
            />
          </div>
        )}
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
              handleOpenModal={handleOpenModal}
              onPageChange={handlePageChange}
              setCurrentPage={setCurrentPage}
              editRouteName={"/admin/knowledge-center/add-knowledge"}
            />
          ) : (
            <div className="d-flex align-items-center justify-content-center mt-5 pt-5">
              No Data Available
            </div>
          )}
          <DeleteModal
            modalOpen={modalVisible.show}
            closeModal={() => setModalVisible({ id: null, show: false })}
            handleDelete={handleDeleteItem}
            DeleteMessage={"Are you sure you want to delete?"}
          />
        </div>
      </div>
    </div>
  );
};

export default KnowledgeCenterComp;
