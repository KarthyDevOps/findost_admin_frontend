import React from "react";
import DatePicker from "react-datepicker";
import styles from "./styles.module.scss";
import { AiOutlineCalendar } from "react-icons/ai";
const CommonDatePicker = ({
  onChange,
  placeholder = "Select here",
  value,
  selected,
  clientDatePicker,
  maxDate,
  minDate,
  dateFormat = "dd/MM/yyyy",
  isClearable = false,
  id = "datepicker",
  showTimeSelect,showTimeSelectOnly
}) => {

  const handleIconClick = () => document?.getElementById?.(id)?.click?.();

  return (
    <div className={styles.datePicker}>
      <DatePicker
        id={id}
        placeholderText={placeholder}
        onChange={onChange}
        value={value}
        isClearable={isClearable}
        selected={value}
        maxDate={maxDate}
        minDate={minDate}
        dateFormat={dateFormat}
        showTimeSelect={  showTimeSelect}
        showTimeSelectOnly={showTimeSelectOnly}
        timeFormat="HH:mm"
        timeIntervals={15}
        autoComplete='off'
      />
      <span className={styles.icon} onClick={handleIconClick}>
        <AiOutlineCalendar size={25} />
      </span>

    </div>
  );
};

export default CommonDatePicker;
