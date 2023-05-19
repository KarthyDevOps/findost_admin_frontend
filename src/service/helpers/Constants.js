import { makeStyles } from "@material-ui/core/styles";

const drawerWidth = 286;

export const mainLayoutStyle = makeStyles((theme) => ({
  root: {
    display: "flex",
    position : "relative",
    zIndex : "0"
  },
  drawer: {
    [theme.breakpoints.up("sm")]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    [theme.breakpoints.up("sm")]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
      display: "none",
    },
    display: "block",
  },
  nav: {
    "& .MuiListItemIcon-root": {
      minWidth: "41px",
      marginLeft: "10px",
    },
    "& .MuiTypography-body1": {
      fontSize: "16px",
      fontWeight: "500",
      lineHeight: "40px",
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
    borderRight: "0px",
    boxShadow: "0px 1px 6px rgba(0, 0, 0, 0.08)",
    // border: "1px solid #D2D2D2",
    // borderTopL: "none",
    // marginTop: "65px",
    // backgroundColor: "#0655A3",
    background: "#FFFFFF",
    // width: "100%",
    // overflow:"scroll",
    // '&::-webkit-scrollbar': {
    //   display: 'none'
    // },
    position: "relative",
  },

  // content: {
  //   flexGrow: 1,
  //   padding: theme.spacing(3),
  //   [theme.breakpoints.up("sm")]: {
  //     paddingTop: "2.3rem",
  //   },
  //   paddingTop: "5rem",
  //   marginTop: "4rem",
  // },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    [theme.breakpoints.up("sm")]: {
      // paddingTop: "2.3rem",
    },
    // // paddingTop: "5rem",
    // // marginTop: "4rem",
    paddingTop: "0px",
    paddingLeft: "0px",
    paddingRight: "0px",
    background : "#fbfbfb"
  },
}));
