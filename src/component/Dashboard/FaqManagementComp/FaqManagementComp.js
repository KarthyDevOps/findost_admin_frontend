import React, { useState, useEffect, useRef } from "react";
import "./style.scss";
import InputBox from "component/common/InputBox/InputBox";
import ReactSelect from "react-select";
import NormalButton from "component/common/NormalButton/NormalButton";
import { history } from "helpers";
import { getFAQList, deleteFAQList } from "service/Cms";
import DropDown from "component/common/DropDown/DropDown";
import TableComp from "component/common/TableComp/TableComp";
import { Toast } from "service/toast";
import DeleteModal from "component/common/DeleteModal/DeleteModal";

const FaqManagementComp = ({ create, view, edit, remove }) => {
  const [pageCount, setPageCount] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [data, setData] = useState([]);
  const [active, setIsactive] = useState("");

  const [modalVisible, setModalVisible] = useState({
    id: null,
    show: false,
  });
  const handleOpenModal = (id) => {
    setModalVisible({
      id: id,
      show: true,
    });
  };
  const fetchData = async () => {
    try {
      let params = {
        page: currentPage,
        limit: 10,
        search: "",
      };
      const response = await getFAQList(params);
      setIsactive(response?.data?.data?.list[0].isactive);
      setData(response?.data?.data?.list);
      setPageCount(response?.data?.data?.pageMeta?.pageCount);
      setCurrentPage(response?.data?.data?.pageMeta?.currentPage);
    } catch (error) {
      console.log(error);
    }
  };

  const includedKeys = [
    {
      label: "Id",
      value: "faqId",
    },
    {
      label: "Status",
      value: "isActive",
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
      label: "FAQ Title",
      value: "title",
    },
    {
      label: "FAQ Answer",
      value: "answer",
    },
  ];
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    fetchData();
  }, [setData]);

  const handleDeleteItem = async () => {
    if (modalVisible.show && modalVisible.id) {
      let params = {
        faqId: modalVisible.id,
      };
      let response = await deleteFAQList(params);
      if (response.status === 200) {
        Toast({ type: "success", message: response.data.message });
        fetchData();
      }
    }
    setModalVisible({ show: false, id: null });
  };

  return (
    <div className="faq_head px-5 py-3">
      <h6>FAQ Management</h6>
      <div className="row align-items-center">
        <div className="col-3">
          <InputBox
            className="login_input Notification_input"
            type={"text"}
            placeholder="Search by Id, Title"
            name="search"
            Iconic
            Search
          // value={search}
          // onChange={(e) => {
          //   setsearch(e.target.value);
          //   setactivePage(1);
          // }}
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
          // options={options}s
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
        {create && <div className="col-2">
          <NormalButton
            className="loginButton"
            label={"Add New FAQ"}
            onClick={() => {
              localStorage.removeItem("editId");
              history.push("/admin/faq-management/add-faq");
            }}
          />
        </div>}
        <div className=" mt-4 p-3">
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
            editRouteName={"/admin/faq-management/add-faq"}
          />
        </div>
        <DeleteModal
          modalOpen={modalVisible.show}
          closeModal={() => setModalVisible({ id: null, show: false })}
          handleDelete={handleDeleteItem}
          DeleteMessage={"Are you sure you want to delete ?"}
        />
      </div>
    </div>
  );
};

export default FaqManagementComp;
