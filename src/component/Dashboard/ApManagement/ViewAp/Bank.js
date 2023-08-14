import React from "react";
import { downloadImage } from "service/Auth";

const Bank = ({ data, pdf, download, Suffix }) => {
  const handleViewClick = (url) => {
    const fileUrl = url;
    window.open(fileUrl, "_blank");
  };

  const saveFile = async (url, fileName) => {
    try {
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
      } else {
        console.error("Failed to fetch PDF data.");
      }
    } catch (error) {
      console.error("Error while fetching PDF:", error);
    }
  };

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
          <p>{data?.bankDetails?.uploadChequeLeaflet?.fileName}</p>
          <span>
            File size is {data?.bankDetails?.uploadChequeLeaflet?.fileSize}
          </span>
        </div>
        <div
          onClick={() =>
            saveFile(
              data?.bankDetails?.uploadChequeLeaflet?.url,
              data?.bankDetails?.uploadChequeLeaflet?.fileName
            )
          }
          className="col-2 cursor-pointer"
        >
          <img src={download} alt="" />
        </div>
        <div
          onClick={() =>
            handleViewClick(data?.bankDetails?.uploadChequeLeaflet?.urlS3)
          }
          className="col-2 cursor-pointer"
        >
          <img src={Suffix} alt="" />
        </div>
      </div>
    </div>
  );
};

export default Bank;
