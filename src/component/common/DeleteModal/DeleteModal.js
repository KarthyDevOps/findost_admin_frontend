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
      <Modal open={modalOpen} centered closable={false}>
        <div className="p-5">
          {DeleteMessage && <p className="delete_text m-0">{DeleteMessage}</p>}
          {DeleteMessage && (
            <div className="delete_Img">
              <img src={ErrorImg} alt="" />
            </div>
          )}
          {DeleteMessage && (
            <div className="d-flex align-items-center justify-content-center">
              <div className="col-6">
                <NormalButton
                  className="authButton1"
                  label={"No"}
                  onClick={closeModal}
                />
              </div>
              <div className="col-6">
                <NormalButton
                  className="loginButton"
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