import React from "react";
import type { Notificacao } from "../../../../models/Notificacao";
import "./notification-item.css";

interface Props {
  item: Notificacao;
  onRead: (id: string) => void;
  onDelete: (id: string) => void;
}

const NotificationItem: React.FC<Props> = ({ item, onRead, onDelete }) => {
  const classe =
    item.status === "nao_lida"
      ? "noti-card noti-unread"
      : "noti-card";

  return (
    <div className={classe}>
      <div className="noti-top">
        <h4>{item.titulo}</h4>
        <span className="noti-time">
          {new Date(item.criadaEm).toLocaleString()}
        </span>
      </div>

      <p className="noti-msg">{item.mensagem}</p>

      <div className="noti-actions">
        {item.status === "nao_lida" && (
          <button
            className="btn small primary"
            onClick={() => onRead(item.id)}
          >
            Marcar como lida
          </button>
        )}

        {item.link && (
          <button
            className="btn small"
            onClick={() => (window.location.href = item.link!)}
          >
            Ver
          </button>
        )}

        <button
          className="btn small remove"
          onClick={() => onDelete(item.id)}
        >
          Excluir
        </button>
      </div>
    </div>
  );
};

export default NotificationItem;