import React, { useEffect, useState } from "react";
import "./admin.css";

/* Comentários e nome do ficheiro mantêm-se em português. Internals em inglês. */

import type { User } from "../models/Usuario";

interface RefundItem {
  id: string;
  clientId: string;
  providerId: string;
  reason: string;
  requestedValue: string;
  date: string;
  evidenceUrl?: string;
}
import { loadFromLocal as loadLocal, saveToLocal } from "../utils/localFallback";

const Admin: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);

  /* ---------------- MOCKS DE REEMBOLSOS ---------------- */
  const [refunds, setRefunds] = useState<RefundItem[]>([]);

  // API clients with fallback: prefer real API, otherwise use localStorage

  useEffect(() => {
    let isMounted = true;

    const init = async () => {
      try {
        const [{ default: usersApi }, { listRefunds }] = await Promise.all([
          import("../api/users"),
          import("../api/refunds"),
        ]);

        const apiUsers = await usersApi.listUsers();
        const apiRefunds = await listRefunds();

        if (!isMounted) return;
        setUsers(apiUsers);
        setRefunds(apiRefunds.map(r => ({
          id: r.id,
          clientId: r.requesterId,
          providerId: r.requesterType === 'provider' ? r.adminId ?? '' : r.requesterId,
          reason: r.justification || '',
          requestedValue: String(r.requestedValue ?? ''),
          date: r.createdAt ?? '',
          evidenceUrl: (r.evidenceList && r.evidenceList[0] && r.evidenceList[0].url) || undefined,
        })));
      } catch (err) {
        // API failed — use seeded fallback or stored fallback data
        const seedUsers: User[] = loadLocal("fallback_users", [
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
            photo: "/Figures/prestador-exemplo.png",
          },
          {
            id: "u2",
            name: "Maria Souza",
            email: "maria@email.com",
            type: "client",
            categories: [],
            certifications: [],
            photo: null,
          },
        ] as User[]);

        const seedRefunds: RefundItem[] = loadLocal("fallback_refunds", [
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

        setUsers(seedUsers);
        setRefunds(seedRefunds);
      }
    };

    init();

    return () => { isMounted = false; };
  }, []);

  /* ============================================================
     PRESTADORES PENDENTES
     ============================================================ */
  const prestadoresPendentes = users.filter(
    (u) => u.type === "provider" && !u.verified
  );

  const aprovarPrestador = async (id: string) => {
    try {
      const usersApi = (await import("../api/users")).default;
      const updated = await usersApi.updateUser(id, { verified: true });
      setUsers(prev => prev.map(u => (u.id === id ? { ...u, verified: updated.verified } : u)));
      // persist fallback
      saveToLocal("fallback_users", users.map(u => u.id === id ? { ...u, verified: true } : u));
      alert("Prestador aprovado!");
    } catch (e) {
      // fallback: update local state and persist
      setUsers(prev => {
        const updated = prev.map(u => (u.id === id ? { ...u, verified: true } : u));
        saveToLocal("fallback_users", updated);
        return updated;
      });
      alert("Prestador aprovado! (modo offline)");
    }
  };

  const recusarPrestador = async (id: string) => {
    try {
      const usersApi = (await import("../api/users")).default;
      await usersApi.deleteUser(id);
      setUsers(prev => prev.filter(u => u.id !== id));
      saveToLocal("fallback_users", users.filter(u => u.id !== id));
      alert("Prestador removido.");
    } catch (e) {
      setUsers(prev => {
        const filtered = prev.filter(u => u.id !== id);
        saveToLocal("fallback_users", filtered);
        return filtered;
      });
      alert("Prestador removido. (modo offline)");
    }
  };

  /* ============================================================
     REEMBOLSOS
     ============================================================ */
  const aprovarReembolso = async (id: string) => {
    try {
      const refundsApi = await import("../api/refunds");
      await refundsApi.updateRefund(id, { status: 'approved' });
      setRefunds(prev => prev.filter(r => r.id !== id));
      saveToLocal("fallback_refunds", refunds.filter(r => r.id !== id));
      alert("Reembolso aprovado!");
    } catch (e) {
      setRefunds(prev => {
        const filtered = prev.filter(r => r.id !== id);
        saveToLocal("fallback_refunds", filtered);
        return filtered;
      });
      alert("Reembolso aprovado! (modo offline)");
    }
  };

  const recusarReembolso = async (id: string) => {
    try {
      const refundsApi = await import("../api/refunds");
      await refundsApi.updateRefund(id, { status: 'rejected' });
      setRefunds(prev => prev.filter(r => r.id !== id));
      saveToLocal("fallback_refunds", refunds.filter(r => r.id !== id));
      alert("Reembolso recusado.");
    } catch (e) {
      setRefunds(prev => {
        const filtered = prev.filter(r => r.id !== id);
        saveToLocal("fallback_refunds", filtered);
        return filtered;
      });
      alert("Reembolso recusado. (modo offline)");
    }
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

              {p.photo && (
                <img
                  src={p.photo}
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
