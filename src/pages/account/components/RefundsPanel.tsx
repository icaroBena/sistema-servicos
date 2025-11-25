// src/pages/account/components/RefundsPanel.tsx

import React, { useEffect, useState } from "react";
import "./account-tabs-style.css";

// user fallback will be read from localStorage (auth_user) — no mock import
import * as refundsApi from "../../../api/refunds";

import type { Refund } from "../../../models/Reembolso";

import RefundDetailsModal from "./popups/RefundDetailsModal";
import RefundInfoPopup from "./popups/RefundInfoPopup";

const RefundsPanel: React.FC = () => {
  // Usa usuário autenticado se existir, senão mock (fallback temporário)
  const stored = localStorage.getItem("auth_user");
  const user = stored
    ? JSON.parse(stored)
    : { id: "", name: "", email: "", type: "client", categories: [], certifications: [] };

  const [refunds, setRefunds] = useState<Refund[]>([]);
  const [selectedRefundId, setSelectedRefundId] = useState<string | null>(null);
  const [infoPopup, setInfoPopup] = useState(false);

  const load = async () => {
    try {
      const list = await refundsApi.listRefunds();
      setRefunds((list || []).filter((r) => r.requesterId === user.id));
    } catch (err) {
      // API not available — use localStorage fallback if present
      try {
        const raw = localStorage.getItem("fallback_refunds");
        const list: Refund[] = raw ? JSON.parse(raw) : [];
        setRefunds((list || []).filter((r) => r.requesterId === user.id));
      } catch (e) {
        setRefunds([]);
      }
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
