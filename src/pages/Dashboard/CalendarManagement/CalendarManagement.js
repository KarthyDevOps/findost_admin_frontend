import React from "react";
import { useSelector } from "react-redux";
// internal components
import CalendarManagementComp from "component/Dashboard/CalendarManagement";

const CalendarManagement = () => {
  // access for calendar management
  const calendarAccess = useSelector(
    (state) => state?.home?.privileges?.scheduleManagement
  );
  return (
    <div>
      <CalendarManagementComp calendarAccess={calendarAccess} />
    </div>
  );
};

export default CalendarManagement;
