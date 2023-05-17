import React, { useState } from "react";
import { Button, Modal } from "antd";
import "./style.scss";
import ErrorImg from "assets/images/ErrorImg.svg";
import NormalButton from "../NormalButton/NormalButton";
const DeleteModal = (props) => {
  const { deleteName } = props;
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Button type="primary" onClick={showModal}>
        Open Modal
      </Button>
      <Modal open={isModalOpen} centered closable={false}>
        <div className="p-5">
          <p className="delete_text m-0">
            Are you sure you want to {deleteName}?
          </p>
          <div className="delete_Img">
            <img src={ErrorImg} alt="" />
          </div>
          <div className="d-flex align-items-center justify-content-center">
            <div className="col-md-5">
              <NormalButton
                className="authButton1"
                label={"No"}
                onClick={handleCancel}
              />
            </div>
            <div className="col-md-5">
              <NormalButton
                className="loginButton"
                label={"Yes"}
                onClick={handleOk}
              />
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default DeleteModal;
