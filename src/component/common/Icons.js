import React from "react";

import { ReactComponent as Male } from "assets/icons/male.svg";
import { ReactComponent as Female } from "assets/icons/female.svg";

const Icon = props => {
  switch (props.icon) {
    case "male":
      return <Male />;
    case "female":
      return <Female />;
    case "trans":
      return <Female />;
    case "none":
      return <Female />;
    default:
      return <></>;
  }
};

export default Icon;
