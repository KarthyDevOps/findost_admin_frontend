import React from "react";
import { Redirect } from 'react-router-dom';
import { navLink } from 'helpers';

import DashboardComp from "component/Dashboard/DashboardComp";

const Dashboard = ({ privilegesData: { dashboard, ...arg } = {} }) => {

  console.log("dashhh ", dashboard)
  if (!dashboard?.view) {
    let data = { dashboard, ...arg };

    const viewData = Object.keys(data).filter(item => {
      const { view = false } = data[item] ?? {};
      if (view) return true;
      return false;
    });

    if (viewData?.length > 0) {
      const redirectData = navLink.find(o => o.privilegesName === viewData[0]);
      if (redirectData) {
        return <Redirect to={redirectData.to} />;
      }
    }
    return null;
  }

  return (
    <div>
      <DashboardComp />
    </div>
  );
};

export default Dashboard;