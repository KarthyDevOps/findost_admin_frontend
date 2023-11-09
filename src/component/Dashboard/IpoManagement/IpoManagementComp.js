import React, { useState, useEffect, Fragment } from "react";
import "./style.scss";
import EmptyTable from "component/common/TableComp/EmptyTable";
import TableComp from "component/common/TableComp/TableComp";
import Loader from "component/common/Loader";
import { getIpoList } from "service/leads";

const IpoManagementComp = ({ipoManagement }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);

  const includedKeys = [
    { label: "Symbol", value: "symbol" },
    { label: "Name", value: "name" },
    { label: "Start Date", value: "biddingStartDate" },
    { label: "End Date", value: "biddingEndDate" },
  ];

  const fetchData = async (page) => { 
    try {
      setIsLoading(true);
      let params = {};
      let response = await getIpoList(params);
      if (response.status === 200) {
        setData(response?.data?.data);
      } else {
        setData([]);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <div className="ipo px-5 py-3">
        <p className="ipo_title m-0">IPO Management</p>
        <div className="my-5">
          {isLoading ? (
            <Loader
              loading={isLoading}
              className="d-flex align-items-center justify-content-center"
            />
          ) : data.length > 0 ? (
            <TableComp
              data={data}
              EditAction={ipoManagement?.edit}
              includedKeys={includedKeys}
              isPagination={true}
              editRouteName={"/admin/ipo-management/edit-ipo"}
              isIpo={true}
            />
          ) : (
            <div className="">
              <EmptyTable
                EditAction={ipoManagement?.edit}
                includedKeys={includedKeys}
              />
              <p className="d-flex align-items-center justify-content-center mt-5 pt-5">
                No Data Available
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default IpoManagementComp;
