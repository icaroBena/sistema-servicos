import React, { useState } from "react";
import "./propositions-panel.css";

interface PropostaServico {
  id: string;
  cliente: {
    nome: string;
    localizacao: string;
  };
  categorias: string[];
  descricao: string;
  preco: number;
  tempo: string;
  status: "pendente" | "aceita" | "recusada" | "negociacao";
  contraproposta?: number;
}

const mockPropostas: PropostaServico[] = [
  {
    id: "1",
    cliente: { nome: "João Pedro", localizacao: "Rua das Flores, 120 - Centro" },
    categorias: ["Instalações Elétricas"],
    descricao: "Preciso instalar uma tomada nova na cozinha.",
    preco: 150,
    tempo: "Imediato",
    status: "pendente",
  },
];

const PropositionsPanel: React.FC = () => {
  const [propostas, setPropostas] = useState(mockPropostas);
  const [novoValor, setNovoValor] = useState<{ [id: string]: string }>({});

  const handleAceitar = (id: string) => {
    setPropostas(prev =>
      prev.map(p => (p.id === id ? { ...p, status: "aceita" } : p))
    );
  };

  const handleRecusar = (id: string) => {
    setPropostas(prev =>
      prev.map(p => (p.id === id ? { ...p, status: "recusada" } : p))
    );
  };

  const enviarContraproposta = (id: string) => {
    const valor = Number(novoValor[id]);
    if (!valor || valor <= 0) return alert("Digite um valor válido");

    setPropostas(prev =>
      prev.map(p =>
        p.id === id
          ? {
              ...p,
              contraproposta: valor,
              status: "negociacao",
            }
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
        {propostas.map((p) => (
          <div key={p.id} className="proposal-card">
            <div className="proposal-info">
              <h3 className="prop-title">{p.categorias.join(", ")}</h3>

              <p><strong>Cliente:</strong> {p.cliente.nome}</p>
              <p><strong>Endereço:</strong> {p.cliente.localizacao}</p>
              <p><strong>Descrição:</strong> {p.descricao}</p>
              <p><strong>Valor oferecido:</strong> R$ {p.preco}</p>
              {p.contraproposta && (
                <p><strong>Seu valor sugerido:</strong> R$ {p.contraproposta}</p>
              )}
              <p><strong>Tempo:</strong> {p.tempo}</p>

              <span className={`status-badge status-${p.status}`}>
                {p.status}
              </span>
            </div>

            {/* AÇÕES */}
            {p.status === "pendente" && (
              <div className="proposal-actions">
                <button className="btn primary" onClick={() => handleAceitar(p.id)}>
                  Aceitar
                </button>

                <button className="btn remove" onClick={() => handleRecusar(p.id)}>
                  Recusar
                </button>

                <div className="counter-offer-block">
                  <input
                    type="number"
                    placeholder="Novo valor"
                    className="counter-input"
                    value={novoValor[p.id] || ""}
                    onChange={(e) =>
                      setNovoValor({ ...novoValor, [p.id]: e.target.value })
                    }
                  />
                  <button
                    className="btn toggle"
                    onClick={() => enviarContraproposta(p.id)}
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
