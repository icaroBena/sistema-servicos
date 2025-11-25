// src/main.tsx

import React from "react";
import { createRoot } from "react-dom/client";

// Router
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// Pages
import Login from "./pages/login/login";
import Home from "./pages/home/home";
import Register from "./pages/register/register";
import Account from "./pages/account/account";
import ServiceRequest from "./pages/serviceRequest/ServiceRequest";
import ServiceConfirmation from "./pages/ServiceConfirmation/serviceConfirmation";
import Admin from "./page-adm/admin";

// Context Providers
import { NotificationProvider } from "./contexts/NotificationContext";

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <NotificationProvider>
        <Routes>

          {/* Rota padrão → Login */}
          <Route path="/" element={<Navigate to="/login" replace />} />

          {/* Autenticação */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Usuário */}
          <Route path="/home" element={<Home />} />
          <Route path="/account" element={<Account />} />

          {/* Serviços */}
          <Route path="/service/request" element={<ServiceRequest />} />
          <Route path="/service/confirm" element={<ServiceConfirmation />} />
          <Route path="/admin" element={<Admin />} /> 

          {/* Catch-all */}
          <Route path="*" element={<Navigate to="/login" replace />} />

        </Routes>
      </NotificationProvider>
    </BrowserRouter>
  </React.StrictMode>
);
