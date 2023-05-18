import React, { useState } from "react";
import ReactPaginate from "react-paginate";
import "./style.scss";
import { FaCaretLeft, FaCaretRight } from "react-icons/fa";
import { RiDeleteBinLine } from "react-icons/ri";
import { MdOutlineMessage } from "react-icons/md";
import { VscEdit } from "react-icons/vsc";
import DeleteModal from "component/common/DeleteModal/DeleteModal";
import Loader from "component/common/Loader/index";
import { useEffect } from "react";

function TableComp(props) {
  const {
    data,
    itemsPerPage,
    isCheck,
    EditAction,
    DeleteAction,
    ReadAction,
    activePage,
    setactivePage,
  } = props;

  console.log("data :>> ", data);

  const [pageNumber, setPageNumber] = useState(1);
  // const pageCount = Math.ceil(data.length / itemsPerPage);
  const pageCount = data?.data?.pageMeta?.totalPages;
  // const startIndex = pageNumber * itemsPerPage;
  // const endIndex = startIndex + itemsPerPage;
  const [modalVisible, setModalVisible] = useState(false);
  const [isLoader, setIsLoader] = useState(false);

  const handleOpenModal = () => {
    setModalVisible(true);
  };

  const handleDeleteItem = () => {
    setModalVisible(false);
  };

  // const handlePageChange = ({ selected }) => {
  //   setPageNumber(selected);
  // };

  return (
    <div>
      {data?.data?.list.length > 0 && (
        <table>
          <thead>
            <tr>
              {data?.data?.list && isCheck ? (
                <th className="checkBox_place">
                  <input type="checkbox" className="mt-2 check_box" />
                </th>
              ) : (
                <></>
              )}
              {data?.data?.list &&
                data?.data?.list.length > 0 &&
                Object.keys(data?.data?.list[0]).map((key) => (
                  <th key={key}>{key}</th>
                ))}
              {EditAction && (
                <>
               
                  <th>Actions</th>
                  <th></th>
                  <th></th>
                </>
              )}
            </tr>
          </thead>
          <tbody>
            {data?.data?.list.length > 0 &&
              data?.data?.list.map((obj) => {
                return (
                  <tr>
                    {data?.data?.list && isCheck && (
                      <td className="checkBox_place">
                        <input
                          type="checkbox"
                          className="mt-2 check_box"
                          //   onClick={(e) => handleSelectAll(e)}
                          //   checked={

                          //   }
                        />
                      </td>
                    )}
                    {Object.keys(obj).map((key) => (
                      <td key={key}>{obj[key]}</td>
                    ))}
                    {EditAction && (
                      <td>
                        <VscEdit size={20} style={{ cursor: "pointer" }} />
                      </td>
                    )}
                    {DeleteAction && (
                      <td onClick={handleOpenModal}>
                        <RiDeleteBinLine
                          size={20}
                          style={{ cursor: "pointer" }}
                        />
                      </td>
                    )}
                    {ReadAction && (
                      <td onClick={handleOpenModal}>
                        <MdOutlineMessage
                          size={20}
                          style={{ cursor: "pointer" }}
                        />
                      </td>
                    )}

                    <DeleteModal
                      modalOpen={modalVisible}
                      closeModal={() => setModalVisible(false)}
                      handleDelete={handleDeleteItem}
                      DeleteMessage={"Are you sure you want to delete?"}
                    />
                  </tr>
                );
              })}
          </tbody>
        </table>
      )}
      {<Loader loading={isLoader} />}
      {!isLoader && data?.data?.list.length === 0 && (
        <div className="text-center fs-20 fw-500 my-5 py-4">
          No Data Available{" "}
        </div>
      )}
      {data?.data?.list && (
        <ReactPaginate
          previousLabel={<FaCaretLeft />}
          nextLabel={<FaCaretRight />}
          pageCount={pageCount}
          marginPagesDisplayed={2}
          pageRangeDisplayed={3}
          onPageChange={(e) => {
            setactivePage(e.selected + 1);
            // localStorage.setItem("activePage", e.selected + 1);
          }}
          // onPageChange={handlePageChange}
          containerClassName={"pagination"}
          previousClassName={"pagination-previous"}
          nextClassName={"pagination-next"}
          pageClassName={"pagination-item"}
          breakClassName={"pagination-item"}
          activeClassName={"active_page"}
          // forcePage={pageCount}
          forcePage={activePage - 1}
        />
      )}
    </div>
  );
}

export default TableComp;
