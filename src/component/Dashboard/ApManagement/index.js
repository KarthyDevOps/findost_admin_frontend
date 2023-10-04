import React, { useState, useEffect, useCallback } from "react";
// styles
import "./style.scss";
// internal components
import InputBox from "component/common/InputBox/InputBox";
import EmptyTable from "component/common/TableComp/EmptyTable";
import TableComp from "component/common/TableComp/TableComp";
import Loader from "component/common/Loader";
// services
import { getUserList } from "service/Auth";
import { BsSearch } from "react-icons/bs";
import { useForm } from "react-hook-form";
// helpers
import { debounceFunction } from "helpers";

const ApManagementComp = ({ apAccess }) => {
  const { errors, control } = useForm({
    mode: "onChange",
  });

  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [pageCount, setPageCount] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const includedKeys = [
    {
      label: "AP Name",
      value: "name",
      width: "40%",
    },
    {
      label: "Email Id",
      value: "email",
      width: "50%",
    },
    {
      label: "Phone Number",
      value: "mobileNumber",
      width: "30%",
    },
    {
      label: "Occupation",
      value: "role",
    },
  ];

  const getApList = async (page) => {
    try {
      setIsLoading(true);

      let params = {
        page: page ? page : 1,
        limit: 10,
        search: search,
      };
      let response = await getUserList(params);
      if (response.status === 200 && response?.data?.data?.list.length > 0) {
        setData(response?.data?.data?.list);
        setPageCount(response?.data?.data?.pageMeta?.pageCount);
        setCurrentPage(response?.data?.data?.pageMeta?.currentPage);
      } else {
        setData([]);
      }
    } catch (e) {
      console.log("e :>> ", e);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearchChange = useCallback(
    debounceFunction((value) => {
      setSearch(value);
    }, 500),
    []
  );

  const handlePageChange = (page) => {
    setCurrentPage(page);
    getApList(page);
  };

  useEffect(() => {
    getApList(1);
  }, [search]);

  return (
    <>
      <div className="staff_table px-5 py-3">
        <p className="staff_title m-0">AP Management</p>
        <div className="flex align-items-center justify-content-between">
          <div className="flex align-items-center" style={{ gap: "1em" }}>
            <div
              className="pl-0 my-3 staff_Search cursor-pointer"
              style={{ width: "300px" }}
            >
              <InputBox
                className="login_input"
                type={"text"}
                placeholder="Search by Username, Email"
                errors={errors}
                name="search"
                Iconic
                value={search}
                onChange={(e) => handleSearchChange(e.target.value)}
              />
              <i className="search_iconic">
                <BsSearch size={18} style={{ color: "#7E7E7E" }} />
              </i>
            </div>
          </div>
          <div className="flex align-items-center" style={{ gap: "1em" }}></div>
        </div>
        {isLoading ? (
          <Loader
            loading={isLoading}
            className="d-flex align-items-center justify-content-center"
          />
        ) : data.length > 0 ? (
          <div className="">
            <TableComp
              data={data}
              ReadAction={apAccess?.view}
              includedKeys={includedKeys}
              pageCount={pageCount}
              onPageChange={handlePageChange}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              editRouteName={"/admin/ap-management/view-ap-management"}
              management={true}
            />
          </div>
        ) : (
          <div className="">
            <EmptyTable
              ReadAction={apAccess?.view}
              includedKeys={includedKeys}
            />
            <p className="d-flex align-items-center justify-content-center mt-5 pt-5">
              No Data Available
            </p>
          </div>
        )}
      </div>
    </>
  );
};

export default ApManagementComp;
