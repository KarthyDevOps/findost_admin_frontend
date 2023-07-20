import React, { useState, useEffect, Fragment } from "react";
import { BsArrowLeft } from "react-icons/bs";
import { useForm } from "react-hook-form";
import Dropzone from "react-dropzone";
import { AiOutlineCloseCircle } from "react-icons/ai";

//styles
import "./style.scss";
//assets
import cloudIcon from "../../../../assets/images/uploadcloud.svg";
//internal components
import MultiSelect from "component/common/MultiSelect";
import InputBox from "component/common/InputBox/InputBox";
import FormErrorMessage from "component/common/ErrorMessage";
import Loader from "component/common/Loader/index";
import TextEditor from "component/common/TextEditor/TextEditor";
import NormalButton from "component/common/NormalButton/NormalButton";
import DropDown from "component/common/DropDown/DropDown";
import SuccessModal from "component/common/DeleteModal/SuccessModal";
//services
import {
  addTemplate,
  getCategoryList,
  getTemplate,
  updateTemplate,
} from "service/Cms";
import CustomController from "component/common/Controller";
import { Toast } from "service/toast";
import { uploadImage } from "service/Auth";

//helpers
import { history } from "helpers";
import CategoryModal from "component/common/CategoryModal/CategoryModal";

const AddTempleteManagementcomp = ({ create, view, remove }) => {
  const {
    register,
    handleSubmit,
    setValue,
    errors,
    control,
    reset,
    setError,
    getValues,
  } = useForm({
    mode: "onChange",
  });

  const [modal, setModal] = useState(false);
  const [quill, setQuill] = useState("");
  const [loading, setLoading] = useState(false);
  const [categoryList, setCategoryList] = useState([]);
  const [category, setCategory] = useState("");
  const [catId, setCatId] = useState("");
  const [isSubmit, setIsSubmit] = useState(false);
  const [categoryId, setCategoryId] = useState("");
  const [categoryMasterId, setCategoryMasterId] = useState("");
  const [categoryModal, setCategoryModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [edit, setEdit] = useState(false);
  const [isLoad, setIsLoad] = useState(false);
  const [SiteImageLogo, setImageLogo] = useState("");
  const [categoryType, setcategoryType] = useState("");
  const [TemplateTypeId, setTemplateTypeId] = useState("");

  const [TemplateDetails, setTemplateDetails] = useState({
    type: "",
    status: "",
    Templatetype: " ",
  });

  const options = [
    {
      label: "Template Based Message",
      value: "template",
    },
    {
      label: "Predefined Text Message",
      value: "preDefined",
    },
  ];

  const Templateoptions = [
    {
      label: "Images",
      value: "Image",
    },
    {
      label: "Text",
      value: "Text",
    },
    {
      label: "Infographics",
      value: "Info Graphics",
    },
  ];

  const status = [
    {
      label: "Active",
      value: "active",
    },
    {
      label: "Inactive",
      value: "inActive",
    },
  ];

  const templateId = localStorage.getItem("editId");

  useEffect(() => {
    setValue(
      "type",
      options.find((option) => option.value === TemplateDetails.type)
    );
    setValue(
      "Templatetype",
      Templateoptions.find(
        (option) => option.value === TemplateDetails.Templatetype
      )
    );
    setValue(
      "status",
      status.find((option) => option.value === TemplateDetails.status)
    );
  }, [TemplateDetails, setValue]);

  const getTemplateDetails = async () => {
    try {
      const params = {
        templateId: templateId,
      };
      let response = await getTemplate(params);

      if (response.status === 200) {
        const data = response?.data.data;
        reset({
          title: data?.title,
          content: data?.description,
        });
        setQuill(data?.description);
        setCatId(data?.categoryId);

        console.log("data", data);
        setImageLogo(data?.imagePath);
        setTemplateDetails({
          type: data.type,
          status: data.isActive ? "active" : "inActive",
          Templatetype: data.templateType,
        });
        listCategorys(
          1,
          data.type === "preDefined"
            ? "preDefinedText"
            : data.templateType === "Image"
            ? "templateTypeImage"
            : data.templateType === "Text"
            ? "templateTypeText"
            : "templateTypeInfoGraphics"
        );
      } else {
        Toast({ type: "error", message: response.data.message });
      }
    } catch (e) {
      console.log("e :>> ", e);
    }
  };

  useEffect(() => {
    if (templateId) {
      setEdit(true);
      getTemplateDetails();
    }
  }, []);

  const handleDrop = async (droppedimage) => {
    try {
      setIsLoad(true);
      let body = new FormData();
      for (let index = 0; index < droppedimage.length; index++) {
        const file = droppedimage[index];
        body.append("data", file);
        let response = await uploadImage(body);
        if (response.status == 200) {
          setIsLoad(false);
          setImageLogo(response?.data?.data?.data?.s3URL);
        }
      }
    } catch (e) {
      console.log("e :>> ", e);
    }
  };

  const deleteFavLogo = (e) => {
    e.stopPropagation();
    setImageLogo(null);
  };

  const onSubmit = async (data) => {
    if (!edit) {
      try {
        if (quill.replace(/(\<\w*\/?\w*>)/g, "").trim() == "") {
          Toast({
            type: "error",
            message: "Template Message Content is Required",
          });
          return;
        }
        setLoading(true);
        setModal(true);
        let body = {
          title: data.title,
          description: data.content,
          type: TemplateDetails.type,
          templateType:
            TemplateDetails.type === "template"
              ? TemplateDetails.Templatetype
              : "",
          categoryId: TemplateTypeId,
          imagePath: SiteImageLogo,
        };
        if (TemplateDetails.status === "active") {
          body.isActive = true;
        } else {
          body.isActive = false;
        }
        let response = await addTemplate(body);
        if (response.status === 200) {
          setModal(true);
          setTimeout(() => {
            setModal(false);
            reset(TemplateDetails);
            history.push("/admin/template-management");
          }, 2000);
          setLoading(false);
        } else {
          setLoading(false);

          Toast({ type: "error", message: response.data.message });
        }
      } catch (e) {
        console.log(e);
      }
    } else {
      try {
        if (quill.replace(/(\<\w*\/?\w*>)/g, "").trim() == "") {
          Toast({
            type: "error",
            message: "Template Message Content is Required",
          });
          return;
        }
        setLoading(true);

        setModal(true);

        let body = {
          title: data.title,
          description: data.content,
          type: TemplateDetails.type,
          templateType:
            TemplateDetails.type === "template"
              ? TemplateDetails.Templatetype
              : "",
          categoryId: TemplateTypeId,
          imagePath: SiteImageLogo,
        };
        if (TemplateDetails.status === "active") {
          body.isActive = true;
        } else {
          body.isActive = false;
        }
        let response = await updateTemplate(body, templateId);
        if (response.status === 200) {
          setModal(true);
          setTimeout(() => {
            setModal(false);
            reset(TemplateDetails);
            history.push("/admin/template-management");
          }, 2000);
        } else {
          setLoading(false);

          Toast({ type: "error", message: response.data.message });
        }
      } catch (e) {
        console.log(e);
      }
    }
  };

  console.log("TemplateTypeId :>> ", TemplateTypeId);

  const handleFormSubmit = (e) => {
    setIsSubmit(true);
    e.preventDefault();
    handleSubmit(onSubmit)();
  };

  const listCategorys = async (page, type) => {
    try {
      let params = {
        page: page,
        type: type,
      };
      let response = await getCategoryList(params);
      if (response.status === 200 && response?.data?.data?.list.length > 0) {
        setCategoryList(response?.data?.data?.list);
      } else {
        setCategoryList([]);
      }
    } catch (e) {
      console.log("e :>> ", e);
    }
  };

  const handlecategoryId = (option) => {
    let newCategory = categoryList.find((x) => x.name === option);
    setCategoryId(newCategory?.categoryId);
    setCategoryMasterId(newCategory?._id);
    setTemplateTypeId(newCategory?._id);
  };

  const TogglePopup = (type) => {
    if (type === "Category") {
      setCategoryModal(true);
    }
  };

  return (
    <div className="container-fluid">
      <div className="addProduct col-12">
        <div className="row">
          <div className=" d-flex my-3 align-items-center ">
            <i className="px-4">
              <BsArrowLeft
                size={28}
                onClick={() => history.goBack()}
                style={{ cursor: "pointer" }}
              />
            </i>
            <p className="add_products_title m-0">
              {!edit ? "Add Template" : "Template Management"}
            </p>
          </div>
        </div>
        <form>
          <div className="d-flex col-12   boder_box align-items-center">
            <div className="container ">
              <div className="row gx-5">
                <div className="col-4">
                  <label className="Product_description">Message Title</label>
                  <InputBox
                    className="login_input"
                    type={"text"}
                    placeholder="Enter Message Title"
                    name="title"
                    errors={errors}
                    register={register({
                      required: true,
                      pattern: /^(?!\s*$).+/,
                    })}
                  />
                  <FormErrorMessage
                    error={errors.title}
                    messages={{
                      required: "Title is Required",
                      pattern: "Please Enter a Valid Title",
                    }}
                  />
                </div>
                <div className="col-3">
                  <label className="Product_description">Message Type</label>
                  <CustomController
                    name={"type"}
                    control={control}
                    error={errors.type}
                    // defaultValue={role}
                    rules={{ required: true }}
                    messages={{ required: "Message type is Required" }}
                    render={({ onChange, ...field }) => {
                      return (
                        <DropDown
                          {...field}
                          name="type"
                          placeholder="Select Status"
                          options={options}
                          onChange={(option) => {
                            setTemplateDetails((prevState) => ({
                              ...prevState,
                              type: option.value,
                            }));
                            onChange(option.value);

                            option.value === "preDefined" &&
                              listCategorys(1, "preDefinedText");
                          }}
                        />
                      );
                    }}
                  />
                </div>
                {console.log(
                  "TemplateDetails?.Templatetype >> ",
                  TemplateDetails?.type
                )}
                <div className="col-3">
                  <label className="Product_description">Message Status</label>
                  <CustomController
                    name={"status"}
                    control={control}
                    error={errors.status}
                    // defaultValue={role}
                    value={status.find(
                      (option) => option.value === getValues("status")
                    )}
                    rules={{ required: true }}
                    messages={{ required: "Message Status is Required" }}
                    render={({ onChange, ...field }) => {
                      return (
                        <DropDown
                          {...field}
                          name="status"
                          errors={errors.status}
                          placeholder="Select Status"
                          options={status}
                          onChange={(option) => {
                            setTemplateDetails((prevState) => ({
                              ...prevState,
                              status: option.value,
                            }));
                            onChange(option.value);
                          }}
                        />
                      );
                    }}
                  />
                </div>
              </div>
              <div className="row gx-5">
                {TemplateDetails.type === "template" && (
                  <div className="col-4">
                    <label className="Product_description">Template Type</label>
                    <CustomController
                      name={"Templatetype"}
                      control={control}
                      error={errors.Templatetype}
                      // defaultValue={role}
                      value={Templateoptions.find(
                        (option) => option.value === getValues("Templatetype")
                      )}
                      rules={{ required: true }}
                      messages={{ required: "Template type is Required" }}
                      render={({ onChange, ...field }) => {
                        return (
                          <DropDown
                            {...field}
                            name="Templatetype"
                            placeholder="Select Template Status"
                            options={Templateoptions}
                            onChange={(Templatetype) => {
                              setTemplateDetails((prevState) => ({
                                ...prevState,
                                Templatetype: Templatetype.value,
                              }));
                              onChange(Templatetype.value);
                              listCategorys(
                                1,
                                Templatetype.value === "Image"
                                  ? "templateTypeImage"
                                  : Templatetype.value === "Text"
                                  ? "templateTypeText"
                                  : "templateTypeInfoGraphics"
                              );
                            }}
                          />
                        );
                      }}
                    />
                  </div>
                )}
                <div className="col-3 mt-2">
                  <label>Category</label>
                  <MultiSelect
                    options={categoryList}
                    placeholder="Select Category"
                    defaultValue={category}
                    onChange={(option) => {
                      setCategory(option);
                      handlecategoryId(option);
                    }}
                    id="category"
                    catId={catId}
                    plusSymbol={true}
                    toggle={() => TogglePopup("Category")}
                    btnLabel="Create Category"
                  />
                  {!category && isSubmit && (
                    <span style={{ color: "#dc3545" }} className="">
                      Category is Required
                    </span>
                  )}
                </div>
                {console.log("catId :>> ", catId)}
              </div>
              <div className="row gx-5">
                <div className="col-4 mt-4">
                  <label className="Product_description">Image</label>

                  <Dropzone
                    onDrop={handleDrop}
                    accept=".png, .jpeg, .jpg, "
                    maxSize={3072000}
                    errors={errors}
                    {...register("dropZoneLogoField", {
                      required: SiteImageLogo ? false : true,
                    })}
                  >
                    {({ getRootProps, getInputProps }) => (
                      <div {...getRootProps({ className: "dropzone" })}>
                        <div className=" border border-secondary-subtle   ">
                          <input {...getInputProps()} multiple={false} />
                          {isLoad ? (
                            <Loader
                              loading={isLoad}
                              className="d-flex align-items-center justify-content-center"
                            />
                          ) : SiteImageLogo ? (
                            <>
                              <img
                                src={SiteImageLogo}
                                alt="SiteImageLogo"
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
                          {SiteImageLogo && (
                            <span
                              style={{
                                position: "absolute",
                                top: "10px",
                                right: "10px",
                                cursor: "pointer",
                                // zIndex: 1000,
                              }}
                              onClick={deleteFavLogo}
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
                  {!SiteImageLogo && (
                    <FormErrorMessage
                      error={errors.dropZoneLogoField}
                      messages={{
                        required: "Image is Required",
                      }}
                    />
                  )}
                </div>
              </div>
              <div className="row gx-5 mt-4">
                <div className="col">
                  <label className="Product_description ms-3">
                    Template Message Content
                  </label>
                  <div className="text_editor">
                    <CustomController
                      name={"content"}
                      control={control}
                      error={errors.content}
                      rules={{
                        required: true,
                      }}
                      messages={{
                        required: "Template Message is Required",
                      }}
                      render={({ onChange, ...field }) => {
                        return (
                          <TextEditor
                            {...field}
                            onChange={(content) => {
                              onChange(content);
                              setQuill(content);
                            }}
                            name={"content"}
                          />
                        );
                      }}
                    />
                  </div>
                </div>
              </div>
              <div className="row mt-4">
                <div className="col-12  d-flex justify-content-end  p-0 pt-3">
                  <div className="col-2 p-0 d-flex justify-content-end">
                    <NormalButton
                      onClick={() => history.push("/admin/template-management")}
                      cancel
                      label="Cancel"
                    >
                      {" "}
                    </NormalButton>
                  </div>
                  <div className="col-2 ">
                    <NormalButton
                      loginButton
                      onClick={handleFormSubmit}
                      label={!edit ? "Add Template" : "Update"}
                      isLoading={loading}
                    >
                      {" "}
                    </NormalButton>
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
                ? "Template Message Content Updated Successfully"
                : "New Template Added Successfully"
            }
          />
        </div>
        <div>
          <CategoryModal
            modalOpen={categoryModal}
            onCancel={() => setCategoryModal(false)}
            refresh={() =>
              listCategorys(
                currentPage,
                TemplateDetails?.type === "preDefined"
                  ? "preDefinedText"
                  : TemplateDetails?.Templatetype === "Image"
                  ? "templateTypeImage"
                  : TemplateDetails?.Templatetype === "Text"
                  ? "templateTypeText"
                  : "templateTypeInfoGraphics"
              )
            }
            type={TemplateDetails?.type === "preDefined" && "preDefinedText"}
            tempType={
              TemplateDetails?.Templatetype === "Image"
                ? "templateTypeImage"
                : TemplateDetails?.Templatetype === "Text"
                ? "templateTypeText"
                : "templateTypeInfoGraphics"
            }
          />
        </div>
        {console.log(TemplateDetails?.Templatetype, "TemplateDetails?.type")}
      </div>
    </div>
  );
};

export default AddTempleteManagementcomp;
