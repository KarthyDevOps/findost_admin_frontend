import React, { useEffect } from 'react';
import SiteSettingComp from 'component/Dashboard/SiteSettingComp';
import { Redirect } from 'react-router-dom';
import { checkAndReturnViewableComponent } from 'helpers';

const StaffManagemnet = ({ privilegesData = {} }) => {
  const { siteSettings = {} } = privilegesData || {};

  useEffect(() => {
    const redirectTo = checkAndReturnViewableComponent(privilegesData, siteSettings);
    if (redirectTo) {
      console.log("toto", redirectTo)
      // return <Redirect to={redirectData.to} />;
    }
  }, []);

  return (
    <div>
      <SiteSettingComp {...siteSettings} />
    </div>
  )
}

export default StaffManagemnet