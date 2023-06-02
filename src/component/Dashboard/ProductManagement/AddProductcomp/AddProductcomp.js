import React, { useState, useEffect, Fragment } from "react";
import { BsArrowLeft } from "react-icons/bs";
import "./style.scss";
import InputBox from "component/common/InputBox/InputBox";
import { useForm } from "react-hook-form";
import { history } from "helpers";
import CustomController from "component/common/Controller";
import NormalButton from "component/common/NormalButton/NormalButton";
import FormErrorMessage from "component/common/ErrorMessage";
import { addProduct, updateProduct, editProduct } from "service/Cms";
import NormalMultiSelect from "component/common/NormalMultiSelect";
import TextEditor from "component/common/TextEditor/TextEditor";
import SuccessModal from "component/common/DeleteModal/SuccessModal";
import { Toast } from "service/toast";
import CommonDatePicker from "component/common/CommonDatePicker/CommonDatePicker";

const AddProductcomp = () => {
  const {
    register,
    handleSubmit,
    errors,
    reset,
    setError,
    control,
    getValues,
    setValue,
    clearErrors,
  } = useForm({
    mode: "onChange",
  });
  const [edit, setEdit] = useState(false);
  const [modal, setModal] = useState(false);

  const options = [
    {
      label: "option1",
      value: "option1",
    },
    {
      label: "option2",
      value: "option2",
    },
    {
      label: "option3",
      value: "option3",
    },
  ];

  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get("Editid");

  useEffect(() => {
    if (urlParams.has("Editid")) {
      setEdit(true);
      getProductDetails();
    }
  }, []);

  const getProductDetails = async () => {
    try {
      const params = {
        productId: id,
      };
      let response = await editProduct(params);
      if (response.status === 200) {
        const data = response?.data?.data;
        console.log('dataakh :>> ', data);
        reset({
          productName: data?.productName,
          productPlan: data?.productPlan,
          content: data?.productDescription,
          subProductName: data?.subProduct?.productName,
          productMapped: data?.subProduct?.productMappedDetais,
          startDate: new Date(data?.subProduct?.startDate),
          endDate: new Date(data?.subProduct?.endDate),
          city: data?.subProduct?.city,
          country: data?.subProduct?.country,
        });
      } else {
        Toast({ type: "error", message: response.data.message });
      }
    } catch (e) {
      console.log("errrr :>> ", e);
    }
  };

  const onsubmit = async (data) => {
    console.log("data :>> ", data);

    if (!edit) {
      try {
        let body = {
          productName: data.productName,
          productPlan: data.productPlan,
          productDescription: data.content,
          subProductName: data.subProductName,
          SubProductMappedDetails: data.productMapped,
          SubProductDurationStartDate: data.startDate,
          SubProductDurationEndDate: data.endDate,
          subProductCity: data.city,
          subProductCountry: data.country,
        };
        let response = await addProduct(body);
        if (response.status === 200) {
          setModal(true);
          const timeout = setTimeout(() => {
            setModal(false);
            reset();
            history.push("/admin/product-management");
          }, 1000);
          return () => clearTimeout(timeout);
        }
      } catch (e) {
        console.log(e);
      }
    } else {
      try {
        let body = {
          productName: data.productName,
          productPlan: data.productPlan,
          productDescription: data.content,
          subProductName: data.subProductName,
          SubProductMappedDetails: data.productMapped,
          SubProductDurationStartDate: data.startDate,
          SubProductDurationEndDate: data.endDate,
          subProductCity: data.city,
          subProductCountry: data.country,
        };
        let response = await updateProduct(body, id);
        if (response.status === 200) {
          setModal(true);
          const timeout = setTimeout(() => {
            setModal(false);
            reset();
            history.push("/admin/product-management");
          }, 1000);
          return () => clearTimeout(timeout);
        }
      } catch (e) {
        console.log(e);
      }
    }
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
              <div className="row gx-5">
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
                    })}
                  />
                  <FormErrorMessage
                    error={errors.productName}
                    messages={{
                      required: "Product Name is Required",
                    }}
                  />
                </div>
                <div class="col-4">
                  <label className="Product_description">Product Plan</label>
                  <CustomController
                    name={"productPlan"}
                    control={control}
                    error={errors?.productPlan}
                    defaultValue={getValues("productPlan")}
                    rules={{ required: true }}
                    messages={{ required: "Product Plan is Required" }}
                    render={({ onChange, ...fields }) => {
                      return (
                        <NormalMultiSelect
                          {...fields}
                          placeholder={"Select Product Plan"}
                          options={options}
                          name="productPlan"
                          handleChange={(e, { value } = {}) => {
                            onChange(value);
                          }}
                        />
                      );
                    }}
                  />
                </div>
              </div>
              <div className="row gx-5">
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
              </div>
              <p className="title_product mt-5">Sub Product Details</p>

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
              </div>
              <div className="row mt-4">
                <div className="col-12  d-flex justify-content-end">
                  <div className="col-2">
                    <NormalButton
                      onClick={() => history.push("/admin/product-management")}
                      cancel
                      label="cancel"
                    />{" "}
                  </div>
                  <div className="col-2">
                    <NormalButton
                      addProductbtn
                      label="Add Product"
                      onClick={handleSubmit(onsubmit)}
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
