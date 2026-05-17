import React from "react";
import ReactDOM from "react-dom/client";
import { PlayerProvider } from "./context/PlayerContext";
import "./index.css";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <PlayerProvider>
      <App />
    </PlayerProvider>
  </React.StrictMode>
);