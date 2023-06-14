import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
// Internal Component
import SiteSettingComp from 'component/Dashboard/SiteSettingComp';
// Helpers
import { checkAndReturnViewableComponent, history } from 'helpers';
import { getadminPrivileges } from "helpers/privileges";

const StaffManagemnet = ({ privilegesData = {} }) => {
  const dispatch = useDispatch();
  const { siteSettingsManagement = {} } = privilegesData || {};

  useEffect(() => {
    getadminPrivileges(dispatch);
  }, []);

  useEffect(() => {
    const redirectTo = checkAndReturnViewableComponent(privilegesData, siteSettingsManagement);
    if (redirectTo) return history.push(redirectTo?.to);
  }, [privilegesData]);

  return (
    <div>
      <SiteSettingComp {...siteSettingsManagement} />
    </div>
  )
}

export default StaffManagemnet