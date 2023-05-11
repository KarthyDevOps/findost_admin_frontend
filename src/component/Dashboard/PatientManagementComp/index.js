import React, { useState, useEffect } from "react";
import { Table, Dropdown, Button } from "react-bootstrap";
import { FaEllipsisH } from "react-icons/fa";
import { FiEye } from "react-icons/fi";
import { BiEditAlt } from "react-icons/bi";
import { history } from "helpers";
import NormalMultiSelect from "component/common/NormalMultiSelect";
import "./style.scss";
import { TextField, IconButton } from "@material-ui/core";
import { SearchOutlined } from "@material-ui/icons";
import PaginationComponent from "component/common/Pagination";
import Loader from "component/common/Loader";
import NoData from "component/common/NoData";
import NormalButton from "component/common/NormalButton/NormalButton";

const PatientManagementComp = ({
  privileges,
  privilegesData,
  headerText,
  isFkhb = false,
}) => {
  const [patientList, setPatientList] = useState([]);
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(10);
  const [type, setType] = useState("");
  const [paginationConfig, setPaginationConfig] = useState(null);
  const [loading, setLoading] = useState(false);
  const [searchPatientDisplayId, setSearchPatientDisplayId] = useState("");
  const [patientTypeFilter, setPatientTypeFilter] = useState([]);

  const handleType = async (e) => {
    setType(e?.target?.value);
  };

  return (
    <>
      <div className="patient-section">
        <div className="patient-main-container">
          <div className="col-12">
            <div className="d-flex">
              <div className="col-9 mx-0 px-0">
                <div className="p-3">
                  <h3 className="sectionHead">{headerText}</h3>
                </div>
                <div className="d-flex align-items-start justify-content-start">
                  {privileges?.create && (
                    <div className="col-3 p-1 m-1">
                      <NormalButton
                        btnSecondary
                        label={"Register User"}
                        onClick={() => history.push("/admin/user-register")}
                        className=""
                      ></NormalButton>
                    </div>
                  )}

                  <div
                    className={
                      privilegesData?.roleName !== "HealthBuddy"
                        ? "col-9"
                        : "col-12"
                    }
                  >
                    <div className="d-flex align-items-center justify-content-start pt-1">
                      <div className="col-4 patient-action">
                        <TextField
                          id="staff-search-id"
                          variant="outlined"
                          placeholder="Search by Id"
                          value={searchPatientDisplayId}
                          InputProps={{
                            startAdornment: (
                              <IconButton>
                                <SearchOutlined />
                              </IconButton>
                            ),
                          }}
                          onChange={(e) => { }}
                          autoComplete={"off"}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {privilegesData?.roleName !== "HealthBuddy" && (
                <div className="col- d-flex align-items-end">
                  <div className="d-flex">
                    <div className="col-11 status-drop m-0">
                      <div className="patient-action">
                        <NormalMultiSelect
                          value={type}
                          options={patientTypeFilter}
                          handleChange={handleType}
                          isSearchable={true}
                          className={`w-100`}
                        />
                      </div>
                    </div>

                    {privileges?.create && (
                      <div className="col-1 patient-action p-0">
                        <Button
                          className="upload-text"
                        >
                          Bulk Upload
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="patient-main-container patient-container-body pl-5 mt-4 table-resp">
        <Table responsive="md">
          <thead>
            <tr>
              <th>S.No</th>
              <th>User ID</th>
              <th>Name</th>
              <th>Mobile Number</th>
              <th>Type of User</th>
              <th>Status</th>
              <th className="overflow">Corporate Name</th>
              <th className="overflow">Referral Code</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading && (
              <div className="loader-rel">
                <Loader loading={loading} className={"loader-align"} />
              </div>
            )}
            {!loading && (!patientList || patientList?.length <= 0) && (
              <td colSpan={8}>
                <NoData />
              </td>
            )}
            {!loading &&
              patientList?.length > 0 &&
              patientList.map((patient, index) => {

                return (
                  <tr>
                    <td
                      className="cursor-pointer text-center"
                    >
                      {index + 1 + (page - 1) * size}
                    </td>

                    <td
                      className="cursor-pointer"
                    >
                      {patient?.patientDisplayId}
                    </td>
                    <td
                      className="td-avatar cursor-pointer"
                    >
                      {" "}
                      <div className="d-flex justify-content-start align-items-start">
                        <p className="text-left"> {patient.firstName}</p>
                      </div>
                    </td>
                    <td
                      className="cursor-pointer"
                    >
                      {patient.mobileNumber}
                    </td>
                    <td
                      className="cursor-pointer"
                    >
                      {patient.patientType}
                    </td>
                    <td
                      className="cursor-pointer"
                    >
                      {patient.status ? "Active" : "Inactive"}
                    </td>
                    <td className="overflow">
                      {patient?.corporateName ? patient?.corporateName : "--"}
                    </td>
                    <td className="overflow">
                      {patient?.referralCode || "--"}
                    </td>
                    <td>
                      <Dropdown>
                        <Dropdown.Toggle id="dropdown-basic">
                          <Button className="action-btn">
                            <FaEllipsisH />
                          </Button>
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                          <Dropdown.Item>
                            <FiEye /> View
                          </Dropdown.Item>
                          {privileges?.edit && (
                            <Dropdown.Item>
                              <BiEditAlt /> Edit
                            </Dropdown.Item>
                          )}
                          {privileges?.edit && (
                            <Dropdown.Item>
                              <img
                                src={""}
                                alt="patientStatus"
                                width={15}
                                height={15}
                                style={{ color: "black" }}
                              />
                              Mark as {patient.status ? "Inactive" : "Active"}
                            </Dropdown.Item>
                          )}
                        </Dropdown.Menu>
                      </Dropdown>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </Table>
      </div>
      {patientList?.length > 0 && (
        <div className="pagination-align">
          <PaginationComponent
            paginationConfig={paginationConfig}
            active={page}
          />
        </div>
      )}
    </>
  );
};
export default PatientManagementComp;
