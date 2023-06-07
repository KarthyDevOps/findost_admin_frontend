import React, { useEffect } from 'react';
import SiteSettingComp from 'component/Dashboard/SiteSettingComp';
import { Redirect } from 'react-router-dom';
import { checkAndReturnViewableComponent } from 'helpers';

const StaffManagemnet = ({ privilegesData = {} }) => {
  const { siteSettingsManagement = {} } = privilegesData || {};

  useEffect(() => {
    const redirectTo = checkAndReturnViewableComponent(privilegesData, siteSettingsManagement);
    if (redirectTo) {
      console.log("toto", redirectTo)
      // return <Redirect to={redirectData.to} />;
    }
  }, []);

  return (
    <div>
      <SiteSettingComp {...siteSettingsManagement} />
    </div>
  )
}

export default StaffManagemnet