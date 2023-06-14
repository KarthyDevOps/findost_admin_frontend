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
import InputBox from "component/common/InputBox/InputBox";
import DropDown from "component/common/DropDown/DropDown";
import TextEditor from "component/common/TextEditor/TextEditor";
import NormalButton from "component/common/NormalButton/NormalButton";
// import Dropzone from "component/common/Dropzone";
import SuccessModal from "component/common/DeleteModal/SuccessModal";
import FormErrorMessage from "component/common/ErrorMessage";
import CustomController from "component/common/Controller";
//service
import { addKnowledge, getKnowledge, updateKnowledge } from "service/Cms";
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
  const [DocFileName, setDocFileName] = useState("");
  const [KnowledgeDetails, setKnowledgeDetails] = useState({
    category: "",
    subcategory: "",
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
      label: "InActive",
      value: "inActive",
    },
  ];
  const id = localStorage.getItem("editId");

  useEffect(() => {
    setValue(
      "category",
      options.find((option) => option.value === KnowledgeDetails.category)
    );
    setValue(
      "subcategory",
      options.find((option) => option.value === KnowledgeDetails.subcategory)
    );
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
        setDocURL(data?.documentPathS3);
        setDocFileName(data?.documentPath);
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

  useEffect(() => {
    if (id) {
      setEdit(true);
      getKnowledgeDetails();
    }
  }, []);

  const onSubmit = async (data) => {
    setModal(true);
    if (!edit) {
      try {
        let body = {
          title: data.title,
          subCategory: KnowledgeDetails.subcategory,
          category: KnowledgeDetails.category,
          description: data?.content,
          contentUrlLink: data?.contentURL,
          documentPath: newDoc ? newDoc : DocURL,
        };
        if (KnowledgeDetails.status === "active") {
          body.isActive = true;
        } else {
          body.isActive = false;
        }
        let response = await addKnowledge(body);
        if (response.status === 200) {
          setModal(true);
          const timeout = setTimeout(() => {
            setModal(false);
            reset(KnowledgeDetails);
            history.push("/admin/knowledge-center");
          }, 1000);
          return () => clearTimeout(timeout);
        } else {
          Toast({ type: "error", message: response.data.message });
        }
      } catch (e) {
        console.log(e);
      }
    } else {
      try {
        let body = {
          title: data.title,
          contentUrlLink: data?.contentURL,
          subCategory: KnowledgeDetails.subcategory,
          category: KnowledgeDetails.category,
          description: data?.content,
          documentPath: newDoc ? newDoc : DocURL,
        };
        if (KnowledgeDetails.status === "active") {
          body.isActive = true;
        } else {
          body.isActive = false;
        }
        let response = await updateKnowledge(body, id);
        if (response.status === 200) {
          setModal(true);
          const timeout = setTimeout(() => {
            setModal(false);
            reset(KnowledgeDetails);
            history.push("/admin/knowledge-center");
          }, 1000);
          return () => clearTimeout(timeout);
        } else {
          Toast({ type: "error", message: response.data.message });
        }
      } catch (e) {
        console.log(e);
      }
    }
  };

  const handleDrop = async (droppedimage) => {
    let body = new FormData();
    for (let index = 0; index < droppedimage.length; index++) {
      const file = droppedimage[index];
      body.append("data", file);
      // console.log("File name:", file.name);
      setDocFileName(file.name);
      let response = await uploadImage(body);
      if (response.status == 200) {
        setNewDoc(response?.data?.data?.data?.key);
        setDocURL(response?.data?.data?.data?.s3URL);
      }
    }
  };

  const cancelImg = (e) => {
    e.stopPropagation();
    setDocURL(null);
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
            <div className="col-4">
              <label>Title</label>
              <InputBox
                className="add_staff"
                type={"text"}
                placeholder="Enter Title"
                name="title"
                errors={errors}
                register={register({
                  required: true,
                })}
              />
              <FormErrorMessage
                error={errors.title}
                messages={{
                  required: "Title is required",
                }}
              />
            </div>
            <div className="col-4">
              <label>Category</label>
              <CustomController
                name={"category"}
                control={control}
                error={errors.category}
                value={options.find(
                  (option) => option.value === getValues("category")
                )}
                rules={{ required: true }}
                messages={{ required: "category is Required" }}
                render={({ onChange, ...field }) => {
                  return (
                    <DropDown
                      {...field}
                      name="category"
                      placeholder="Select Category"
                      options={options}
                      onChange={(option) => {
                        setKnowledgeDetails((prevState) => ({
                          ...prevState,
                          category: option.value,
                        }));
                        onChange(option.value);
                      }}
                    />
                  );
                }}
              />
            </div>
            <div className="col-4">
              <label>Sub Category</label>
              <CustomController
                name={"subcategory"}
                control={control}
                value={status.find(
                  (option) => option.value === getValues("subcategory")
                )}
                error={errors.subcategory}
                rules={{ required: true }}
                messages={{ required: "Subcategory is Required" }}
                render={({ onChange, ...field }) => {
                  return (
                    <DropDown
                      {...field}
                      name="subcategory"
                      placeholder="Select Sub Category"
                      options={options}
                      onChange={(option) => {
                        setKnowledgeDetails((prevState) => ({
                          ...prevState,
                          subcategory: option.value,
                        }));
                        onChange(option.value);
                      }}
                    />
                  );
                }}
              />
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
                  required: "URL is required",
                  pattern: "Invalid URL",
                }}
              />
            </div>
            <div className="col-4 mt-3">
              <label className="Product_description">Upload Document</label>
              <Dropzone
                onDrop={handleDrop}
                accept=".pdf,xl,.xls,doc"
                maxSize={3072000}
                errors={errors}
                // {...register("dropZoneField", {
                //   required: ProductUrl || newDoc ? false : true,
                // })}
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
                          {/* <p onClick={handleRedirect}>{newDoc}</p> */}

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
                          <div className=" drag_btn ">
                            <NormalButton addProductbtn label="Browse" />
                          </div>
                        </>
                      )}
                      {DocURL && (
                        <span
                          style={{
                            position: "absolute",
                            top: "10px",
                            right: "10px",
                            cursor: "pointer",
                            // zIndex: 1000,
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
                      placeholder="Select status"
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
                    }}
                  />
                );
              }}
            />
          </div>
          <div className="d-flex align-items-center justify-content-end my-5 py-3">
            <div className="col-md-2">
              <NormalButton
                className="authButton1"
                label={"Cancel"}
                onClick={() => history.goBack()}
              />
            </div>
            <div className="col-md-2">
              <NormalButton
                className="loginButton"
                onClick={handleSubmit(onSubmit)}
                label={edit ? "Update" : "Add Content"}
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
    </div>
  );
};

export default AddKnowledgeComp;
