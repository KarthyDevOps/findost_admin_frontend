import React, { useState } from "react";
import { downloadImage } from "service/Auth";

const Documents = ({ data, mp4, download, Suffix, pdf, jpg }) => {
  const [string, setString] = useState("");

  const handleViewClick = (url) => {
    window.open(url, "_blank");
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
      <div className="row">
        <div className="col-4">
          <h1>Professional Document</h1>
          <div className="d-flex flex-noWrap col-12 document-card p-3">
            <div className="col-2 p-0">
              <img src={jpg} alt="" />
            </div>
            <div className="col-7 p-0">
              <p>
                {data?.document?.professionalDocument?.documentPath?.fileName}
              </p>
              <span>
                File size is{" "}
                {data?.document?.professionalDocument?.documentPath?.fileSize}
              </span>
            </div>
            <div
              onClick={() =>
                saveFile(
                  data?.document?.professionalDocument?.documentPath?.url,
                  data?.document?.professionalDocument?.documentPath?.fileName
                )
              }
              className="col-1 mr-2 cursor-pointer"
            >
              <img src={download} alt="" />
            </div>
            <div
              onClick={() =>
                handleViewClick(
                  data?.document?.professionalDocument?.documentPath?.urlS3
                )
              }
              className="col-2 cursor-pointer"
            >
              <img src={Suffix} alt="" />
            </div>
          </div>
          <h1 className="mt-3">Education Qualification Document</h1>
          <div className="d-flex flex-noWrap col-12 document-card p-3">
            <div className="col-2 p-0">
              <img src={pdf} alt="" />
            </div>
            <div className="col-7 p-0">
              <p>
                {
                  data?.document?.educationQualificationDocument?.documentPath
                    ?.fileName
                }
              </p>
              <span>
                File size is{" "}
                {
                  data?.document?.educationQualificationDocument?.documentPath
                    ?.fileSize
                }
              </span>
            </div>
            <div
              onClick={() =>
                saveFile(
                  data?.document?.educationQualificationDocument?.documentPath
                    ?.url,
                  data?.document?.educationQualificationDocument?.documentPath
                    ?.fileName
                )
              }
              className="col-1 mr-2 cursor-pointer"
            >
              <img src={download} alt="" />
            </div>
            <div
              onClick={() =>
                handleViewClick(
                  data?.document?.educationQualificationDocument?.documentPath
                    ?.urlS3
                )
              }
              className="col-2 cursor-pointer"
            >
              <img src={Suffix} alt="" />
            </div>
          </div>
          <br />
          <span>
            * The name in the educational document is different the one in PAN
          </span>
          <br />
          <h1 className="mt-3">Proof of name change</h1>
          <div className="d-flex flex-noWrap col-12 document-card p-3">
            <div className="col-2 p-0">
              <img src={pdf} alt="" />
            </div>
            <div className="col-7 p-0">
              <p>{data?.document?.proofOfNameChange?.documentPath?.fileName}</p>
              <span>
                File size is{" "}
                {data?.document?.proofOfNameChange?.documentPath?.fileSize}
              </span>
            </div>
            <div
              onClick={() =>
                saveFile(
                  data?.document?.proofOfNameChange?.documentPath?.url,
                  data?.document?.proofOfNameChange?.documentPath?.fileName
                )
              }
              className="col-1 mr-2 cursor-pointer"
            >
              <img src={download} alt="" />
            </div>
            <div
              onClick={() =>
                handleViewClick(
                  data?.document?.proofOfNameChange?.documentPath?.urlS3
                )
              }
              className="col-2 cursor-pointer"
            >
              <img src={Suffix} alt="" />
            </div>
          </div>
        </div>
        <div className="col-1"></div>
        <div className="col-4">
          <h1 className="mt-3">Residential Address Proof</h1>
          <div className="d-flex flex-noWrap col-12 document-card p-3">
            <div className="col-2 p-0">
              <img src={pdf} alt="" />
            </div>
            <div className="col-7 p-0">
              <p>
                {
                  data?.document?.residentialAddressProof?.documentPath
                    ?.fileName
                }
              </p>
              <span>
                File size is{" "}
                {
                  data?.document?.residentialAddressProof?.documentPath
                    ?.fileSize
                }
              </span>
            </div>
            <div
              onClick={() =>
                saveFile(
                  data?.document?.residentialAddressProof?.documentPath?.url,
                  data?.document?.residentialAddressProof?.documentPath
                    ?.fileName
                )
              }
              className="col-1 mr-2 cursor-pointer"
            >
              <img src={download} alt="" />
            </div>
            <div
              onClick={() =>
                handleViewClick(
                  data?.document?.residentialAddressProof?.documentPath?.urlS3
                )
              }
              className="col-2 cursor-pointer"
            >
              <img src={Suffix} alt="" />
            </div>
          </div>
          <h1 className="mt-3">Office Address Proof</h1>
          <div className="d-flex flex-noWrap col-12 document-card p-3">
            <div className="col-2 p-0">
              <img src={pdf} alt="" />
            </div>
            <div className="col-7 p-0">
              <p>
                {data?.document?.officeAddressProof?.documentPath?.fileName}
              </p>
              <span>
                File size is{" "}
                {data?.document?.officeAddressProof?.documentPath?.fileSize}
              </span>
            </div>
            <div
              onClick={() =>
                saveFile(
                  data?.document?.officeAddressProof?.documentPath?.url,
                  data?.document?.officeAddressProof?.documentPath?.fileName
                )
              }
              className="col-1 mr-2 cursor-pointer"
            >
              <img src={download} alt="" />
            </div>
            <div
              onClick={() =>
                handleViewClick(
                  data?.document?.officeAddressProof?.documentPath?.urlS3
                )
              }
              className="col-2 cursor-pointer"
            >
              <img src={Suffix} alt="" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Documents;
