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
import editIcon from "assets/images/editIcon.svg";
import deleteIcon from "assets/images/deleteIcon.svg";
import { history } from "helpers";

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
    editRouteName,setCurrentPage
  } = props;

  console.log("data :>> ", data);

  const [modalVisible, setModalVisible] = useState(false);

  const handlePageChange = (selectedPage) => {
    setCurrentPage(selectedPage.selected);
    onPageChange(selectedPage.selected + 1);
  };

  console.log("includedKeys :>> ", includedKeys);

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
              {/* {data &&
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
                })} */}
              {includedKeys.map((key) => {
                return (
                  <>
                    <th className="absorbing-column" key={key}>
                      {key.label}
                    </th>
                  </>
                );
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
                      if (includedKeys.some((item) => item.value === key)) {
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
                        <img
                          src={editIcon}
                          alt="Edit"
                          style={{ color: "#B4B4B4", cursor: "pointer" }}
                        />
                      </td>
                    )}
                    {DeleteAction && (
                      <td onClick={handleOpenModal}>
                        <img
                          src={deleteIcon}
                          alt="delete"
                          style={{ color: "#B4B4B4", cursor: "pointer" }}
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

      {data.length > 0 && (
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
