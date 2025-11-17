// src/main.tsx
import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/login/login";
import Home from "./pages/home/home";
import Register from "./pages/register/register";
import Profile from "./pages/profile/profile";
import ServiceRequest from "./pages/serviceRequest/ServiceRequest";
import ServiceConfirmation from "./pages/ServiceConfirmation/serviceConfirmation";

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>

        {/* rota inicial */}
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />

        {/* suas telas */}
        <Route path="/service-requests" element={<ServiceRequest />} />
        <Route path="/confirm-service" element={<ServiceConfirmation />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />

        {/* rota fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
