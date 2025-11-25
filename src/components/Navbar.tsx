import React from "react";
import { Link, useLocation } from "react-router-dom";
import { FaHome, FaHandshake, FaCalendarAlt, FaBell } from "react-icons/fa";

import NotificationBadge from "./NotificationBadge";
import { useNotificacoes } from "../contexts/NotificationContext";

import "../styles/navbar.css";

const Navbar: React.FC = () => {
  const { notifications } = useNotificacoes();
  const location = useLocation();

  /* ------------------ BADGES ------------------ */
  const novasPropostas = notifications.filter((n) => n.type === "proposal" && n.status === "unread").length;

  const novosAgendamentos = notifications.filter((n) => n.type === "booking" && n.status === "unread").length;

  const novasNotif = notifications.filter((n) => n.type === "system" && n.status === "unread").length;

  /* ------------------ CONTEXTO ------------------ */
  const params = new URLSearchParams(location.search);
  const currentTab = params.get("tab");

  const isLogged =
    location.pathname.startsWith("/account") ||
    location.pathname.startsWith("/home");

  const isActivePath = (path: string): string =>
    location.pathname.startsWith(path) ? "nav-btn active" : "nav-btn";

  const isTabActive = (tab: string): string =>
    location.pathname === "/account" && currentTab === tab
      ? "nav-btn active"
      : "nav-btn";

  return (
    <nav
      className="navbar"
      role="navigation"
      aria-label="Menu principal do WorkMatch"
    >
      {/* LOGO */}
      <div className="nav-left">
        <Link to="/home" className="nav-logo" aria-label="Ir para página inicial">
          WorkMatch
        </Link>
      </div>

      {/* LINKS */}
      <div className="nav-right">
        {/* HOME */}
        <Link to="/home" className={isActivePath("/home")}>
          <FaHome className="nav-icon" />
          Início
        </Link>

        {/* PROPOSTAS */}
        <Link
          to={isLogged ? "/account?tab=propositions" : "#"}
          className={
            isTabActive("propositions") + (!isLogged ? " disabled" : "")
          }
          aria-disabled={!isLogged}
        >
          <FaHandshake className="nav-icon" />
          Propostas
          <NotificationBadge count={novasPropostas} />
        </Link>

        {/* AGENDAMENTOS */}
        <Link
          to={isLogged ? "/account?tab=appointments" : "#"}
          className={
            isTabActive("appointments") + (!isLogged ? " disabled" : "")
          }
          aria-disabled={!isLogged}
        >
          <FaCalendarAlt className="nav-icon" />
          Agendamentos
          <NotificationBadge count={novosAgendamentos} />
        </Link>

        {/* NOTIFICAÇÕES */}
        <Link
          to={isLogged ? "/account?tab=notifications" : "#"}
          className={
            isTabActive("notifications") + (!isLogged ? " disabled" : "")
          }
          aria-disabled={!isLogged}
          style={{ position: "relative" }}
        >
          <FaBell className="nav-icon" />
          Notificações
          <NotificationBadge count={novasNotif} />
        </Link>

        {/* PERFIL */}
        <Link
          to="/account?tab=profile"
          className={isTabActive("profile") + " account-btn"}
          aria-label="Acessar conta do usuário"
        >
          <img
            src="/Figures/default-user.png"
            className="nav-profile"
            alt="Conta"
            loading="lazy"
          />
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
