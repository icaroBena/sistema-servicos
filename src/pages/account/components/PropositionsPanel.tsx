// src/pages/account/components/PropositionsPanel.tsx

import React, { useState } from "react";
import "./propositions-panel.css";

interface Proposal {
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

const mockProposals: Proposal[] = [
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
  const [proposals, setProposals] = useState<Proposal[]>(mockProposals);
  const [counterValues, setCounterValues] = useState<Record<string, string>>({});

  const accept = (id: string) => {
    setProposals(prev =>
      prev.map(p => (p.id === id ? { ...p, status: "accepted" } : p))
    );
  };

  const reject = (id: string) => {
    setProposals(prev =>
      prev.map(p => (p.id === id ? { ...p, status: "rejected" } : p))
    );
  };

  const sendCounterOffer = (id: string) => {
    const value = Number(counterValues[id]);

    if (!value || value <= 0)
      return alert("Digite um valor válido.");

    setProposals(prev =>
      prev.map(p =>
        p.id === id
          ? { ...p, counterOffer: value, status: "negotiation" }
          : p
      )
    );

    alert("Contraproposta enviada!");
  };

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
