// src/main.tsx
import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/login/login";
import Home from "./pages/home/home";
import Register from "./pages/register/register";
import Account from "./pages/account/account"; // veio da tela-login
import ServiceRequest from "./pages/serviceRequest/ServiceRequest"; // veio da development
import ServiceConfirmation from "./pages/ServiceConfirmation/serviceConfirmation";
import Admin from "./page-adm/admin";

import { NotificationProvider } from "./contexts/NotificationContext";

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <NotificationProvider>
        <Routes>

          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/service-requests" element={<ServiceRequest />} />
          <Route path="/confirm-service" element={<ServiceConfirmation />} />
          <Route path="/register" element={<Register />} />
          <Route path="/account" element={<Account />} />

          <Route path="*" element={<Navigate to="/" replace />} />

        </Routes>
      </NotificationProvider>
    </BrowserRouter>
  </React.StrictMode>
);
