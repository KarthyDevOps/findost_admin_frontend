import React from "react";
import { TimePickerComponent } from "@syncfusion/ej2-react-calendars";

// Styles
import "../../../assets/scss/appointmentTimepicker.css";

export default function TimePicker({ handleChange, ...props }) {
  return (
    <TimePickerComponent
      {...props}
      id="timepicker"
      step={props.step}
      enabled={true}
      allowEdit={false}
      openOnFocus={true}
      showClearButton={false}
      placeholder="Select a Time"
      onChange={handleChange}
    />
  );
}
