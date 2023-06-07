import React, { useState, useEffect, Fragment } from "react";
import { BsArrowLeft } from "react-icons/bs";
import "./style.scss";
import { useForm } from "react-hook-form";
import TextEditor from "component/common/TextEditor/TextEditor";
import NormalButton from "component/common/NormalButton/NormalButton";
import { history } from "helpers";
import CustomController from "component/common/Controller";
import { addFeedback } from "service/Cms";
import SuccessModal from "component/common/DeleteModal/SuccessModal";

const AddFeedbackcomp = ({ create, view, edit, remove }) => {
  const { register, handleSubmit, errors, reset, getValues, control } = useForm(
    {
      mode: "onChange",
    }
  );

  const [modal, setModal] = useState(false);

  const onSubmit = async (data) => {
    console.log("data :>> ", data);
    try {
      let body = {
        feedback: data.description,
        userId: "12345",
        userName: "newUser",
      };
      let response = await addFeedback(body);
      if (response.status === 200) {
        setModal(true);
        const timeout = setTimeout(() => {
          setModal(false);
          reset();
          history.push("/admin/feedback-management");
        }, 1000);
        return () => clearTimeout(timeout);
      }
    } catch (e) {
      console.log(e);
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
            <p className="add_products_title m-0">Add Feedback</p>
          </div>
        </div>
        <form>
          <div className="d-flex col-12   boder_box align-items-center">
            <div class="container ">
              <p className=""> Feedback Description</p>
              <div className="row gx-5">
                <div className="col">
                  <div className="text_editor">
                    <CustomController
                      name={"description"}
                      control={control}
                      error={errors?.description}
                      defaultValue={getValues("description")}
                      rules={{ required: true }}
                      messages={{
                        required: "Feedback Description is Required",
                      }}
                      render={({ onChange, ...fields }) => {
                        return (
                          <TextEditor
                            {...fields}
                            onChange={(description) => {
                              onChange(description);
                            }}
                            name={"description"}
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
                      onClick={() => history.push("/admin/feedback-management")}
                      cancel
                      label="cancel"
                    />
                  </div>
                  <div className="col-2">
                    <NormalButton
                      addProductbtn
                      label="Add Feedback"
                      onClick={handleSubmit(onSubmit)}
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
            successMsg={"New Feedback Added Successfully"}
          />
        </div>
      </div>
    </div>
  );
};

export default AddFeedbackcomp;
