import React, { useState, useEffect } from "react";
import "./style.scss";
import { Avatar } from "antd";
import PatientDetails from "../PatientDetails";
import NormalButton from "component/common/NormalButton/NormalButton";
import { history, getFirstLetter } from "helpers";
import { BsArrowLeft } from "react-icons/bs";

const PatientProfile = ({ patientId, privileges, isFkhb }) => {
  const [tab, setTab] = useState(0);
  const [patientDetails, setPatientDetails] = useState({});

  const params = new URLSearchParams(window?.location?.search);
  const tabValue = +params.get("tab") ?? 0;
  const buySubscribeValue = +params.get("subscription") ?? 0;
  const uui = params.get("uui") ?? "";

  useEffect(() => {
    if (buySubscribeValue > 0) scrollToBottom();
  });

  useEffect(() => {
    setTab(tabValue);
  }, [tabValue, buySubscribeValue]);

  const scrollToBottom = () => {
    window.scrollTo({
      top: document.body.scrollHeight,
      left: 0,
      behavior: "smooth",
    });
  };

  const handleParams = (page, consultationId, reportType, familyMemberId) => {
    let paramsData = { tab };
    if (+page > 0) paramsData.page = page;

    if (Object.keys(paramsData).length > 0) {
      let URL = "/admin/content-management";
      Object.entries(paramsData).forEach(([key, value], index) => {
        if (index === 0) URL += `?${key}=${value}`;
        else URL += `&${key}=${value}`;
      });
      return URL;
    }
  };

  const handleTab = (value, arg) => {
    let URL = "";
    if (uui) {
      URL = `${window.location.pathname}/${uui}/?tab=${value}&page=1`;
    } else {
      URL = `${window.location.pathname}?tab=${value}&page=1`;
    }
    if (arg) URL += arg;
    history.push(URL);
  };

  return (
    <>
      <div className="mb-3">
        <span
          className="patient-heading cursor-pointer"
          //onClick={() => history.push("/admin/patient-management")}
          onClick={() => history.goBack()}
        >
          {" "}
          <BsArrowLeft />
          &nbsp;Back to Patient Management{" "}
        </span>
      </div>
      <div>
        <div className="main-container  pl-5">
          <div className="row">
            <div className="col-11 profileSection">
              <div className="d-flex">
                <div className={`${tab == 4 ? "col-5" : "col-7"}`}>
                  <h3 className="sectionHead py-4">
                    <span>Patient Profile</span>
                  </h3>
                </div>

                <div className={`${tab == 4 ? "col-7" : "col-5"} pt-2`}>
                  <div className="d-flex justify-content-end align-items-center pt-2">
                    <>
                      {privileges?.[isFkhb ? "appointmentFKHB" : "appointment"]
                        ?.create && (
                        <div className="mr-2">
                          <NormalButton
                            btnSecondary
                            label={"Book Appointment"}
                            onClick={
                              isFkhb
                                ? () =>
                                    history.push({
                                      pathname: `/admin/create-appointment-fk`,
                                      state: patientDetails,
                                    })
                                : () =>
                                    history.push({
                                      pathname: `/admin/create-appointment`,
                                      state: patientDetails,
                                    })
                            }
                          />
                        </div>
                      )}
                      {privileges?.roleName !== "HealthBuddy" && (
                        <div className="mr-2">
                          <NormalButton
                            tableBtn
                            label={"Buy Subscription"}
                            onClick={() => {
                              handleTab(0, "&subscription=1");
                            }}
                          />
                        </div>
                      )}
                    </>
                  </div>
                </div>
              </div>
              <div className="avatar-content mt-3 mb-3">
                <div className="avatar-parent">
                  {patientDetails?.profileUrl && (
                    <Avatar size={103} src={patientDetails?.profileUrl} />
                  )}
                  {!patientDetails?.profileUrl && (
                    <Avatar size={103} style={{ fontSize: "50px" }}>
                      {getFirstLetter(patientDetails?.firstName)}
                    </Avatar>
                  )}
                  <div className="align-self-center ml-3">
                    <p className="user-name">{patientDetails?.firstName}</p>
                    <p className="user-age">
                      {isNaN(patientDetails?.age)
                        ? ""
                        : `${
                            patientDetails?.age ? `${patientDetails?.age},` : ``
                          } `}
                      {patientDetails?.gender}
                    </p>
                  </div>
                </div>
              </div>
              <div className="down-btn"></div>
              <div className="patient-profileTab">
                <ul>
                  <li
                    className={tab == 0 ? "active-tab" : "inActive-tab"}
                    onClick={() => handleTab(0)}
                  >
                    Patient Details
                  </li>
                  <li
                    className={tab == 1 ? "active-tab" : "inActive-tab"}
                    onClick={() => handleTab(1)}
                  >
                    Previous Consultation
                  </li>
                  <li
                    className={tab == 2 ? "active-tab" : "inActive-tab"}
                    onClick={() => handleTab(2, "&reportType=1")}
                  >
                    Patient Report
                  </li>
                  <li
                    className={tab == 3 ? "active-tab" : "inActive-tab"}
                    onClick={() => handleTab(3)}
                  >
                    Medical History
                  </li>
                  <li
                    className={tab == 4 ? "active-tab" : "inActive-tab"}
                    onClick={() => handleTab(4)}
                  >
                    Family Details
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="main-container mt-4">
        {tab === 0 && (
          <PatientDetails
            handleParams={handleParams}
            patientDetails={patientDetails}
            privileges={privileges}
          />
        )}
      </div>
    </>
  );
};

export default PatientProfile;
