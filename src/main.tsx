// src/main.tsx
import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/login/login";
import Home from "./pages/home/home";

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        {/* rota inicial: login */}
        <Route path="/" element={<Login />} />
        {/* sua outra tela */}
        <Route path="/home" element={<Home />} />
        {/* qualquer rota desconhecida volta pro login */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
