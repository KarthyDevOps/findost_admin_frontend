import React, { useEffect, useState } from "react";
import { Button, Modal } from "antd";
import InputBox from "component/common/InputBox/InputBox";
import FormErrorMessage from "component/common/ErrorMessage";
import closeIcon from "assets/images/closeIcon.png";
import NormalButton from "component/common/NormalButton/NormalButton";
import CustomController from "component/common/Controller";
import NormalMultiSelect from "component/common/NormalMultiSelect";
import CommonDatePicker from "component/common/CommonDatePicker/CommonDatePicker";
import Dropzone from "react-dropzone";
import TextEditor from "component/common/TextEditor/TextEditor";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { uploadImage } from "service/Auth";
import Loader from "component/common/Loader";
import { history } from "helpers";
import { Toast } from "service/toast";
import { addProductDetails, updateProductDetails } from "service/Cms";
import { useForm } from "react-hook-form";
import moment from "moment";

const ProductPopup = ({
  successMsg,
  modalOpen,
  onCancel,
  productType,
  setIcon,
  icon,
  newIcon,
  setNewIcon,
  aboutUs,
  setAboutUs,
  keyFeature,
  setKeyFeature,
  otherBenefit,
  setOtherBenefit,
  policyDoc,
  setPolicyDoc,
  policyNotCover,
  setPolicyNotCover,
  description,
  setDescription,
  editPopup,
  productData,
  setEditPopup,
  getDetails,
}) => {
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
  const [image, setImage] = useState("");
  const [newImage, setNewImage] = useState("");
  const [brochure, setBrochure] = useState("");
  const [brochureImage, setBrochureImage] = useState("");
  const [brochureLoad, setBrochureLoad] = useState(false);
  const [loading, setLoading] = useState(false);
  const [load, setLoad] = useState(false);
  const [reference, setReference] = useState([{ title: "", video: "" }]);

  const insuranceType = [
    { label: "Term Insurance", value: "Term Insurance" },
    { label: "Whole Life Insurance", value: "Whole Life Insurance" },
    { label: "Money Back Policy", value: "Money Back Policy" },
    { label: "Annuity Plans", value: "Annuity Plans" },
    {
      label: "Unit Linked Life Insurance",
      value: "Unit Linked Life Insurance",
    },
    { label: "Endownment Policy", value: "Endownment Policy" },
    { label: "Child Plans", value: "Child Plans" },
  ];

  const status = [
    { label: "Ongoing", value: "Ongoing" },
    { label: "Upcoming", value: "Upcoming" },
  ];

  const loans = [
    { label: "Business Loan", value: "Business Loan" },
    { label: "Vehicle Loan", value: "Vehicle Loan" },
    { label: "Education Loan", value: "Education Loan" },
    { label: "Gold Loan", value: "Gold Loan" },
    { label: "Housing Loan", value: "Housing Loan" },
  ];

  const fixedIncome = [
    { label: "Retirement Plans", value: "Retirement Plans" },
    { label: "Bonds", value: "Bonds" },
    { label: "PPF", value: "PPF" },
    { label: "Fixed Deposit", value: "Fixed Deposit" },
    { label: "G-sec", value: "G-sec" },
  ];

  const insurance = [
    { label: "Life Insurance", value: "Life Insurance" },
    { label: "Health Insurance", value: "Health Insurance" },
    { label: "Commercial Insurance", value: "Commercial Insurance" },
    { label: "Home Insurance", value: "Home Insurance" },
    { label: "Vehicle Insurance", value: "Vehicle Insurance'" },
  ];

  const addReference = () => {
    setReference([...reference, { title: "", video: "" }]);
  };

  const removeReference = (index) => {
    const updatedReference = reference.filter((_, i) => i !== index);
    setReference(updatedReference);
  };

  const handleDropImage = async (droppedimage) => {
    try {
      setLoad(true);
      let body = new FormData();
      for (let index = 0; index < droppedimage.length; index++) {
        const file = droppedimage[index];
        body.append("data", file);
        let response = await uploadImage(body);
        if (response.status == 200) {
          setNewImage(response?.data?.data?.data?.key);
          setImage(response?.data?.data?.data?.s3URL);
          setLoad(false);
        }
      }
    } catch (e) {
      console.log("e :>> ", e);
    }
  };

  const handleDropBrochure = async (droppedimage) => {
    try {
      setBrochureLoad(true);
      let body = new FormData();
      for (let index = 0; index < droppedimage.length; index++) {
        const file = droppedimage[index];
        body.append("data", file);
        let response = await uploadImage(body);
        if (response.status == 200) {
          setBrochureImage(response?.data?.data?.data?.key);
          setBrochure(response?.data?.data?.data?.s3URL);
          setBrochureLoad(false);
        }
      }
    } catch (e) {
      console.log("e :>> ", e);
    }
  };

  const handleDrop = async (droppedimage) => {
    try {
      setLoading(true);
      let body = new FormData();
      for (let index = 0; index < droppedimage.length; index++) {
        const file = droppedimage[index];
        body.append("data", file);
        let response = await uploadImage(body);
        if (response.status == 200) {
          setNewIcon(response?.data?.data?.data?.key);
          setIcon(response?.data?.data?.data?.s3URL);
          setLoading(false);
        }
      }
    } catch (e) {
      console.log("e :>> ", e);
    }
  };

  const cancelIcon = (e) => {
    e.stopPropagation();
    setIcon(null);
  };
  const cancelImage = (e) => {
    e.stopPropagation();
    setImage(null);
  };
  const cancelBrochure = (e) => {
    e.stopPropagation();
    setBrochure(null);
  };

  const OnDetailsSubmit = async (data) => {
    // validation for text editor
    if (productType === "insurance") {
      if (aboutUs.replace(/(\<\w*\/?\w*>)/g, "").trim() == "") {
        Toast({ type: "error", message: "About Us is Required" });
        return;
      }
      if (keyFeature.replace(/(\<\w*\/?\w*>)/g, "").trim() == "") {
        Toast({ type: "error", message: "key Feature is Required" });
        return;
      }
      if (otherBenefit.replace(/(\<\w*\/?\w*>)/g, "").trim() == "") {
        Toast({ type: "error", message: "Other Benefit is Required" });
        return;
      }
      if (policyDoc.replace(/(\<\w*\/?\w*>)/g, "").trim() == "") {
        Toast({ type: "error", message: "policy Doc is Required" });
        return;
      }
      if (policyNotCover.replace(/(\<\w*\/?\w*>)/g, "").trim() == "") {
        Toast({ type: "error", message: "policy Do Not Cover is Required" });
        return;
      }
    } else if (
      productType === "loan" ||
      productType === "portfolioManagementSystem" ||
      productType === " portfolioAnalyserAndOptimizer" ||
      productType === "AlgoTradingPlatform" ||
      productType === "fixedIncome"
    ) {
      if (description.replace(/(\<\w*\/?\w*>)/g, "").trim() == "") {
        Toast({ type: "error", message: "Description is Required" });
        return;
      }
    } else {
    }

    try {
      let body;
      if (productType === "sovereign gold bonds") {
        body = {
          schemeName: data?.schemeName,
          icon: newIcon,
          productType: "goldBond",
          subscriptionFrom: moment(data?.subscriptionFrom)
            .startOf("day")
            .format("YYYY-MM-DD HH:mm:ss"),
          subscriptionTo: moment(data?.subscriptionTo)
            .startOf("day")
            .format("YYYY-MM-DD HH:mm:ss"),
          status: data?.status,
          price: data?.price,
          maxLimit: data?.maxLimit,
          dateOfIssue: moment(data?.dateOfIssue)
            .startOf("day")
            .format("YYYY-MM-DD HH:mm:ss"),
        };
      } else if (productType === "insurance") {
        body = {
          schemeName: data?.schemeName,
          icon: newIcon,
          productType: productType,
          planType: data?.planType,
          companyName: data?.companyName,
          insuranceType: data?.insuranceType,
          insurancePlan: data?.insurancePlan,
          lifeCover: data?.lifeCover,
          claimSettle: data?.claimsSettle,
          coverUpto: moment(data?.coverUpto)
            .startOf("day")
            .format("YYYY-MM-DD HH:mm:ss"),
          aboutUs: aboutUs,
          keyFuture: keyFeature,
          otherBenefits: otherBenefit,
          policyDoesNotCover: policyNotCover,
          policyDoc: policyDoc,
        };
      } else if (productType === "fixedIncome" || productType === "loan") {
        body = {
          schemeName: data?.schemeName,
          icon: newIcon,
          productType: productType,
          planType: data?.planType,
          rateOfInterest: data?.rateOfInterest,
          description: description,
          reference: reference,
          brochure: brochureImage,
        };
      } else if (productType === "portfolioManagementSystem") {
        body = {
          schemeName: data?.schemeName,
          icon: newIcon,
          productType: "pms",
          description: description,
          image: newImage,
          brochure: brochureImage,
        };
      } else if (productType === " portfolioAnalyserAndOptimizer") {
        body = {
          schemeName: data?.schemeName,
          icon: newIcon,
          productType: "portfolio",
          description: description,
          reference: reference,
          image: newImage,
          brochure: brochureImage,
        };
      } else if (productType === "AlgoTradingPlatform") {
        body = {
          schemeName: data?.schemeName,
          icon: newIcon,
          productType: "algoTrading",
          description: description,
          reference: reference,
          image: newImage,
          brochure: brochureImage,
        };
      }
      console.log("body", body);
      if (editPopup) {
        const response = await updateProductDetails(productData?._id, body);
        if (response.status === 200) {
          Toast({ type: "success", message: response.data.message });
          resetValues();
          setEditPopup(false);
          onCancel();
          if (productType === "sovereign gold bonds") {
            getDetails(1, "goldBond");
          } else if (productType === " portfolioAnalyserAndOptimizer") {
            getDetails(1, "portfolio");
          } else if (productType === "AlgoTradingPlatform") {
            getDetails(1, "algoTrading");
          } else if (productType === "portfolioManagementSystem") {
            getDetails(1, "pms");
          } else {
            getDetails(1, productType);
          }
        } else {
          Toast({ type: "error", message: response.data.message });
        }
      } else {
        const response = await addProductDetails(body);
        if (response.status === 200) {
          Toast({ type: "success", message: response.data.message });
          resetValues();
          onCancel();
          if (productType === "sovereign gold bonds") {
            getDetails(1, "goldBond");
          } else if (productType === " portfolioAnalyserAndOptimizer") {
            getDetails(1, "portfolio");
          } else if (productType === "AlgoTradingPlatform") {
            getDetails(1, "algoTrading");
          } else if (productType === "portfolioManagementSystem") {
            getDetails(1, "pms");
          } else {
            getDetails(1, productType);
          }
        } else {
          Toast({ type: "error", message: response.data.message });
        }
      }
    } catch (e) {
      console.log("e", e);
    }
  };

  const resetValues = () => {
    reset({
      schemeName: "",
      icon: "",
      planType: "",
      companyName: "",
      insuranceType: "",
      insurancePlan: "",
      lifeCover: "",
      coverUpto: "",
      claimsSettle: "",
      aboutUs: "",
      keyFeature: "",
      otherBenefits: "",
      policyNotCover: "",
      policyDoc: "",
      status: "",
      price: "",
      maxLimit: "",
      dateOfIssue: "",
      subscriptionFrom: "",
      subscriptionTo: "",
      description: "",
      rateOfInterest: "",
    });
    setIcon(null);
    setImage(null);
    setBrochure(null);
    reference.length = 0;
  };

  const setProductValues = () => {
    let data = productData;
    reset({
      schemeName: data?.schemeName,
      icon: data?.icon,
      planType: data?.planType,
      companyName: data?.companyName,
      insuranceType: data?.insuranceType,
      insurancePlan: data?.insurancePlan,
      lifeCover: data?.lifeCover,
      coverUpto: new Date(
        moment(data?.coverUpto, "YYYY-MM-DD HH:mm:ss").toDate()
      ),
      claimsSettle: data?.claimSettle,
      aboutUs: data?.aboutUs,
      keyFeature: data?.keyFuture,
      otherBenefits: data?.otherBenefits,
      policyNotCover: data?.policyDoesNotCover,
      policyDoc: data?.policyDoc,
      description: data?.description,
      subscriptionFrom: new Date(
        moment(data?.subscriptionFrom, "YYYY-MM-DD HH:mm:ss").toDate()
      ),
      subscriptionTo: new Date(
        moment(data?.subscriptionTo, "YYYY-MM-DD HH:mm:ss").toDate()
      ),
      status: data?.status,
      price: data?.price,
      maxLimit: data?.maxLimit,
      rateOfInterest: data?.rateOfInterest,
      dateOfIssue: new Date(
        moment(data?.dateOfIssue, "YYYY-MM-DD HH:mm:ss").toDate()
      ),
    });
    setIcon(data?.iconS3);
    setNewIcon(data?.icon);
    setBrochure(data?.brochureS3);
    setBrochureImage(data?.brochure);
    setImage(data?.imageS3);
    setNewImage(data?.image);
    setAboutUs(data?.aboutUs);
    setKeyFeature(data?.keyFuture);
    setOtherBenefit(data?.otherBenefits);
    setPolicyDoc(data?.policyDoc);
    setPolicyNotCover(data?.policyDoesNotCover);
    setDescription(data?.description);
    setReference(data?.reference);
  };

  useEffect(() => {
    if (editPopup) {
      setProductValues();
    }
  }, [editPopup]);

  return (
    <Modal
      open={modalOpen}
      centered={false}
      width={1200}
      closable={false}
      onCancel={onCancel}
      maskClosable={false}
    >
      <div className="addProduct ">
        <div className="p-2">
          <div className="d-flex align-items-center justify-content-between">
            <p className="title_product"> Add Product Details</p>
            <div className="d-flex justify-content-end">
              <div
                onClick={() => {
                  resetValues();
                  onCancel();
                }}
                className="remove-overlay cursor-pointer"
              >
                <img src={closeIcon} alt="Close" />
              </div>
            </div>
          </div>
          {console.log("errors", errors)}
          <div className="row">
            <div className="col-3">
              <label className="Product_description"> Scheme Name</label>
              <InputBox
                className="login_input"
                type={"text"}
                placeholder="Enter Scheme Name"
                name="schemeName"
                errors={errors}
                register={register({
                  required: true,
                  pattern: /^(?!\s*$).+/,
                })}
              />
              <FormErrorMessage
                error={errors.schemeName}
                messages={{
                  required: "Scheme Name is Required",
                  pattern: "Please Enter a Valid Scheme Name",
                }}
              />
            </div>
            <div className="col-3">
              <label className="Product_description">Icon</label>
              <Dropzone
                onDrop={handleDrop}
                accept=".png, .jpeg, .jpg, .mp4"
                maxSize={3072000}
                errors={errors}
                {...register("Icon", {
                  required: newIcon && icon ? false : true,
                })}
              >
                {({ getRootProps, getInputProps }) => (
                  <div {...getRootProps({ className: "dropzone" })}>
                    <div className="">
                      <input {...getInputProps()} multiple={false} />
                      {icon ? (
                        <>
                          <img
                            src={icon}
                            alt="Icon"
                            className="preview_image"
                          ></img>
                        </>
                      ) : (
                        <>
                          <div className="drag_btn">
                            <NormalButton
                              onClick={(e) => e.preventDefault()}
                              label="Browse"
                              className="browse-button"
                            />
                          </div>
                        </>
                      )}
                      {loading ? (
                        <Loader
                          loading={loading}
                          className="d-flex align-items-center justify-content-center"
                        />
                      ) : (
                        icon && (
                          <span
                            style={{
                              position: "absolute",
                              top: "10px",
                              right: "10px",
                              cursor: "pointer",
                              zIndex: 1000,
                            }}
                            onClick={cancelIcon}
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
              {(!newIcon || !icon) && (
                <FormErrorMessage
                  error={errors.Icon}
                  messages={{
                    required: "Product icon is Required",
                  }}
                />
              )}
            </div>
            {(productType === "portfolioManagementSystem" ||
              productType === " portfolioAnalyserAndOptimizer" ||
              productType === "AlgoTradingPlatform") && (
              <div className="col-3">
                <label className="Product_description">Image</label>
                <Dropzone
                  onDrop={handleDropImage}
                  accept=".png, .jpeg, .jpg"
                  maxSize={3072000}
                  errors={errors}
                  {...register("Image", {
                    required: newImage && image ? false : true,
                  })}
                >
                  {({ getRootProps, getInputProps }) => (
                    <div {...getRootProps({ className: "dropzone" })}>
                      <div className="">
                        <input {...getInputProps()} multiple={false} />
                        {image ? (
                          <>
                            <img
                              src={image}
                              alt="image__"
                              className="preview_image"
                            ></img>
                          </>
                        ) : (
                          <>
                            <div className="drag_btn">
                              <NormalButton
                                onClick={(e) => e.preventDefault()}
                                label="Browse"
                                className="browse-button"
                              />
                            </div>
                          </>
                        )}
                        {load ? (
                          <Loader
                            loading={load}
                            className="d-flex align-items-center justify-content-center"
                          />
                        ) : (
                          image && (
                            <span
                              style={{
                                position: "absolute",
                                top: "10px",
                                right: "10px",
                                cursor: "pointer",
                                zIndex: 1000,
                              }}
                              onClick={cancelImage}
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
                {(!newImage || !image)&& (
                  <FormErrorMessage
                    error={errors.Image}
                    messages={{
                      required: "Image is Required",
                    }}
                  />
                )}
              </div>
            )}
            {(productType === "portfolioManagementSystem" ||
              productType === " portfolioAnalyserAndOptimizer" ||
              productType === "AlgoTradingPlatform" ||
              productType === "loan" ||
              productType === "fixedIncome") && (
              <div className="col-3">
                <label className="Product_description">Share Brochure</label>
                <Dropzone
                  onDrop={handleDropBrochure}
                  accept=".png, .jpeg, .jpg, .doc, .pdf"
                  maxSize={3072000}
                  errors={errors}
                  {...register("brochure", {
                    required: brochureImage && brochure ? false : true,
                  })}
                >
                  {({ getRootProps, getInputProps }) => (
                    <div {...getRootProps({ className: "dropzone" })}>
                      <div className="">
                        <input {...getInputProps()} multiple={false} />
                        {brochure ? (
                          <>
                            <img
                              src={brochure}
                              alt="image__"
                              className="preview_image"
                            ></img>
                          </>
                        ) : (
                          <>
                            <div className="drag_btn">
                              <NormalButton
                                onClick={(e) => e.preventDefault()}
                                label="Browse"
                                className="browse-button"
                              />
                            </div>
                          </>
                        )}
                        {brochureLoad ? (
                          <Loader
                            loading={brochureLoad}
                            className="d-flex align-items-center justify-content-center"
                          />
                        ) : (
                          brochure && (
                            <span
                              style={{
                                position: "absolute",
                                top: "10px",
                                right: "10px",
                                cursor: "pointer",
                                zIndex: 1000,
                              }}
                              onClick={cancelBrochure}
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
                {(!brochureImage || !brochure) && (
                  <FormErrorMessage
                    error={errors.brochure}
                    messages={{
                      required: "Share Brochure is Required",
                    }}
                  />
                )}
              </div>
            )}
            {productType === "sovereign gold bonds" && (
              <>
                <div className="col-md-3">
                  <label>Subscription From</label>
                  <div className="date_of_birth">
                    <CustomController
                      name={"subscriptionFrom"}
                      control={control}
                      error={errors.subscriptionFrom}
                      defaultValue={getValues("subscriptionFrom")}
                      rules={{ required: true }}
                      messages={{
                        required: "Subscription From is Required",
                      }}
                      render={({ onChange, ...field }) => {
                        return (
                          <CommonDatePicker
                            clientDatePicker
                            name="subscriptionFrom"
                            {...field}
                            id="date"
                            onChange={(date) => {
                              onChange(date);
                              setValue("subscriptionFrom", date);
                            }}
                            placeholder="Select Subscription From"
                            // minDate={new Date()}
                          />
                        );
                      }}
                    />
                  </div>
                </div>
                <div className="col-md-3">
                  <label>Subscription To</label>
                  <div className="date_of_birth">
                    <CustomController
                      name={"subscriptionTo"}
                      control={control}
                      error={errors.subscriptionTo}
                      defaultValue={getValues("subscriptionTo")}
                      rules={{ required: true }}
                      messages={{
                        required: "Subscription To is Required",
                      }}
                      render={({ onChange, ...field }) => {
                        return (
                          <CommonDatePicker
                            clientDatePicker
                            name="subscriptionTo"
                            {...field}
                            id="date"
                            onChange={(date) => {
                              onChange(date);
                              setValue("subscriptionTo", date);
                            }}
                            placeholder="Select Subscription To"
                            // minDate={new Date()}
                          />
                        );
                      }}
                    />
                  </div>
                </div>
                <div class="col-3">
                  <label className="Product_description">Status</label>
                  <CustomController
                    name={"status"}
                    control={control}
                    error={errors?.status}
                    defaultValue={getValues("status")}
                    rules={{ required: true }}
                    messages={{ required: "Status is Required" }}
                    render={({ onChange, ...fields }) => {
                      return (
                        <NormalMultiSelect
                          {...fields}
                          placeholder={"Select Status"}
                          options={status}
                          name="status"
                          key={getValues("status")}
                          handleChange={(e, { value } = {}) => {
                            onChange(value);
                            setValue("status", value);
                          }}
                        />
                      );
                    }}
                  />
                </div>
                {console.log('getValues("status")', getValues("status"))}
                <div className="col-3">
                  <label className="Product_description">Price</label>
                  <InputBox
                    className="login_input"
                    type={"number"}
                    placeholder="Enter Price"
                    name="price"
                    errors={errors}
                    register={register({
                      required: true,
                      pattern: /^(?!\s*$).+/,
                    })}
                  />
                  <FormErrorMessage
                    error={errors.price}
                    messages={{
                      required: "Price is Required",
                      pattern: "Please Enter a Valid Price",
                    }}
                  />
                </div>
                <div className="col-3">
                  <label className="Product_description">Max Limit</label>
                  <InputBox
                    className="login_input"
                    type={"text"}
                    placeholder="Enter Max Limit"
                    name="maxLimit"
                    errors={errors}
                    register={register({
                      required: true,
                      pattern: /^(?!\s*$).+/,
                    })}
                  />
                  <FormErrorMessage
                    error={errors.maxLimit}
                    messages={{
                      required: "Max Limit is Required",
                      pattern: "Please Enter a Valid Max Limit",
                    }}
                  />
                </div>
                <div className="col-md-3">
                  <label className="Product_description">Date of Issue</label>
                  <div className="date_of_birth">
                    <CustomController
                      name={"dateOfIssue"}
                      control={control}
                      error={errors.dateOfIssue}
                      defaultValue={getValues("dateOfIssue")}
                      rules={{ required: true }}
                      messages={{
                        required: "Date Of Issue is Required",
                      }}
                      render={({ onChange, ...field }) => {
                        return (
                          <CommonDatePicker
                            clientDatePicker
                            name="date"
                            {...field}
                            id="date"
                            onChange={(date) => {
                              onChange(date);
                              setValue("dateOfIssue", date);
                            }}
                            placeholder="Select Date of Issue"
                            minDate={new Date()}
                          />
                        );
                      }}
                    />
                  </div>
                </div>
              </>
            )}

            {(productType === "insurance" ||
              productType === "fixedIncome" ||
              productType === "loan") && (
              <>
                <div class="col-3" style={{ zIndex: 100 }}>
                  <label className="Product_description">Plan Type</label>
                  <CustomController
                    name={"planType"}
                    control={control}
                    error={errors?.planType}
                    defaultValue={getValues("planType")}
                    rules={{ required: true }}
                    messages={{ required: "Plan Type is Required" }}
                    render={({ onChange, ...fields }) => {
                      return (
                        <NormalMultiSelect
                          {...fields}
                          placeholder={"Select Plan Type"}
                          options={
                            productType === "insurance"
                              ? insurance
                              : productType === "fixedIncome"
                              ? fixedIncome
                              : loans
                          }
                          name="planType"
                          key={getValues("planType")}
                          // value={getValues("planType")}
                          handleChange={(e, { value } = {}) => {
                            onChange(value);
                            setValue("planType", value);
                          }}
                        />
                      );
                    }}
                  />
                </div>
              </>
            )}
            {console.log('getValues("planType")', getValues("planType"))}
            {(productType === "fixedIncome" || productType === "loan") && (
              <>
                <div className="col-3">
                  <label className="Product_description">
                    Rate of Interest
                  </label>
                  <InputBox
                    className="login_input"
                    type={"number"}
                    placeholder="Enter Rate of Interest"
                    name="rateOfInterest"
                    errors={errors}
                    register={register({
                      required: true,
                      pattern: /^(?!\s*$).+/,
                    })}
                  />
                  <FormErrorMessage
                    error={errors.rateOfInterest}
                    messages={{
                      required: "Rate Of Interest is Required",
                      pattern: "Please Enter a Valid Rate Of Interest",
                    }}
                  />
                </div>
              </>
            )}
            {productType === "insurance" && (
              <>
                <div className="col-3">
                  <label className="Product_description">Company Name</label>
                  <InputBox
                    className="login_input"
                    type={"text"}
                    placeholder="Enter Company Name"
                    name="companyName"
                    errors={errors}
                    register={register({
                      required: true,
                      pattern: /^(?!\s*$).+/,
                    })}
                  />
                  <FormErrorMessage
                    error={errors.companyName}
                    messages={{
                      required: "Company Name is Required",
                      pattern: "Please Enter a Valid Company Name",
                    }}
                  />
                </div>
                <div class="col-3" style={{ zIndex: 100 }}>
                  <label className="Product_description">Insurance Type</label>
                  <CustomController
                    name={"insuranceType"}
                    control={control}
                    error={errors?.insuranceType}
                    defaultValue={getValues("insuranceType")}
                    rules={{ required: true }}
                    messages={{ required: "Insurance Type is Required" }}
                    render={({ onChange, ...fields }) => {
                      return (
                        <NormalMultiSelect
                          {...fields}
                          placeholder={"Select Insurance Type"}
                          options={insuranceType}
                          name="insuranceType"
                          key={getValues("insuranceType")}
                          // value={getValues("insuranceType")}
                          handleChange={(e, { value } = {}) => {
                            onChange(value);
                            setValue("insuranceType", value);
                          }}
                        />
                      );
                    }}
                  />
                </div>
                <div class="col-3" style={{ zIndex: 100 }}>
                  <label className="Product_description">Insurance Plan</label>
                  <CustomController
                    name={"insurancePlan"}
                    control={control}
                    error={errors?.insurancePlan}
                    defaultValue={getValues("insurancePlan")}
                    rules={{ required: true }}
                    messages={{ required: "Insurance Plan is Required" }}
                    render={({ onChange, ...fields }) => {
                      return (
                        <NormalMultiSelect
                          {...fields}
                          placeholder={"Select Insurance Plan"}
                          options={insurance}
                          name="insurancePlan"
                          key={getValues("insurancePlan")}
                          // value={getValues("insurancePlan")}
                          handleChange={(e, { value } = {}) => {
                            onChange(value);
                            setValue("insurancePlan", value);
                          }}
                        />
                      );
                    }}
                  />
                </div>
                <div className="col-3">
                  <label className="Product_description">Life Cover</label>
                  <InputBox
                    className="login_input"
                    type={"text"}
                    placeholder="Enter Life Cover"
                    name="lifeCover"
                    errors={errors}
                    register={register({
                      required: true,
                      pattern: /^(?!\s*$).+/,
                    })}
                  />
                  <FormErrorMessage
                    error={errors.lifeCover}
                    messages={{
                      required: "Life Cover is Required",
                      pattern: "Please Enter a Valid Life Cover",
                    }}
                  />
                </div>
                <div className="col-3">
                  <label className="Product_description">Claims Settle</label>
                  <InputBox
                    className="login_input"
                    type={"text"}
                    placeholder="Enter Claims Settle"
                    name="claimsSettle"
                    errors={errors}
                    register={register({
                      required: true,
                      pattern: /^(?!\s*$).+/,
                    })}
                  />
                  <FormErrorMessage
                    error={errors.claimsSettle}
                    messages={{
                      required: "Claims Settle is Required",
                      pattern: "Please Enter a Valid Claims Settle",
                    }}
                  />
                </div>
                <div className="col-md-3 mt-3">
                  <label>Cover Upto</label>
                  <div className="date_of_birth">
                    <CustomController
                      name={"coverUpto"}
                      control={control}
                      error={errors.coverUpto}
                      defaultValue={getValues("coverUpto")}
                      rules={{ required: true }}
                      messages={{
                        required: "Cover Upto is Required",
                      }}
                      render={({ onChange, ...field }) => {
                        return (
                          <CommonDatePicker
                            clientDatePicker
                            name="date"
                            {...field}
                            id="date"
                            onChange={(date) => {
                              onChange(date);
                              setValue("coverUpto", date);
                            }}
                            placeholder="Select Cover Upto"
                            minDate={new Date()}
                          />
                        );
                      }}
                    />
                  </div>
                </div>
              </>
            )}
          </div>
          <div className="">
            {productType === "insurance" && (
              <>
                <div className="">
                  <label className="Product_description">About Us</label>
                  <div className="">
                    <CustomController
                      name={"aboutUs"}
                      control={control}
                      defaultValue={getValues("aboutUs")}
                      error={errors.aboutUs}
                      rules={{ required: true }}
                      messages={{
                        required: "About Us is Required",
                      }}
                      render={({ onChange, ...field }) => {
                        return (
                          <TextEditor
                            {...field}
                            onChange={(content) => {
                              onChange(content);
                              setValue("aboutUs", content);
                              setAboutUs(content);
                            }}
                            name={"aboutUs"}
                            isProduct={true}
                            className="editorProduct"
                          />
                        );
                      }}
                    />
                  </div>
                </div>
                <div className="">
                  <label className="Product_description">Key Feature</label>
                  <div className="text_editor_popup">
                    <CustomController
                      name={"keyFeature"}
                      control={control}
                      defaultValue={getValues("keyFeature")}
                      error={errors.keyFeature}
                      rules={{ required: true }}
                      messages={{
                        required: "Key Feature is Required",
                      }}
                      render={({ onChange, ...field }) => {
                        return (
                          <TextEditor
                            {...field}
                            onChange={(content) => {
                              onChange(content);
                              setValue("keyFeature", content);
                              setKeyFeature(content);
                            }}
                            name={"keyFeature"}
                            isProduct={true}
                            className="editorProduct"
                          />
                        );
                      }}
                    />
                  </div>
                </div>
                <div className="">
                  <label className="Product_description">Other Benefits</label>
                  <div className="text_editor_popup">
                    <CustomController
                      name={"otherBenefits"}
                      control={control}
                      defaultValue={getValues("otherBenefits")}
                      error={errors.otherBenefits}
                      rules={{ required: true }}
                      messages={{
                        required: "Other Benefits is Required",
                      }}
                      render={({ onChange, ...field }) => {
                        return (
                          <TextEditor
                            {...field}
                            onChange={(content) => {
                              onChange(content);
                              setValue("otherBenefits", content);
                              setOtherBenefit(content);
                            }}
                            name={"otherBenefits"}
                            isProduct={true}
                            className="editorProduct"
                          />
                        );
                      }}
                    />
                  </div>
                </div>
                <div className="">
                  <label className="Product_description">Policy Document</label>
                  <div className="text_editor_popup">
                    <CustomController
                      name={"policyDoc"}
                      control={control}
                      defaultValue={getValues("policyDoc")}
                      error={errors.policyDoc}
                      rules={{ required: true }}
                      messages={{
                        required: "Policy Document is Required",
                      }}
                      render={({ onChange, ...field }) => {
                        return (
                          <TextEditor
                            {...field}
                            onChange={(content) => {
                              onChange(content);
                              setValue("policyDoc", content);
                              setPolicyDoc(content);
                            }}
                            name={"policyDoc"}
                            isProduct={true}
                            className="editorProduct"
                          />
                        );
                      }}
                    />
                  </div>
                </div>
                <div className="">
                  <label className="Product_description">
                    Policy Does Not Cover
                  </label>
                  <div className="text_editor_popup">
                    <CustomController
                      name={"policyNotCover"}
                      control={control}
                      defaultValue={getValues("policyNotCover")}
                      error={errors.policyNotCover}
                      rules={{ required: true }}
                      messages={{
                        required: "Policy Does Not Cover is Required",
                      }}
                      render={({ onChange, ...field }) => {
                        return (
                          <TextEditor
                            {...field}
                            onChange={(content) => {
                              onChange(content);
                              setValue("policyNotCover", content);
                              setPolicyNotCover(content);
                            }}
                            name={"policyNotCover"}
                            isProduct={true}
                            className="editorProduct"
                          />
                        );
                      }}
                    />
                  </div>
                </div>
              </>
            )}
            {(productType === "fixedIncome" ||
              productType === "loan" ||
              productType === " portfolioAnalyserAndOptimizer" ||
              productType === "AlgoTradingPlatform") && (
              <>
                <div className="d-flex justify-content-between my-4">
                  <p className="title_product">Reference</p>
                  <NormalButton
                    className="loginButton"
                    label={"Add Reference"}
                    onClick={addReference}
                  />
                </div>
                {reference?.map((item, index) => {
                  return (
                    <div className="row align-items-center reference-box">
                      <div className="col-6">
                        <label className="Product_description">Title</label>
                        <InputBox
                          className="login_input"
                          type={"text"}
                          placeholder="Enter Title"
                          name={`reference[${index}].title`}
                          errors={errors}
                          value={item?.title}
                          onChange={(e) => {
                            const updatedReference = [...reference];
                            updatedReference[index].title = e.target.value;
                            setReference(updatedReference);
                          }}
                          register={register({
                            required: true,
                          })}
                        />
                        <FormErrorMessage
                          error={errors?.reference?.[index]?.title}
                          messages={{
                            required: "Title is Required",
                          }}
                        />
                      </div>
                      <div className="col-6">
                        <label className="Product_description">Video</label>
                        <InputBox
                          className="login_input"
                          type={"text"}
                          placeholder="Enter Video"
                          name={`reference[${index}].video`}
                          errors={errors}
                          value={item?.video}
                          onChange={(e) => {
                            const updatedReference = [...reference];
                            updatedReference[index].video = e.target.value;
                            setReference(updatedReference);
                          }}
                          register={register({
                            required: true,
                          })}
                        />
                        <FormErrorMessage
                          error={errors?.reference?.[index]?.video}
                          messages={{
                            required: "Video is Required",
                          }}
                        />
                      </div>
                      <div className="d-flex justify-content-end">
                        <div
                          onClick={() => removeReference(index)}
                          className="remove-icon cursor-pointer"
                        >
                          <img src={closeIcon} alt="Close" />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </>
            )}
            {(productType === "loan" ||
              productType === "portfolioManagementSystem" ||
              productType === " portfolioAnalyserAndOptimizer" ||
              productType === "AlgoTradingPlatform" ||
              productType === "fixedIncome") && (
              <div className="">
                <label className="Product_description">Description</label>
                <div className="text_editor_popup">
                  <CustomController
                    name={"description"}
                    control={control}
                    defaultValue={getValues("description")}
                    error={errors.description}
                    rules={{ required: true }}
                    messages={{
                      required: "Description is Required",
                    }}
                    render={({ onChange, ...field }) => {
                      return (
                        <TextEditor
                          {...field}
                          onChange={(content) => {
                            onChange(content);
                            setValue("description", content);
                            setDescription(content);
                          }}
                          name={"description"}
                          isProduct={true}
                          className="editorProduct"
                        />
                      );
                    }}
                  />
                </div>
              </div>
            )}
            {console.log("first", getValues("description"))}
          </div>
          <div className="d-flex justify-content-end my-5 pt-5 gap-3">
            <div className="col-2">
              <NormalButton
                onClick={() => {
                  onCancel();
                  resetValues();
                }}
                cancel
                label="Cancel"
              />{" "}
            </div>
            <div className="col-2 p-0">
              <NormalButton
                className="loginButton"
                label={"Submit"}
                onClick={handleSubmit(OnDetailsSubmit)}
                // isLoading={loading}
              />
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default ProductPopup;
