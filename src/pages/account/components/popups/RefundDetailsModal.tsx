import React from "react";
import * as refundsApi from "../../../../api/refunds";
import "../account-tabs-style.css";

interface Props {
  refundId: string;
  onClose: () => void;
}

const RefundDetailsModal: React.FC<Props> = ({ refundId, onClose }) => {
  const [refund, setRefund] = React.useState<any | null>(null);

  React.useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const data = await refundsApi.getRefund(refundId);
        if (mounted) setRefund(data || null);
      } catch (err) {
        // fallback: look in localStorage
        try {
          const raw = localStorage.getItem("fallback_refunds");
          const list: any[] = raw ? JSON.parse(raw) : [];
          const found = list.find((r) => r.id === refundId) ?? null;
          if (mounted) setRefund(found);
        } catch (e) {
          if (mounted) setRefund(null);
        }
      }
    })();

    return () => {
      mounted = false;
    };
  }, [refundId]);

  if (!refund) return null;

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
              className={`refund-step ${refund.status === s ? "active" : ""}`}
            >
              {s.replace("_", " ")}
            </div>
          ))}
        </div>

        {/* STATUS + VALOR */}
        <p>
          <b>Status atual:</b> {refund.status.replace("_", " ")}
        </p>

        <p>
          <b>Valor solicitado:</b> R$ {refund.requestedValue}
        </p>

        {/* JUSTIFICATIVA */}
        <p>
          <b>Justificativa:</b>
        </p>
        <p>{refund.justification}</p>

        {/* EVIDÊNCIAS */}
        <h4>Evidências enviadas:</h4>
        <div className="evidence-list">
          {refund.evidenceList.map((p: any) => (
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
