import React from "react";
import ReactDOM from "react-dom/client";
import "./CSS/index.css";
import App from "./App";

import Ghost from "./Ghost";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <div>
    <App />
    <Ghost />
  </div>
);
