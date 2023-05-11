import React from "react";

import { Dialog } from "@material-ui/core/";

import NormalButton from "../NormalButton/NormalButton";

const ConfirmationPopup = ({
  classes,
  open,
  handleClose,
  isDoctorProfileCreation = false
}) => {
  return (
    <div>
      <Dialog
        classes={{ paper: classes.dialogPaper }}
        fullWidth={true}
        maxWidth={"sm"}
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <div
          className="d-flex justify-content-end px-4 mt-4 cursor-pointer"
          onClick={handleClose}
        >
          <img src={"closeCross"} />
        </div>
        <div className="px-4 py-5">
          <div className="d-flex justify-content-center">
            <img src={""} />
          </div>
          <div className="text-center mt-5">
            <p className="fs-24 fw-600">
              {isDoctorProfileCreation
                ? "Successfully submitted"
                : "Successfully Created Appointment"}
            </p>
            <p className="fs-17 fw-500">
              {isDoctorProfileCreation
                ? "Your details has been submitted successfully."
                : "You have Created Appointment Successfully."}
            </p>
          </div>
          <hr />
          <div>
            <div className="d-flex justify-content-center pt-4">
              <NormalButton
                btnSecondary
                label={isDoctorProfileCreation ? "Okay" : "Go Back"}
                onClick={handleClose}
              />
            </div>
          </div>
        </div>
      </Dialog>
    </div>
  );
};

export default ConfirmationPopup;
