import React, { useState, useEffect, useCallback } from "react";
import "./style.scss";
import { getUser } from "service/Auth";
import { history } from "helpers";
import { Avatar, Space } from "antd";
import { UserOutlined } from "@ant-design/icons";
import NormalButton from "component/common/NormalButton/NormalButton";
import download from "assets/images/download.svg";
import mp4 from "assets/images/mp4.svg";
import jpg from "assets/images/jpg.svg";
import pdf from "assets/images/pdf.svg";
import Suffix from "assets/images/Suffix.svg";
import PersonalInformation from "./PersonalInformation";
import Address from "./Address";
import Documents from "./Documents";
import Business from "./Business";
import Bank from "./Bank";
import Nomination from "./Nomination";
import Payment from "./Payment";

const ViewApComp = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [data, setData] = useState([]);
  const [loading, setloading] = useState(false);
  const viewId = localStorage.getItem("viewId");

  var url = new URL(document.URL);
  const params = url.searchParams;
  const tabValue = +params.get("tab") ?? 0;

  const handleTab = (tab) => {
    setActiveTab(tab);
    history.push(`view-ap-management?tab=${tab}`);
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

  useEffect(() => {
    handleTab(tabValue);
    if (viewId) {
      getApList(viewId);
    }
  }, []);

  return (
    <div className="px-5 py-3">
      <div className="row align-items-center justify-content-between">
        <div className="col-6">
          <p className="staff_title m-0">Authorized Partner (AP) Management</p>
        </div>
        <div className="d-flex align-items-center justify-content-end col-6">
          <div className=" col-3" >
            <NormalButton
              className="loginButton"
              // onClick={handleFormSubmit}
              label={"Approve"}
              isLoading={loading}
            />
          </div>
          <div className=" col-3" >
            <NormalButton
              className="authButton1"
              label={"Deny"}
              onClick={() => history.push("/admin/ap-management")}
            />
          </div>
        </div>
      </div>
      <div className="d-flex mt-5">
        <div className="col-7 p-0">
          <div className="d-flex flex-noWrap col-12 profile-card p-3">
            <div
              style={{ width: "80px", height: "150px" }}
              className="col-3 image-profile"
            >
              <Avatar
                style={{ width: "100%", height: "100%" }}
                shape="square"
              />
            </div>
            <div className="col-5">
              <h6>{data?.gender}</h6>
              <p>{data?.name}</p>
              <span>{data?.role}</span>
            </div>
            <div className="col-4">
              <h6>{data?.nationality}</h6>
              <h6>{data?.mobileNumber}</h6>
              <h6>{data?.email}</h6>
            </div>
          </div>
        </div>
        <div className="col-5">
          <div className=" profile-card p-3">
            <h5>In-Person Verification (IPV)</h5>
            <div className="d-flex flex-noWrap col-12 document-card p-3">
              <div className="col-2">
                <img src={mp4} alt="" />
              </div>
              <div className="col-6">
                <p>IPV recording with proof</p>
                <span>File size is 1 MB</span>
              </div>
              <div className="col-2">
                <img src={download} alt="" />
              </div>
              <div className="col-2">
                <img src={Suffix} alt="" />
              </div>
            </div>
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
