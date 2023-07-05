import React, { useState } from "react";
// styles
import "./CategoryModal.scss";
// internal components
import InputBox from "component/common/InputBox/InputBox";
import FormErrorMessage from "component/common/ErrorMessage";
import NormalButton from "component/common/NormalButton/NormalButton";
import SuccessModal from "../DeleteModal/SuccessModal";
import { Toast } from "service/toast";
// service
import { useForm } from "react-hook-form";
import { Modal } from "antd";
import { addCategory } from "service/Cms";
// helpers
import { history } from "helpers";

const CategoryModal = ({ modalOpen, onCancel, refresh }) => {
  const { register, handleSubmit, errors, reset } = useForm({
    mode: "onChange",
  });

  const [modal, setModal] = useState(false);

  const onSubmit = async (data) => {
    try {
      const body = {
        name: data.categoryName,
      };
      let response = await addCategory(body);
      if (response.status === 200) {
        setModal(true);
        refresh();
      setTimeout(() => {
          setModal(false);
          reset({ categoryName: "" });
          onCancel();
        }, 2000);
      } else {
        Toast({ type: "error", message: response.data.message });
      }
    } catch (e) {
      console.log("e :>> ", e);
    }
  };

  return (
    <div>
      <Modal
        open={modalOpen}
        centered
        onCancel={onCancel}
        className="catelog-modal"
      >
        <div className="my-3">
          <h4>Add Category</h4>
          <div className="my-3">
            <label>Category Name</label>
            <InputBox
              className="add_staff w-100"
              type={"text"}
              placeholder="Enter Category Name"
              name="categoryName"
              errors={errors}
              register={register({
                required: true,
              })}
            />
            <FormErrorMessage
              error={errors.categoryName}
              messages={{
                required: "Category Name is Required",
              }}
            />
          </div>
          <div className="my-3">
            <NormalButton
              className="loginButton"
              onClick={handleSubmit(onSubmit)}
              label={"Add Category"}
            />
          </div>
        </div>
      </Modal>
      <div>
        <SuccessModal
          modalOpen={modal}
          onCancel={() => setModal(false)}
          successMsg={"New Category Added Successfully"}
        />
      </div>
    </div>
  );
};

export default CategoryModal;
