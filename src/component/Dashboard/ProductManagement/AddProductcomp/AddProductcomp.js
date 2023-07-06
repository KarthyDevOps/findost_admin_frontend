import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { BsArrowLeft } from "react-icons/bs";
import Dropzone from "react-dropzone";
import { AiOutlineCloseCircle } from "react-icons/ai";
//service
import "./style.scss";
//assets
import cloudIcon from "../../../../assets/images/uploadcloud.svg";
//internal components
import InputBox from "component/common/InputBox/InputBox";
import CustomController from "component/common/Controller";
import NormalButton from "component/common/NormalButton/NormalButton";
import FormErrorMessage from "component/common/ErrorMessage";
import NormalMultiSelect from "component/common/NormalMultiSelect";
import SuccessModal from "component/common/DeleteModal/SuccessModal";
//service
import { updateProduct, getProduct } from "service/Cms";
import { uploadImage } from "service/Auth";
import { Toast } from "service/toast";
//helpers
import { history } from "helpers";
import { TrainOutlined } from "@material-ui/icons";

const AddProductcomp = ({ create, view, remove }) => {
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
  const [edit, setEdit] = useState(false);
  const [modal, setModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [newProductImg, setNewProductImg] = useState(null);
  const [ProductIcon, setProductIcon] = useState("");
  const options = [
    {
      label: "Mutual Funds",
      value: "mutualFunds",
    },
    {
      label: "IPO",
      value: "ipo",
    },
    {
      label: "Sovereign Gold Bonds",
      value: "sovereign gold bonds",
    },
    {
      label: "Insurance",
      value: "insurance",
    },
    {
      label: "Fixed Income",
      value: "fixedIncome",
    },
    {
      label: "Loan",
      value: "loan",
    },
    {
      label: "Portfolio Management System",
      value: "portfolioManagementSystem",
    },
    {
      label: " Portfolio Analyser & Optimizer",
      value: " portfolioAnalyserAndOptimizer",
    },
    {
      label: "Algo Trading Platform",
      value: "AlgoTradingPlatform",
    },
  ];
  const id = localStorage.getItem("editId");

  useEffect(() => {
    if (id) {
      setEdit(true);
      getProductDetails();
    }
  }, []);

  const getProductDetails = async () => {
    try {
      const params = {
        productId: id,
      };
      let response = await getProduct(params);
      if (response.status === 200) {
        const data = response?.data?.data;
        reset({
          productName: data?.productName,
          productType: data?.productType,
        });
        setProductIcon(data?.productIconS3);
      } else {
        Toast({ type: "error", message: response.data.message });
      }
    } catch (e) {
      console.log("errrr :>> ", e);
    }
  };

  const onsubmit = async (data) => {
    try {
      setLoading(TrainOutlined);

      let body = {
        productName: data?.productName,
        productType: data?.productType,
        productIcon: newProductImg ? newProductImg : ProductIcon,
      };
      let response = await updateProduct(body, id);
      if (response.status === 200) {
        setModal(true);
        setTimeout(() => {
          setModal(false);
          reset();
          history.push("/admin/product-management");
        }, 2000);
        setLoading(false);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const handleDrop = async (droppedimage) => {
    let body = new FormData();
    for (let index = 0; index < droppedimage.length; index++) {
      const file = droppedimage[index];
      body.append("data", file);
      let response = await uploadImage(body);
      if (response.status == 200) {
        setNewProductImg(response?.data?.data?.data?.key);
        setProductIcon(response?.data?.data?.data?.s3URL);
      }
    }
  };
  const cancelImg = (e) => {
    e.stopPropagation();
    setProductIcon(null);
  };

  return (
    <div className="container-fluid">
      <div className="addProduct col-12">
        <div className="row">
          <div className=" d-flex my-3 align-items-center ">
            <i className="px-4">
              <BsArrowLeft
                onClick={() => history.goBack()}
                style={{ cursor: "pointer" }}
                size={28}
              />
            </i>
            <p className="add_products_title m-0">
              {edit ? "Edit Product" : "Add Product"}
            </p>
          </div>
        </div>
        <form>
          <div className="d-flex col-12   boder_box align-items-center">
            <div className="container ">
              <p className="title_product">Product Details</p>
              <div className="row px-3 gx-5">
                <div className="col-4">
                  <label className="Product_description"> Product Name</label>
                  <InputBox
                    className="login_input"
                    type={"text"}
                    placeholder="Enter Product Name"
                    name="productName"
                    errors={errors}
                    register={register({
                      required: true,
                      pattern: /^(?!\s*$).+/,
                    })}
                  />
                  <FormErrorMessage
                    error={errors.productName}
                    messages={{
                      required: "Product Name is Required",
                      pattern: "Please Enter a Valid Name",
                    }}
                  />
                </div>
                <div class="col-4">
                  <label className="Product_description">Product Type</label>
                  <CustomController
                    name={"productType"}
                    control={control}
                    error={errors?.productPlan}
                    defaultValue={getValues("productType")}
                    rules={{ required: true }}
                    messages={{ required: "Product Plan is Required" }}
                    render={({ onChange, ...fields }) => {
                      return (
                        <NormalMultiSelect
                          {...fields}
                          placeholder={"Select Product Plan"}
                          options={options}
                          name="productType"
                          handleChange={(e, { value } = {}) => {
                            onChange(value);
                          }}
                        />
                      );
                    }}
                  />
                </div>
              </div>
              <div className="col-4 mt-4">
                <label className="Product_description">Product Icon</label>

                <Dropzone
                  onDrop={handleDrop}
                  accept=".png, .jpeg, .jpg, "
                  maxSize={3072000}
                  errors={errors}
                  {...register("dropZoneField", {
                    required: newProductImg || ProductIcon ? false : true,
                  })}
                >
                  {({ getRootProps, getInputProps }) => (
                    <div {...getRootProps({ className: "dropzone" })}>
                      <div className=" border border-secondary-subtle   ">
                        <input {...getInputProps()} multiple={false} />
                        {ProductIcon ? (
                          <>
                            <img
                              src={ProductIcon}
                              alt="ProductIcon"
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
                        {ProductIcon && (
                          <span
                            style={{
                              position: "absolute",
                              top: "10px",
                              right: "10px",
                              cursor: "pointer",
                              zIndex: 1000,
                            }}
                            // className={styles.removeOverlay}
                            onClick={cancelImg}
                          >
                            <AiOutlineCloseCircle
                              size={24}
                              style={{ color: "red" }}
                            />
                          </span>
                        )}
                      </div>
                    </div>
                  )}
                </Dropzone>
                {!newProductImg && (
                  <FormErrorMessage
                    error={errors.dropZoneField}
                    messages={{
                      required: "Product icon is Required",
                    }}
                  />
                )}
              </div>

              {/* <div className="row gx-5">
                <div className="col">
                  <label className="Product_description ms-3">
                    Product Description
                  </label>
                  <div className="text_editor">
                    <CustomController
                      name={"content"}
                      control={control}
                      error={errors?.content}
                      defaultValue={getValues("content")}
                      rules={{ required: true }}
                      messages={{ required: "content is Required" }}
                      render={({ onChange, ...fields }) => {
                        return (
                          <TextEditor
                            {...fields}
                            onChange={(content) => {
                              onChange(content);
                            }}
                            name={"content"}
                          />
                        );
                      }}
                    />
                  </div>
                </div>
              </div> */}
              {/* <p className="title_product mt-5">Sub Product Details</p>

              <div className="row gx-5 mt-30">
                <div className="col-md-4">
                  <label className="Product_description">
                    {" "}
                    Sub Product Name
                  </label>
                  <InputBox
                    className="login_input"
                    type={"text"}
                    placeholder="Enter SubProduct Name"
                    errors={errors}
                    name="subProductName"
                    register={register({
                      required: true,
                    })}
                  />
                  <FormErrorMessage
                    error={errors.subProductName}
                    messages={{
                      required: "SubProduct Name is Required",
                    }}
                  />
                </div>
                <div className="col-md-4">
                  <label className="Product_description">
                    {" "}
                    Product Mapped Details
                  </label>
                  <CustomController
                    name={"productMapped"}
                    control={control}
                    error={errors?.productMapped}
                    defaultValue={getValues("productMapped")}
                    rules={{ required: true }}
                    messages={{
                      required: "Product Mapped Details is Required",
                    }}
                    render={({ onChange, ...fields }) => {
                      return (
                        <NormalMultiSelect
                          {...fields}
                          placeholder={"Select"}
                          options={options}
                          name="productMapped"
                          handleChange={(e, { value } = {}) => {
                            onChange(value);
                          }}
                        />
                      );
                    }}
                  />
                </div>

                <div className="col-lg-4">
                  <label className="Product_description">
                    {" "}
                    Duration Details
                  </label>
                  <div className="row">
                    <div className="col-md-6">
                      <CustomController
                        name={"startDate"}
                        control={control}
                        error={errors.startDate}
                        defaultValue={getValues("startDate" || "")}
                        rules={{ required: true }}
                        messages={{
                          required: "StartDate is Required",
                        }}
                        render={({ onChange, ...field }) => {
                          return (
                            <CommonDatePicker
                              {...field}
                              name="startDate"
                              onChange={(date) => {
                                onChange(date);
                              }}
                              placeholder="Start Date"
                            />
                          );
                        }}
                      />
                    </div>
                    <div className=" col-md-6 ">
                      <CustomController
                        name={"endDate"}
                        control={control}
                        error={errors.endDate}
                        defaultValue={getValues("endDate" || "")}
                        rules={{ required: true }}
                        messages={{
                          required: "EndDate is Required",
                        }}
                        render={({ onChange, ...field }) => {
                          return (
                            <CommonDatePicker
                              name="endDate"
                              {...field}
                              onChange={(date) => {
                                onChange(date);
                              }}
                              placeholder="End Date"
                            />
                          );
                        }}
                      />
                    </div>
                  </div>
                </div>

                <div className="col-md-4">
                  <label className="Product_description"> City</label>
                  <CustomController
                    name={"city"}
                    control={control}
                    error={errors?.city}
                    defaultValue={getValues("city")}
                    rules={{ required: true }}
                    messages={{
                      required: "City is Required",
                    }}
                    render={({ onChange, ...fields }) => {
                      return (
                        <NormalMultiSelect
                          {...fields}
                          placeholder={"Select City"}
                          options={options}
                          name="city"
                          handleChange={(e, { value } = {}) => {
                            onChange(value);
                          }}
                        />
                      );
                    }}
                  />
                </div>
                <div className="col-md-4">
                  <label className="Product_description">Country</label>
                  <CustomController
                    name={"country"}
                    control={control}
                    error={errors?.country}
                    defaultValue={getValues("country")}
                    rules={{ required: true }}
                    messages={{
                      required: "Country is Required",
                    }}
                    render={({ onChange, ...fields }) => {
                      return (
                        <NormalMultiSelect
                          {...fields}
                          placeholder={"Select Country"}
                          options={options}
                          name="country"
                          handleChange={(e, { value } = {}) => {
                            onChange(value);
                          }}
                        />
                      );
                    }}
                  />
                </div>
              </div> */}
              <div className="row mt-4">
                <div className="col-12  d-flex justify-content-end">
                  <div className="col-2">
                    <NormalButton
                      onClick={() => history.push("/admin/product-management")}
                      cancel
                      label="Cancel"
                    />{" "}
                  </div>
                  <div className="col-2">
                    <NormalButton
                      addProductbtn
                      label={edit ? "Update" : "Add Product"}
                      onClick={handleSubmit(onsubmit)}
                      isLoading={loading}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
        <div>
          <SuccessModal
            modalOpen={modal}
            onCancel={() => setModal(false)}
            successMsg={
              edit
                ? "Product Details Updated Successfully"
                : "New Product Added Successfully"
            }
          />
        </div>
      </div>
    </div>
  );
};

export default AddProductcomp;
