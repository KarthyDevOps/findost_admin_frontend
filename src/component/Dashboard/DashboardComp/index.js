import React, { useState, useEffect } from "react";
import "./style.scss";
import ScoreCardComp from "./ScoreCard";
import AppointmentCardComp from "./AppointmentCard";
import Loader from "component/common/Loader";
import NoData from "component/common/NoData";
import PaginationComponent from "component/common/Pagination";
import moment from "moment";
import NormalMultiSelect from "component/common/NormalMultiSelect";
import { Avatar } from "antd";

const DashboardComp = () => {
  const [countData, setCountData] = useState({});
  const [dutyData, setDutyData] = useState([]);
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(10);
  const [paginationConfig, setPaginationConfig] = useState(null);
  const [loading, setLoading] = useState(false);
  const [countLoading, setCountLoading] = useState(false);
  const [showAddModal, setShowAddModal] = useState();
  const [status, setStatus] = useState("AVAILABLE");


  const cardItems = [
    {
      img: "",
      text: "Total Registrations",
      count: countData?.totalRegistration ?? 0,
    },
    {
      img: "",
      text: "Complete Profile",
      count: countData?.completedProfile ?? 0,
    },
    {
      img: "",
      text: "Booked Appointments",
      count: countData?.bookedAppointments ?? 0,
    },
    {
      img: "",
      text: "Completed Appointments",
      count: countData?.totalCompletedAppointments ?? 0,
      fontSize: 12,
    },
  ];

  const appointMentItems = [
    {
      img: "",
      text: "Total Booked",
      count: countData?.todayBookedAppointments ?? 0,
    },
    {
      img: "",
      text: "Total Completed",
      count: countData?.todayCompletedAppointments ?? 0,
    },
    {
      img: "",
      text: "Normal Appointment's Booked",
      count: countData?.todayNormalAppointments ?? 0,
    },
    {
      img: "",
      text: "MH Call's Booked",
      count: countData?.todayMHAppointments ?? 0,
    },
    {
      img: "",
      text: "Registered Through Admin",
      text: "Through Admin",
      count: countData?.todayAppointmentsThroughAdmin ?? 0,
    },
    {
      img: "",
      text: "Through IVR",
      count: countData?.todayAppointmentsThroughIVR ?? 0,
    },
    {
      img: "",
      text: "Through App",
      count: countData?.todayAppointmentsThroughAPP ?? 0,
    },
  ];

  const appointMentItems1 = [
    {
      img: "",
      text: "Doctors Onboard",
      count: countData?.doctorsOnboard ?? 0,
    },
    {
      img: "",
      text: "No of Doctor Added Schedule For Today",
      count: countData?.todaySlotCreatedDoctors ?? 0,
    },
    {
      img: "",
      text: "Appointments Slots Added Today",
      count: countData?.todayCreatedSlots ?? 0,
    },
    {
      img: "",
      text: "Free Slots",
      count: countData?.freeSlots ?? 0,
    },
    {
      img: "",
      text: "MH Slots",
      count: countData?.todayMHSlot ?? 0,
    },
    {
      img: "",
      text: "Normal Slots",
      count: countData?.todayNORMALSlot ?? 0,
    },
  ];

  const appointMentItems2 = [
    {
      img: "",
      text: "Total",
      count: countData?.todayRegistrations ?? 0,
    },
    {
      img: "",
      text: "Through App",
      count: countData?.todayRegistrationsThroughApp ?? 0,
    },
    {
      img: "",
      text: "Through Web",
      count: countData?.todayRegistrationsThroughWeb ?? 0,
    },
    {
      img: "",
      text: "Through Admin (include Bulk-Admin)",
      count: countData?.todayRegistrationsThroughAdmin ?? 0,
    },
    {
      img: "",
      text: "Through API",
      count: countData?.todayRegistrationsThroughApi ?? 0,
    },
  ];

  const handleStatus = (status) => {
    setStatus(status);
  };

  return (
    <div className="container p-0">
      <div className="dashboard-comp">
        {countLoading ? (
          <div className="loader-rel" style={{ minHeight: "20vh" }}>
            <Loader loading={countLoading} className={"center-loader"} />
          </div>
        ) : (
          <>
            <div className="row">
              <div className="col-12 d-flex justify-content-around">
                {cardItems.map((item) => {
                  return <ScoreCardComp cardItems={item} />;
                })}
              </div>
            </div>
            <div className="row">
              <div className="col-6">
                <div className="info-card">
                  <h5 className="pt-2"> Registration Stats for Today</h5>

                  <div className="d-flex flex-wrap">
                    {appointMentItems2.map((data) => {
                      return <AppointmentCardComp cardItems={data} />;
                    })}
                  </div>
                </div>
              </div>
              <div className="col-6">
                <div className="info-card">
                  <h5 className="pt-2">Appointment Stats for Today</h5>

                  <div className="d-flex flex-wrap">
                    {appointMentItems.map((data) => {
                      return <AppointmentCardComp cardItems={data} />;
                    })}
                  </div>
                </div>
              </div>

            </div>
            <div className="row mb-2">
              <div className="col-12">
                <div className="infoNew-card">
                  <h5 className="pt-2">Slots</h5>

                  <div className="d-flex flex-wrap">
                    {appointMentItems1.map((data) => {
                      return <AppointmentCardComp cardItems={data} />;
                    })}
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
        <div className="row m-0">
          <div className="col-12">
            <div className="d-flex justify-content-between">
              <h4 className="table-title">Doctors on Duty Today</h4>
              <div className="status-drop" style={{ minWidth: "150px" }}>
                <NormalMultiSelect
                  value={status}
                  options={[
                    { value: "AVAILABLE", label: "AVAILABLE" },
                    { value: "EMERGENCY", label: "EMERGENCY" },
                  ]}
                  handleChange={({ target: { value } = {} } = {}) =>
                    handleStatus(value)
                  }
                />
              </div>
            </div>
            <div className="tableResponsive scroll-x">
              <thead>
                <tr>
                  <th className="d-none">S.No</th>
                  <th className="d-none">Doctor ID</th>
                  <th>
                    Upcoming <br />
                    Appointments <br />
                    From Today
                  </th>
                  <th className="w-20">
                    Completed <br />
                    Appointments <br />
                    (Today)
                  </th>
                  <th>
                    Total <br />
                    Appointments <br />
                    (Today)
                  </th>
                  <th>Doctor Name</th>
                  <th>Mobile Number</th>
                  <th>Morning</th>
                  <th>Evening</th>
                  <th>Night</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {loading && (
                  <div className="loader-rel">
                    <Loader loading={loading} className={"loader-align"} />
                  </div>
                )}
                {!loading && (!dutyData || dutyData?.length <= 0) && (
                  <td colSpan={8}>
                    <NoData />
                  </td>
                )}
                {!loading &&
                  dutyData?.length > 0 &&
                  React.Children.toArray(
                    dutyData.map((data, index) => {
                      return (
                        <tr>
                          <td className="d-none">
                            {index + 1 + (page - 1) * size}
                          </td>
                          <td className="d-none">{data?.doctorDisplayId}</td>
                          <td className="text-center">
                            {data?.totalUpcomingAppointment}
                          </td>
                          <td className="text-center">
                            {data?.totalCompletedAppointment}
                          </td>
                          <td className="text-center">
                            {data?.totalAppointment}
                          </td>
                          <td className="td-avatar">
                            <div className="d-flex mt-1">
                              <Avatar src={data?.doctorProfile} />
                              <p className="avatar-name d-flex justify-content-center align-items-center">
                                {data.doctorName}
                              </p>
                            </div>
                          </td>
                          <td>{data?.doctorMobile}</td>
                          <td>
                            {data?.morning?.length > 0 ? (
                              <>
                                {data?.morning?.map((list, i) => (
                                  <span>
                                    {moment(list?.startTime, "HH:mm").format(
                                      "hh:mm"
                                    )}{" "}
                                    -{" "}
                                    {moment(list?.endTime, "HH:mm").format(
                                      "hh:mm A"
                                    )}
                                    {data?.morning?.length === i + 1
                                      ? "."
                                      : ", "}
                                  </span>
                                ))}
                              </>
                            ) : (
                              "--"
                            )}
                          </td>
                          <td>
                            {data?.evening?.length > 0 ? (
                              <>
                                {data?.evening?.map((list, i) => (
                                  <span>
                                    {moment(list?.startTime, "HH:mm").format(
                                      "hh:mm"
                                    )}{" "}
                                    -{" "}
                                    {moment(list?.endTime, "HH:mm").format(
                                      "hh:mm A"
                                    )}
                                    {data?.evening?.length === i + 1
                                      ? "."
                                      : ", "}
                                  </span>
                                ))}
                              </>
                            ) : (
                              "--"
                            )}
                          </td>
                          <td>
                            {data?.night?.length > 0 ? (
                              <>
                                {data?.night?.map((list, i) => (
                                  <span>
                                    {moment(list?.startTime, "HH:mm").format(
                                      "hh:mm"
                                    )}{" "}
                                    -{" "}
                                    {moment(list?.endTime, "HH:mm").format(
                                      "hh:mm A"
                                    )}
                                    {data?.night?.length === i + 1 ? "." : ", "}
                                  </span>
                                ))}
                              </>
                            ) : (
                              "--"
                            )}
                          </td>
                          {/* <td onClick={() => setShowAddModal(data?.doctorId)}> */}
                          <td>
                            <a
                              href={`/admin/doctor-profile/${data?.doctorId}?tab=4`}
                            >
                              {"View"}
                            </a>
                            {/* <Dropdown>
                              <Dropdown.Toggle
                                id="dropdown-basic"
                                className="view-table"
                              >
                                View
                              </Dropdown.Toggle>

                              <Dropdown.Menu>
                                <Dropdown.Item>Available</Dropdown.Item>
                                <Dropdown.Item>Leaves</Dropdown.Item>
                                <Dropdown.Item>Emergency Break</Dropdown.Item>
                              </Dropdown.Menu>
                            </Dropdown> */}
                          </td>
                        </tr>
                      );
                    })
                  )}
              </tbody>
            </div>
            {dutyData?.length > 0 && (
              <div className="pagination-align">
                <PaginationComponent
                  paginationChange={(page) => setPage(page)}
                  paginationConfig={paginationConfig}
                  active={page}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardComp;
