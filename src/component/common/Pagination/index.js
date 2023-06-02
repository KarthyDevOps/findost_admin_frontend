import React, { useState } from "react";
import ReactPaginate from "react-paginate";
import pageNext from "assets/icons/pageNext.svg";
import pageBack from "assets/icons/pageBack.svg";
import "./pagination.scss";
import { history } from "component/Dashboard/ProductManagement/helpers";
export default function PaginationComponent(props) {
  let {
    paginationShow = true,
    paginationConfig,
    paginationChange,
    handlePageSize,
    isUploadPage = false,
    pageNumber = "",
    active,
  } = props;

  const handlePageChange = (pageNumber) => {
    paginationChange(pageNumber);
  };

  return (
    <>
      {/* {console.log(paginationConfig?.page, "page")} */}
      <ReactPaginate
        previousLabel={<img src={pageBack} width={25} />}
        nextLabel={<img src={pageNext} width={25} />}
        pageCount={paginationConfig?.totalPages ?? 1}
        marginPagesDisplayed={2}
        pageRangeDisplayed={3}
        onPageChange={(e) => handlePageChange(e.selected + 1)}
        containerClassName={"pagination-buttons"}
        previousClassName={"previous-button"}
        nextClassName={"next-button"}
        disabledClassName={"disabled-button"}
        activeClassName={"pagination-active"}
        forcePage={active ? active - 1 : null}
      />
    </>
  );
}
