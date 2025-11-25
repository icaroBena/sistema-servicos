import React from "react";
import type { Booking } from "../models/Agendamento";
import "../styles/scheduleCard.css";

interface Props {
  item: Booking;
  onOpen: (item: Booking) => void;
}

const ScheduleCard: React.FC<Props> = ({ item, onOpen }) => {
  const isHistory =
    item.status === "completed" ||
    item.status === "cancelled" ||
    item.status === "disputed";

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
      aria-label={`Agendamento: ${item.title} — status ${item.status}`}
    >
      <img src={item.imageUrl ?? ""} alt={item.title} className="srv-img" loading="lazy" />

      <div className="srv-info">
        <h4 className="srv-title">{item.title}</h4>
        <p className="desc">{item.description}</p>

        <span className={`status-badge status-${item.status}`}>
          {item.status}
        </span>
      </div>

      <div className="srv-right">
        <span className="price">R$ {item.price}</span>
      </div>
    </div>
  );
};

export default ScheduleCard;
