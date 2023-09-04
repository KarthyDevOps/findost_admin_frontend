import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
// internal components
import CalendarManagementComp from "component/Dashboard/CalendarManagement";
// Helpers
import { checkAndReturnViewableComponent, history } from "helpers";
import { getadminPrivileges } from "helpers/privileges";

const CalendarManagement = ({ privilegesData = {} }) => {

  const dispatch = useDispatch();

  const { calenderManagement = {} } = privilegesData || {};

  useEffect(() => {
    getadminPrivileges(dispatch);
  }, []);

  useEffect(() => {
    const redirectTo = checkAndReturnViewableComponent(
      privilegesData,
      calenderManagement
    );
    if (redirectTo) return history.push(redirectTo?.to);
  }, [privilegesData]);


  // access for calendar management
  // const calendarAccess = useSelector(
  //   (state) => state?.home?.privileges?.scheduleManagement
  // );
  return (
    <div>
      <CalendarManagementComp calendarAccess={calenderManagement} />
    </div>
  );
};

export default CalendarManagement;
