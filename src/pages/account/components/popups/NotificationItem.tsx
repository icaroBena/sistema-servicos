import React from "react";
import type { Notificacao } from "../../../../models/Notificacao";
import "./notification-item.css";

interface Props {
  item: Notificacao;
  onRead: (id: string) => void;
  onDelete: (id: string) => void;
}

const NotificationItem: React.FC<Props> = ({ item, onRead, onDelete }) => {
  const isUnread = item.status === "nao_lida";

  const classe = isUnread
    ? "noti-card noti-unread"
    : "noti-card";

  const handleNavigate = () => {
    if (!item.link) return;
    // redirecionamento seguro
    window.location.href = item.link;
  };

  return (
    <div
      className={classe}
      role="article"
      aria-label={`Notificação: ${item.titulo}`}
    >
      {/* Cabeçalho */}
      <div className="noti-top">
        <h4 className="noti-title">{item.titulo}</h4>

        <span className="noti-time">
          {new Date(item.criadaEm).toLocaleString()}
        </span>
      </div>

      {/* Mensagem */}
      <p className="noti-msg">{item.mensagem}</p>

      {/* Ações */}
      <div className="noti-actions">
        {isUnread && (
          <button
            className="btn small primary"
            aria-label="Marcar notificação como lida"
            onClick={() => onRead(item.id)}
          >
            Marcar como lida
          </button>
        )}

        {item.link && (
          <button
            className="btn small"
            aria-label="Ir para o conteúdo da notificação"
            onClick={handleNavigate}
          >
            Ver
          </button>
        )}

        <button
          className="btn small remove"
          aria-label="Excluir notificação"
          onClick={() => onDelete(item.id)}
        >
          Excluir
        </button>
      </div>
    </div>
  );
};

export default NotificationItem;
