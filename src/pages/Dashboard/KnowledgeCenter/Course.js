import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
// Internal Component
import CourseComp from "component/Dashboard/KnowledgeCenterComp/CourseComp";
// Helpers
import { checkAndReturnViewableComponent, history } from "helpers";
import { getadminPrivileges } from "helpers/privileges";

const Course = ({ privilegesData = {} }) => {
  const dispatch = useDispatch();
  const { knowledgeCenterManagement = {} } = privilegesData || {};

  useEffect(() => {
    getadminPrivileges(dispatch);
  }, []);

  useEffect(() => {
    const redirectTo = checkAndReturnViewableComponent(
      privilegesData,
      knowledgeCenterManagement
    );
    if (redirectTo) return history.push(redirectTo?.to);
  }, [privilegesData]);

  return (
    <div>
      <CourseComp {...knowledgeCenterManagement} />
    </div>
  );
};

export default Course;
