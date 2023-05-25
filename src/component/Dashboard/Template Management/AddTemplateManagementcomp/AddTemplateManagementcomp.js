import React, { useState, useEffect, Fragment } from "react";
import { BsArrowLeft } from "react-icons/bs";
import "./style.scss";
import InputBox from "component/common/InputBox/InputBox";
import { useForm } from "react-hook-form";
import FormErrorMessage from "component/common/ErrorMessage";
import ReactSelect from "react-select";
import CommonDatePicker from "component/common/CommonDatePicker/CommonDatePicker";
import TextEditor from "component/common/TextEditor/TextEditor";
import { history } from "helpers";
import NormalButton from "component/common/NormalButton/NormalButton";
import DropDown from "component/common/DropDown/DropDown";
import SuccessModal from "component/common/DeleteModal/SuccessModal";
import CustomController from "component/common/Controller";
const AddTempleteManagementcomp = () => {
  const { register, handleSubmit, errors, control, reset, setError } = useForm({
    mode: "onChange",
  });
  // const [role, setRole] = useState("");
  // const [status, setStatus] = useState("");
  // const [edit, setEdit] = useState(false);
  // const [startdate, setstartdate] = useState("");
  // const [enddate, setenddate] = useState("");
  const [content, setContent] = useState("");
  const [modal, setModal] = useState(false);
  const [edit, setEdit] = useState(true);

  const [editorState, setEditorState] = useState(null);

  const handleChange = (state) => {
    setEditorState(state);
  };
  const onSubmit = (data) => {
    // console.log("data :>> ", data);
    // console.log("data :>> ", managementCheckedItems);
    // console.log("role :>> ", role);
    // console.log("status :>> ", status);
    setModal(true);

    const timeout = setTimeout(() => {
      setModal(false);
    }, 1000);

    return () => clearTimeout(timeout);
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
              {edit ? "Add Template" : "Template Management"}
            </p>
          </div>
        </div>
        {/* <div> */}
        <form>
          <div className="d-flex col-12   boder_box align-items-center">
            <div class="container ">
              <div class="row gx-5">
                <div class="col-4">
                  <label className="Product_description">Message Title</label>
                  <InputBox
                    className="login_input"
                    type={"text"}
                    placeholder="Enter Message Title"
                    //   errors={errors}
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
                <div class="col-4">
                  <label className="Product_description">Message Type</label>
                  <CustomController
                    name={"active"}
                    control={control}
                    error={errors.active}
                    // defaultValue={role}
                    rules={{ required: true }}
                    messages={{ required: "Message type is Required" }}
                    render={({ onChange, ...field }) => {
                      return (
                        <DropDown
                          // value={value}
                          name="active"
                          placeholder="Active"

                          // onChange={(e) => {}}
                          // options={options}
                        />
                      );
                    }}
                  />
                </div>
                <div class="col-4">
                  <label className="Product_description">Message Status</label>
                  <CustomController
                    name={"activeType"}
                    control={control}
                    error={errors.activeType}
                    // defaultValue={role}
                    rules={{ required: true }}
                    messages={{ required: "Message Status is Required" }}
                    render={({ onChange, ...field }) => {
                      return (
                        <DropDown
                          // value={value}
                          name="activeType"
                          placeholder="Active"

                          // onChange={(e) => {}}
                          // options={options}
                        />
                      );
                    }}
                  />
                </div>
              </div>
              <div className="row gx-5 mt-3">
                <div className="col">
                  <label className="Product_description ms-3">
                    Template Message Content
                  </label>
                  <div className="text_editor">
                  <CustomController
                      name={"TextEditor"}
                      control={control}
                      error={errors.TextEditor}
                      // defaultValue={endDate}
                      rules={{ required: true }}
                      messages={{
                        required: "Template message is Required",
                      }}
                      render={({ onChange, ...field }) => {
                        return (
                          <TextEditor
                            errors={errors.TextEditor}
                            content={content}
                            setContent={setContent}
                          />
                        );
                      }}
                    />
                  </div>
                </div>
              </div>
              <div className="row mt-4">
                <div className="col-12  d-flex justify-content-end">
                  <div className="col-2">
                    <NormalButton
                      onClick={() => history.goBack()}
                      cancel
                      label="cancel"
                    >
                      {" "}
                    </NormalButton>
                  </div>
                  <div className="col-2">
                    <NormalButton
                      addProductbtn
                      onClick={handleSubmit(onSubmit)}
                      label={edit ? "Add Template" : "Update"}
                    >
                      {" "}
                    </NormalButton>
                    {/* <NormalButton addProductbtn label='Update'> </NormalButton> */}
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
      </div>
    </div>
  );
};

export default AddTempleteManagementcomp;
