import React from "react";

const Documents = ({ data, mp4, download, Suffix, pdf, jpg }) => {
  const handleViewClick = (url) => {
    console.log("url :>> ", url);
    window.open(url, "_blank");
  };

  const saveFile = async (url, fileName) => {
    var data = new Blob([url], { type: "application/pdf" });
    var csvURL = window.URL.createObjectURL(data);
    const tempLink = document.createElement("a");
    tempLink.href = csvURL;
    tempLink.target = "_blank";
    tempLink.setAttribute("download", `${fileName}.pdf`);
    tempLink.click();

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
              <p>{data?.document?.professionalDocument?.documentPath?.fileName}</p>
              <span>
                File size is {data?.document?.professionalDocument?.documentPath?.fileSize}
              </span>
            </div>
            <div
              onClick={() =>
                saveFile(
                  data?.document?.professionalDocument?.documentPath?.urlS3,
                  data?.document?.professionalDocument?.documentPath?.fileName
                )
              }
              className="col-1 mr-2 cursor-pointer"
            >
              <img src={download} alt="" />
            </div>
            <div
              onClick={() =>
                handleViewClick(data?.document?.professionalDocument?.documentPath?.urlS3)
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
              <p>{data?.document?.educationQualificationDocument?.documentPath?.fileName}</p>
              <span>
                File size is{" "}
                {data?.document?.educationQualificationDocument?.documentPath?.fileSize}
              </span>
            </div>
            <div
              // onClick={() =>
              //   saveFile(
              //     data?.document?.educationQualificationDocument?.urlS3,
              //     data?.document?.educationQualificationDocument?.urlS3
              //   )
              // }
              className="col-1 mr-2"
            >
              <a
                href={data?.document?.educationQualificationDocument?.documentPath?.urlS3}
                download={data?.document?.educationQualificationDocument?.documentPath?.urlS3}
                target="_blank"
                className="download-link"
              >
                <img src={download} alt="" />
              </a>
            </div>
            <div
              onClick={() =>
                handleViewClick(
                  data?.document?.educationQualificationDocument?.documentPath?.urlS3
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
                File size is {data?.document?.proofOfNameChange?.documentPath?.fileSize}
              </span>
            </div>
            <div className="col-1 mr-2">
              <a
                href={data?.document?.proofOfNameChange?.documentPath?.urlS3}
                download={data?.document?.proofOfNameChange?.documentPath?.urlS3}
                target="_blank"
                className="download-link"
              >
                <img src={download} alt="" />
              </a>
            </div>
            <div
              onClick={() =>
                handleViewClick(data?.document?.proofOfNameChange?.documentPath?.urlS3)
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
              <p>{data?.document?.residentialAddressProof?.documentPath?.fileName}</p>
              <span>
                File size is {data?.document?.residentialAddressProof?.documentPath?.fileSize}
              </span>
            </div>
            <div className="col-1 mr-2">
              <a
                href={data?.document?.residentialAddressProof?.documentPath?.urlS3}
                download={data?.document?.residentialAddressProof?.documentPath?.urlS3}
                target="_blank"
                className="download-link"
              >
                <img src={download} alt="" />
              </a>
            </div>
            <div
              onClick={() =>
                handleViewClick(data?.document?.residentialAddressProof?.documentPath?.urlS3)
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
              <p>{data?.document?.officeAddressProof?.documentPath?.fileName}</p>
              <span>
                File size is {data?.document?.officeAddressProof?.documentPath?.fileSize}
              </span>
            </div>
            <div className="col-1 mr-2">
              <a
                href={data?.document?.officeAddressProof?.documentPath?.urlS3}
                download={data?.document?.officeAddressProof?.documentPath?.urlS3}
                target="_blank"
                className="download-link"
              >
                <img src={download} alt="" />
              </a>
            </div>
            <div
              onClick={() =>
                handleViewClick(data?.document?.officeAddressProof?.documentPath?.urlS3)
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
