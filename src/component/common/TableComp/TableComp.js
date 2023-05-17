import React, { useState } from "react";
import ReactPaginate from "react-paginate";
import "./style.scss";
import { FaCaretLeft, FaCaretRight } from "react-icons/fa";
import { RiDeleteBinLine } from "react-icons/ri";
import { VscEdit } from "react-icons/vsc";
import DeleteModal from "component/common/DeleteModal/DeleteModal";

function TableComp(props) {
  const { data, itemsPerPage, isCheck, actions } = props;

  console.log("data :>> ", data);

  const [pageNumber, setPageNumber] = useState(0);
  const pageCount = Math.ceil(data.length / itemsPerPage);
  const startIndex = pageNumber * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const [modalVisible, setModalVisible] = useState(false);

  const handleOpenModal = () => {
    setModalVisible(true);
  };

  const handleDeleteItem = () => {
    setModalVisible(false);
  };

  const handlePageChange = ({ selected }) => {
    setPageNumber(selected);
  };

  return (
    <div>
      {data.length > 0 ? (
        <table>
          <thead>
            <tr>
              {data.length > 0 && isCheck ? (
                <th className="checkBox_place">
                  <input
                    type="checkbox"
                    className="mt-2"
                    //   onClick={(e) => handleSelectAll(e)}
                    //   checked={

                    //   }
                  />
                </th>
              ) : (
                ""
              )}
              {data &&
                data.length > 0 &&
                Object.keys(data[0]).map((key) => (
                  <>
                    <th key={key}>{key}</th>
                  </>
                ))}
              {actions && (
                <>
                  <th>Actions</th>
                  <th></th>
                </>
              )}
            </tr>
          </thead>
          <tbody>
            {data.length > 0 &&
              data.slice(startIndex, endIndex).map((obj) => {
                return (
                  <tr>
                    {data && isCheck && (
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
                    {actions && (
                      <>
                        <td>
                          <VscEdit size={20} style={{cursor : "pointer"}} />
                        </td>
                        <td onClick={handleOpenModal}>
                          <RiDeleteBinLine size={20} style={{cursor : "pointer"}} />
                        </td>
                        <DeleteModal
                          modalOpen={modalVisible}
                          closeModal={() => setModalVisible(false)}
                          handleDelete={handleDeleteItem}
                          DeleteMessage={"Are you sure you want to delete?"}
                        />
                      </>
                    )}
                  </tr>
                );
              })}
          </tbody>
        </table>
      ) : (
        <p>No Data Available </p>
      )}
      {data && (
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
      )}
    </div>
  );
}

export default TableComp;
