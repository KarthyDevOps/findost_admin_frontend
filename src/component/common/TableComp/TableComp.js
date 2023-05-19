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
import moment from "moment";

function TableComp(props) {
  const {
    data,
    isCheck,
    EditAction,
    DeleteAction,
    ReadAction,
    includedKeys,
    pageCount,
    onPageChange,
  } = props;

  console.log("data :>> ", data);

  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 10;

  const [modalVisible, setModalVisible] = useState(false);

  const handlePageChange = (selectedPage) => {
    setCurrentPage(selectedPage.selected);
    onPageChange(selectedPage.selected + 1);
  };

  const offset = currentPage * itemsPerPage;
  const paginatedData = data.slice(
    offset,
    offset + itemsPerPage > data.length ? data.length : offset + itemsPerPage
  );
  console.log("paginatedData :>> ", paginatedData);

  const handleOpenModal = () => {
    setModalVisible(true);
  };

  const handleDeleteItem = () => {
    setModalVisible(false);
  };

  return (
    <div className="table-container">
      {data?.length > 0 && (
        <table className="data-table">
          <thead>
            <tr>
              {isCheck ? (
                <th className="checkBox_place">
                  <input type="checkbox" className="mt-2 check_box" />
                </th>
              ) : (
                <></>
              )}
              {data &&
                data.length > 0 &&
                Object.keys(data[0]).map((key) => {
                  if (includedKeys.includes(key)) {
                    return (
                      <th className="absorbing-column" key={key}>
                        {key}
                      </th>
                    );
                  }
                  return null;
                })}
              {EditAction && (
                <>
                  {EditAction && <th className="absorbing-column">Actions</th>}
                  {DeleteAction && <th className="absorbing-column"></th>}
                  {ReadAction && <th className="absorbing-column"></th>}
                </>
              )}
            </tr>
          </thead>
          <tbody>
            {data?.length > 0 &&
              data.map((obj) => {
                console.log(obj, "obj");
                return (
                  <tr key={obj.id}>
                    {isCheck && (
                      <td className="checkBox_place">
                        <input type="checkbox" className="mt-2 check_box" />
                      </td>
                    )}
                    {Object.keys(obj).map((key) => {
                      if (includedKeys.includes(key)) {
                        return (
                          <td key={key}>
                            {typeof obj[key] === "string" &&
                            moment(obj[key], moment.ISO_8601).isValid() ? (
                              moment(obj[key]).format("MMM DD YYYY hh:mm a")
                            ) : typeof obj[key] === "boolean" ? (
                              obj[key] ? (
                                <span>True</span>
                              ) : (
                                <span>False</span>
                              )
                            ) : typeof obj[key] === "object" &&
                              obj[key] instanceof File ? (
                              <img
                                src={URL.createObjectURL(obj[key])}
                                alt=""
                                style={{ maxWidth: "100px" }}
                              />
                            ) : (
                              obj[key]
                            )}
                          </td>
                        );
                      }
                      return null;
                    })}
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
                  </tr>
                );
              })}
          </tbody>
        </table>
      )}

      {data && (
        <div className="my-4">
          <ReactPaginate
            previousLabel={<FaCaretLeft />}
            nextLabel={<FaCaretRight />}
            pageCount={pageCount}
            onPageChange={handlePageChange}
            containerClassName={"pagination"}
            previousClassName={"pagination-previous"}
            nextClassName={"pagination-next"}
            pageClassName={"pagination-item"}
            breakClassName={"pagination-item"}
            activeClassName={"active_page"}
          />
        </div>
      )}
      <div>
        {" "}
        <DeleteModal
          modalOpen={modalVisible}
          closeModal={() => setModalVisible(false)}
          handleDelete={handleDeleteItem}
          DeleteMessage={"Are you sure you want to delete?"}
        />
      </div>
    </div>
  );
}

export default TableComp;
