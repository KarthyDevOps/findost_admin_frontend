import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { BsArrowLeft } from "react-icons/bs";
//styles
import "./style.scss";
//internal components
import NormalButton from "component/common/NormalButton/NormalButton";
import InputBox from "component/common/InputBox/InputBox";
import SuccessModal from "component/common/DeleteModal/SuccessModal";
import FormErrorMessage from "component/common/ErrorMessage";
//service
import { Toast } from "service/toast";
// import {} from "service/Cms";
//helpers
import { history } from "helpers";
import { addSegment, getSegment, updateSegment } from "service/Auth";

const AddFeeComp = ({ create, view, remove }) => {
  const { register, handleSubmit, errors, reset } = useForm({
    mode: "onChange",
  });
  const [modal, setModal] = useState(false);
  const [edit, setEdit] = useState(false);
  const [loading, setLoading] = useState(false);

  const id = localStorage.getItem("editId");

  const getSegmentDetails = async () => {
    try {
      const params = {
        id: id,
      };
      let response = await getSegment(params);
      if (response.status === 200) {
        const data = response?.data.data;
        reset({
          segment: data?.segmentName,
          charges: data?.segmentCharge,
        });
      } else {
        Toast({ type: "error", message: response.data.message });
      }
    } catch (e) {
      console.log("e :>> ", e);
    }
  };

  const onSubmit = async (data) => {
    console.log("data :>> ", data);
    if (!edit) {
      try {
        setLoading(true);
        let body = {
          segmentName: data.segment,
          segmentCharge: data.charges,
        };
        let response = await addSegment(body);
        if (response.status === 200) {
          setModal(true);
          const timeout = setTimeout(() => {
            setModal(false);
            reset({ segment: "", charges: "" });
            history.push("/admin/fee-management");
          }, 2000);
          setLoading(false);
          return () => clearTimeout(timeout);
        } else {
          Toast({ type: "error", message: response.data.message });
          setLoading(false);
        }
      } catch (e) {
        console.log(e);
      }
    } else {
      try {
        setLoading(true);
        let body = {
          segmentName: data.segment,
          segmentCharge: data.charges,
        };
        let response = await updateSegment(body, id);
        if (response.status === 200) {
          setModal(true);
          const timeout = setTimeout(() => {
            setModal(false);
            reset({ segment: "", charges: "" });
            history.push("/admin/fee-management");
          }, 2000);
          setLoading(false);
          return () => clearTimeout(timeout);
        } else {
          Toast({ type: "error", message: response.data.message });
          setLoading(false);
        }
      } catch (e) {
        console.log(e);
      }
    }
  };

  useEffect(() => {
    if (id) {
      setEdit(true);
      getSegmentDetails();
    }
  }, []);

  return (
    <div className="add_faq px-5 py-3">
      <form>
        <div className="d-flex my-3 align-items-center justify-content-between">
          <div className="d-flex my-3 align-items-center">
            <i className="pr-3">
              <BsArrowLeft
                size={28}
                onClick={() => history.push("/admin/fee-management")}
                style={{ cursor: "pointer" }}
              />
            </i>
            <p className="m-0">{edit ? "Edit Segment" : "Add Segment"}</p>
          </div>
        </div>
        <div className="Add_faq p-5">
          <div className="row">
            <div className="col-6">
              <label>Segment Name</label>
              <InputBox
                className="add_staff"
                type={"text"}
                placeholder="Enter Segment Name"
                name="segment"
                errors={errors}
                register={register({
                  required: true,
                  pattern: /^(?!\s*$).+/,
                })}
              />
              <FormErrorMessage
                error={errors.segment}
                messages={{
                  required: "Segment Name is Required",
                  pattern: "Segment Name is Invalid",
                }}
              />
            </div>
            <div className="col-6">
              <label>Segment Charges</label>
              <InputBox
                className="add_staff"
                type={"text"}
                placeholder="Enter Segment Charges"
                name="charges"
                errors={errors}
                register={register({
                  required: true,
                  pattern: /^\d+(\.\d+)?$/,
                })}
              />
              <FormErrorMessage
                error={errors.charges}
                messages={{
                  required: "Segment Charges is Required",
                  pattern: "Segment Charges is Invalid",
                }}
              />
            </div>
          </div>
          <div className="d-flex align-items-center justify-content-end   p-0 pt-5">
            <div className="col-md-2">
              <NormalButton
                className="authButton1"
                label={"Cancel"}
                onClick={() => history.push("/admin/fee-management")}
              />
            </div>
            <div className="col-md-2 pl-3 p-0">
              <NormalButton
                className="loginButton"
                onClick={handleSubmit(onSubmit)}
                label={edit ? "Update Segment" : "Add Segment"}
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
              ? "Segment Updated Successfully"
              : "New Segment Added Successfully"
          }
        />
      </div>
    </div>
  );
};

export default AddFeeComp;
