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
import ReadImg from "assets/images/ReadImg.svg";
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
    editRouteName,
    setCurrentPage,
  } = props;

  console.log("data :>> ", data);

  const [modalVisible, setModalVisible] = useState({
    id: null,
    show: false,
  });
  const [loading, setLoading] = useState(false);

  const handlePageChange = (selectedPage) => {
    setCurrentPage(selectedPage.selected);
    onPageChange(selectedPage.selected + 1);
  };

  console.log("includedKeys :>> ", includedKeys);

  // Dynamic colors for Status KeyName
  const statusColors = {
    active: "#27AE60",
    inactive: "#EB5757",
    open: "#EB5757",
    accepted: "#2F80ED",
    inprogress: "#F2C94C",
    closed: "#27AE60",
  };

  const handleOpenModal = (id) => {
    setModalVisible({
      id: id,
      show: true,
    });
  };

  // dynamic delete function
  const handleDeleteItem = () => {
    if (modalVisible.show && modalVisible.id) {
      let body = {
        productId: modalVisible.id,
      };
      // await RemoveWishList(body);
      setModalVisible({ show: false, id: null });
    }
    setModalVisible({ show: false, id: null });
  };

  useEffect(() => {
    if (data && data.length > 0) {
      setLoading(false);
    } else {
      setLoading(true);
    }
  }, [data]);

  return (
    <div className="table-container">
      {loading && (
        <Loader
          loading={loading}
          className="d-flex align-items-center justify-content-center"
        />
      )}
      {!loading && (
        <>
          {data.length === 0 ? (
            <p>No data available</p>
          ) : (
            <>
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
                    <th className="checkBox_place">Actions</th>
                    <th className="checkBox_place"></th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((obj) => {
                    return (
                      <tr key={obj.id}>
                        {isCheck && (
                          <td className="checkBox_place">
                            <input type="checkbox" className="mt-2 check_box" />
                          </td>
                        )}
                        {Object.keys(obj).map((key) => {
                          if (includedKeys.some((item) => item.value === key)) {
                            const statusKey = key.toLowerCase();
                            if (statusKey.includes("status")) {
                              const status = obj[key].toLowerCase();
                              const color = statusColors[status] || "black";
                              return (
                                <td key={key}>
                                  <span style={{ color }}>
                                    {obj[key].charAt(0).toUpperCase() +
                                      obj[key].slice(1)}
                                  </span>
                                </td>
                              );
                            } else {
                              return (
                                <td key={key}>
                                  {typeof obj[key] === "string" &&
                                  moment(
                                    obj[key],
                                    moment.ISO_8601
                                  ).isValid() ? (
                                    moment(obj[key]).format(
                                      "MMM DD YYYY hh:mm a"
                                    )
                                  ) : typeof obj[key] === "boolean" ? (
                                    obj[key] ? (
                                      <span>True</span>
                                    ) : (
                                      <span>False</span>
                                    )
                                  ) : (
                                    obj[key]
                                  )}
                                </td>
                              );
                            }
                          }
                          return null;
                        })}

                        {EditAction && (
                          <td>
                            <img
                              src={editIcon}
                              alt="Edit"
                              style={{ color: "#B4B4B4", cursor: "pointer" }}
                              onClick={() =>
                                history.push(
                                  `${editRouteName}?Editid=${obj.id}`
                                )
                              }
                            />
                          </td>
                        )}
                        {ReadAction && (
                          <td>
                            <img
                              src={ReadImg}
                              alt="read"
                              style={{ color: "#B4B4B4", cursor: "pointer" }}
                              onClick={() =>
                                history.push(
                                  `${editRouteName}?Editid=${obj.id}`
                                )
                              }
                            />
                          </td>
                        )}
                        {DeleteAction && (
                          <td onClick={() => handleOpenModal(obj.id)}>
                            <img
                              src={deleteIcon}
                              alt="delete"
                              style={{ color: "#B4B4B4", cursor: "pointer" }}
                            />
                          </td>
                        )}
                      </tr>
                    );
                  })}
                </tbody>
              </table>

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
                  modalOpen={modalVisible.show}
                  // closeModal={() => setModalVisible(false)}
                  handleDelete={handleDeleteItem}
                  DeleteMessage={"Are you sure you want to delete?"}
                />
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
}

export default TableComp;
