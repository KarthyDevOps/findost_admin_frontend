import React from "react";
import DatePicker from "react-datepicker";
import styles from "./styles.module.scss";
import { AiOutlineCalendar } from "react-icons/ai";
const CommonDatePicker = ({
  onChange,
  placeholder = "Select here",
  value,
  selected,
  maxDate,
  minDate,
  dateFormat = "dd/MM/yyyy",
  isClearable = false,
}) => {
  return (
    <div className={styles.datePicker}>
      <DatePicker
        placeholderText={placeholder}
        onChange={onChange}
        value={value}
        isClearable={isClearable}
        selected={value}
        maxDate={maxDate}
        minDate={minDate}
        dateFormat={dateFormat}
      />
      <span className={styles.icon}>
        <AiOutlineCalendar size={25} />
      </span>

    </div>
  );
};

export default CommonDatePicker;
