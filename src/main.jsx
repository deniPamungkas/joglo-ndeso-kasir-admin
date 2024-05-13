import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./style.css";
import SideContext from "./context/sideContext.jsx";
import NavContextComp from "./context/navContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <SideContext>
      <NavContextComp>
        <App />
      </NavContextComp>
    </SideContext>
  </React.StrictMode>
);
