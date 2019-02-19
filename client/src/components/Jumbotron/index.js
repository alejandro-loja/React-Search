import React from "react";

function Jumbotron({ children }) {
  return (
    <div
      style={{ textAlign: "center" }}
      className="jumbotron"
    >
      {children}
    </div>
  );
}

export default Jumbotron;
