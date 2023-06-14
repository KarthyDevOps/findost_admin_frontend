import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

// Styles
import { createTheme, ThemeProvider } from "@material-ui/core/styles";

// InternalComponents
import Sidebar from "../component/common/Sidebar";
import { mainLayoutStyle } from "service/helpers/Constants";
import Header from "../component/common/Header";

// Helper
import adminPrivileges from "helpers/privileges";

export function MainLayout(props) {
  const dispatch = useDispatch();
  const outerTheme = createTheme({
    palette: {
      primary: {
        main: "#1A4BA1",
      },
      secondary: {
        main: "#FBFBFB",
      },
    },
  });
  const classes = mainLayoutStyle();

  useEffect(() => {
    adminPrivileges(dispatch);
  }, [localStorage.getItem("token")]);

  return (
    <div className="mainLayout">
      <ThemeProvider theme={outerTheme}>
        <div style={{ position: "relative", zIndex: "1" }}>
          <Header />
        </div>
        <div className={classes.root + " pb-5 "}>
          <Sidebar
            classes={classes}
            privilegesData={props?.privilegesData}
            className=""
          />
          <main className={classes.content + " p-0"}>{props.children}</main>
        </div>
      </ThemeProvider>
    </div>
  );
}
