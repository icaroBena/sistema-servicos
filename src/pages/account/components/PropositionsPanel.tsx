// src/pages/account/components/PropositionsPanel.tsx

import React, { useEffect, useState } from "react";
import "./propositions-panel.css";

interface ProposalView {
  id: string;
  client: {
    name: string;
    address: string;
  };
  categories: string[];
  description: string;
  value: number;
  estimatedTime: string;
  status: "pending" | "accepted" | "rejected" | "negotiation";
  counterOffer?: number;
}

import * as proposalsApi from "../../../api/proposals";
import { loadFromLocal, saveToLocal } from "../../../utils/localFallback";

const SAMPLE_PROPOSALS: ProposalView[] = [
  {
    id: "1",
    client: { name: "João Pedro", address: "Rua das Flores, 120 - Centro" },
    categories: ["Instalações Elétricas"],
    description: "Preciso instalar uma tomada nova na cozinha.",
    value: 150,
    estimatedTime: "Imediato",
    status: "pending",
  },
];

const PropositionsPanel: React.FC = () => {
  const [proposals, setProposals] = useState<ProposalView[]>(SAMPLE_PROPOSALS);
  const [counterValues, setCounterValues] = useState<Record<string, string>>({});

  const accept = async (id: string) => {
    try {
      await proposalsApi.updateProposal(id, { status: "accepted" } as any);
      // reload list after API update
      await load();
    } catch (err) {
      setProposals((prev) => prev.map((p) => (p.id === id ? { ...p, status: "accepted" } : p)));
      // persist fallback
      try {
        const list: ProposalView[] = loadFromLocal("fallback_proposals", proposals);
        const updated = list.map((p) => (p.id === id ? { ...p, status: "accepted" } : p));
        saveToLocal("fallback_proposals", updated);
      } catch (e) {}
    }
  };

  const reject = async (id: string) => {
    try {
      await proposalsApi.updateProposal(id, { status: "rejected" } as any);
      await load();
    } catch (err) {
      setProposals((prev) => prev.map((p) => (p.id === id ? { ...p, status: "rejected" } : p)));
      try {
        const list: ProposalView[] = loadFromLocal("fallback_proposals", proposals);
        const updated = list.map((p) => (p.id === id ? { ...p, status: "rejected" } : p));
        saveToLocal("fallback_proposals", updated);
      } catch (e) {}
    }
  };

  const sendCounterOffer = (id: string) => {
    const value = Number(counterValues[id]);

    if (!value || value <= 0)
      return alert("Digite um valor válido.");

    // Try API; if not available, update local state & fallback storage
    (async () => {
      try {
        await proposalsApi.updateProposal(id, { counterOffer: value, status: "negotiation" } as any);
        await load();
      } catch (err) {
        setProposals((prev) =>
          prev.map((p) => (p.id === id ? { ...p, counterOffer: value, status: "negotiation" } : p))
        );
        try {
          const list: ProposalView[] = loadFromLocal("fallback_proposals", proposals);
          const updated = list.map((p) => (p.id === id ? { ...p, counterOffer: value, status: "negotiation" } : p));
          saveToLocal("fallback_proposals", updated);
        } catch (e) {}
      }
    })();

    alert("Contraproposta enviada!");
  };

  const load = async () => {
    try {
      const list = await proposalsApi.listProposals();
      // Map API Proposal -> ProposalView for UI
      const view = (list || []).map((p: any) => ({
        id: p.id,
        client: { name: p.client?.name ?? p.clientId ?? "Cliente", address: p.client?.address ?? "" },
        categories: p.categories ?? [],
        description: p.message ?? p.description ?? "",
        value: p.value ?? p.price ?? 0,
        estimatedTime: p.estimatedTime ?? p.estimatedTime ?? "",
        status: p.status ?? "pending",
        counterOffer: p.counterOffer,
      } as ProposalView));

      setProposals(view);
    } catch (err) {
      try {
        const list: ProposalView[] = loadFromLocal("fallback_proposals", SAMPLE_PROPOSALS);
        setProposals(list);
      } catch (e) {
        setProposals(SAMPLE_PROPOSALS);
      }
    }
  };

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="propositions-panel">
      <h2 className="section-title">Minhas Propostas</h2>
      <p className="section-subtitle">Negocie valores e responda clientes.</p>

      <div className="proposal-list">
        {proposals.map(p => (
          <div key={p.id} className="proposal-card">
            <div className="proposal-info">
              <h3 className="prop-title">{p.categories.join(", ")}</h3>

              <p><strong>Cliente:</strong> {p.client.name}</p>
              <p><strong>Endereço:</strong> {p.client.address}</p>
              <p><strong>Descrição:</strong> {p.description}</p>
              <p><strong>Valor oferecido:</strong> R$ {p.value}</p>

                {p.counterOffer && (
                <p>
                  <strong>Seu valor sugerido:</strong> R$ {p.counterOffer}
                </p>
              )}

              <p><strong>Tempo:</strong> {p.estimatedTime}</p>

              <span className={`status-badge status-${p.status}`}>
                {p.status}
              </span>
            </div>

            {p.status === "pending" && (
              <div className="proposal-actions">
                <button className="btn primary" onClick={() => accept(p.id)}>
                  Aceitar
                </button>

                <button className="btn remove" onClick={() => reject(p.id)}>
                  Recusar
                </button>

                <div className="counter-offer-block">
                  <input
                    type="number"
                    placeholder="Novo valor"
                    className="counter-input"
                    value={counterValues[p.id] || ""}
                    onChange={e =>
                      setCounterValues({
                        ...counterValues,
                        [p.id]: e.target.value,
                      })
                    }
                  />

                  <button
                    className="btn toggle"
                    onClick={() => sendCounterOffer(p.id)}
                  >
                    Enviar contraproposta
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PropositionsPanel;
