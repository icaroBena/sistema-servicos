import React, { useEffect, useState } from "react";
import "./account-tabs-style.css";

import { mockCliente } from "../../../mocks/devUser";
import { reembolsoMockApi } from "../../../services/reembolsoMockApi";

import type { Reembolso } from "../../../models/Reembolso";

import RefundDetailsModal from "./popups/RefundDetailsModal";
import RefundInfoPopup from "./popups/RefundInfoPopup";

const RefundsPanel: React.FC = () => {
  const usuario = mockCliente;
  const [reembolsos, setReembolsos] = useState<Reembolso[]>([]);
  const [selectedRefundId, setSelectedRefundId] = useState<string | null>(null);
  const [infoPopup, setInfoPopup] = useState(false);

  const carregar = () => {
    setReembolsos(reembolsoMockApi.listarPorUsuario(usuario.id));
  };

  useEffect(() => {
    carregar();
  }, []);

  return (
    <div className="panel">
      <h3>Meus Reembolsos</h3>
      <p>Veja o andamento e histórico dos seus pedidos de reembolso.</p>

      <button className="btn add" onClick={() => setInfoPopup(true)}>
        Como pedir reembolso?
      </button>

      <div className="srv-list">
        {reembolsos.length === 0 && <p>Nenhuma solicitação encontrada.</p>}

        {reembolsos.map((r) => (
          <div
            key={r.id}
            className="srv-card clickable card-history"
            onClick={() => setSelectedRefundId(r.id)}
          >
            <div className="srv-info">
              <h4>Reembolso #{r.id}</h4>
              <p className="desc">{r.justificativa}</p>

              <span className={`status-badge status-${r.status}`}>
                {r.status.replace("_", " ")}
              </span>
            </div>

            <div className="srv-right">
              <span className="price">R$ {r.valorSolicitado}</span>
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

      {infoPopup && (
        <RefundInfoPopup onClose={() => setInfoPopup(false)} />
      )}
    </div>
  );
};

export default RefundsPanel;