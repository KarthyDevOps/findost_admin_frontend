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
      {/* <Header /> */}
      <ThemeProvider theme={outerTheme}>
        <div className={classes.root + " pb-5"}>
          <Sidebar classes={classes} privilegesData={props?.privilegesData} />
          <main className={classes.content}>
            <div>
              <Header />
            </div>
            {props.children}
          </main>
        </div>
      </ThemeProvider>
    </div>
  );
}
