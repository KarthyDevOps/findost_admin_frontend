import React from "react";

// Styles
import { Tooltip } from "reactstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const ToolTip = ({ text }) => {

  const [toolTipOpen, setToolTipOpen] = React.useState(false);

  return (
    <div>
      <span id="TooltipExample">
        <img
          src={"alertCircle"}
          style={{ width: "100%" }}
          className="cursor-pointer"
        />
      </span>
      <Tooltip
        isOpen={toolTipOpen}
        placement="right"
        target="TooltipExample"
        toggle={() => {
          setToolTipOpen(!toolTipOpen);
        }}
        style={{
          background: "#FFFFFF",
          boxShadow: "0px 0px 4px rgba(0, 0, 0, 0.25)",
          borderRadius: "5px",
          color: "#938F8F",
          marginLeft: "5px",
          marginTop: "20px",
        }}
      >
        {text}
      </Tooltip>
    </div>
  );
};

export default ToolTip;