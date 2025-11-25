// src/pages/account/components/RefundsPanel.tsx

import React, { useEffect, useState } from "react";
import "./account-tabs-style.css";

import { mockClient } from "../../../mocks/devUser";
import { refundService } from "../../../services/reembolsoMockApi";

import type { Refund } from "../../../models/Reembolso";

import RefundDetailsModal from "./popups/RefundDetailsModal";
import RefundInfoPopup from "./popups/RefundInfoPopup";

const RefundsPanel: React.FC = () => {
  // Usa usuário autenticado se existir, senão mock (fallback temporário)
  const stored = localStorage.getItem("auth_user");
  const usuario = stored ? JSON.parse(stored) : mockClient;

  const [refunds, setRefunds] = useState<Refund[]>([]);
  const [selectedRefundId, setSelectedRefundId] = useState<string | null>(null);
  const [infoPopup, setInfoPopup] = useState(false);

  const load = async () => {
    try {
      const list = await refundService.listByUser(usuario.id);
      setRefunds(list || []);
    } catch (err) {
      setRefunds([]);
    }
  };

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="panel">
      <h3>Meus Reembolsos</h3>
      <p>Veja o andamento e histórico dos seus pedidos de reembolso.</p>

      <button className="btn add" onClick={() => setInfoPopup(true)}>
        Como pedir reembolso?
      </button>

      <div className="srv-list">
        {refunds.length === 0 && <p>Nenhuma solicitação encontrada.</p>}

        {refunds.map((r) => (
          <div
            key={r.id}
            className="srv-card clickable card-history"
            onClick={() => setSelectedRefundId(r.id)}
          >
            <div className="srv-info">
              <h4>Reembolso do agendamento #{r.bookingId}</h4>
              <p className="desc">{r.justification}</p>

              <span className="status-badge status-default">
                {String(r.status).replace("_", " ")}
              </span>
            </div>

            <div className="srv-right">
              <span className="price">R$ {r.requestedValue}</span>
            </div>
          </div>
        ))}
      </div>

      {selectedRefundId && (
        <RefundDetailsModal
          refundId={selectedRefundId}
          onClose={() => setSelectedRefundId(null)}
        />
      )}

      {infoPopup && <RefundInfoPopup onClose={() => setInfoPopup(false)} />}
    </div>
  );
};

export default RefundsPanel;
