import { Ellipsis } from "react-spinners-css";
import React from "react";

// TODO: find a center-able, height-able spinner lol
function LoadingIndicator({ className = "", ...props }) {
  return (
    <div className={`${className}`}>
      {/* <Ellipsis size={80} color="#b794f4" style={{ height: "20px" }} /> */}
      Loading...
    </div>
  );
}

export default LoadingIndicator;
