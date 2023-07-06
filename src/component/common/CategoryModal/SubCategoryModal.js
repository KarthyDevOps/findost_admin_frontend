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
import { addSubCategory } from "service/Cms";
// helpers
import { history } from "helpers";

const SubCategoryModal = ({ modalOpen, onCancel, categoryId, refresh }) => {
  const { register, handleSubmit, errors, reset } = useForm({
    mode: "onChange",
  });

  console.log('categoryId :>> ', categoryId);

  const [modal, setModal] = useState(false);

  const onSubmit = async (data) => {
    try {
      const body = {
        name: data.subCategoryName,
        categoryId: categoryId,
      };
      let response = await addSubCategory(body);
      if (response.status === 200) {
        setModal(true);
        refresh();
        setTimeout(() => {
          setModal(false);
          reset({ subCategoryName: "" });
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
          <h4>Add Sub Category</h4>
          <div className="my-3">
            <label>Sub Category Name</label>
            <InputBox
              className="add_staff w-100"
              type={"text"}
              placeholder="Enter Sub Category Name"
              name="subCategoryName"
              errors={errors}
              register={register({
                required: true,
              })}
            />
            <FormErrorMessage
              error={errors.subCategoryName}
              messages={{
                required: "SubCategory Name is Required",
              }}
            />
          </div>
          <div className="my-3">
            <NormalButton
              className="loginButton"
              onClick={handleSubmit(onSubmit)}
              label={"Add SubCategory"}
            />
          </div>
        </div>
      </Modal>
      <div>
        <SuccessModal
          modalOpen={modal}
          onCancel={() => setModal(false)}
          successMsg={"New Sub Category Added Successfully"}
        />
      </div>
    </div>
  );
};

export default SubCategoryModal;
