import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
// Internal Component
import DashboardComp from "component/Dashboard/DashboardComp";
// Helpers
import { getadminPrivileges } from "helpers/privileges";

const Dashboard = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    getadminPrivileges(dispatch);
  }, []);

  return (
    <div>
      <DashboardComp />
    </div>
  );
};

export default Dashboard;