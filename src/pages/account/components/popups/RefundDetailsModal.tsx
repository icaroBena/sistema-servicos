import React from "react";
import { reembolsoMockApi } from "../../../../services/reembolsoMockApi";
import "../account-tabs-style.css";

interface Props {
  refundId: string;
  onClose: () => void;
}

const RefundDetailsModal: React.FC<Props> = ({ refundId, onClose }) => {
  const r = reembolsoMockApi.obter(refundId);
  if (!r) return null;

  const steps = [
    "pendente",
    "em_analise",
    "aguardando_resposta",
    "aprovado",
    "estorno_pendente",
    "estorno_confirmado"
  ];

  return (
    <div className="modal-backdrop">
      <div className="modal refund-modal">

        <h2>Detalhes do Reembolso</h2>

        {/* TIMELINE */}
        <div className="refund-timeline-row">
          {steps.map((s) => (
            <div
              key={s}
              className={`refund-step ${r.status === s ? "active" : ""}`}
            >
              {s.replace("_", " ")}
            </div>
          ))}
        </div>

        <p><b>Status atual:</b> {r.status.replace("_", " ")}</p>
        <p><b>Valor solicitado:</b> R$ {r.valorSolicitado}</p>

        <p><b>Justificativa:</b></p>
        <p>{r.justificativa}</p>

        <h4>Evidências enviadas:</h4>
        <div className="evidence-list">
          {r.provas.map((p) => (
            <img key={p.id} src={p.url} className="evidence-thumbnail" />
          ))}
        </div>

        <div className="modal-buttons">
          <button className="btn" onClick={onClose}>
            Fechar
          </button>
        </div>

      </div>
    </div>
  );
};

export default RefundDetailsModal;