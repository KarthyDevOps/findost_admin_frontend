import React from "react";
import DatePicker from "react-date-picker";

// Styles
import "./DatePicker.scss";

// Asset
import calendar from "assets/icons/calendar.svg";

const DatePick = ({ handleChange, ...props }) => {
  return (
    <div>
      <div className="DatepickerContainer">
        <DatePicker
          {...props}
          clearIcon={false}
          format="dd/MM/yyyy"
          // dayPlaceholder="DD"
          // monthPlaceholder="MM"
          // yearPlaceholder="YYYY"/
          placeholderText="Please select a date"
          onChange={handleChange}
          className={"profileCreationDate p-2"}
          calendarIcon={<img src={calendar} style={{ width: "90%" }} />}
        />
      </div>
    </div>
  );
};

export default DatePick;