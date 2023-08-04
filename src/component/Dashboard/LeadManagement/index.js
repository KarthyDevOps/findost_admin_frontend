import React, { useState, useEffect, Fragment, useCallback } from "react";
// styles
import "./style.scss";
// internal component
import TableComp from "../../common/TableComp/TableComp";
import InputBox from "component/common/InputBox/InputBox";
import CustomController from "component/common/Controller";
import NormalMultiSelect from "component/common/NormalMultiSelect";
import EmptyTable from "component/common/TableComp/EmptyTable";
import Loader from "component/common/Loader";
// services
import { useForm } from "react-hook-form";
import { getLead } from "service/leads";
import {
  getProductList,
} from "../../../service/Cms";
// helpers
import {
  debounceFunction,
} from "helpers";

const LeadManagementComp = ({ leadAccess }) => {
  const { register, handleSubmit, errors, control, reset, setError } = useForm({
    mode: "onChange",
  });
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [pageCount, setPageCount] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [FilterType, setFilterType] = useState("");
  const [FilterProductOption, setFilterProductOption] = useState([])
  const [modalVisible, setModalVisible] = useState({
    id: null,
    show: false,
  });

  const includedKeys = [
    {
      label: "Client Id",
      value: "clientDetails.clientCode",
      width: "30%",
    },
    {
      label: "product ",
      value: "productName",
      width: "30%",
    },
    {
      label: "Client Name",
      value: "clientDetails.clientName",
      width: "30%",
    },
    {
      label: "mobile No",
      value: "clientDetails.clientPhoneNumber",
      width: "40%",
    },
    {
      label: "E-mail",
      value: "clientDetails.clientEmail",
      width: "50%",
    },
    {
      label: "Additional Info",
      value: "aditionalInfo",
      width: "80%",

    },
  ];


  const fetchClientList = async (page) => {
    try {
      setIsLoading(true);

      let params = {
        page: page ? page : 1,
        limit: 10,
        search: search,
        productName: FilterType,
      };
      let response = await getLead(params);
      if (response.status === 200 && response?.data?.data?.list.length > 0) {
        setData(response?.data?.data?.list)
        setPageCount(response?.data?.data?.pageMeta?.pageCount);
        setCurrentPage(response?.data?.data?.pageMeta?.currentPage);
      } else {
        setData([]);
      }
    } catch (err) {
      console.log("err", err);
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


  const getProductsList = async (page) => {
    try {
      setIsLoading(true);
      let params = {
        page: page,
        limit: 10,
        search: search,
      };
      let response = await getProductList(params);
      if (response.status === 200 && response?.data?.data?.list.length > 0) {
        const filterProductName = response?.data?.data?.list;
        let productName = [];
        productName = filterProductName.map((x) => ({
          label: x.productName,
          value: x._id,
        }));
        setFilterProductOption(productName);
      } else {
        setFilterProductOption([]);
      }
    } catch (err) {
      console.log("err :>> ", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchClientList()
    getProductsList()
  }, [search, FilterType])

  return (
    <Fragment>
      <div className="staff_table px-5 py-3">
        <p className="staff-title m-0">Lead Management</p>
        <div className="flex align-items-center justify-content-between">
          <div className="flex align-items-center justify-content-between col-12" style={{ gap: "1em" }}>
            <div
              className="pl-0 my-3 cursor-pointer"
              style={{ maxWidth: "230px" }}
            >
              <InputBox
                className="login_input"
                type={"text"}
                placeholder="Search by Client Name/Id"
                name="search"
                Iconic
                Search
                value={search}
                onChange={(e) => handleSearchChange(e.target.value)}
              />
            </div>
            <div className="col-2">
              <CustomController
                name={"filter"}
                control={control}
                error={errors?.SubCategory}
                defaultValue={FilterType}
                rules={{ required: false }}
                render={({ onChange, ...fields }) => {
                  return (
                    <NormalMultiSelect
                      {...fields}
                      placeholder={"Filter by Product"}
                      options={FilterProductOption}
                      name="filter"
                      handleChange={(e, { value, label } = {}) => {
                        onChange(value);
                        setFilterType(label);
                      }}
                    />
                  );
                }}
              />
            </div>
          </div>
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
              // DeleteAction={remove}
              includedKeys={includedKeys}
              pageCount={pageCount}
              // onPageChange={handlePageChange}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              editRouteName={"/admin/lead-management/viewlead-management"}
            // handleOpenModal={handleOpenModal}
            // onRowsSelect={handleBulk}
            />
          </div>
        ) : (
          <div className="">
            <EmptyTable
              // EditAction={edit}
              DeleteAction={leadAccess?.remove}
              includedKeys={includedKeys}
            />
            <p className="d-flex align-items-center justify-content-center mt-5 pt-5">
              No Data Available
            </p>
          </div>
        )}

      </div>
    </Fragment>
  );
};

export default LeadManagementComp;
