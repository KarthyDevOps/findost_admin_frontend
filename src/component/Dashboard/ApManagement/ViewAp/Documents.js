import React, { useState } from "react";
import { Oval } from "react-loader-spinner";
import { downloadImage } from "service/Auth";
import { Tooltip } from "antd";
import "./style.scss";

const Documents = ({
  data,
  mp4,
  download,
  Suffix,
  pdf,
  jpg,
  setloading,
  loading,
}) => {
  const initialState = {
    ProfessionalDocument: false,
    ResidentialAddressProof: false,
    EducationQualificationDocument: false,
    OfficeAddressProof: false,
    Proofofnamechange: false,
  };
  console.log(initialState.ProfessionalDocument);

  const [localStates, setLocalStates] = useState(initialState);
  const handleLocalStates = (stateName, value) => {
    setLocalStates((prevState) => ({ ...prevState, [stateName]: value }));
  };
  const handleViewClick = (url) => {
    window.open(url, "_blank");
  };

  const saveFile = async (url, fileName, Name) => {
    try {
      handleLocalStates(Name, true);
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
        handleLocalStates(Name, false);
      } else {
        console.error("Failed to fetch PDF data.");
        handleLocalStates(Name, false);
      }
    } catch (error) {
      console.error("Error while fetching PDF:", error);
      handleLocalStates(Name, false);
    }
  };

  return (
    <div className="personal-box p-4">
      <div className="row">
        <div className="col-4">
          <h1>Professional Document</h1>
          {data?.document?.professionalDocument?.documentPath?.urlS3 != null ? (
            <div className="d-flex flex-noWrap col-12 document-card p-3">
              {!localStates.ProfessionalDocument ? (
                <>
                  <div className="col-2 p-0">
                    <img src={jpg} alt="" />
                  </div>
                  <div className="col-7 p-0">
                    <Tooltip
                      title={
                        data?.document?.professionalDocument?.documentPath
                          ?.fileName
                      }
                      color={"#fff"}
                      key={"#fff"}
                    >
                      <p className="download_file_name_styles">
                        {
                          data?.document?.professionalDocument?.documentPath
                            ?.fileName
                        }
                      </p>
                    </Tooltip>
                    <span>
                      File size is{" "}
                      {
                        data?.document?.professionalDocument?.documentPath
                          ?.fileSize
                      }
                    </span>
                  </div>
                  <div
                    onClick={() =>
                      saveFile(
                        data?.document?.professionalDocument?.documentPath?.url,
                        data?.document?.professionalDocument?.documentPath
                          ?.fileName,
                        "ProfessionalDocument"
                      )
                    }
                    className="col-1 mr-2 cursor-pointer"
                  >
                    <img src={download} alt="" />
                  </div>
                  <div
                    onClick={() =>
                      handleViewClick(
                        data?.document?.professionalDocument?.documentPath
                          ?.urlS3
                      )
                    }
                    className="col-2 cursor-pointer"
                  >
                    <img src={Suffix} alt="" />
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
          <h1 className="mt-3">Education Qualification Document</h1>
          {data?.document?.educationQualificationDocument?.documentPath
            ?.urlS3 != null ? (
            <div className="d-flex flex-noWrap col-12 document-card p-3">
              {!localStates.EducationQualificationDocument ? (
                <>
                  <div className="col-2 p-0">
                    <img src={pdf} alt="" />
                  </div>
                  <div className="col-7 p-0">
                    <Tooltip
                      title={
                        data?.document?.educationQualificationDocument
                          ?.documentPath?.fileName
                      }
                      color={"#fff"}
                      key={"#fff"}
                    >
                      <p className="download_file_name_styles">
                        {
                          data?.document?.educationQualificationDocument
                            ?.documentPath?.fileName
                        }
                      </p>
                    </Tooltip>
                    <span>
                      File size is{" "}
                      {
                        data?.document?.educationQualificationDocument
                          ?.documentPath?.fileSize
                      }
                    </span>
                  </div>
                  <div
                    onClick={() =>
                      saveFile(
                        data?.document?.educationQualificationDocument
                          ?.documentPath?.url,
                        data?.document?.educationQualificationDocument
                          ?.documentPath?.fileName,
                        "EducationQualificationDocument"
                      )
                    }
                    className="col-1 mr-2 cursor-pointer"
                  >
                    <img src={download} alt="" />
                  </div>
                  <div
                    onClick={() =>
                      handleViewClick(
                        data?.document?.educationQualificationDocument
                          ?.documentPath?.urlS3
                      )
                    }
                    className="col-2 cursor-pointer"
                  >
                    <img src={Suffix} alt="" />
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
          <br />
          <span>
            * The name in the educational document is different the one in PAN
          </span>
          <br />
          <h1 className="mt-3">Proof of name change</h1>
          {data?.document?.proofOfNameChange?.documentPath?.urlS3 != null ? (
            <div className="d-flex flex-noWrap col-12 document-card p-3">
              {!localStates.Proofofnamechange ? (
                <>
                  <div className="col-2 p-0">
                    <img src={pdf} alt="" />
                  </div>
                  <div className="col-7  p-0">
                    <Tooltip
                      title={
                        data?.document?.proofOfNameChange?.documentPath
                          ?.fileName
                      }
                      color={"#fff"}
                      key={"#fff"}
                    >
                      <p className="download_file_name_styles">
                        {
                          data?.document?.proofOfNameChange?.documentPath
                            ?.fileName
                        }
                      </p>
                    </Tooltip>
                    <span>
                      File size is{" "}
                      {
                        data?.document?.proofOfNameChange?.documentPath
                          ?.fileSize
                      }
                    </span>
                  </div>
                  <div
                    onClick={() =>
                      saveFile(
                        data?.document?.proofOfNameChange?.documentPath?.url,
                        data?.document?.proofOfNameChange?.documentPath
                          ?.fileName,
                        "Proofofnamechange"
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
        <div className="col-1"></div>
        <div className="col-4">
          <h1 className="mt-3">Residential Address Proof</h1>
          {data?.document?.residentialAddressProof?.documentPath?.urlS3 !=
          null ? (
            <div className="d-flex flex-noWrap col-12 document-card p-3">
              {!localStates.ResidentialAddressProof ? (
                <>
                  <div className="col-2 p-0">
                    <img src={pdf} alt="" />
                  </div>
                  <div className="col-7 p-0">
                    <Tooltip
                      title={
                        data?.document?.residentialAddressProof?.documentPath
                          ?.fileName
                      }
                      color={"#fff"}
                      key={"#fff"}
                    >
                      <p className="download_file_name_styles">
                        {
                          data?.document?.residentialAddressProof?.documentPath
                            ?.fileName
                        }
                      </p>
                    </Tooltip>
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
                        data?.document?.residentialAddressProof?.documentPath
                          ?.url,
                        data?.document?.residentialAddressProof?.documentPath
                          ?.fileName,
                        "ResidentialAddressProof"
                      )
                    }
                    className="col-1 mr-2 cursor-pointer"
                  >
                    <img src={download} alt="" />
                  </div>
                  <div
                    onClick={() =>
                      handleViewClick(
                        data?.document?.residentialAddressProof?.documentPath
                          ?.urlS3
                      )
                    }
                    className="col-2 cursor-pointer"
                  >
                    <img src={Suffix} alt="" />
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
          <h1 className="mt-3">Office Address Proof</h1>
          {data?.document?.officeAddressProof?.documentPath?.urlS3 != null ? (
            <div className="d-flex flex-noWrap col-12 document-card p-3">
              {!localStates.OfficeAddressProof ? (
                <>
                  <div className="col-2 p-0">
                    <img src={pdf} alt="" />
                  </div>
                  <div className="col-7 p-0">
                    <Tooltip
                      title={
                        data?.document?.officeAddressProof?.documentPath
                          ?.fileName
                      }
                      color={"#fff"}
                      key={"#fff"}
                    >
                      <p className="download_file_name_styles">
                        {
                          data?.document?.officeAddressProof?.documentPath
                            ?.fileName
                        }
                      </p>
                    </Tooltip>
                    <span>
                      File size is{" "}
                      {
                        data?.document?.officeAddressProof?.documentPath
                          ?.fileSize
                      }
                    </span>
                  </div>
                  <div
                    onClick={() =>
                      saveFile(
                        data?.document?.officeAddressProof?.documentPath?.url,
                        data?.document?.officeAddressProof?.documentPath
                          ?.fileName,
                        "OfficeAddressProof"
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
  );
};

export default Documents;
