import React, { useState } from "react";
// styles
import "./style.scss";
// images
import editIcon from "assets/images/editIcon.svg";
import deleteIcon from "assets/images/deleteIcon.svg";
import ReadImg from "assets/images/ReadImg.svg";
import viewIcon from "assets/images/viewIcon.svg";
// services
import ReactPaginate from "react-paginate";
import { FaCaretLeft, FaCaretRight } from "react-icons/fa";
import { Tooltip } from "antd";
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
    calmanagement = false,
    management = false,
    client = false,
    isPagination
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
    PENDING: "#EB5757",
    COMPLETED: "#27AE60",
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

  const getValueForKey = (key, obj) => {
    const nestedKeys = key.split(".");
    let value = obj;
    for (const nestedKey of nestedKeys) {
      if (value.hasOwnProperty(nestedKey)) {
        value = value[nestedKey];
      } else {
        return (value = "-");
      }
    }
    if (
      nestedKeys.includes("familyMember") &&
      typeof value === "string" &&
      moment(value, "YYYY-MM-DDTHH:mm:ss.SSSZ", true).isValid()
    ) {
      return moment(value).format("MMM DD YYYY");
    } else {
      return value;
    }
  };

  return (
    <div className="table-container">
      <table className="data-table">
        <thead>
          <tr>
            {DeleteAction && (
              <th className="checkBox_place">
                <input
                  type="checkbox"
                  onChange={handleSelectAll}
                  checked={selectedRows.length === data.length}
                  className="check_box cursor-pointer"
                />
              </th>
            )}
            {includedKeys.map((key) => {
              return (
                <>
                  <th
                    className=""
                    key={key}
                    style={{ ...(key?.width ? { width: key?.width } : {}) }}
                  >
                    {key.label}
                  </th>
                </>
              );
            })}

            {(DeleteAction || ReadAction || EditAction) && (
              <th className="action_place"> Actions</th>
            )}
          </tr>
        </thead>

        <tbody>
          {data.map((obj) => {
            return (
              <tr key={obj.id}>
                {DeleteAction && (
                  <td className="checkBox_place">
                    <input
                      type="checkbox"
                      onChange={() => handleRowSelect(obj._id)}
                      checked={selectedRows.includes(obj._id)}
                      className="check_box cursor-pointer"
                    />
                  </td>
                )}
                {includedKeys.map((item) => {
                  const key = item.value;
                  const value = getValueForKey(key, obj);
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
                    } else if (statusKey.includes("aditionalinfo")) {
                      return (
                        <Tooltip title={value} color={"#fff"} key={"#fff"}>
                          <td key={key}>{value}</td>
                        </Tooltip>
                      );
                    } else if (statusKey.includes("id")) {
                      return <td key={key}>{value}</td>;
                    } else if (
                      calmanagement &&
                      statusKey.includes("description")
                    ) {
                      return (
                        <td key={key}>
                          <a href={value} target="_blank">
                            {value}
                          </a>
                        </td>
                      );
                    } else if (statusKey.includes("type")) {
                      return (
                        <td key={key}>
                          {value.charAt(0).toUpperCase() + value.slice(1)}
                        </td>
                      );
                    } else if (statusKey.includes("producticons3")) {
                      return (
                        <td key={key}>
                          <a href={value} target="_blank">
                            <img src={value} alt={value} className="img" />{" "}
                          </a>
                        </td>
                      );
                    } else if (statusKey.includes("imageurls3")) {
                      return (
                        <td key={key}>
                          <a href={value} target="_blank">
                            <img src={value} alt={value} className="img" />{" "}
                          </a>
                        </td>
                      );
                      // date formatter
                    } else if (statusKey === "date") {
                      return (
                        <td key={key}>{moment(value).format("MMM DD YYYY")}</td>
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
                              <span style={{ color: "#DD2025" }}>Inactive</span>
                            )
                          ) : (
                            value
                          )}
                        </td>
                      );
                    }
                  }
                  return <td key={key}>{value}</td>;
                })}
                {(DeleteAction || ReadAction || EditAction) && (
                  <td>
                    <span className="actions">
                      {EditAction && (
                        <img
                          src={editIcon}
                          alt="Edit"
                          style={{
                            color: "#B4B4B4",
                            cursor: "pointer",
                          }}
                          onClick={() => {
                            localStorage.removeItem("editId");
                            localStorage.setItem("editId", obj._id);
                            {
                              client &&
                                localStorage.setItem(
                                  "clientId",
                                  obj.familyMember._id
                                );
                            }
                            localStorage.removeItem("editPage");
                            localStorage.setItem("editPage", currentPage ? currentPage : 1);
                            history.push(`${editRouteName}`);
                          }}
                        />
                      )}
                      {ReadAction && (
                        <img
                          src={management ? viewIcon : ReadImg}
                          alt="read"
                          style={{
                            color: "#B4B4B4",
                            cursor: "pointer",
                          }}
                          onClick={() => {
                            localStorage.removeItem("viewId");
                            localStorage.setItem("viewId", obj._id);
                            history.push(`${editRouteName}`);
                          }}
                        />
                      )}
                      {!management && DeleteAction && (
                        <img
                          onClick={() => handleOpenModal(obj._id)}
                          src={deleteIcon}
                          alt="delete"
                          style={{
                            color: "#B4B4B4",
                            cursor: "pointer",
                          }}
                        />
                      )}
                    </span>
                  </td>
                )}
              </tr>
            );
          })}
        </tbody>
        {console.log(management, "mana")}
      </table>
      {isPagination ? (
        <></>
      ) : (
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
      )}
    </div>
  );
}

export default TableComp;
