import React from "react";
import { useState } from "react";
import { Oval } from "react-loader-spinner";
import { downloadImage } from "service/Auth";
import { Tooltip } from "antd";
import "./style.scss";

const Bank = ({ data, pdf, download, Suffix }) => {
  const [loading, setloading] = useState(false);
  const handleViewClick = (url) => {
    const fileUrl = url;
    window.open(fileUrl, "_blank");
  };

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
      setloading(false);
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
      {data?.bankDetails?.uploadChequeLeaflet?.urlS3 != null ? (
        <div className="d-flex flex-noWrap col-4 document-card p-3">
          {!loading ? (
            <>
              <div className="col-2">
                <img src={pdf} alt="" />
              </div>
              <div className="col-7">
                <Tooltip
                  title={data?.bankDetails?.uploadChequeLeaflet?.fileName}
                  color={"#fff"}
                  key={"#fff"}
                >
                  <p className="download_file_name_styles">
                    {data?.bankDetails?.uploadChequeLeaflet?.fileName}
                  </p>
                </Tooltip>
                <span>
                  File size is{" "}
                  {data?.bankDetails?.uploadChequeLeaflet?.fileSize}
                </span>
              </div>
              <div className="d-flex justify-content-end col-4 ">
                <div
                  className=" mx-2 cursor-pointer"
                  onClick={() =>
                    saveFile(
                      data?.bankDetails?.uploadChequeLeaflet?.url,
                      data?.bankDetails?.uploadChequeLeaflet?.fileName
                    )
                  }
                >
                  <img src={download} alt="" />
                </div>
                <div
                  onClick={() =>
                    handleViewClick(
                      data?.bankDetails?.uploadChequeLeaflet?.urlS3
                    )
                  }
                  className=" mx-2 cursor-pointer"
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
  );
};

export default Bank;
