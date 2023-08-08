import React from "react";

const Documents = ({ data, mp4, download, Suffix, pdf, jpg }) => {
  const handleViewClick = (url) => {
    console.log("url :>> ", url);
    window.open(url, "_blank");
  };

  const saveFile = async (url,fileName) => {
    var data = new Blob([url],{type: "application/pdf"});
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
              <p>{data?.document?.professionalDocument?.fileName}</p>
              <span>
                File size is {data?.document?.professionalDocument?.fileSize}
              </span>
            </div>
            <div
              onClick={() =>
                saveFile(
                  data?.document?.professionalDocument?.urlS3,
                  data?.document?.professionalDocument?.fileName
                )
              }
              className="col-1 mr-2 cursor-pointer"
            >
              <img src={download} alt="" />
            </div>
            <div
              onClick={() =>
                handleViewClick(data?.document?.professionalDocument?.urlS3)
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
              <p>{data?.document?.educationQualificationDocument?.fileName}</p>
              <span>
                File size is{" "}
                {data?.document?.educationQualificationDocument?.fileSize}
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
                href={data?.document?.educationQualificationDocument?.urlS3}
                download
                className="download-link"
              >
              <img src={download} alt="" />
              </a>
            </div>
            <div
              onClick={() =>
                handleViewClick(
                  data?.document?.educationQualificationDocument?.urlS3
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
              <p>{data?.document?.proofOfNameChange?.fileName}</p>
              <span>
                File size is {data?.document?.proofOfNameChange?.fileSize}
              </span>
            </div>
            <div className="col-1 mr-2">
              <a
                href={data?.document?.proofOfNameChange?.urlS3}
                download
                className="download-link"
              >
                <img src={download} alt="" />
              </a>
            </div>
            <div
              onClick={() =>
                handleViewClick(data?.document?.proofOfNameChange?.urlS3)
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
              <p>{data?.document?.residentialAddressProof?.fileName}</p>
              <span>
                File size is {data?.document?.residentialAddressProof?.fileSize}
              </span>
            </div>
            <div className="col-1 mr-2">
              <a
                href={data?.document?.residentialAddressProof?.urlS3}
                download
                className="download-link"
              >
                <img src={download} alt="" />
              </a>
            </div>
            <div
              onClick={() =>
                handleViewClick(data?.document?.residentialAddressProof?.urlS3)
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
              <p>{data?.document?.officeAddressProof?.fileName}</p>
              <span>
                File size is {data?.document?.officeAddressProof?.fileSize}
              </span>
            </div>
            <div className="col-1 mr-2">
              <a
                href={data?.document?.officeAddressProof?.urlS3}
                download
                className="download-link"
              >
                <img src={download} alt="" />
              </a>
            </div>
            <div
              onClick={() =>
                handleViewClick(data?.document?.officeAddressProof?.urlS3)
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
