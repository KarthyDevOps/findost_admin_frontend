import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { BsArrowLeft } from "react-icons/bs";
import Dropzone from "react-dropzone";
import { AiOutlineCloseCircle } from "react-icons/ai";
//service
import "./style.scss";
//assets
import cloudIcon from "../../../../assets/images/uploadcloud.svg";
import closeIcon from "assets/images/closeIcon.png";
//internal components
import InputBox from "component/common/InputBox/InputBox";
import Loader from "component/common/Loader";
import CustomController from "component/common/Controller";
import NormalButton from "component/common/NormalButton/NormalButton";
import FormErrorMessage from "component/common/ErrorMessage";
import NormalMultiSelect from "component/common/NormalMultiSelect";
import SuccessModal from "component/common/DeleteModal/SuccessModal";
//service
import { updateProduct, getProduct } from "service/Cms";
import { uploadImage } from "service/Auth";
import { Toast } from "service/toast";
import { Table } from "antd";
//helpers
import { history } from "helpers";
import { TrainOutlined } from "@material-ui/icons";
import { Content } from "antd/lib/layout/layout";
import ProductPopup from "./ProductPopup";

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
  const [productModal, setProductModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [newProductImg, setNewProductImg] = useState(null);
  const [ProductIcon, setProductIcon] = useState("");
  const [productImage, setProductImage] = useState("");
  const [newProductImage, setNewProductImage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isLoad, setIsLoad] = useState(false);
  const [productType, setProductType] = useState("");
  const [benefits, setBenefits] = useState([{ benefitIcon: "", name: "" }]);
  const [isLoadList, setIsLoadList] = useState(benefits.map(() => false));

  const addBenefit = () => {
    setBenefits([...benefits, { name: "", benefitIcon: "" }]);
  };

  const removeBenefit = (index) => {
    const updatedBenefits = benefits.filter((_, i) => i !== index);
    setBenefits(updatedBenefits);
  };

  const handleDropBenefit = (index) => async (droppedimage) => {
    let benefitIndex = index;
    try {
      let body = new FormData();
      setIsLoadList((prevIsLoadList) => {
        const updatedIsLoadList = [...prevIsLoadList];
        updatedIsLoadList[benefitIndex] = true;
        return updatedIsLoadList;
      });
      for (let index = 0; index < droppedimage.length; index++) {
        const file = droppedimage[index];
        body.append("data", file);
        let response = await uploadImage(body);
        if (response.status === 200) {
          const updatedBenefits = [...benefits];
          updatedBenefits[benefitIndex].benefitIcon =
            response?.data?.data?.data?.s3URL;
          setBenefits(updatedBenefits);
          setIsLoadList((prevIsLoadList) => {
            const updatedIsLoadList = [...prevIsLoadList];
            updatedIsLoadList[benefitIndex] = false;
            return updatedIsLoadList;
          });
        }
      }
    } catch (e) {
      console.log("e :>> ", e);
      setIsLoadList((prevIsLoadList) => {
        const updatedIsLoadList = [...prevIsLoadList];
        updatedIsLoadList[benefitIndex] = false;
        return updatedIsLoadList;
      });
    }
  };

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
        setProductType(data?.productType);
      } else {
        Toast({ type: "error", message: response.data.message });
      }
    } catch (e) {
      console.log("errrr :>> ", e);
    }
  };

  const onsubmit = async (data) => {
    console.log("benefits", benefits);
    console.log("data", data);
    // try {
    //   setLoading(TrainOutlined);

    //   let body = {
    //     productName: data?.productName,
    //     productType: productType,
    //     productIcon: newProductImg ? newProductImg : ProductIcon,

    //   };
    //   let response = await updateProduct(body, id);
    //   if (response.status === 200) {
    //     setModal(true);
    //     setTimeout(() => {
    //       setModal(false);
    //       reset();
    //       history.push("/admin/product-management");
    //     }, 2000);
    //     setLoading(false);
    //   }
    // } catch (e) {
    //   console.log(e);
    // }
  };

  const handleDrop = async (droppedimage) => {
    try {
      if (productType === "sovereign gold bonds") {
        setIsLoad(true);
      } else {
        setIsLoading(true);
      }
      let body = new FormData();
      for (let index = 0; index < droppedimage.length; index++) {
        const file = droppedimage[index];
        body.append("data", file);
        let response = await uploadImage(body);
        if (response.status == 200) {
          if (productType === "sovereign gold bonds") {
            setNewProductImage(response?.data?.data?.data?.key);
            setProductImage(response?.data?.data?.data?.s3URL);
            setIsLoad(false);
          } else {
            setNewProductImg(response?.data?.data?.data?.key);
            setProductIcon(response?.data?.data?.data?.s3URL);
            setIsLoading(false);
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
      setProductImage(null);
    } else {
      setProductIcon(null);
    }
  };

  const columns = [
    {
      title: "Full Name",
      width: 100,
      dataIndex: "name",
      key: "name",
      fixed: "left",
    },
    {
      title: "Age",
      width: 100,
      dataIndex: "age",
      key: "age",
      fixed: "left",
    },
    { title: "Column 1", dataIndex: "address", key: "1" },
    { title: "Column 2", dataIndex: "address", key: "2" },
    { title: "Column 3", dataIndex: "address", key: "3" },
    { title: "Column 4", dataIndex: "address", key: "4" },
    { title: "Column 5", dataIndex: "address", key: "5" },
    { title: "Column 6", dataIndex: "address", key: "6" },
    { title: "Column 7", dataIndex: "address", key: "7" },
    { title: "Column 8", dataIndex: "address", key: "8" },
    { title: "Column 5", dataIndex: "address", key: "5" },
    { title: "Column 6", dataIndex: "address", key: "6" },
    { title: "Column 7", dataIndex: "address", key: "7" },
    { title: "Column 8", dataIndex: "address", key: "8" },
    {
      title: "Action",
      key: "operation",
      fixed: "right",
      width: 100,
      render: () => <a>action</a>,
    },
  ];

  const data = [
    {
      key: "1",
      name: "John Brown",
      age: 32,
      address: "New York Park",
    },
    {
      key: "2",
      name: "Jim Green",
      age: 40,
      address: "London Park",
    },
  ];

  return (
    <>
      <div className="">
        <div className="addProduct px-5">
          <div className=" d-flex my-3 align-items-center ">
            <i className="">
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
          <div className="boder_box mb-4">
            <div className=" ">
              <p className="title_product">Product Details</p>
              <div className="row">
                <div className="col-6">
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
                <div class="col-6" style={{ zIndex: 100 }}>
                  <label className="Product_description">Product Type</label>
                  <CustomController
                    name={"productType"}
                    control={control}
                    error={errors?.productType}
                    defaultValue={getValues("productType")}
                    rules={{ required: true }}
                    messages={{ required: "Product Type is Required" }}
                    render={({ onChange, ...fields }) => {
                      return (
                        <NormalMultiSelect
                          {...fields}
                          placeholder={"Select Product Type"}
                          options={options}
                          name="productType"
                          value={productType}
                          handleChange={(e, { value } = {}) => {
                            onChange(value);
                            setProductType(value);
                          }}
                        />
                      );
                    }}
                  />
                </div>
                <div className="col-6 mt-3">
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
                              <div className=" drag_btn ">
                                <NormalButton
                                  onClick={(e) => e.preventDefault()}
                                  className="browse-button"
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
                            ProductIcon && (
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
                  {!newProductImg && (
                    <FormErrorMessage
                      error={errors.dropZoneField}
                      messages={{
                        required: "Product icon is Required",
                      }}
                    />
                  )}
                </div>
                {productType === "sovereign gold bonds" && (
                  <div className="col-6 mt-3">
                    <label className="Product_description">Product Image</label>
                    <Dropzone
                      onDrop={handleDrop}
                      accept=".png, .jpeg, .jpg, "
                      maxSize={3072000}
                      errors={errors}
                      {...register("productImage", {
                        required: true,
                      })}
                    >
                      {({ getRootProps, getInputProps }) => (
                        <div {...getRootProps({ className: "dropzone" })}>
                          <div className=" border border-secondary-subtle   ">
                            <input {...getInputProps()} multiple={false} />
                            {productImage ? (
                              <>
                                <img
                                  src={productImage}
                                  alt="ProductIcon"
                                  className="preview_image"
                                ></img>
                              </>
                            ) : (
                              <>
                                <div className=" drag_btn ">
                                  <NormalButton
                                    onClick={(e) => e.preventDefault()}
                                    className="browse-button"
                                    label="Browse"
                                  />
                                </div>
                              </>
                            )}
                            {isLoad ? (
                              <Loader
                                loading={isLoad}
                                className="d-flex align-items-center justify-content-center"
                              />
                            ) : (
                              productImage && (
                                <span
                                  style={{
                                    position: "absolute",
                                    top: "10px",
                                    right: "10px",
                                    cursor: "pointer",
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
                    {!newProductImage && (
                      <FormErrorMessage
                        error={errors.productImage}
                        messages={{
                          required: "Product Image is Required",
                        }}
                      />
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>

          {productType === "sovereign gold bonds" && (
            <div className="benefit-area mb-4">
              <div className="d-flex justify-content-end mb-4">
                <NormalButton
                  className="loginButton"
                  label={"Add Benefit"}
                  onClick={() => addBenefit()}
                />
              </div>
              <div className="">
                {benefits.map((item, index) => {
                  return (
                    <div className="row benefit-box mb-2" key={index}>
                      <div className="col-6">
                        <label className="Product_description">
                          {" "}
                          Benefit content
                        </label>
                        <InputBox
                          className="login_input"
                          type={"text"}
                          placeholder="Enter Product Name"
                          name={`benefits[${index}].name`}
                          errors={errors}
                          value={item?.name}
                          onChange={(e) => {
                            const updatedBenefits = [...benefits];
                            updatedBenefits[index].name = e.target.value;
                            setBenefits(updatedBenefits);
                          }}
                          register={register({
                            required: true,
                          })}
                        />
                        <FormErrorMessage
                          error={errors?.benefits?.[index]?.name}
                          messages={{
                            required: "Benefit content is Required",
                          }}
                        />
                      </div>
                      <div className="col-6">
                        <label className="Product_description">
                          Benefit Icon
                        </label>
                        <Dropzone
                          onDrop={handleDropBenefit(index)}
                          accept=".png, .jpeg, .jpg, "
                          maxSize={3072000}
                          errors={errors}
                          {...register(`benefits[${index}].benefitIcon`, {
                            required: benefits[index].benefitIcon
                              ? false
                              : true,
                          })}
                        >
                          {({ getRootProps, getInputProps }) => (
                            <div {...getRootProps({ className: "dropzone" })}>
                              <div className=" border border-secondary-subtle   ">
                                <input {...getInputProps()} multiple={false} />
                                {benefits[index].benefitIcon ? (
                                  <>
                                    <img
                                      src={benefits[index].benefitIcon}
                                      alt=""
                                      className="preview_image"
                                    />
                                  </>
                                ) : (
                                  <>
                                    <div className="drag_btn">
                                      <NormalButton
                                        onClick={(e) => e.preventDefault()}
                                        className="browse-button"
                                        label="Browse"
                                      />
                                    </div>
                                  </>
                                )}
                                {isLoadList[index] ? (
                                  <Loader
                                    loading={isLoadList[index]}
                                    className="d-flex align-items-center justify-content-center"
                                  />
                                ) : (
                                  benefits[index].benefitIcon && (
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
                        {!benefits[index].benefitIcon && (
                          <FormErrorMessage
                            error={errors?.benefits?.[index]?.benefitIcon}
                            messages={{
                              required: "Benefit icon is Required",
                            }}
                          />
                        )}
                      </div>
                      <div className="d-flex justify-content-end">
                        <div
                          onClick={() => removeBenefit(index)}
                          className="remove-overlay cursor-pointer"
                        >
                          <img src={closeIcon} alt="Close" />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {productType === "mutualFunds" || productType === "ipo" ? (
            <></>
          ) : (
            <>
              <div className="d-flex justify-content-end mt-5">
                <div className="col-2">
                  <NormalButton
                    className="loginButton"
                    label={"Add Details"}
                    onClick={() => setProductModal(true)}
                    isLoading={loading}
                  />
                </div>
              </div>
              <div className="mt-2 mb-5 table-box">
                <Table
                  columns={columns}
                  dataSource={data}
                  pagination={false}
                  scroll={{ x: true }}
                  className="w-100"
                />
              </div>
            </>
          )}

          <div className="d-flex justify-content-end mt-5 gap-3">
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
                label={edit ? "Update" : "Add Product"}
                onClick={handleSubmit(onsubmit)}
                isLoading={loading}
              />
            </div>
          </div>
          <div>
            <ProductPopup
              modalOpen={productModal}
              onCancel={() => setProductModal(false)}
              errors={errors}
              register={register}
              control={control}
              getValues={getValues}
              setValue={setValue}
              productType={productType}
              handleSubmit={handleSubmit}
            />
          </div>

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
    </>
  );
};

export default AddProductcomp;
