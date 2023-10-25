import React, { useState } from "react";
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

const ProductPopup = ({
  successMsg,
  modalOpen,
  onCancel,
  errors,
  register,
  control,
  getValues,
  setValue,
  productType,
  handleSubmit,
}) => {
  const [icon, setIcon] = useState("");
  const [newIcon, setNewIcon] = useState("");
  const [loading, setLoading] = useState(false);
  const [load, setLoad] = useState(false);
  console.log("productType", productType);
  const handleDrop = async (droppedimage) => {
    try {
      if (productType === "sovereign gold bonds") {
        setLoading(true);
      } else {
        setLoad(true);
      }
      let body = new FormData();
      for (let index = 0; index < droppedimage.length; index++) {
        const file = droppedimage[index];
        body.append("data", file);
        let response = await uploadImage(body);
        if (response.status == 200) {
          if (productType === "sovereign gold bonds") {
            setNewIcon(response?.data?.data?.data?.key);
            setIcon(response?.data?.data?.data?.s3URL);
            setLoading(false);
          } else {
            // setNewProductImg(response?.data?.data?.data?.key);
            // setProductIcon(response?.data?.data?.data?.s3URL);
            // setIsLoading(false);
          }
        }
      }
    } catch (e) {
      console.log("e :>> ", e);
    }
  };

  const cancelImg = (e) => {
    e.stopPropagation();
    if (productType === "sovereign gold bonds") {
      setIcon(null);
    } else {
      // setProductIcon(null);
    }
  };

  const onsubmit = async (data) => {
    console.log("data", data);
  };

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
              <div onClick={onCancel} className="remove-overlay cursor-pointer">
                <img src={closeIcon} alt="Close" />
              </div>
            </div>
          </div>
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
                accept=".png, .jpeg, .jpg, "
                maxSize={3072000}
                errors={errors}
                {...register("Icon", {
                  required: newIcon || icon ? false : true,
                })}
              >
                {({ getRootProps, getInputProps }) => (
                  <div {...getRootProps({ className: "dropzone" })}>
                    <div className=" border border-secondary-subtle   ">
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
                            onClick={cancelImg}
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
              {!newIcon && (
                <FormErrorMessage
                  error={errors.Icon}
                  messages={{
                    required: "Product icon is Required",
                  }}
                />
              )}
            </div>

            {productType === "sovereign gold bonds" && (
              <>
                <div className="col-md-3">
                  <label>Subscription From</label>
                  <div className="date_of_birth">
                    <CustomController
                      name={"subscriptionFrom"}
                      control={control}
                      error={errors.date}
                      defaultValue={getValues("subscriptionFrom")}
                      rules={{ required: true }}
                      messages={{
                        required: "Subscription From is Required",
                      }}
                      render={({ onChange, value, ...field }) => {
                        return (
                          <CommonDatePicker
                            clientDatePicker
                            name="subscriptionFrom"
                            {...field}
                            id="date"
                            value={getValues("subscriptionFrom")}
                            onChange={(date) => {
                              onChange(date);
                              setValue("subscriptionFrom", date);
                            }}
                            placeholder="Select Subscription From"
                            minDate={new Date()}
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
                      error={errors.date}
                      defaultValue={getValues("subscriptionTo")}
                      rules={{ required: true }}
                      messages={{
                        required: "Subscription To is Required",
                      }}
                      render={({ onChange, value, ...field }) => {
                        return (
                          <CommonDatePicker
                            clientDatePicker
                            name="date"
                            {...field}
                            id="date"
                            value={getValues("subscriptionTo")}
                            onChange={(date) => {
                              onChange(date);
                              setValue("subscriptionTo", date);
                            }}
                            placeholder="Select Subscription To"
                            minDate={new Date()}
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
                          //   options={options}
                          name="status"
                          handleChange={(e, { value } = {}) => {
                            onChange(value);
                          }}
                        />
                      );
                    }}
                  />
                </div>
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
                  <label>Date Of Issue</label>
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
                      render={({ onChange, value, ...field }) => {
                        return (
                          <CommonDatePicker
                            clientDatePicker
                            name="date"
                            {...field}
                            id="date"
                            value={getValues("dateOfIssue")}
                            onChange={(date) => {
                              onChange(date);
                              setValue("dateOfIssue", date);
                            }}
                            placeholder="Select Date Of Issue"
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
                          // options={options}
                          name="planType"
                          value={getValues("planType")}
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
                          // options={options}
                          name="insuranceType"
                          value={getValues("insuranceType")}
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
                          // options={options}
                          name="insurancePlan"
                          value={getValues("insurancePlan")}
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
                      render={({ onChange, value, ...field }) => {
                        return (
                          <CommonDatePicker
                            clientDatePicker
                            name="date"
                            {...field}
                            id="date"
                            value={getValues("coverUpto")}
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
                            value={getValues("aboutUs")}
                            onChange={(content) => {
                              onChange(content);
                              setValue("aboutUs", content);
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
                            value={getValues("keyFeature")}
                            onChange={(content) => {
                              onChange(content);
                              setValue("keyFeature", content);
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
                            value={getValues("otherBenefits")}
                            onChange={(content) => {
                              onChange(content);
                              setValue("otherBenefits", content);
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
                            value={getValues("policyDoc")}
                            onChange={(content) => {
                              onChange(content);
                              setValue("policyDoc", content);
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
                            value={getValues("policyNotCover")}
                            onChange={(content) => {
                              onChange(content);
                              setValue("policyNotCover", content);
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
          </div>
          <div className="d-flex justify-content-end my-5 py-5 gap-3">
            <div className="col-2">
              <NormalButton
                onClick={() => history.push("/admin/product-management")}
                cancel
                label="Cancel"
              />{" "}
            </div>
            <div className="col-2 p-0">
              <NormalButton
                className="loginButton"
                label={"Submit"}
                onClick={handleSubmit(onsubmit)}
                isLoading={loading}
              />
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default ProductPopup;
