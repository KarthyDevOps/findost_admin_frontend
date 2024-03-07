import React, { useState, useEffect } from "react";
// styles
import "./style.scss";
// images
import download from "assets/images/download.svg";
import mp4 from "assets/images/mp4.svg";
import jpg from "assets/images/jpg.svg";
import pdf from "assets/images/pdf.svg";
import Suffix from "assets/images/Suffix.svg";
import profileIcon from "assets/images/profileIcon.svg";
// internal component
import NormalButton from "component/common/NormalButton/NormalButton";
import PersonalInformation from "./PersonalInformation";
import Address from "./Address";
import Documents from "./Documents";
import Business from "./Business";
import Bank from "./Bank";
import Nomination from "./Nomination";
import Payment from "./Payment";
// services
import { getUser, ApproveUser } from "service/Auth";
import { BsArrowLeft } from "react-icons/bs";
import { downloadImage } from "service/Auth";
import { Oval } from "react-loader-spinner";
import { Tooltip } from "antd";
// helpers
import { history } from "helpers";

const ViewApComp = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [data, setData] = useState([]);
  const [loading, setloading] = useState(false);
  const [load, setload] = useState(false);
  const viewId = localStorage.getItem("viewId");

  var url = new URL(document.URL);
  const params = url.searchParams;
  const tabValue = +params.get("tab") ?? 0;

  const handleTab = (tab) => {
    setActiveTab(tab);
    history.push(`view-ap-management?tab=${tab}`);
  };

  const handleViewClick = (url) => {
    const fileUrl = url;
    window.open(fileUrl, "_blank");
  };

  const getApList = async (id) => {
    try {
      let params = {
        id: id,
      };
      let response = await getUser(params);
      if (response.status === 200) {
        setData(response?.data?.data);
      } else {
        setData([]);
      }
    } catch (e) {
      console.log("e :>> ", e);
    }
  };

  // const handleApprove = async (status) => {
  //   try {
  //     setloading(true);
  //     const body = {
  //       isAdminUpdated: status,
  //     };
  //     let response = await ApproveUser(body, viewId);
  //     if (response.status === 200) {
  //       setloading(false);
  //       getApList(viewId);
  //     }
  //   } catch (e) {
  //     console.log("e :>> ", e);
  //   }
  // };

  // const handleDeny = async (status) => {
  //   try {
  //     setload(true);
  //     const body = {
  //       isAdminUpdated: status,
  //     };
  //     let response = await ApproveUser(body, viewId);
  //     if (response.status === 200) {
  //       setload(false);
  //       getApList(viewId);
  //     }
  //   } catch (e) {
  //     console.log("e :>> ", e);
  //   }
  // };

  const saveFile = async (url, fileName) => {
    try {
      setloading(true);
      const body = {
        key: url,
      };
      const response = await downloadImage(body);
      if (response.status === 200) {
        let data = response?.data?.Body;
        var a = document.createElement("a");
        a.href = "data:application/octet-stream;base64," + data;
        a.download = `${fileName}.${response?.data?.contentType.split("/")[1]}`;
        a.click();
        setloading(false);
      } else {
        console.error("Failed to fetch PDF data.");
        setloading(false);
      }
    } catch (error) {
      console.error("Error while fetching PDF:", error);
      setloading(false);
    }
  };

  useEffect(() => {
    handleTab(tabValue);
    if (viewId) {
      getApList(viewId);
    }
  }, []);

  return (
    <div className="px-5 py-3">
      <div className="row align-items-center justify-content-between">
        <div className="col-6 d-flex align-items-center p-0">
          <i className="pr-3">
            <BsArrowLeft
              size={28}
              onClick={() => history.push("/admin/ap-management")}
              style={{ cursor: "pointer" }}
            />
          </i>
          <p className="staff_title m-0">AP Management</p>
        </div>
        {/* <div className="d-flex align-items-center justify-content-end col-6">
          <div className=" col-3">
            <NormalButton
              className="loginButton"
              onClick={() => {
                handleApprove(true);
              }}
              label={"Approve"}
              isLoading={loading}
            />
          </div>
          <div className=" col-3">
            <NormalButton
              className="authButton1"
              label={"Deny"}
              onClick={() => handleDeny(false)}
              isLoading={load}
            />
          </div>
        </div> */}
      </div>
      <div className="d-flex mt-5">
        <div className="col-7 p-0">
          <div className="d-flex flex-noWrap align-items-stretch col-12 profile-card p-3">
            <div className="col-3 image-profile mr-2">
              <img src={profileIcon} alt="" style={{ width: "100%" }} />
            </div>
            <div className="col-5">
              <h6>{data?.gender || "-"}</h6>
              <p>{data?.name || "-"}</p>
              <span>{data?.role || "-"}</span>
              {/* <h6
                style={{
                  color: data?.isAdminUpdated ? "green" : "red",
                }}
              >
                {data?.isAdminUpdated ? "Active" : "InActive"}
              </h6> */}
            </div>
            <div className="col-4">
              <h6>{data?.nationality || "-"}</h6>
              <h6>{data?.mobileNumber || "-"}</h6>
              <h6>{data?.email || "-"}</h6>
            </div>
          </div>
        </div>
        <div className="col-5">
          <div className=" profile-card p-3">
            <h5>In-Person Verification (IPV)</h5>
            {data?.inPersonVerification?.urlS3 != null ? (
              <div className="d-flex flex-noWrap col-12 document-card p-3">
                {!loading ? (
                  <>
                    <div className="col-2">
                      <img src={mp4} alt="" />
                    </div>
                    <div className="col-6">
                      <Tooltip
                        title={data?.inPersonVerification?.fileName}
                        color={"#fff"}
                        key={"#fff"}
                      >
                        <p className="inPersonVerification_filen_name">{data?.inPersonVerification?.fileName}</p>
                      </Tooltip>
                      <span>
                        File size is {data?.inPersonVerification?.fileSize}
                      </span>
                    </div>
                    <div className="d-flex justify-content-end col-5">
                      <div
                        onClick={() =>
                          saveFile(
                            data?.inPersonVerification?.url,
                            data?.inPersonVerification?.fileName
                          )
                        }
                        className="mx-2 cursor-pointer"
                      >
                        <img src={download} alt="" />
                      </div>
                      <div
                        onClick={() =>
                          handleViewClick(data?.inPersonVerification?.urlS3)
                        }
                        className="mx-3 cursor-pointer"
                      >
                        <img src={Suffix} alt="" />
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="col-8 d-flex align-items-center ">
                    <Oval color="#ffffff" height={20} width={"100%"} />
                    <p className="fs-3  mx-4">Loading... </p>
                  </div>
                )}
              </div>
            ) : (
              "-"
            )}
          </div>
        </div>
      </div>
      <div className="Tab_design pt-3 p-0">
        <div
          className={
            activeTab === 0 ? "Tab_design_active" : "Tab_design_inActive"
          }
          onClick={() => {
            handleTab(0);
          }}
        >
          Personal Information
        </div>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <div
          className={
            activeTab === 1 ? "Tab_design_active" : "Tab_design_inActive"
          }
          onClick={() => {
            handleTab(1);
          }}
        >
          Address
        </div>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <div
          className={
            activeTab === 2 ? "Tab_design_active" : "Tab_design_inActive"
          }
          onClick={() => {
            handleTab(2);
          }}
        >
          Documents
        </div>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <div
          className={
            activeTab === 3 ? "Tab_design_active" : "Tab_design_inActive"
          }
          onClick={() => {
            handleTab(3);
          }}
        >
          Business
        </div>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <div
          className={
            activeTab === 4 ? "Tab_design_active" : "Tab_design_inActive"
          }
          onClick={() => {
            handleTab(4);
          }}
        >
          Bank
        </div>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <div
          className={
            activeTab === 5 ? "Tab_design_active" : "Tab_design_inActive"
          }
          onClick={() => {
            handleTab(5);
          }}
        >
          Nomination
        </div>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <div
          className={
            activeTab === 6 ? "Tab_design_active" : "Tab_design_inActive"
          }
          onClick={() => {
            handleTab(6);
          }}
        >
          Payment
        </div>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      </div>
      <div>
        {activeTab === 0 ? (
          <PersonalInformation data={data} />
        ) : activeTab === 1 ? (
          <Address data={data} />
        ) : activeTab === 2 ? (
          <Documents
            loading={loading}
            setloading={setloading}
            data={data}
            mp4={mp4}
            Suffix={Suffix}
            download={download}
            jpg={jpg}
            pdf={pdf}
          />
        ) : activeTab === 3 ? (
          <Business data={data} />
        ) : activeTab === 4 ? (
          <Bank
            loading={loading}
            setloading={setloading}
            data={data}
            mp4={mp4}
            Suffix={Suffix}
            download={download}
            jpg={jpg}
            pdf={pdf}
          />
        ) : activeTab === 5 ? (
          <Nomination data={data} />
        ) : (
          <Payment data={data} />
        )}
      </div>
    </div>
  );
};

export default ViewApComp;
