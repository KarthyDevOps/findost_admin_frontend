import React from "react";
import ClipLoader from "react-spinners/ClipLoader";
import Backdrop from "@material-ui/core/Backdrop";
import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
}));

 export const Loader = ({ loading, className }) => {
  return (
    <div className={className}>
      <ClipLoader
        color={"#e47718"}
        loading={loading}
        size={40}
        // css={override}
      />
    </div>
  );
};

export const InitialLoader = () => {
  const classes = useStyles();
  return (
    <Backdrop className={classes.backdrop} open>
      <CircularProgress color="inherit" />
    </Backdrop>
  );
};

export default Loader;
