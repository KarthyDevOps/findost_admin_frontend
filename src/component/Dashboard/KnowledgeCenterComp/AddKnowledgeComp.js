import React, { useState, useEffect } from "react";
import { BsArrowLeft } from "react-icons/bs";
import { useForm } from "react-hook-form";
import Dropzone from "react-dropzone";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { useHistory } from "react-router-dom";
//styles
import "./style.scss";
//assets
import cloudIcon from "../../../assets/images/uploadcloud.svg";
//internal components
import MultiSelect from "component/common/MultiSelect";
import Loader from "component/common/Loader";
import CategoryModal from "component/common/CategoryModal/CategoryModal";
import SubCategoryModal from "component/common/CategoryModal/SubCategoryModal";

import InputBox from "component/common/InputBox/InputBox";
import DropDown from "component/common/DropDown/DropDown";
import TextEditor from "component/common/TextEditor/TextEditor";
import NormalButton from "component/common/NormalButton/NormalButton";
import SuccessModal from "component/common/DeleteModal/SuccessModal";
import FormErrorMessage from "component/common/ErrorMessage";
import CustomController from "component/common/Controller";
//service
import {
  addKnowledge,
  getKnowledge,
  updateKnowledge,
  getCategoryList,
  getSubCategoryList,
} from "service/Cms";
import { uploadImage } from "service/Auth";
import { Toast } from "service/toast";
//helpers
import { history } from "helpers";

const AddKnowledgeComp = ({ create, view, remove }) => {
  const {
    register,
    handleSubmit,
    getValues,
    errors,
    setValue,
    reset,
    control,
  } = useForm({
    mode: "onChange",
  });
  const history = useHistory();
  const [modal, setModal] = useState(false);
  const [edit, setEdit] = useState(false);
  const [newDoc, setNewDoc] = useState(null);
  const [DocURL, setDocURL] = useState("");
  const [NewImage, setNewImage] = useState(null);
  const [ImageURL, setImageURL] = useState("");
  const [quill, setQuill] = useState("");
  const [loading, setloading] = useState(false);
  const [category, setCategory] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isSubmit, setIsSubmit] = useState(false);
  const [subCategory, setSubCategory] = useState("");
  const [categoryModal, setCategoryModal] = useState(false);
  const [subCategoryModal, setSubCategoryModal] = useState(false);
  const [categoryList, setCategoryList] = useState([]);
  const [subCategoryList, setSubCategoryList] = useState([]);
  const [categoryId, setCategoryId] = useState("");
  const [categoryMasterId, setCategoryMasterId] = useState("");
  const [catId, setCatId] = useState("");
  const [subCatId, setSubCatId] = useState("");
  const [subCategoryId, setSubCategoryId] = useState("");
  const [DocFileName, setDocFileName] = useState("");
  const [ImageFileName, setImageFileName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingImage, setIsLoadingImage] = useState(false);
  const [ImageLogo, setImageLogo] = useState("");
  const [isLoad, setIsLoad] = useState(false);
  const [KnowledgeDetails, setKnowledgeDetails] = useState({
    status: "",
  });
  const options = [
    {
      label: "One",
      value: "one",
    },
    {
      label: "Two",
      value: "two",
    },
    {
      label: "Three",
      value: "three",
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
  const id = localStorage.getItem("editId");

  useEffect(() => {
    setValue(
      "status",
      status.find((option) => option.value === KnowledgeDetails.status)
    );
  }, [KnowledgeDetails, setValue]);

  const getKnowledgeDetails = async () => {
    try {
      const params = {
        id: id,
      };
      let response = await getKnowledge(params);
      if (response.status === 200) {
        const data = response?.data.data;
        reset({
          title: data?.title,
          content: data?.description,
          contentURL: data?.contentUrlLink,
        });
        setCatId(data?.category);
        setSubCatId(data?.subCategory);
        setQuill(data?.description);
        setDocURL(data?.documentPathS3);
        setImageLogo(data?.image)
        setDocFileName(data?.fileOriginalName);
        setImageFileName(data?.fileImageOriginalName);
        setKnowledgeDetails({
          category: data.category,
          subcategory: data.subCategory,
          status: data.isActive ? "active" : "inActive",
        });
      } else {
        Toast({ type: "error", message: response.data.message });
      }
    } catch (e) {
      console.log("e :>> ", e);
    }
  };

  const onSubmit = async (data) => {
    if (!edit) {
      if (category && subCategory) {
        try {
          setloading(true);
          if (quill.replace(/(\<\w*\/?\w*>)/g, "").trim() == "") {
            Toast({ type: "error", message: "Description is Required" });
            return;
          }
          setModal(true);

          let body = {
            title: data.title,
            subCategory: subCategoryId,
            category: categoryMasterId,
            description: data?.content,
            contentUrlLink: data?.contentURL,
            documentPath: newDoc ? newDoc : DocURL,
            fileOriginalName: DocFileName,
            fileImageOriginalName: ImageFileName,
            documentImagePath: NewImage ? NewImage : ImageLogo,
          };
          if (KnowledgeDetails.status === "active") {
            body.isActive = true;
          } else {
            body.isActive = false;
          }
          let response = await addKnowledge(body);
          if (response.status === 200) {
            setModal(true);
            setTimeout(() => {
              setModal(false);
              setloading(false);
              reset(KnowledgeDetails);
              history.push("/admin/knowledge-center");
            }, 2000);
          } else {
            Toast({ type: "error", message: response.data.message });
            setloading(false);
          }
        } catch (e) {
          console.log(e);
        }
      }
    } else {
      if (category && subCategory) {
        try {
          if (quill.replace(/(\<\w*\/?\w*>)/g, "").trim() == "") {
            Toast({ type: "error", message: "Description is Required" });
            return;
          }
          setModal(true);
          setloading(true);
          let body = {
            title: data.title,
            contentUrlLink: data?.contentURL,
            subCategory: subCategoryId,
            category: categoryMasterId,
            description: data?.content,
            documentPath: newDoc ? newDoc : DocURL,
            fileOriginalName: DocFileName,
            fileImageOriginalName: ImageFileName,
            documentImagePath: NewImage ? NewImage : ImageLogo,

          };
          if (KnowledgeDetails.status === "active") {
            body.isActive = true;
          } else {
            body.isActive = false;
          }
          let response = await updateKnowledge(body, id);
          if (response.status === 200) {
            setModal(true);
            setTimeout(() => {
              setModal(false);
              setloading(false);
              reset(KnowledgeDetails);
              history.push("/admin/knowledge-center");
            }, 2000);
          } else {
            setloading(false);
            Toast({ type: "error", message: response.data.message });
          }
        } catch (e) {
          console.log(e);
        }
      }
    }
  };
  const TogglePopup = (type) => {
    if (type === "Category") {
      setCategoryModal(true);
    } else {
      setSubCategoryModal(true);
    }
  };

  const handlecategoryId = (option) => {
    let newCategory = categoryList.find((x) => x.name === option);
    setCategoryId(newCategory?.categoryId);
    setCategoryMasterId(newCategory?._id);
    listSubCategorys(newCategory?.categoryId);
  };
  const handleSubcategoryId = (option) => {
    let newCategory = subCategoryList.find((x) => x.name === option);
    console.log(newCategory);
    setSubCategoryId(newCategory?._id);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setIsSubmit(true);
    handleSubmit(onSubmit)();
  };

  const listCategorys = async (page) => {
    try {
      let params = {
        page: page,
        type: "knowledgeCenter",
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

  const listSubCategorys = async (catId) => {
    try {
      let params = {
        page: currentPage,
        categoryId: catId,
      };
      let response = await getSubCategoryList(params);
      if (response.status === 200 && response?.data?.data?.list.length > 0) {
        setSubCategoryList(response?.data?.data?.list);
      } else {
        setSubCategoryList([]);
      }
    } catch (e) {
      console.log("e :>> ", e);
    }
  };

  //handle drop docfunction
  const handleDrop = async (droppedimage) => {
    try {
      setIsLoading(true);
      let body = new FormData();
      for (let index = 0; index < droppedimage.length; index++) {
        const file = droppedimage[index];
        body.append("data", file);
        setDocFileName(file.name);
        let response = await uploadImage(body);
        if (response.status === 200) {
          setIsLoading(false);
          setNewDoc(response?.data?.data?.data?.key);
          setDocURL(response?.data?.data?.data?.s3URL);
        }
      }
    } catch (e) {
      console.log("e :>> ", e);
    }
  };
  const handleDropImage = async (droppedimage) => {
    try {
      setIsLoadingImage(true);
      let body = new FormData();
      for (let index = 0; index < droppedimage.length; index++) {
        const file = droppedimage[index];
        body.append("data", file);
        setImageFileName(file.name);
        let response = await uploadImage(body);
        if (response.status === 200) {
          setIsLoadingImage(false);
          setNewImage(response?.data?.data?.data?.key);
          setImageLogo(response?.data?.data?.data?.s3URL);
        }
      }
    } catch (e) {
      console.log("e :>> ", e);
    }
  };

  useEffect(() => {
    if (id) {
      setEdit(true);
      getKnowledgeDetails();
    }
    listCategorys(currentPage);
    // listSubCategorys(currentPage);
  }, []);

  const cancelImg = (e) => {
    e.stopPropagation();
    setDocURL(null);
  };
  const deleteImage = (e) => {
    e.stopPropagation();
    setImageLogo(null);
  };

  // Redirect to document
  const handleRedirect = (e) => {
    e.stopPropagation();
    history.push("#");
  };

  return (
    <div className="px-5 py-3 Add_knowledge">
      <div className="d-flex my-3 align-items-center">
        <i className="pr-3">
          <BsArrowLeft
            size={28}
            onClick={() => history.goBack()}
            style={{ cursor: "pointer" }}
          />
        </i>
        <p className="m-0">{"Knowledge Center"}</p>
      </div>
      <form>
        <div className="knowledge_body p-5">
          <div className="row">
            <div className="col-4 pb-3">
              <label>Title</label>
              <InputBox
                className="add_staff"
                type={"text"}
                placeholder="Enter Title"
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
                  pattern: "Title is Invalid",
                }}
              />
            </div>
            <div className="col-4">
              <label>Category</label>
              <MultiSelect
                options={categoryList}
                placeholder="Select Category"
                onChange={(option) => {
                  setCategory(option);
                  handlecategoryId(option);
                }}
                id="category"
                catId={catId}
                plusSymbol={false}
              // toggle={() => TogglePopup("Category")}
              // btnLabel="Create Category"
              />
              {!category && isSubmit && (
                <span style={{ color: "#dc3545" }} className="">
                  Category is Required
                </span>
              )}
            </div>
            <div className="col-4">
              <label>Sub Category</label>
              <MultiSelect
                subOptions={subCategoryList}
                placeholder="Select Sub Category"
                onChange={(option) => {
                  setSubCategory(option);
                  handleSubcategoryId(option);
                }}
                id="subCategory"
                subCatId={subCatId}
                plusSymbol={true}
                toggle={() => TogglePopup("subCategory")}
                btnLabel="Create Sub Category"
              />
              {!subCategory && isSubmit && (
                <span style={{ color: "#dc3545" }} className="">
                  Sub Category is Required
                </span>
              )}
            </div>
            <div className="col-4 my-3">
              <label>Content URL LinK</label>
              <InputBox
                className="add_staff"
                type={"text"}
                placeholder="Enter Content URL LinK"
                name="contentURL"
                errors={errors}
                register={register({
                  required: true,
                  pattern: /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/,
                })}
              />
              <FormErrorMessage
                error={errors.contentURL}
                messages={{
                  required: "URL is Required",
                  pattern: "Invalid URL",
                }}
              />
            </div>

            <div className="col-4 my-3">
              <label>Status</label>
              <CustomController
                name={"status"}
                control={control}
                error={errors.status}
                defaultValue={KnowledgeDetails.status}
                value={status.find(
                  (option) => option.value === getValues("status")
                )}
                rules={{ required: true }}
                messages={{ required: "Status is Required" }}
                render={({ onChange, ...field }) => {
                  return (
                    <DropDown
                      {...field}
                      name="status"
                      placeholder="Select Status"
                      options={status}
                      onChange={(option) => {
                        setKnowledgeDetails((prevState) => ({
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
          <div className="row">

            <div className="col-4 mt-3 mb-4">
              <label className="Product_description">Upload Document</label>
              <Dropzone
                onDrop={handleDrop}
                accept=".pdf,xl,.xlsx,.doc,.jpg,.png"
                maxSize={3072000}
                errors={errors}
                {...register("dropZoneField", {
                  required: newDoc || DocURL ? false : true,
                })}
              >
                {({ getRootProps, getInputProps }) => (
                  <div {...getRootProps({ className: "dropzone" })}>
                    <div className=" border border-secondary-subtle   ">
                      <input {...getInputProps()} multiple={false} />
                      {DocURL ? (
                        <div className="doc_name_display">
                          <img
                            src="https://windowsfileviewer.com/images/types/docx.png"
                            alt="DocURL"
                            className="preview_image"
                          ></img>
                          <p onClick={handleRedirect}>{DocFileName}</p>
                        </div>
                      ) : (
                        <>
                          <span className="cloud_icon">
                            <img src={cloudIcon} alt="icon"></img>
                          </span>
                          <div className="drag_text">
                            <p>Drag your files here to start uploading or</p>
                          </div>
                          <div className="drag_btn">
                            <NormalButton
                              onClick={(e) => e.preventDefault()}
                              uploadBrowseBtn
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
                        DocURL && (
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
              {!newDoc && (
                <FormErrorMessage
                  error={errors.dropZoneField}
                  messages={{
                    required: "Document is Required",
                  }}
                />
              )}
            </div>

            <div className="col-4 mt-3 mb-4">
              <label className="Product_description">Image Thumbanail</label>
              <Dropzone
                onDrop={handleDropImage}
                accept=".jpg,.png"
                maxSize={3072000}
                errors={errors}
                {...register("dropZoneField", {
                  required: NewImage || ImageURL ? false : true,
                })}
              >
                {({ getRootProps, getInputProps }) => (
                  <div {...getRootProps({ className: "dropzone" })}>
                    <div className=" border border-secondary-subtle   ">
                      <input {...getInputProps()} multiple={false} />
                      {ImageLogo ? (
                        <div className="doc_name_display">
                          <img
                            src={ImageLogo}
                            alt="image"
                            className="preview_image"
                          ></img>
                          <p onClick={handleRedirect}>{ImageFileName}</p>
                        </div>
                      ) : (
                        <>
                          <span className="cloud_icon">
                            <img src={cloudIcon} alt="icon"></img>
                          </span>
                          <div className="drag_text">
                            <p>Drag your files here to start uploading or</p>
                          </div>
                          <div className="drag_btn">
                            <NormalButton
                              onClick={(e) => e.preventDefault()}
                              uploadBrowseBtn
                              label="Browse"
                            />
                          </div>
                        </>
                      )}
                      {isLoadingImage ? (
                        <Loader
                          loading={isLoadingImage}
                          className="d-flex align-items-center justify-content-center"
                        />
                      ) : (
                        ImageLogo && (
                          <span
                            style={{
                              position: "absolute",
                              top: "10px",
                              right: "10px",
                              cursor: "pointer",
                              zIndex: 1000,
                            }}
                            onClick={deleteImage}
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
              {!NewImage && (
                <FormErrorMessage
                  error={errors.dropZoneField}
                  messages={{
                    required: "Document is Required",
                  }}
                />
              )}
            </div>
          </div>

          <div>
            <label>Description</label>
            <CustomController
              name={"content"}
              control={control}
              error={errors.content}
              rules={{ required: true }}
              messages={{
                required: "Description is Required",
              }}
              render={({ onChange, ...field }) => {
                return (
                  <TextEditor
                    {...field}
                    name={"content"}
                    onChange={(content) => {
                      onChange(content);
                      setQuill(content);
                    }}
                  />
                );
              }}
            />
          </div>
          <div className="d-flex align-items-center justify-content-end  p-0 pt-4">
            <div className="col-md-2 pl-4 pr-0">
              <NormalButton
                className="authButton1"
                label={"Cancel"}
                onClick={() => history.push("/admin/knowledge-center")}
              />
            </div>
            <div className="col-md-2 ">
              <NormalButton
                className="loginButton"
                onClick={handleFormSubmit}
                label={edit ? "Update" : "Add Content"}
                isLoading={loading}
              />
            </div>
          </div>
        </div>
      </form>
      <div>
        <SuccessModal
          modalOpen={modal}
          onCancel={() => setModal(false)}
          successMsg={
            !edit
              ? "Knowledge Center Added Successfully"
              : "Knowledge Center update Successfully"
          }
        />
      </div>
      <div>
        <CategoryModal
          modalOpen={categoryModal}
          onCancel={() => setCategoryModal(false)}
          refresh={() => listCategorys(currentPage)}
        />
      </div>
      <div>
        <SubCategoryModal
          modalOpen={subCategoryModal}
          onCancel={() => setSubCategoryModal(false)}
          categoryId={categoryId}
          refresh={() => listSubCategorys(currentPage)}
        />
      </div>
    </div>
  );
};

export default AddKnowledgeComp;
