import React, { useState } from "react";
import ReactPaginate from "react-paginate";
import "./style.scss";
import { FaCaretLeft, FaCaretRight } from "react-icons/fa";

function TableComp(props) {
  const { data, itemsPerPage, isCheck } = props;

  const [pageNumber, setPageNumber] = useState(0);
  const pageCount = Math.ceil(data.length / itemsPerPage);
  const startIndex = pageNumber * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const handlePageChange = ({ selected }) => {
    setPageNumber(selected);
  };

  return (
    <div>
      {data ? (
        <table style={{width: "100%"}}>
          <thead className="table_heading">
            <tr>
              {isCheck && (
                <th className="checkBox_place">
                  <input
                    type="checkbox"
                    className="mt-2"
                    //   onClick={(e) => handleSelectAll(e)}
                    //   checked={

                    //   }
                  />
                </th>
              )}
              {data &&
                data.length > 0 &&
                Object.keys(data[0]).map((key) => <th key={key}>{key}</th>)}
            </tr>
          </thead>
          <tbody>
            {data.slice(startIndex, endIndex).map((obj) => {
              return (
                <tr className="row_box">
                  {isCheck && (
                    <td className="checkBox_place">
                      <input
                        type="checkbox"
                        className="mt-2"
                        //   onClick={(e) => handleSelectAll(e)}
                        //   checked={

                        //   }
                      />
                    </td>
                  )}
                  {Object.keys(obj).map((key) => (
                    <td key={key}>{obj[key]}</td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      ) : (
        <p>No Data Available </p>
      )}
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
        forcePage={pageNumber}
      />
    </div>
  );
}

export default TableComp;
