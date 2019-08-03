import React from "react";

const Cell = props => (
  <div className={`box ${props.wallDirections.join(" ")}`}>
    {props.children}
  </div>
);

export default Cell;
