import React from "react";
import "./style.scss";

const AppointmentCardComp = ({ cardItems }) => {
  return (
    <div className="d-flex">
      <div className="appointment-card d-flex">
        <div className="icon-box mr-1">{cardItems.img}</div>
        <div className="p-2">
          <p className="mb-0">{cardItems.count}</p>
          <span>{cardItems.text}</span>
        </div>
      </div>
      
    </div>
  );
};
export default AppointmentCardComp;
