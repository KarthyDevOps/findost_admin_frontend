import React, { useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";

// Styles
import Step from "@material-ui/core/Step";
import Stepper from "@material-ui/core/Stepper";
import StepLabel from "@material-ui/core/StepLabel";
import { makeStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";

const signUpStepper = makeStyles((theme) => ({}));

function getStepsNew() {
  return ["Basic", "Education", "Payment"];
}

function getSteps() {
  return ["Basic", "Education", "Appointment", "Payment"];
}

const VerticalLinearStepper = ({ DoctorTypeSet }) => {
  
  const { id } = useParams();
  const history = useHistory();
  const classes = signUpStepper();
  const [activeStep, setActiveStep] = React.useState();

  const stepsData = {
    "/doctor/create-basic-details": 0,
    [`/doctor/create-education-details/${id}`]: 1,
    [`/doctor/create-appointment/${id}`]: 2,
    [`/doctor/create-payment-details/${id}`]: 3
  };

  const stepperDataNew = {
    "/doctor/create-basic-details": 0,
    [`/doctor/create-education-details/${id}`]: 1,    
    [`/doctor/create-payment-details/${id}`]: 2
  };

  const code = stepsData[history.location?.pathname];
  const codeNew = stepperDataNew[history.location?.pathname];
  const steps = DoctorTypeSet == "GP" ? getStepsNew() : getSteps();
  
  useEffect(() => {
    if (DoctorTypeSet == "GP") {
      setActiveStep(codeNew);
    } else {
      setActiveStep(code);
    }
    
  }, []);

  return (
    <div>
      <div>
        <div className={classes.root}>
          <Stepper
            activeStep={Number(activeStep)}
            orientation="horizontal"
            style={{ background: "none" }}
          >
            {steps.map((label, index) => (
              <Step key={index}>
                <StepLabel
                  icon={
                    <span
                      style={{
                        color:
                          code == index || code > index ? "#FFFFFF" : "#545454",
                        background:
                          code == index || code > index
                            ? "#0E69C2"
                            : "transparent",
                        height: "23px",
                        width: "23px",
                        borderRadius: "50%",
                        border:
                          code == index || code > index
                            ? "transparent"
                            : "1.5px solid black",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        fontSize: "13px",
                        fontWeight: 700
                      }}
                    >
                      {index + 1}
                    </span>
                  }
                >
                  {label}
                  {index + 1 == steps.length ? null : (
                    <img
                      src={"rightArrow"}
                      style={{ width: "20px", margin: "0px 10px" }}
                    />
                  )}
                </StepLabel>
              </Step>
            ))}
          </Stepper>
        </div>
      </div>
    </div>
  );
};

//export default VerticalLinearStepper;

const mapState = (state) => ({
  DoctorTypeSet: state?.home?.selectedDoctorType,
});

export default connect(mapState, null)(VerticalLinearStepper);