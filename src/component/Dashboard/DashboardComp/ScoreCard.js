import React from "react";
import "./style.scss";
import { AiOutlineFileAdd } from "react-icons/ai"
const ScoreCardComp = ({ cardItems }) => {
  return (
    <div>
      <div className="count-card d-flex">
        <div className="icon-box mr-1">{cardItems.img}</div>
        <div className="p-2">
          <p className="mb-0" style={{ fontSize: cardItems.fontSize }}>{cardItems.text}</p>
          <p>{cardItems.count}</p>
        </div>
      </div>
    </div>
  )
}
export default ScoreCardComp;