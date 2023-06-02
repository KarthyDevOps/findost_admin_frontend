import React from "react";
import Sidebar from "../component/common/Sidebar";
import { createTheme, ThemeProvider } from "@material-ui/core/styles";
import { mainLayoutStyle } from "service/helpers/Constants";
import Header from "../component/common/Header";
export function MainLayout(props) {
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
  return (
    <div className="mainLayout">
      <ThemeProvider theme={outerTheme}>
        <div style={{position: "relative", zIndex:"1"}}>
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
