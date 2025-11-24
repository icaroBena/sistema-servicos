import React from "react";
import { Link, useLocation } from "react-router-dom";
import { FaHome, FaHandshake, FaCalendarAlt, FaBell } from "react-icons/fa";
import NotificationBadge from "./NotificationBadge";
import { useNotificacoes } from "../contexts/NotificationContext";
import "../styles/navbar.css";

const Navbar: React.FC = () => {
  const { notificacoes } = useNotificacoes();
  const location = useLocation();

  // Contagem por tipo
  const novasPropostas = notificacoes.filter(n => n.tipo === "proposta" && n.status === "nao_lida").length;
  const novosAgendamentos = notificacoes.filter(n => n.tipo === "agendamento" && n.status === "nao_lida").length;
  const novasNotif = notificacoes.filter(n => n.tipo === "sistema" && n.status === "nao_lida").length;

  // Detectar aba ativa via query string
  const params = new URLSearchParams(location.search);
  const currentTab = params.get("tab");

  const isLogged =
    location.pathname.startsWith("/account") ||
    location.pathname.startsWith("/home");

  const isTabActive = (tab: string) =>
    location.pathname === "/account" && currentTab === tab
      ? "nav-btn active"
      : "nav-btn";

  const isActivePath = (path: string) =>
    location.pathname.startsWith(path) ? "nav-btn active" : "nav-btn";

  return (
    <nav className="navbar">
      <div className="nav-left">
        <Link to="/home" className="nav-logo">
          WorkMatch
        </Link>
      </div>

      <div className="nav-right">

        {/* HOME */}
        <Link to="/home" className={isActivePath("/home")}>
          <FaHome className="nav-icon" />
          Início
        </Link>

        {/* PROPOSTAS */}
        <Link
          to={isLogged ? "/account?tab=propositions" : "#"}
          className={isTabActive("propositions") + (!isLogged ? " disabled" : "")}
        >
          <FaHandshake className="nav-icon" />
          Propostas
          <NotificationBadge count={novasPropostas} />
        </Link>

        {/* AGENDAMENTOS */}
        <Link
          to={isLogged ? "/account?tab=appointments" : "#"}
          className={isTabActive("appointments") + (!isLogged ? " disabled" : "")}
        >
          <FaCalendarAlt className="nav-icon" />
          Agendamentos
          <NotificationBadge count={novosAgendamentos} />
        </Link>

        {/* NOTIFICAÇÕES */}
        <Link
          to={isLogged ? "/account?tab=notifications" : "#"}
          className={isTabActive("notifications") + (!isLogged ? " disabled" : "")}
          style={{ position: "relative" }}
        >
          <FaBell className="nav-icon" />
          Notificações
          <NotificationBadge count={novasNotif} />
        </Link>

        {/* CONTA */}
        <Link
          to="/account?tab=profile"
          className={isTabActive("profile") + " account-btn"}
        >
          <img
            src="/Figures/default-user.png"
            className="nav-profile"
            alt="Conta"
          />
        </Link>

      </div>
    </nav>
  );
};

export default Navbar;