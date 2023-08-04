import React from "react";

const PersonalInformation = ({ data }) => {
  return (
    <div className="personal-box p-4">
      <div className="d-flex align-items-center mt-4">
        <div className="">
          <p>Father's Name</p>
          <span>{data?.fatherName}</span>
        </div>
        <div className="mx-3">
          <p>Mother's Name</p>
          <span>{data?.motherName}</span>
        </div>
        <div className="mx-3">
          <p>Name of the firm/ Trade member (Optional)</p>
          <span>{data?.tradeMember ? data?.tradeMember : "-"}</span>
        </div>
        <div className="mx-3">
          <p>Website (Optional)</p>
          <span>{data?.website ? data?.website : "-"}</span>
        </div>
      </div>
      <div className="mt-4">
        <h3>Occupation Details</h3>
        <div className="d-flex align-items-center mt-4">
          <div className="">
            <p>Occupation Type</p>
            <span>{data?.occupationType ? data?.occupationType : "-"}</span>
          </div>
          <div className="mx-3">
            <p>Role</p>
            <span>{data?.role ? data?.role : "-"}</span>
          </div>
        </div>
      </div>
      <div className="mt-4 row">
        <div className="col-6">
          <h3>Capital Marketing Experince</h3>
          <div className="d-flex align-items-center">
            <div>
              <p>Equities</p>
              <p>Debt</p>
              <p>Derivatives</p>
              <p>IPO’s</p>
              <p>Mutual Funds</p>
              <p>Others</p>
            </div>
            <div className="mx-5 px-5">
              <h4 className="mb-3">{data?.capitalMarketingExperience?.equities || "-"}</h4>
              <h4 className="mb-3">{data?.capitalMarketingExperience?.debt || "-"}</h4>
              <h4 className="mb-3">{data?.capitalMarketingExperience?.derivatives || "-"}</h4>
              <h4 className="mb-3">{data?.capitalMarketingExperience?.ipo || "-"}</h4>
              <h4 className="mb-3">{data?.capitalMarketingExperience?.mutualfunds || "-"}</h4>
              <h4 className="mb-3">{data?.capitalMarketingExperience?.others || "-"}</h4>
            </div>
          </div>
        </div>
        <div className="col-6">
          <h3>Capital Marketing Experince</h3>
          <div className="d-flex align-items-center">
            <div>
              <p>No of years in Broking</p>
              <span>{data?.brokerDetails?.yearsOfBroking || "-"}</span>
            </div>
            <div className="mx-5">
              <p>SEBI Registration Number</p>
              <span>{data?.brokerDetails?.SEBIRegisterNumber || "-"}</span>
            </div>
          </div>
          <div className="d-flex align-items-center mt-4">
            <div>
              <p>Stock Exchange</p>
              <span>{data?.brokerDetails?.stockExchangeyear || "-"}</span>
            </div>
            <div className="mx-5">
              <p>Period- From</p>
              <span>{data?.brokerDetails?.periodFromDate || "-"}</span>
            </div>
            <div className="mx-5">
              <p>To Date</p>
              <span>{data?.brokerDetails?.periodToDate || "-"}</span>
            </div>
          </div>
          <div className="d-flex align-items-center mt-4">
            <div>
              <p>Name of the Main Broker</p>
              <span>{data?.brokerDetails?.mainBrokerName || "-"}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonalInformation;
