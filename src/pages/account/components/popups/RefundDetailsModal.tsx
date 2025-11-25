import React from "react";
import { refundService } from "../../../../services/reembolsoMockApi";
import "../account-tabs-style.css";

interface Props {
  refundId: string;
  onClose: () => void;
}

const RefundDetailsModal: React.FC<Props> = ({ refundId, onClose }) => {
  const [r, setR] = React.useState<any | null>(null);

  React.useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const data = await refundService.get(refundId);
        if (mounted) setR(data || null);
      } catch (err) {
        if (mounted) setR(null);
      }
    })();

    return () => {
      mounted = false;
    };
  }, [refundId]);

  if (!r) return null;

  const steps = [
    "pending",
    "under_review",
    "awaiting_response",
    "approved",
    "refund_pending",
    "refund_confirmed",
  ];

  return (
    <div className="modal-backdrop" role="dialog" aria-modal="true">
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

        {/* STATUS + VALOR */}
        <p>
          <b>Status atual:</b> {r.status.replace("_", " ")}
        </p>

        <p>
          <b>Valor solicitado:</b> R$ {r.requestedValue}
        </p>

        {/* JUSTIFICATIVA */}
        <p>
          <b>Justificativa:</b>
        </p>
        <p>{r.justification}</p>

        {/* EVIDÊNCIAS */}
        <h4>Evidências enviadas:</h4>
        <div className="evidence-list">
          {r.evidenceList.map((p: any) => (
            <img
              key={p.id}
              src={p.url}
              alt={p.fileName}
              className="evidence-thumbnail"
            />
          ))}
        </div>

        {/* BOTÕES */}
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
