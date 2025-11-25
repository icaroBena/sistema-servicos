import React from "react";
import type { Agendamento } from "../models/Agendamento";
import "../styles/scheduleCard.css";

interface Props {
  item: Agendamento;
  onOpen: (item: Agendamento) => void;
}

const ScheduleCard: React.FC<Props> = ({ item, onOpen }) => {
  const isHistory =
    item.status === "concluido" ||
    item.status === "cancelado" ||
    item.status === "disputando";

  const cardClass = isHistory ? "card-history" : "card-active";

  const handleKeyPress = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onOpen(item);
    }
  };

  return (
    <div
      className={`srv-card clickable ${cardClass}`}
      onClick={() => onOpen(item)}
      onKeyDown={handleKeyPress}
      tabIndex={0}
      role="button"
      aria-label={`Agendamento: ${item.titulo} — status ${item.status}`}
    >
      <img
        src={item.imagemUrl ?? ""}
        alt={item.titulo}
        className="srv-img"
        loading="lazy"
      />

      <div className="srv-info">
        <h4 className="srv-title">{item.titulo}</h4>
        <p className="desc">{item.descricao}</p>

        <span className={`status-badge status-${item.status}`}>
          {item.status}
        </span>
      </div>

      <div className="srv-right">
        <span className="price">R$ {item.preco}</span>
      </div>
    </div>
  );
};

export default ScheduleCard;
