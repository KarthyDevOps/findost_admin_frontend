import React, { useState } from "react";
// styles
import "./style.scss";
// images
import editIcon from "assets/images/editIcon.svg";
import deleteIcon from "assets/images/deleteIcon.svg";
import ReadImg from "assets/images/ReadImg.svg";
// services
import ReactPaginate from "react-paginate";
import { FaCaretLeft, FaCaretRight } from "react-icons/fa";
import moment from "moment";
// helpers
import { history } from "helpers";

function TableComp(props) {
  const {
    data,
    EditAction,
    DeleteAction,
    ReadAction,
    includedKeys,
    pageCount,
    onPageChange,
    editRouteName,
    setCurrentPage,
    handleOpenModal,
    currentPage,
    onRowsSelect,
  } = props;

  const [selectedRows, setSelectedRows] = useState([]);
  // Dynamic colors for Status KeyName
  const statusColors = {
    active: "#27AE60",
    inactive: "#EB5757",
    open: "#EB5757",
    accepted: "#2F80ED",
    inprogress: "#F2C94C",
    closed: "#27AE60",
    failed: "#EB5757",
    success: "#27AE60",
  };

  const handlePageChange = (selectedPage) => {
    setCurrentPage(selectedPage.selected + 1);
    onPageChange(selectedPage.selected + 1);
  };

  const handleRowSelect = (rowId) => {
    let updatedRows;
    if (selectedRows.includes(rowId)) {
      updatedRows = selectedRows.filter((id) => id !== rowId);
    } else {
      updatedRows = [...selectedRows, rowId];
    }
    setSelectedRows(updatedRows);
    onRowsSelect(updatedRows);
  };

  const handleSelectAll = () => {
    let updatedRows;
    if (selectedRows.length === data.length) {
      updatedRows = [];
    } else {
      const allRowIds = data.map((obj) => obj._id);
      updatedRows = allRowIds;
    }
    setSelectedRows(updatedRows);
    onRowsSelect(updatedRows);
  };

  return (
    <div className="table-container">
      <table className="data-table">
        <thead>
          <tr>
            {DeleteAction && (
              <>
                <th className="empty_place"></th>
                <th className="checkBox_place">
                  <input
                    type="checkbox"
                    onChange={handleSelectAll}
                    checked={selectedRows.length === data.length}
                    className="mt-2 check_box"
                  />
                </th>
              </>
            )}
            {includedKeys.map((key) => {
              return (
                <>
                  <th className="" key={key}>
                    {key.label}
                  </th>
                </>
              );
            })}

            {!DeleteAction && !ReadAction ? (
              <>
                <th className="checkBox_place"> Actions</th>
                <th className="checkBox_place"></th>
              </>
            ) : (
              <>
                <th className="checkBox_place">&nbsp;&nbsp;Actions</th>
                <th className="empty_place"></th>
                <th className="empty_place"></th>
              </>
            )}
          </tr>
        </thead>

        <tbody>
          {data.map((obj) => {
            return (
              <tr key={obj.id}>
                {DeleteAction && (
                  <>
                    <td className="empty_place"></td>
                    <td className="checkBox_place">
                      <input
                        type="checkbox"
                        onChange={() => handleRowSelect(obj._id)}
                        checked={selectedRows.includes(obj._id)}
                        className="mt-2 check_box"
                      />
                    </td>
                  </>
                )}
                {includedKeys.map((item) => {
                  const key = item.value;
                  // status keys color change
                  if (obj.hasOwnProperty(key)) {
                    const value = obj[key];
                    const label = item.label;
                    const statusKey = key.toLowerCase();
                    if (statusKey.includes("status")) {
                      const status = value.toLowerCase();
                      const color = statusColors[status] || "black";
                      return (
                        <td key={key}>
                          <span style={{ color }}>
                            {value.charAt(0).toUpperCase() + value.slice(1)}
                          </span>
                        </td>
                      );
                      // for id
                    } else if (statusKey.includes("id")) {
                      return <td key={key}>{value}</td>;
                      // date and time formatter
                    } else if (statusKey.includes("ProductIcon")) {
                      return (
                        <td key={key}>
                          <img src={value} alt="" />{" "}
                        </td>
                      );
                      // date and time formatter
                    } else if (
                      moment(value, "YYYY-MM-DDTHH:mm:ss.SSSZ", true).isValid()
                    ) {
                      return (
                        <td key={key}>
                          {moment(value).format("MMM DD YYYY hh:mm a")}
                        </td>
                      );
                      // for HTML tags
                    } else if (
                      typeof value === "string" &&
                      /<[a-z][\s\S]*>/i.test(value)
                    ) {
                      const textOnlyValue = value.replace(/<[^>]+>/g, "");
                      return <td key={key}>{textOnlyValue}</td>;
                      // for boolean
                    } else {
                      return (
                        <td key={key}>
                          {typeof value === "boolean" ? (
                            value ? (
                              <span style={{ color: "#1D9E00" }}>Active</span>
                            ) : (
                              <span style={{ color: "#DD2025" }}>InActive</span>
                            )
                          ) : (
                            value
                          )}
                        </td>
                      );
                    }
                  }
                  return null;
                })}

                {EditAction && (
                  <td>
                   &nbsp;<img
                      src={editIcon}
                      alt="Edit"
                      style={{
                        color: "#B4B4B4",
                        cursor: "pointer",
                      }}
                      onClick={() => {
                        localStorage.removeItem("editId");
                        localStorage.setItem("editId", obj._id);
                        history.push(`${editRouteName}`);
                      }}
                    />
                  </td>
                )}
                {ReadAction && (
                  <td>
                    <img
                      src={ReadImg}
                      alt="read"
                      style={{
                        color: "#B4B4B4",
                        cursor: "pointer",
                      }}
                      onClick={() => {
                        localStorage.removeItem("editId");
                        localStorage.setItem("editId", obj._id);
                        history.push(`${editRouteName}`);
                      }}
                    />
                  </td>
                )}
                {DeleteAction && (
                  <>
                    <td
                      onClick={() => handleOpenModal(obj._id)}
                      className="mx-3"
                    >
                      <img
                        src={deleteIcon}
                        alt="delete"
                        style={{
                          color: "#B4B4B4",
                          cursor: "pointer",
                        }}
                      />
                    </td>
                    <td className="empty_place"></td>
                  </>
                )}
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="my-4">
        <ReactPaginate
          previousLabel={<FaCaretLeft />}
          nextLabel={<FaCaretRight />}
          pageCount={pageCount}
          onPageChange={handlePageChange}
          forcePage={currentPage - 1}
          containerClassName={"pagination"}
          previousClassName={"pagination-previous"}
          nextClassName={"pagination-next"}
          pageClassName={"pagination-item"}
          breakClassName={"pagination-item"}
          activeClassName={"active_page"}
        />
      </div>
    </div>
  );
}

export default TableComp;
