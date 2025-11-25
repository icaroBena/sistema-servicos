// src/pages/account/components/Sidebar.tsx

import React from "react";
import "./sidebar.css";

import { useNavigate } from "react-router-dom";
import {
  FaUser,
  FaCheckCircle,
  FaCog,
  FaBell,
  FaCreditCard,
  FaSignOutAlt,
  FaHandshake,
  FaCalendarAlt,
  FaBriefcase,
  FaMoneyBill,
} from "react-icons/fa";

import { useNotificacoes } from "../../../contexts/NotificationContext";

interface SidebarProps {
  active: string;
  onSelect: (section: string) => void;
  userType: string; // internal values: "client" | "provider"
}

const Sidebar: React.FC<SidebarProps> = ({ active, onSelect, userType }) => {
  const navigate = useNavigate();
  const { notifications } = useNotificacoes();

  // ======================================================================
  // BADGES PADRONIZADOS (seguindo model Notification)
  // ======================================================================
  const badgeProps = {
    proposals: notifications.filter((n) => n.type === "proposal" && n.status === "unread").length,
    appointments: notifications.filter((n) => n.type === "booking" && n.status === "unread").length,
    system: notifications.filter((n) => n.type === "system" && n.status === "unread").length,
  };

  // ======================================================================
  // LINKS PADRONIZADOS
  // ======================================================================

  const commonLinks = [
    { id: "profile", icon: FaUser, label: "Perfil" },
    { id: "appointments", icon: FaCalendarAlt, label: "Agendamentos" },
    { id: "propositions", icon: FaHandshake, label: "Propostas" },
    { id: "notifications", icon: FaBell, label: "Notificações" },
    { id: "settings", icon: FaCog, label: "Configurações" },
  ];

  const providerLinks = [
    { id: "services", icon: FaBriefcase, label: "Meus Serviços" },
    { id: "verification", icon: FaCheckCircle, label: "Verificação" },
    { id: "payments", icon: FaCreditCard, label: "Pagamentos" },
  ];

  const clientLinks = [
    { id: "payments", icon: FaCreditCard, label: "Carteira" },
    { id: "refunds", icon: FaMoneyBill, label: "Reembolso" },
  ];

  // Ordem final padronizada:
  // Perfil → (Prestador OR Cliente) → Agendamentos → Propostas → Notificações → Configurações
  const linksToShow =
    userType === "provider"
      ? [...commonLinks.slice(0, 1), ...providerLinks, ...commonLinks.slice(1)]
      : [...commonLinks.slice(0, 1), ...clientLinks, ...commonLinks.slice(1)];

  // ======================================================================
  // RENDERIZAÇÃO
  // ======================================================================

  return (
    <aside className="account-sidebar">
      <h2 className="sidebar-title">Conta</h2>

      <ul className="sidebar-menu">
        {linksToShow.map((link) => {
          const Icon = link.icon;

          return (
            <li
              key={link.id}
              className={active === link.id ? "active" : ""}
              onClick={() => onSelect(link.id)}
            >
              <Icon /> {link.label}

              {/* BADGE DE PROPOSTAS */}
              {link.id === "propositions" && badgeProps.proposals > 0 && (
                <span className="sidebar-badge">{badgeProps.proposals}</span>
              )}

              {/* BADGE DE AGENDAMENTOS */}
              {link.id === "appointments" && badgeProps.appointments > 0 && (
                <span className="sidebar-badge">{badgeProps.appointments}</span>
              )}

              {/* BADGE DE NOTIFICAÇÕES DO SISTEMA */}
              {link.id === "notifications" && badgeProps.system > 0 && (
                <span className="sidebar-badge">{badgeProps.system}</span>
              )}
            </li>
          );
        })}
      </ul>

      {/* LOGOUT */}
      <button className="logout-btn" onClick={() => navigate("/login")}>
        <FaSignOutAlt /> Sair
      </button>
    </aside>
  );
};

export default Sidebar;
