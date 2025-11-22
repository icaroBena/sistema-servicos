import React from "react";
import type { Agendamento } from "../models/Agendamento";
import "../styles/scheduleCard.css";

interface Props {
  item: Agendamento;
  onOpen: (item: Agendamento) => void;
}

const ScheduleCard: React.FC<Props> = ({ item, onOpen }) => {
  const isHistory =
    item.status === "concluido" || item.status === "cancelado" || item.status === "disputando";

  const cardClass = isHistory ? "card-history" : "card-active";

  return (
    <div
      className={`srv-card clickable ${cardClass}`}
      onClick={() => onOpen(item)}
      tabIndex={0}
      role="button"
    >
      <img src={item.imagemUrl ?? ""} className="srv-img" />

      <div className="srv-info">
        <h4>{item.titulo}</h4>
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
