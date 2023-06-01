import React, { useState } from "react";
import ReactPaginate from "react-paginate";
import "./style.scss";
import { FaCaretLeft, FaCaretRight } from "react-icons/fa";
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
    handleOpenModal,
  } = props;

  console.log("data :>> ", data);

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
    failed: "#EB5757",
    success: "#27AE60",
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
                    {includedKeys.map((key) => {
                      return (
                        <>
                          <th className="absorbing-column" key={key}>
                            {key.label}
                          </th>
                        </>
                      );
                    })}

                    {!DeleteAction && !EditAction ? null : !DeleteAction ? (
                      <th className="checkBox_place"></th>
                    ) : (
                      <>
                        <th className="checkBox_place">Actions</th>
                        <th className="checkBox_place"></th>
                      </>
                    )}
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
                        {includedKeys.map((item) => {
                          const key = item.value;
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
                                    {value.charAt(0).toUpperCase() +
                                      value.slice(1)}
                                  </span>
                                </td>
                              );
                            } else if (statusKey.includes("date")) {
                              return <td key={key}>{value}</td>;
                            } else {
                              return (
                                <td key={key}>
                                  {typeof value === "boolean" ? (
                                    value ? (
                                      <span style={{ color: "#1D9E00" }}>
                                        Active
                                      </span>
                                    ) : (
                                      <span style={{ color: "#DD2025" }}>
                                        InActive
                                      </span>
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

                        {/* {includedKeys.map((item) => {
                          const key = item.value;
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
                                    {value.charAt(0).toUpperCase() +
                                      value.slice(1)}
                                  </span>
                                </td>
                              );
                            } else {
                              return (
                                <td key={key}>
                                  {typeof value === "string" &&
                                  moment(value, moment.ISO_8601).isValid() ? (
                                    moment(value).format("MMM DD YYYY hh:mm a")
                                  ) : typeof value === "boolean" ? (
                                    value ? (
                                      <span>True</span>
                                    ) : (
                                      <span>False</span>
                                    )
                                  ) : (
                                    value
                                  )}
                                </td>
                              );
                            }
                          }
                          return null;
                        })} */}

                        {EditAction && (
                          <td>
                            <img
                              src={editIcon}
                              alt="Edit"
                              style={{ color: "#B4B4B4", cursor: "pointer" }}
                              onClick={() =>
                                history.push(
                                  `${editRouteName}?Editid=${obj._id}`
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
                                  `${editRouteName}?Editid=${obj._id}`
                                )
                              }
                            />
                          </td>
                        )}
                        {DeleteAction && (
                          <td onClick={() => handleOpenModal(obj._id)}>
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
            </>
          )}
        </>
      )}
    </div>
  );
}

export default TableComp;
