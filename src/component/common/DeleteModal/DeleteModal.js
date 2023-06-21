import React, { useState } from "react";
import { Button, Modal } from "antd";
import "./style.scss";
import ErrorImg from "assets/images/ErrorImg.svg";
import successImg from "assets/images/SuccessImg.svg";
import NormalButton from "../NormalButton/NormalButton";
const DeleteModal = ({
  DeleteMessage,
  modalOpen,
  closeModal,
  handleDelete,
}) => {
  return (
    <>
      <Modal open={modalOpen} centered closable={false} className={"success-modal"}>
        <div className="p-5">
          {DeleteMessage && <p className="delete_text m-0">{DeleteMessage}</p>}
          {DeleteMessage && (
            <div className="delete_Img">
              <img src={ErrorImg} alt="" />
            </div>
          )}
          {DeleteMessage && (
            <div className="d-flex align-items-center ">
              <div className="col-6 d-flex justify-content-end">
                <NormalButton
                  className="DeleteNoBtn"
                  label={"No"}
                  onClick={closeModal}
                />
              </div>
              <div className="col-6 d-flex  justify-content-start">
                <NormalButton
                  className="DeleteYesBtn"
                  label={"Yes"}
                  onClick={handleDelete}
                />
              </div>
            </div>
          )}
        </div>
      </Modal>
    </>
  );
};

export default DeleteModal;
