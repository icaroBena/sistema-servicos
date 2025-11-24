import React, { useState } from "react";
import { useNotificacoes } from "../../../contexts/NotificationContext";
import NotificationItem from "./popups/NotificationItem";
import "./base-account-tab.css";

const NotificationsPanel: React.FC = () => {
  const { notificacoes, marcarLida, remover, limpar } = useNotificacoes();

  const [filtro, setFiltro] = useState<"todas" | "lidas" | "nao_lidas">("todas");

  const filtradas =
    filtro === "todas"
      ? notificacoes
      : notificacoes.filter(n =>
        filtro === "lidas" ? n.status === "lida" : n.status === "nao_lida"
      );

  return (
    <div className="panel">
      <h3>Notificações</h3>
      <p>Veja suas notificações mais recentes e atualizações importantes.</p>

      {/* FILTRO */}
      <div className="tabs">
        <button
          className={`tab ${filtro === "todas" ? "active" : ""}`}
          onClick={() => setFiltro("todas")}
        >
          Todas
        </button>
        <button
          className={`tab ${filtro === "nao_lidas" ? "active" : ""}`}
          onClick={() => setFiltro("nao_lidas")}
        >
          Não lidas
        </button>
        <button
          className={`tab ${filtro === "lidas" ? "active" : ""}`}
          onClick={() => setFiltro("lidas")}
        >
          Lidas
        </button>
      </div>

      <button className="btn remove" onClick={limpar}>
        Limpar Histórico
      </button>

      {/* LISTA */}
      <div className="srv-list">
        {filtradas.length === 0 && (
          <p>Nenhuma notificação encontrada.</p>
        )}

        {filtradas.map(n => (
          <NotificationItem
            key={n.id}
            item={n}
            onRead={(id) => marcarLida(id)}
            onDelete={(id) => remover(id)}
          />
        ))}
      </div>
    </div>
  );
};

export default NotificationsPanel;
