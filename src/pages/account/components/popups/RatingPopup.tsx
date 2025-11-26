import React, { useState } from "react";
import "./rating-popup.css";

interface RatingPopupProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (rating: number) => void;
}

const RatingPopup: React.FC<RatingPopupProps> = ({ isOpen, onClose, onSubmit }) => {
  const [selected, setSelected] = useState(0);
  const [hover, setHover] = useState(0);

  if (!isOpen) return null;

  return (
    <div className="rating-overlay">
      <div className="rating-popup">
        <h3 className="rating-title">Avalie o serviço</h3>
        <p className="rating-subtitle">De 1 a 5 estrelas</p>

        <div className="rating-stars">
          {[1, 2, 3, 4, 5].map((star) => (
            <span
              key={star}
              className={`star ${(hover || selected) >= star ? "active" : ""}`}
              onMouseEnter={() => setHover(star)}
              onMouseLeave={() => setHover(0)}
              onClick={() => setSelected(star)}
            >
              ★
            </span>
          ))}
        </div>

        <div className="rating-actions">
          <button className="btn cancel" onClick={onClose}>Cancelar</button>

          <button
            className="btn primary"
            disabled={selected === 0}
            onClick={() => {
              onSubmit(selected);
              onClose();
            }}
          >
            Enviar Avaliação
          </button>
        </div>
      </div>
    </div>
  );
};

export default RatingPopup;
