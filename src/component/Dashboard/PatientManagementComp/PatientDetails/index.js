import NormalButton from "component/common/NormalButton/NormalButton";
import React, { useState } from "react";
import "./style.scss";
import { history } from "helpers";
import moment from "moment";

const PatientDetails = ({ patientDetails, privileges }) => {


  const [isUpGradeFlag, setIsUpgradeFlag] = useState(false);

  return (
    <div className="detailsCard">
      <div className="sectionHr">
        <div className="d-flex flex-wrap">
          {" "}
          <div className="col-md-10 col-12">
            <h3 className="sectionHead">Patient Details</h3>
          </div>
          <div className="">
            <div className="d-flex justify-content-end">
              <NormalButton
                profileBtn
                label={"Edit"}
                onClick={() =>
                  history.push(
                    `/admin/edit-user-register/${patientDetails?.id}`
                  )
                }
              />
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-12">
          <div className="row  mt-3">
            <div className="col-3">
              <label className="headLabel">Primary Account Holder Name</label>
              <p className="labeldata">{patientDetails?.firstName}</p>
            </div>
            <div className="col-9">
              <label className="headLabel">No.of Families & Dependents</label>
              <p className="labeldata">{patientDetails?.noOfFamily || "--"}</p>
            </div>
          </div>
          <div className="row  mt-3">
            <div className="col-3">
              <label className="headLabel">Contact number</label>
              <p className="labeldata">
                {patientDetails?.mobileNumber || "--"}
              </p>
            </div>
            <div className="col-9">
              <label className="headLabel">Email ID</label>
              <p className="labeldata">{patientDetails?.emailId || "--"}</p>
            </div>
          </div>
          <div className="row mt-4">
            <div className="col-3">
              <label className="headLabel">Address Line 1</label>
              <p className="labeldata">
                {patientDetails?.addressDetails || "--"}{" "}
              </p>
            </div>
            <div className="col-3">
              <label className="headLabel">Address Line 2</label>
              <p className="labeldata">
                {patientDetails?.addressLine2 || "--"}{" "}
              </p>
            </div>
            <div className="col-2">
              <label className="headLabel">Country </label>
              <p className="labeldata">{patientDetails?.country || "--"}</p>
            </div>
            <div className="col-2">
              <label className="headLabel">State</label>
              <p className="labeldata">{patientDetails?.state || "--"}</p>
            </div>
            <div className="col-2">
              <label className="headLabel">District</label>
              <p className="labeldata">{patientDetails?.district || "--"}</p>
            </div>
            <div className="col-3">
              <label className="headLabel">City</label>
              <p className="labeldata">{patientDetails?.city || "--"}</p>
            </div>
            <div className="col-2">
              <label className="headLabel">Pincode</label>
              <p className="labeldata">{patientDetails?.pincode || "--"}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="sectionHr">
        <h3 className="sectionHead">User Type</h3>
      </div>
      <div className="row  mt-3">
        <div className="col-4">
          <label className="headLabel">Corporate Name</label>
          <p className="labeldata">{patientDetails?.corporateName || "--"}</p>
        </div>
        <div className="col-2">
          <label className="headLabel">Type of User</label>
          <p className="labeldata">{patientDetails?.patientType || "--"}</p>
        </div>
        <div className="col-6">
          <label className="headLabel">Referral Code</label>
          <p className="labeldata">{patientDetails?.referralCode || "--"}</p>
        </div>
      </div>
      {privileges?.roleName !== "HealthBuddy" && (
        <>
          {" "}
          <div className="sectionHr">
            <h3 className="sectionHead">Subscription Plans</h3>
          </div>
          <>
            <div className="d-flex justify-content-around pt-3">
              <div className="col-md-6">
                <div className="SubcriptionCard">
                  <div className="d-flex planMonth">
                    <div className="col-1 pt-2">
                      <div className="d-flex justify-content-center align-items-center">
                        <img
                          src={"subcripitonTick"}
                          className="m-auto activeImages"
                          width={"30px"}
                        />
                      </div>
                    </div>
                    <div className="col-8">
                      <div className="d-flex">
                        {
                          patientDetails?.subscriptionData?.subscriptionId
                            ?.validity
                        }{" "}
                        {
                          patientDetails?.subscriptionData?.subscriptionId
                            ?.validityPeriod
                        }
                      </div>
                      <div className="d-flex">
                        <div className="d-flex justify-content-start align-items-center">
                          <img
                            src={"priceTag"}
                            className="m-auto activeImages"
                          />{" "}
                          Discount{" "}
                          {
                            patientDetails?.subscriptionData?.subscriptionId
                              ?.discountPercentage
                          }
                          %
                        </div>
                      </div>
                      {patientDetails?.subscriptionData?.coupon && (
                        <div className="d-flex">
                          <div className="d-flex justify-content-start align-items-center">
                            <img
                              src={"couponGift"}
                              className="m-1 activeImages"
                              width={"20px"}
                            />{" "}
                            Coupon ({patientDetails?.subscriptionData?.coupon}
                            )
                          </div>
                        </div>
                      )}
                    </div>
                    <div className="col-3">
                      <div className="d-flex justify-content-end">
                        <div className="col-1 p-0">
                          <s>₹</s>
                        </div>
                        <div className="col-11">
                          <div className="d-flex justify-content-end">
                            <s>{patientDetails?.subscriptionData?.price}</s>
                          </div>
                        </div>
                      </div>
                      <div className="d-flex justify-content-end disc-price">
                        <div className="col-1 p-0">₹</div>
                        <div className="col-11">
                          <div className="d-flex justify-content-end">
                            {patientDetails?.subscriptionData?.discount}
                          </div>
                        </div>
                      </div>
                      {patientDetails?.subscriptionData?.coupon && (
                        <div className="d-flex justify-content-end disc-price">
                          <div className="col-1 p-0">₹</div>
                          <div className="col-11">
                            <div className="d-flex justify-content-end">
                              {
                                patientDetails?.subscriptionData
                                  ?.couponDiscount
                              }
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="d-flex planMonth horizontalLine">
                    <div className="col-9 label-text">Net Payable</div>
                    <div className="col-3">
                      <div className="d-flex justify-content-end">
                        <div className="col-1 p-0">₹</div>
                        <div className="col-11">
                          <div className="d-flex justify-content-end">
                            {patientDetails?.subscriptionData?.totalCharges}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="SubcriptionCard">
                  <div className="d-flex planMonth">
                    <div className="col-6">
                      <div className="d-flex">Pack valid until</div>
                      <div className="d-flex">
                        {moment(
                          patientDetails?.subscriptionData?.endDate
                        ).format("MMMM Do YYYY")}
                      </div>
                    </div>
                    <div className="col-6">
                      <div className="d-flex">Purchase on</div>
                      <div className="d-flex">
                        {moment(
                          patientDetails?.subscriptionData?.startDate
                        ).format("MMMM Do YYYY")}
                      </div>
                    </div>
                  </div>
                  <div className="d-flex pt-2">
                    <NormalButton
                      tableBtn
                      label={"Upgrade plan"}
                      className="ml-3"
                      onClick={() => setIsUpgradeFlag(true)}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="benefitBox">
              <div className="col-md-12 col-12">
                <h4>Plan Benefits</h4>
                <div>
                  <ul className="planList">
                    <li>
                      <div className="d-flex justify-content-start align-items-center">
                        <img src={"subList1"} className="img-shadow" />
                        <span className="ml-3">
                          Unlimited free 24x7 consultations with a{" "}
                          <img src={"subListLogo"} width="10%" /> GP (within 15
                          minutes)
                        </span>
                      </div>
                    </li>
                    <li>
                      <div>
                        <img src={"subList2"} className="img-shadow" />
                        <span className="ml-3">
                          Free for the whole family
                        </span>
                      </div>
                    </li>
                    <li>
                      <div>
                        <img src={"subList3"} className="img-shadow" />
                        <span className="ml-3">
                          Upto 70% discount on diagnostics (Radiology and
                          Pathology )
                        </span>
                      </div>
                    </li>
                    <li>
                      <div>
                        <img src={"subList4"} className="img-shadow" />
                        <span className="ml-3">
                          Upto 25% discounts on medicines{" "}
                        </span>
                      </div>
                    </li>
                    <li>
                      <div>
                        <img src={"subList5"} className="img-shadow" />
                        <span className="ml-3">Audio &amp; Video calls</span>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </>
        </>
      )}
    </div>
  );
};

export default PatientDetails;
