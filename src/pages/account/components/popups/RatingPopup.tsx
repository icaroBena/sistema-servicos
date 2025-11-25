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
    <div className="rating-overlay" role="dialog" aria-modal="true">
      <div className="rating-popup">

        <h3 className="rating-title">Avalie o serviço</h3>
        <p className="rating-subtitle">Escolha entre 1 e 5 estrelas</p>

        {/* ESTRELAS */}
        <div className="rating-stars">
          {[1, 2, 3, 4, 5].map((star) => (
            <span
              key={star}
              className={`star ${Math.max(hover, selected) >= star ? "active" : ""}`}
              onMouseEnter={() => setHover(star)}
              onMouseLeave={() => setHover(0)}
              onClick={() => setSelected(star)}
              role="button"
              aria-label={`Avaliar com ${star} estrelas`}
            >
              ★
            </span>
          ))}
        </div>

        {/* BOTÕES */}
        <div className="rating-actions">
          <button className="btn cancel" onClick={onClose}>
            Cancelar
          </button>

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
