import React from "react";
import { useSelector } from "react-redux";
// internal components
import AddCalendarComp from "component/Dashboard/CalendarManagement/AddCalendarComp";

const AddCalendarManagement = () => {
  // access for calendar management
  const calendarAccess = useSelector(
    (state) => state?.home?.privileges?.scheduleManagement
  );
  return (
    <div>
      <AddCalendarComp calendarAccess={calendarAccess} />
    </div>
  );
};

export default AddCalendarManagement;
