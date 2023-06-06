import React, { useEffect } from "react";
import { Redirect } from 'react-router-dom';
import { checkAndReturnViewableComponent } from 'helpers';

import DashboardComp from "component/Dashboard/DashboardComp";

const Dashboard = ({ privilegesData = {} }) => {
  const { dashboard = {} } = privilegesData || {};

  useEffect(() => {
    const redirectTo = checkAndReturnViewableComponent(privilegesData, dashboard);
    if (redirectTo) {
      console.log("toto", redirectTo)
      // return <Redirect to={redirectData.to} />;
    }
  }, [])

  return (
    <div>
      <DashboardComp {...dashboard} />
    </div>
  );
};

export default Dashboard;