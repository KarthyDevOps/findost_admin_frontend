import moment from "moment";
import React, { useState } from "react";
import { Table, Button } from "react-bootstrap";
import { BsArrowLeft } from "react-icons/bs";
import { history } from "helpers";
import "./style.scss";
import Dropzone from "react-dropzone";
import { RiUploadCloudFill } from "react-icons/ri";
import NoData from "component/common/NoData";
import Loader from "component/common/Loader";
import { Toast } from "service/toast";
import PaginationComponent from "component/common/Pagination";
import { debounce } from "helpers";

const UploadPatientComp = () => {
  const recordSize = 10;
  const FORMAT = "DD/MM/YYYY hh:mm A";
  const [page, setPage] = useState(1);
  const [data, setData] = useState([]);
  const [file, setFile] = useState("");
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState({});
  const [fileNames, setFileNames] = useState([]);

  const handleDrop = acceptedFiles =>
    setFileNames(
      acceptedFiles.map(file => {
        setFile(file);
        return file.name;
      })
    );

  const onSubmit = async () => {
    if (!file) {
      Toast({
        type: "error",
        message: "Please Drop or Upload patient details",
      });
      return;
    }
  };

  const pagination = value => {
    setData([]);
    setPage(value);
  };

  return (
    <>
      <div>
        <span
          className="patient-heading cursor-pointer"
          //onClick={() => history.push("/admin/patient-management")}
          onClick={() => history.goBack()}
        >
          {" "}
          <BsArrowLeft />
          &nbsp;Back to Patient Management{" "}
        </span>
      </div>
      <div className="patient-content">
        <div className="d-flex space-btw">
          <h4>Upload the Patient List </h4>
          <h4 className="download-link">
            <a
              href={""}
              className="download-link text-decoration-none"
              target={"_blank"}
              download={"patient.xlsx"}
            >
              Download Template
            </a>
          </h4>
        </div>
        <div className="row">
          <div className="col-12">
            <Dropzone
              onDrop={handleDrop}
              multiple={false}
              accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,text/plain"
              // minSize={1024}
              // maxSize={3072000}
            >
              {({
                getRootProps,
                getInputProps,
                isDragActive,
                isDragAccept,
                isDragReject,
              }) => {
                const additionalClass = isDragAccept
                  ? "accept"
                  : isDragReject
                  ? "reject"
                  : "";

                return (
                  <div
                    {...getRootProps({
                      className: `dropzone ${additionalClass}`,
                    })}
                  >
                    <input {...getInputProps()} />
                    <span>
                      {isDragActive ? (
                        <RiUploadCloudFill className="upload-icon" />
                      ) : (
                        <RiUploadCloudFill className="upload-icon" />
                      )}
                    </span>
                    <p className="m-0 drag-text">Drag & Drop </p>
                    <b className="drag-text"> or </b>
                    <p className="upload-text">Upload</p>
                  </div>
                );
              }}
            </Dropzone>
          </div>
        </div>

        <div className="role-input">
          <Table responsive="md" className="role-table">
            <thead>
              <tr>
                <th>S.No</th>
                <th>Last Uploaded File</th>
                <th>Uploaded by</th>
                <th>Date & Time</th>
              </tr>
            </thead>
            <tbody>
              {loading?.logLoading && (
                <div className="loader-rel">
                  <Loader
                    loading={loading?.logLoading}
                    className={"loader-align"}
                  />
                </div>
              )}
              {!loading?.logLoading && (!data || data?.length <= 0) && (
                <td colSpan={4}>
                  <NoData />
                </td>
              )}
              {data?.length > 0 &&
                React.Children.toArray(
                  data?.map((item, index) => {
                    if (item) {
                      return (
                        <tr>
                          <td>{index + 1 + (page - 1) * recordSize}</td>
                          <td
                            className="cursor-pointer"
                            onClick={() => {
                              if (item?.originalFileUrl) {
                                window.open(item?.originalFileUrl, "_blank");
                              }
                            }}
                          >
                            {item?.originalFileName}
                          </td>
                          <td>{item.uploadedBy || "Admin"}</td>
                          <td>{moment(item?.createdAt).format(FORMAT)}</td>
                        </tr>
                      );
                    }
                  })
                )}
            </tbody>
          </Table>
          <div className=" d-flex justify-content-start mt-5">
            <PaginationComponent
              active={page}
              paginationChange={pagination}
              paginationConfig={{ totalPages: count }}
            />
          </div>
        </div>
        <div className="txt-right">
          <Button
            className="btn-role-cancel"
            onClick={() => {
              Toast({ type: "error", message: "Cancelled" });
              setTimeout(history.goBack(), 500);
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={debounce(onSubmit)}
            className="btn-role-save"
            disabled={loading?.uploadLoading}
          >
            Upload
          </Button>
        </div>
      </div>
    </>
  );
};

export default UploadPatientComp;
