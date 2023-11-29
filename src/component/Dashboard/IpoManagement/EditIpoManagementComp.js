import React, { useState, useEffect } from "react";
//styles
import "./style.scss";
// images
import cloudIcon from "../../../assets/images/uploadcloud.svg";
import closeIcon from "assets/images/closeIcon.png";
import xlsx from "assets/images/xlsx.png";
import pdfImage from "assets/images/pdfImage.jpg";
// internal components
import FormErrorMessage from "component/common/ErrorMessage";
import NormalButton from "component/common/NormalButton/NormalButton";
import Loader from "component/common/Loader";
// services
import Dropzone from "react-dropzone";
import { uploadImage } from "service/Auth";
import { useForm } from "react-hook-form";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { BsArrowLeft } from "react-icons/bs";
import CustomController from "component/common/Controller";
import CommonDatePicker from "component/common/CommonDatePicker/CommonDatePicker";
import { history } from "helpers";
import moment from "moment";
import { Toast } from "service/toast";
import { updateIpo } from "service/leads";
import SuccessModal from "component/common/DeleteModal/SuccessModal";
import InputBox from "component/common/InputBox/InputBox";

const EditIpoManagementComp = () => {
  const {
    register,
    handleSubmit,
    errors,
    reset,
    control,
    getValues,
    setValue,
  } = useForm({
    mode: "onChange",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [ipoDoc, setIpoDoc] = useState("");
  const [ipoDocument, setIpoDocument] = useState("");
  const [docType, setDocType] = useState("");
  const [modal, setModal] = useState(false);
  const ipoId = JSON.parse(localStorage.getItem("ipoId"));
  const [inputFields, setInputFields] = useState([{ from: "", to: "" }]);

  const handleAddFields = () => {
    setInputFields([...inputFields, { from: "", to: "" }]);
  };

  const handleInputChange = (index, fieldName, value) => {
    setInputFields((prevInputFields) => {
      const newInputFields = [...prevInputFields];
      newInputFields[index][fieldName] = value;
      return newInputFields;
    });
  };

  const handleRemoveFields = (index) => {
    setInputFields((prevInputFields) => {
      const newInputFields = [...prevInputFields];
      newInputFields.splice(index, 1);
      return newInputFields;
    });
  };
  console.log("ipoId", ipoId);

  const handleDrop = async (droppedimage) => {
    try {
      setIsLoading(true);
      let body = new FormData();
      for (let index = 0; index < droppedimage.length; index++) {
        const file = droppedimage[index];
        body.append("data", file);
        let fileType = file?.name.split(".");
        setDocType(fileType[1]);
        let response = await uploadImage(body);
        if (response.status == 200) {
          setIpoDocument(response?.data?.data?.data?.key);
          setIpoDoc(response?.data?.data?.data?.s3URL);
          setIsLoading(false);
        }
      }
    } catch (e) {
      console.log("e :>> ", e);
    }
  };

  console.log("docType", docType);

  const cancelDoc = (e) => {
    e.stopPropagation();
    setIpoDoc(null);
  };

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      const body = {
        ipoisinNumber: ipoId?.ipoisinNumber,
        ipoDoc: ipoDocument,
        ipoDocType: docType,
        allotmnetDate: moment(data?.allotmentDate)
          .startOf("day")
          .format("YYYY-MM-DD HH:mm:ss"),
        refundInitiation: moment(data?.refundInitiation)
          .startOf("day")
          .format("YYYY-MM-DD HH:mm:ss"),
        listingOnExchange: moment(data?.listOnExchange)
          .startOf("day")
          .format("YYYY-MM-DD HH:mm:ss"),
        applicationNo: inputFields,
      };
      const response = await updateIpo(body);
      if (response.status === 200) {
        setModal(true);
        setTimeout(() => {
          setModal(false);
          setLoading(false);
          history.push("/admin/ipo-management");
        }, 2000);
      } else {
        Toast({ type: "error", message: response.data.message });
        setLoading(false);
      }
    } catch (e) {
      setLoading(false);
      console.log("e", e);
    }
  };

  const getIpoDetails = async () => {
    let data = ipoId;
    console.log("dataIPO", data);
    reset({
      refundInitiation:
        data?.refundInitiation &&
        new Date(
          moment(data?.refundInitiation, "YYYY-MM-DD HH:mm:ss").toDate()
        ),
      allotmentDate:
        data?.allotmnetDate &&
        new Date(moment(data?.allotmnetDate, "YYYY-MM-DD HH:mm:ss").toDate()),
      listOnExchange:
        data?.listingOnExchange &&
        new Date(
          moment(data?.listingOnExchange, "YYYY-MM-DD HH:mm:ss").toDate()
        ),
    });
    setIpoDoc(data?.ipoDocS3);
    setDocType(data?.ipoDocType);
    setIpoDocument(data?.ipoDoc);
    setInputFields(data?.applicationNo);
  };

  useEffect(() => {
    if (ipoId) {
      getIpoDetails();
    }
  }, []);

  return (
    <div className="ipo px-5 py-3">
      <div className="d-flex align-items-center">
        <i className="pr-3">
          <BsArrowLeft
            onClick={() => history.goBack()}
            style={{ cursor: "pointer" }}
            size={28}
          />
        </i>
        <p className="ipo_title m-0">IPO Management</p>
      </div>
      <div className="ipo-box my-3">
        <div className="row">
          <div className="col-md-4">
            <label>Refund Initiation</label>
            <div className="date_of_birth">
              <CustomController
                name={"refundInitiation"}
                control={control}
                error={errors.refundInitiation}
                defaultValue={getValues("refundInitiation")}
                rules={{ required: true }}
                messages={{
                  required: "Refund Initiation is Required",
                }}
                render={({ onChange, ...field }) => {
                  return (
                    <CommonDatePicker
                      clientDatePicker
                      name="refundInitiation"
                      {...field}
                      id="date"
                      onChange={(date) => {
                        onChange(date);
                        setValue("refundInitiation", date);
                      }}
                      placeholder="Refund Initiation"
                      minDate={new Date()}
                    />
                  );
                }}
              />
            </div>
          </div>
          <div className="col-md-4">
            <label>Allotment Date</label>
            <div className="date_of_birth">
              <CustomController
                name={"allotmentDate"}
                control={control}
                error={errors.allotmentDate}
                defaultValue={getValues("allotmentDate")}
                rules={{ required: true }}
                messages={{
                  required: "Allotment Date is Required",
                }}
                render={({ onChange, ...field }) => {
                  return (
                    <CommonDatePicker
                      clientDatePicker
                      name="allotmentDate"
                      {...field}
                      id="date"
                      onChange={(date) => {
                        onChange(date);
                        setValue("allotmentDate", date);
                      }}
                      placeholder="Allotment Date"
                      minDate={new Date()}
                    />
                  );
                }}
              />
            </div>
          </div>
          <div className="col-md-4">
            <label>Listing on Exchange</label>
            <div className="date_of_birth">
              <CustomController
                name={"listOnExchange"}
                control={control}
                error={errors.listOnExchange}
                defaultValue={getValues("listOnExchange")}
                rules={{ required: true }}
                messages={{
                  required: "Listing on Exchange is Required",
                }}
                render={({ onChange, ...field }) => {
                  return (
                    <CommonDatePicker
                      clientDatePicker
                      name="listOnExchange"
                      {...field}
                      id="date"
                      onChange={(date) => {
                        onChange(date);
                        setValue("listOnExchange", date);
                      }}
                      placeholder="Listing on Exchange"
                      minDate={new Date()}
                    />
                  );
                }}
              />
            </div>
          </div>
          <div className="col-4 mt-3">
            <label className="product_description">IPO Document (RHP)</label>
            <Dropzone
              onDrop={handleDrop}
              accept=".png, .jpeg, .jpg, .xlsx, .pdf, .doc "
              maxSize={4194304}
              errors={errors}
              {...register("dropZoneField", {
                required: ipoDoc ? false : true,
              })}
            >
              {({ getRootProps, getInputProps }) => (
                <div {...getRootProps({ className: "dropzone" })}>
                  <div className="   ">
                    <input {...getInputProps()} multiple={false} />
                    {ipoDoc && docType === "xlsx" ? (
                      <>
                        <img
                          src={xlsx}
                          alt="Ipo Document"
                          className="preview_image"
                        ></img>
                      </>
                    ) : ipoDoc && docType === "pdf" ? (
                      <>
                        <img
                          src={pdfImage}
                          alt="Ipo Document"
                          className="preview_image"
                        ></img>
                      </>
                    ) : (
                      <>
                        <span className="cloud_icon">
                          <img src={cloudIcon} alt="icon"></img>
                        </span>
                        <p className="drag_text">
                          Drag your files here to start uploading or
                        </p>
                        <div className=" drag_btn ">
                          <NormalButton
                            onClick={(e) => e.preventDefault()}
                            addProductbtn
                            label="Browse"
                          />
                        </div>
                      </>
                    )}
                    {isLoading ? (
                      <Loader
                        loading={isLoading}
                        className="d-flex align-items-center justify-content-center"
                      />
                    ) : (
                      ipoDoc && (
                        <span
                          style={{
                            position: "absolute",
                            top: "10px",
                            right: "10px",
                            cursor: "pointer",
                            zIndex: 1000,
                          }}
                          onClick={cancelDoc}
                        >
                          <AiOutlineCloseCircle
                            size={24}
                            style={{ color: "red" }}
                          />
                        </span>
                      )
                    )}
                  </div>
                </div>
              )}
            </Dropzone>
            {!ipoDoc && (
              <FormErrorMessage
                error={errors.dropZoneField}
                messages={{
                  required: "IPO Document is Required",
                }}
              />
            )}
          </div>
        </div>
        <div className=" my-5">
          <div className="d-flex justify-content-between mb-4">
            <div className="d-flex justify-content-start align-items-center gap-3">
              <p className="title_product pr-3">Application Number</p>
              <p className="title_countt">
                - Balance Count:{" "}
                <span>
                  {ipoId?.balanceApplicationNoCount
                    ? ipoId?.balanceApplicationNoCount
                    : "0"}
                </span>
              </p>
            </div>
            <div className="col-2">
              <NormalButton
                className="loginButton"
                label={"Add"}
                onClick={handleAddFields}
              />
            </div>
          </div>
          <div className="">
            {inputFields?.map((item, index) => (
              <div className="row benefit-box my-2" key={index}>
                <div className="col-6">
                  <label className="Product_description">From</label>
                  <InputBox
                    className="login_input"
                    type={"number"}
                    placeholder="Enter From"
                    name={`applications[${index}].from`}
                    errors={errors}
                    value={item?.from}
                    onChange={(e) =>
                      handleInputChange(index, "from", e.target.value)
                    }
                    // register={register({
                    //   required: true,
                    // })}
                    register={register({
                      required: true,
                      validate: {
                        notInRange: (value) =>
                          inputFields
                            .filter((_, i) => i !== index)
                            .every((field) => {
                              const from = Number(field.from);
                              const to = Number(field.to);
                              return value < from || value > to;
                            }),
                      },
                    })}
                  />
                  <FormErrorMessage
                    error={errors?.applications?.[index]?.from}
                    messages={{
                      required: "From is Required",
                      notInRange : "Application Number Already Used"
                    }}
                  />
                </div>
                {console.log('errors', errors)}
                <div className="col-6">
                  <label className="Product_description">To</label>
                  <InputBox
                    className="login_input"
                    type={"number"}
                    placeholder="Enter To"
                    name={`applications[${index}].to`}
                    errors={errors}
                    value={item?.to}
                    onChange={(e) =>
                      handleInputChange(index, "to", e.target.value)
                    }
                    register={register({
                      required: true,
                      validate: (value) => Number(value) > Number(item?.from),
                    })}
                  />
                  <FormErrorMessage
                    error={errors?.applications?.[index]?.to}
                    messages={{
                      required: "To is Required",
                      validate: "To must be greater than From",
                    }}
                  />
                </div>
                <div className="d-flex justify-content-end">
                  <div
                    onClick={() => handleRemoveFields(index)}
                    className="remove-overlay cursor-pointer"
                  >
                    <img src={closeIcon} alt="Close" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="d-flex justify-content-end mt-4 mb-2 gap-3">
          <div className="col-2">
            <NormalButton
              onClick={() => {
                history.push("/admin/ipo-management");
              }}
              cancel
              label="Cancel"
            />{" "}
          </div>
          <div className="col-2 p-0">
            <NormalButton
              className="loginButton"
              label={"Submit"}
              onClick={handleSubmit(onSubmit)}
              isLoading={loading}
            />
          </div>
        </div>
        <div>
          <SuccessModal
            modalOpen={modal}
            onCancel={() => setModal(false)}
            successMsg={"IPO Details Updated Successfully"}
          />
        </div>
      </div>
    </div>
  );
};

export default EditIpoManagementComp;
