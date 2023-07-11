import React, { useState } from "react";
import { Button, Modal } from "antd";
import "./style.scss";
import successImg from "assets/images/SuccessImg.svg";

const SuccessModal = ({ successMsg, modalOpen, onCancel }) => {
  return (
    <div>
      <Modal
        open={modalOpen}
        centered
        closable={false}
        onCancel={onCancel}
        className="success-modal"
      >
        <div className="p-5">
          {successMsg && (
            <>
              <p className="success_text m-0">{successMsg}</p>
              <div className="success_img">
                <img src={successImg} alt="" />
              </div>
            </>
          )}
        </div>
      </Modal>
    </div>
  );
};

export default SuccessModal;
