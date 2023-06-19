import React, { useState, useEffect } from "react";
// styles
import "./AnswerFeedback.scss";
// internal component
import NormalButton from "component/common/NormalButton/NormalButton";
import TextEditor from "component/common/TextEditor/TextEditor";
import CustomController from "component/common/Controller";
import SuccessModal from "component/common/DeleteModal/SuccessModal";
// services
import { BsArrowLeft } from "react-icons/bs";
import { useForm } from "react-hook-form";
import { getFeedback, updateFeedback } from "service/Cms";
import { Toast } from "service/toast";
// helpers
import { history } from "helpers";

const AnswerFeedbackcomp = ({ create, view, edit, remove }) => {
  const { handleSubmit, errors, reset, control, getValues } = useForm({
    mode: "onChange",
  });

  const [userName, setUsername] = useState("");
  const [userId, setUserId] = useState("");
  const [feedback, setFeedback] = useState("");
  const [modal, setModal] = useState(false);
  const id = localStorage.getItem("editId");

  const getFeedbackDetails = async () => {
    try {
      let params = {
        feedbackId: id,
      };
      let response = await getFeedback(params);
      if (response.status === 200) {
        setUserId(response?.data.data.userId);
        setUsername(response?.data.data.userName);
        setFeedback(response?.data.data.feedback);
      } else {
        Toast({ type: "error", message: response.data.message });
      }
    } catch (e) {
      console.log("e :>> ", e);
    }
  };

  const onSubmit = async (data) => {
    try {
      let body = {
        userId: userId,
        userName: userName,
        feedback: data.answer,
      };
      let response = await updateFeedback(body, id);
      if (response.status === 200) {
        setModal(true);
        const timeout = setTimeout(() => {
          setModal(false);
          reset({ answer: "" });
          history.push("/admin/feedBack-management");
        }, 1000);
        return () => clearTimeout(timeout);
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    if (id) {
      getFeedbackDetails();
    }
  }, []);

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
            <p className="add_products_title m-0">Feedback</p>
          </div>
        </div>
        <form>
          <div className="d-flex col-12 boder_box align-items-center">
            <div class="container ">
              <div class="row gx-5">
                <div class="col-3">
                  <label className="Product_description"> User Name</label>
                  <div className="my-4">{userName}</div>
                </div>
                <div class="col-9">
                  <label className="Product_description">Description</label>
                  <div
                    className="my-4"
                    dangerouslySetInnerHTML={{ __html: feedback }}
                  ></div>
                </div>
              </div>
              <p className=""> Feedback Answer</p>
              <div className="row gx-5">
                <div className="col">
                  <div className="text_editor">
                    <CustomController
                      name={"answer"}
                      control={control}
                      error={errors?.answer}
                      defaultValue={getValues("answer")}
                      rules={{ required: true }}
                      messages={{
                        required: "Feedback Answer is Required",
                      }}
                      render={({ onChange, ...fields }) => {
                        return (
                          <TextEditor
                            {...fields}
                            onChange={(description) => {
                              onChange(description);
                            }}
                            name={"answer"}
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
                      onClick={() =>  history.push("/admin/feedBack-management")}
                      cancel
                      label="cancel"
                    />{" "}
                  </div>
                  <div className="col-2">
                    <NormalButton
                      addProductbtn
                      label="Answer"
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
            successMsg={"Replied to Feedback Successfully"}
          />
        </div>
      </div>
    </div>
  );
};

export default AnswerFeedbackcomp;
