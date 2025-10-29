import React from "react";
import { createRoot } from "react-dom/client";
import Home from "./pages/home/home"; 
import Login from "./pages/login/login";

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Login />
  </React.StrictMode>
);
