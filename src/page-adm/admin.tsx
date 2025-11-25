import React, { useState } from "react";
import "./admin.css";

/* Comentários e nome do ficheiro mantêm-se em português. Internals em inglês. */

interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  address?: string;
  type: "provider" | "client";
  verified?: boolean;
  rating?: number;
  availability?: string;
  categories: string[];
  certifications: string[];
  about?: string;
  photoUrl?: string | null;
}

interface RefundItem {
  id: string;
  clientId: string;
  providerId: string;
  reason: string;
  requestedValue: string;
  date: string;
  evidenceUrl?: string;
}

const Admin: React.FC = () => {

  /* ---------------- MOCKS DE USUÁRIOS ---------------- */
  const [users, setUsers] = useState<User[]>([
    {
      id: "u1",
      name: "Carlos Eletricista",
      email: "carlos@email.com",
      phone: "(92) 98888-1111",
      address: "Rua A, Centro",
      type: "provider",
      verified: false,
      categories: ["Elétrica"],
      certifications: ["Certificado NR10"],
      about: "Especialista em instalações elétricas residenciais.",
      photoUrl: "/Figures/prestador-exemplo.png",
    },
    {
      id: "u2",
      name: "Maria Souza",
      email: "maria@email.com",
      type: "client",
      categories: [],
      certifications: [],
      photoUrl: null,
    },
  ]);

  /* ---------------- MOCKS DE REEMBOLSOS ---------------- */
  const [refunds, setRefunds] = useState<RefundItem[]>([
    {
      id: "r1",
      clientId: "u2",
      providerId: "u1",
      reason: "O serviço não foi concluído",
      requestedValue: "R$ 150,00",
      date: "15/11/2025",
      evidenceUrl: "/Figures/exemplo-prova.jpg",
    },
  ]);

  /* ============================================================
     PRESTADORES PENDENTES
     ============================================================ */
  const prestadoresPendentes = users.filter(
    (u) => u.type === "provider" && !u.verified
  );

  const aprovarPrestador = (id: string) => {
    setUsers(prev => prev.map(u => (u.id === id ? { ...u, verified: true } : u)));
    alert("Prestador aprovado!");
  };

  const recusarPrestador = (id: string) => {
    setUsers(prev => prev.filter(u => u.id !== id));
    alert("Prestador removido.");
  };

  /* ============================================================
     REEMBOLSOS
     ============================================================ */
  const aprovarReembolso = (id: string) => {
    setRefunds(prev => prev.filter(r => r.id !== id));
    alert("Reembolso aprovado!");
  };

  const recusarReembolso = (id: string) => {
    setRefunds(prev => prev.filter(r => r.id !== id));
    alert("Reembolso recusado.");
  };

  /* ============================================================
     RENDER DO PAINEL
     ============================================================ */
  return (
    <main className="admin-container">
      <h1 className="admin-title">Painel Administrativo</h1>

      {/* =================== PRESTADORES =================== */}
      <section className="admin-section" role="region" aria-label="Aprovação de Prestadores">
        <h2 className="section-title">Prestadores Pendentes de Aprovação</h2>

        {prestadoresPendentes.length === 0 ? (
          <p className="empty">Nenhum prestador aguardando aprovação.</p>
        ) : (
          prestadoresPendentes.map((p) => (
            <div key={p.id} className="admin-card">

              {p.photoUrl && (
                <img
                  src={p.photoUrl}
                  alt={`Foto do prestador ${p.name}`}
                  className="prestador-foto"
                />
              )}

              <p><strong>Nome:</strong> {p.name}</p>
              <p><strong>E-mail:</strong> {p.email}</p>
              <p><strong>Telefone:</strong> {p.phone || "Não informado"}</p>
              <p><strong>Localização:</strong> {p.address || "Não informado"}</p>
              <p><strong>Categorias:</strong> {p.categories.join(", ")}</p>
              <p><strong>Certificações:</strong> {p.certifications.join(", ")}</p>

              {p.about && (
                <p><strong>Sobre:</strong> {p.about}</p>
              )}

              <a
                className="view-link"
                href="/Figures/documento-exemplo.pdf"
                target="_blank"
                rel="noopener noreferrer"
              >
                📄 Ver documento de verificação
              </a>

              <div className="admin-buttons">
                <button className="btn approve" onClick={() => aprovarPrestador(p.id)}>
                  Aprovar
                </button>
                <button className="btn reject" onClick={() => recusarPrestador(p.id)}>
                  Recusar
                </button>
              </div>
            </div>
          ))
        )}
      </section>

      {/* =================== REEMBOLSOS =================== */}
      <section className="admin-section" role="region" aria-label="Solicitações de Reembolso">
        <h2 className="section-title">Solicitações de Reembolso</h2>

        {refunds.length === 0 ? (
          <p className="empty">Nenhuma solicitação de reembolso.</p>
        ) : (
          refunds.map((r) => {
            const client = users.find(u => u.id === r.clientId);
            const provider = users.find(u => u.id === r.providerId);

            return (
              <div key={r.id} className="admin-card">
                <p><strong>Cliente:</strong> {client?.name}</p>
                <p><strong>Prestador:</strong> {provider?.name}</p>
                <p><strong>Motivo:</strong> {r.reason}</p>
                <p><strong>Valor:</strong> {r.requestedValue}</p>
                <p><strong>Data:</strong> {r.date}</p>

                {r.evidenceUrl && (
                  <a
                    href={r.evidenceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="view-link"
                  >
                    📎 Ver Evidência
                  </a>
                )}

                <div className="admin-buttons">
                  <button className="btn approve" onClick={() => aprovarReembolso(r.id)}>
                    Aprovar
                  </button>
                  <button className="btn reject" onClick={() => recusarReembolso(r.id)}>
                    Recusar
                  </button>
                </div>
              </div>
            );
          })
        )}
      </section>

    </main>
  );
};

export default Admin;
