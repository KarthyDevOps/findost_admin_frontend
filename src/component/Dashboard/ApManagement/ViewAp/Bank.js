import React from "react";

const Bank = ({ data, pdf, download, Suffix }) => {
  return (
    <div className="personal-box p-4">
      <h3>Bank Details</h3>
      <div className="d-flex align-items-center mt-4">
        <div className="">
          <p>Bank Name</p>
          <span>
            {data?.bankDetails?.bankName ? data?.bankDetails?.bankName : "-"}
          </span>
        </div>
        <div className="mx-5">
          <p>Account No.</p>
          <span>
            {data?.bankDetails?.accountNo ? data?.bankDetails?.accountNo : "-"}
          </span>
        </div>
        <div className="mx-5">
          <p>IFSC Code</p>
          <span>
            {data?.bankDetails?.ifscCode ? data?.bankDetails?.ifscCode : "-"}
          </span>
        </div>
        <div className="mx-5">
          <p>Bank Branch</p>
          <span>
            {data?.bankDetails?.bankBranch
              ? data?.bankDetails?.bankBranch
              : "-"}
          </span>
        </div>
      </div>
      <h1 className="mt-5">Upload Cheque leaflet / Bank Account Statement</h1>
      <div className="d-flex flex-noWrap col-4 document-card p-3">
        <div className="col-2">
          <img src={pdf} alt="" />
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
  );
};

export default Bank;
