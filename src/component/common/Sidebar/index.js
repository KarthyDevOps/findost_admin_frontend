import React, { useState } from "react";
import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import IconButton from "@material-ui/core/IconButton";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import MenuIcon from "@material-ui/icons/Menu";
import Toolbar from "@material-ui/core/Toolbar";
import { NavLink } from "react-router-dom";
import { useTheme } from "@material-ui/core/styles";
import findostLogo from "assets/images/findostLogo.svg"
import logout from "assets/icons/logout.svg";
import { useLocation } from "react-router-dom";
import { Toast } from "service/toast";
import { navLink } from "helpers";

import "./style.scss";

import { logout as logoutService } from "service/utilities";

const subNavLink = [
  {
    to: "/admin/settings",
    label: "Settings",
    iconName: "",
    inactiveIcon: "",
  },
];

function Sidebar({ classes, window, privilegesData }) {
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const handleDrawerToggle = () => setMobileOpen(!mobileOpen);

  const {
    dashboard,
    patientManagement,
  } = privilegesData ?? {};

  const location = useLocation();
  const drawer = (
    <div>
      <div className={classes.toolbar}>
        <div className="bg-white text-start p-3 pl-5">
          <img src={findostLogo} alt="logo" style={{ width: "25%" }}></img>
        </div>
      </div>
      <List className={classes.nav} style={{ textDecoration: "none" }}>
        {React.Children.toArray(
          navLink.map(
            ({ to, label, iconName, inactiveIcon, nestedChild }, index) => {
              console.log("toooooo", { dashboard, patientManagement, to })
              if (!dashboard?.view && to === "/admin/dashboard") return;
              if (!patientManagement?.view && to?.includes("/admin/patient-management")) return;

              return (
                <>
                  <NavLink
                    key={`nav-bar-${index}`}
                    to={to}
                    onClick={
                      to !== "/something" ? () => setActiveIndex(index) : ""
                    }
                    style={{ textDecoration: "none" }}
                  >
                    <div
                      style={{
                        borderRight: to?.includes(location?.pathname)
                          ? "5px solid white"
                          : null,
                      }}
                    >
                      <ListItem
                        button
                        className={
                          to?.includes(location.pathname)
                            ? "active-div"
                            : "inActive-div"
                        }
                      >
                        <div>
                          <ListItemText>
                            <span className="mr-3">
                              {to?.includes(location.pathname) ? (
                                <img src={iconName} />
                              ) : (
                                <img src={inactiveIcon} />
                              )}
                            </span>

                            <span
                              className={
                                to?.includes(location.pathname)
                                  ? "activeBar"
                                  : "inActiveBar"
                              }
                            >
                              {label}
                            </span>
                          </ListItemText>
                        </div>
                      </ListItem>
                    </div>
                  </NavLink>
                </>
              );
            }
          )
        )}
      </List>
      <hr className="mx-3 bg-white" />
      <div>
        <List className={classes.nav} style={{ textDecoration: "none" }}>
          {subNavLink.map(
            ({ to, label, iconName, inactiveIcon }, index) => (
              <>
                <NavLink
                  key={`sub-nav-bar-${index}`}
                  to={to}
                  onClick={
                    to !== "/something" ? () => setActiveIndex(index) : ""
                  }
                  style={{ textDecoration: "none" }}
                >
                  <div
                    style={{
                      borderRight: to?.includes(location?.pathname)
                        ? "5px solid white"
                        : null,
                    }}
                  >
                    <ListItem
                      button
                      className={
                        to?.includes(location?.pathname)
                          ? "active-div"
                          : "inActive-div"
                      }
                    >
                      <div>
                        <ListItemText>
                          <span className="mr-3">
                            {to?.includes(location?.pathname) ? (
                              <img src={iconName} />
                            ) : (
                              <img src={inactiveIcon} />
                            )}
                          </span>

                          <span
                            className={
                              to?.includes(location?.pathname)
                                ? "activeBar"
                                : "inActiveBar"
                            }
                          >
                            {label}
                          </span>
                        </ListItemText>
                      </div>
                    </ListItem>
                  </div>
                </NavLink>
                <div
                  className="cursor-pointer"
                  onClick={() => {
                    logoutService();
                    Toast({
                      type: "success",
                      message: "Logged Out successfully ",
                    });
                  }}
                >
                  <span className="mr-3">
                    <img src={logout} />
                  </span>
                  <span className="logout">Logout</span>
                </div>
              </>
            )
          )}
        </List>
      </div>
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <nav className={classes.drawer} aria-label="mailbox folders">
        <Hidden smUp implementation="css">
          <Drawer
            container={container}
            variant="temporary"
            anchor={theme.direction === "rtl" ? "right" : "left"}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true,
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
    </>
  );
}

export default Sidebar;
