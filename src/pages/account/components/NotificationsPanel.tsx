// src/pages/account/components/NotificationsPanel.tsx

import React, { useState } from "react";
import "./base-account-tab.css";

import { useNotificacoes } from "../../../contexts/NotificationContext";
import NotificationItem from "./popups/NotificationItem";

const NotificationsPanel: React.FC = () => {
  const { notifications, markAsRead, remove, clear } = useNotificacoes();

  const [filter, setFilter] = useState<"all" | "read" | "unread">("all");

  const filtered =
    filter === "all"
      ? notifications
      : notifications.filter((n) => (filter === "read" ? n.status === "read" : n.status === "unread"));

  return (
    <div className="panel">
      <h3>Notificações</h3>
      <p>Veja suas notificações recentes.</p>

      <div className="tabs">
        <button
          className={`tab ${filter === "all" ? "active" : ""}`}
          onClick={() => setFilter("all")}
        >
          Todas
        </button>

        <button
          className={`tab ${filter === "unread" ? "active" : ""}`}
          onClick={() => setFilter("unread")}
        >
          Não lidas
        </button>

        <button
          className={`tab ${filter === "read" ? "active" : ""}`}
          onClick={() => setFilter("read")}
        >
          Lidas
        </button>
      </div>

      <button className="btn remove" onClick={clear}>
        Limpar Histórico
      </button>

      <div className="srv-list">
        {filtered.length === 0 && (
          <p>Nenhuma notificação encontrada.</p>
        )}

        {filtered.map(n => (
          <NotificationItem
            key={n.id}
            item={n}
            onRead={(id) => markAsRead(id)}
            onDelete={(id) => remove(id)}
          />
        ))}
      </div>
    </div>
  );
};

export default NotificationsPanel;
