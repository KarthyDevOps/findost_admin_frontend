import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { BsArrowLeft } from "react-icons/bs";
//styles
import "./style.scss";
//internal components
import MultiSelect from "component/common/MultiSelect";
import CategoryModal from "component/common/CategoryModal/CategoryModal";
import SubCategoryModal from "component/common/CategoryModal/SubCategoryModal";
import NormalButton from "component/common/NormalButton/NormalButton";
import InputBox from "component/common/InputBox/InputBox";
import TextEditor from "component/common/TextEditor/TextEditor";
import DropDown from "component/common/DropDown/DropDown";
import SuccessModal from "component/common/DeleteModal/SuccessModal";
import CustomController from "component/common/Controller";
import FormErrorMessage from "component/common/ErrorMessage";
//service
import { Toast } from "service/toast";
import {
  addFAQ,
  getFAQ,
  updateFAQ,
  getCategoryList,
  getSubCategoryList,
} from "service/Cms";
//helpers
import { history } from "helpers";

const AddFaqComp = ({ create, view, remove }) => {
  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    errors,
    control,
    reset,
  } = useForm({
    mode: "onChange",
  });
  const [modal, setModal] = useState(false);
  const [edit, setEdit] = useState(false);
  const [quill, setQuill] = useState("");
  const [loading, setLoading] = useState(false);
  const [category, setCategory] = useState("");
  const [subCategory, setSubCategory] = useState("");
  const [categoryModal, setCategoryModal] = useState(false);
  const [subCategoryModal, setSubCategoryModal] = useState(false);
  const [isSubmit, setIsSubmit] = useState(false);
  const [categoryList, setCategoryList] = useState([]);
  const [subCategoryList, setSubCategoryList] = useState([]);
  const [categoryId, setCategoryId] = useState("");
  const [categoryMasterId, setCategoryMasterId] = useState("");
  const [catId, setCatId] = useState("");
  const [subCatId, setSubCatId] = useState("");
  const [subCategoryId, setSubCategoryId] = useState("");
  const [FAQDetails, setFAQDetails] = useState({
    status: "",
  });
  const [currentPage, setCurrentPage] = useState(1);

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
      status.find((option) => option.value === FAQDetails.status)
    );
  }, [FAQDetails, setValue]);

  const getFAQDetails = async () => {
    try {
      const params = {
        faqId: id,
      };
      let response = await getFAQ(params);
      if (response.status === 200) {
        const data = response?.data.data;
        reset({
          title: data?.title,
          content: data?.answer,
        });
        setQuill(data?.answer);
        setCatId(data?.category);
        setSubCatId(data?.subCategory);
        setFAQDetails({
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
          if (quill.replace(/(\<\w*\/?\w*>)/g, "").trim() == "") {
            Toast({ type: "error", message: "FAQ Status is Required" });
            return;
          }
          setModal(true);
          setLoading(true);
          let body = {
            title: data.title,
            answer: data.content,
            subCategory: subCategoryId,
            category: categoryMasterId,
          };
          if (FAQDetails.status === "active") {
            body.isActive = true;
          } else {
            body.isActive = false;
          }
          let response = await addFAQ(body);
          if (response.status === 200) {
            setModal(true);
            setTimeout(() => {
              setModal(false);
              reset(FAQDetails);
              history.push("/admin/faq-management");
            }, 2000);
            setLoading(false);
          } else {
            Toast({ type: "error", message: response.data.message });
            setLoading(false);
          }
        } catch (e) {
          console.log(e);
        }
      }
    } else {
      if (category && subCategory) {
        try {
          if (quill.replace(/(\<\w*\/?\w*>)/g, "").trim() == "") {
            Toast({ type: "error", message: "FAQ Status is Required" });
            return;
          }
          setLoading(true);
          setModal(true);
          let body = {
            title: data.title,
            answer: data.content,
            category: categoryMasterId,
            subCategory: subCategoryId,
          };
          if (FAQDetails.status === "active") {
            body.isActive = true;
          } else {
            body.isActive = false;
          }
          let response = await updateFAQ(body, id);
          if (response.status === 200) {
            setModal(true);
            setTimeout(() => {
              setModal(false);
              reset(FAQDetails);
              history.push("/admin/faq-management");
            }, 2000);
            setLoading(false);
          } else {
            Toast({ type: "error", message: response.data.message });
            setLoading(false);
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
    setSubCategoryId(newCategory?._id);
  };

  const handleFormSubmit = (e) => {
   setIsSubmit(true);
     e.preventDefault();
    handleSubmit(onSubmit)();
  };

  const listCategorys = async (page) => {
    try {
      let params = {
        page: page,
        type: "Faq",
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

  useEffect(() => {
    if (id) {
      setEdit(true);
      getFAQDetails();
    }
    listCategorys(currentPage);
    // listSubCategorys();
  }, []);

  return (
    <div className="add_faq px-5 py-3">
      <form>
        <div className="d-flex my-3 align-items-center justify-content-between">
          <div className="d-flex my-3 align-items-center">
            <i className="pr-3">
              <BsArrowLeft
                size={28}
                onClick={() => history.push("/admin/faq-management")}
                style={{ cursor: "pointer" }}
              />
            </i>
            <p className="m-0">{edit ? "Edit FAQ" : "Add New FAQ"}</p>
          </div>
          {/* <div className="row gap-3 my-3">
            <div className="pr-3">
              <NormalButton className="authButton1" label={"Download Sample"} />
            </div>
            <div className="">
              <NormalButton className="loginButton" label={"Upload CSV"} />
            </div>
          </div> */}
        </div>
        <div className="Add_faq p-5">
          <div className="row">
            <div className="col-11 ">
              <label>FAQ Title</label>
              <InputBox
                className="add_staff"
                type={"text"}
                placeholder="Enter FAQ Title"
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
          </div>
          <div className="row my-4 mr-5 pr-4 ">
            <div className="col-4">
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
            <div className="col-4">
              <label>Sub Category</label>
              <MultiSelect
                subOptions={subCategoryList}
                defaultValue={subCategory}
                placeholder="Select Sub Category"
                onChange={(option) => {
                  setSubCategory(option);
                  handleSubcategoryId(option);
                }}
                subCatId={subCatId}
                id="subCategory"
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
            <div className="col-4 ">
              <label>FAQ Status</label>
              <CustomController
                name={"status"}
                control={control}
                error={errors.status}
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
                        setFAQDetails((prevState) => ({
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
          <div className="col-12 p-0">
            <label>FAQ Status</label>
            <CustomController
              name={"content"}
              control={control}
              error={errors.content}
              rules={{ required: true }}
              messages={{
                required: "FAQ Status is Required",
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
          <div className="d-flex align-items-center justify-content-end   p-0 pt-5">
            <div className="col-md-2">
              <NormalButton
                className="authButton1"
                label={"Cancel"}
                onClick={() => history.push("/admin/faq-management")}
              />
            </div>
            <div className="col-md-2 pl-3 p-0">
              <NormalButton
                className="loginButton"
                onClick={handleFormSubmit}
                label={edit ? "Update" : "Add FAQ"}
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
            edit
              ? "FAQ Content Updated Successfully"
              : "New FAQ Added Successfully"
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
          refresh={() => listSubCategorys(categoryId)}
        />
      </div>
    </div>
  );
};

export default AddFaqComp;
