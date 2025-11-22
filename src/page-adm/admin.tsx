import React, { useState } from "react";
import "./admin.css";

// Modelo de Usuário
export interface Usuario {
  id: string;
  nome: string;
  email: string;
  telefone?: string;
  localizacao?: string;
  tipo: "prestador" | "cliente";
  verificado?: boolean;
  avaliacao?: number;
  disponibilidade?: "DISPONÍVEL" | "INDISPONÍVEL" | string;
  categorias: string[];
  certificacoes: string[];
  sobre?: string;
  foto?: string | null;
}

// Modelo de Reembolso
export interface Reembolso {
  id: string;
  clienteId: string;
  prestadorId: string;
  motivo: string;
  valor: string;
  data: string;
  evidenciaUrl?: string;
}

export default function Admin() {
  // MOCK: Lista de usuários cadastrados
  const [usuarios, setUsuarios] = useState<Usuario[]>([
    {
      id: "u1",
      nome: "Carlos Eletricista",
      email: "carlos@email.com",
      telefone: "(92) 98888-1111",
      localizacao: "Rua A, Centro",
      tipo: "prestador",
      verificado: false,
      categorias: ["Elétrica"],
      certificacoes: ["Certificado NR10"],
      sobre: "Especialista em instalações elétricas residenciais.",
      foto: "/Figures/prestador-exemplo.png",
    },

    {
      id: "u2",
      nome: "Maria Souza",
      email: "maria@email.com",
      tipo: "cliente",
      categorias: [],
      certificacoes: [],
      foto: null,
    },
  ]);

  // MOCK: Solicitações de Reembolso
  const [reembolsos, setReembolsos] = useState<Reembolso[]>([
    {
      id: "r1",
      clienteId: "u2",
      prestadorId: "u1",
      motivo: "O serviço não foi concluído",
      valor: "R$ 150,00",
      data: "15/11/2025",
      evidenciaUrl: "/Figures/exemplo-prova.jpg",
    },
  ]);

  // Filtrar prestadores que NÃO são verificados
  const prestadoresPendentes = usuarios.filter(
    (u) => u.tipo === "prestador" && !u.verificado
  );

  function aprovarPrestador(id: string) {
    setUsuarios((prev) =>
      prev.map((u) =>
        u.id === id ? { ...u, verificado: true } : u
      )
    );
    alert("Prestador aprovado!");
  }

  function recusarPrestador(id: string) {
    setUsuarios((prev) => prev.filter((u) => u.id !== id));
    alert("Prestador removido.");
  }

  function aprovarReembolso(id: string) {
    setReembolsos((prev) => prev.filter((r) => r.id !== id));
    alert("Reembolso aprovado!");
  }

  function recusarReembolso(id: string) {
    setReembolsos((prev) => prev.filter((r) => r.id !== id));
    alert("Reembolso recusado.");
  }

  return (
    <main className="admin-container">
      <h1>Painel Administrativo</h1>

      {/* Prestadores */}
      <section className="admin-section">
        <h2>Prestadores Pendentes de Aprovação</h2>

        {prestadoresPendentes.length === 0 ? (
          <p className="empty">Nenhum prestador aguardando aprovação.</p>
        ) : (
          prestadoresPendentes.map((p) => (
            <div key={p.id} className="admin-card">
              {p.foto && <img src={p.foto} className="prestador-foto" />}

              <p><strong>Nome:</strong> {p.nome}</p>
              <p><strong>E-mail:</strong> {p.email}</p>
              <p><strong>Telefone:</strong> {p.telefone || "Não informado"}</p>
              <p><strong>Localização:</strong> {p.localizacao}</p>
              <p><strong>Categorias:</strong> {p.categorias.join(", ")}</p>
              <p><strong>Certificações:</strong> {p.certificacoes.join(", ")}</p>

              {p.sobre && (
                <p><strong>Sobre:</strong> {p.sobre}</p>
              )}

              <a className="view-link" href="/Figures/documento-exemplo.pdf" target="_blank">
                📄 Ver documento de verificação
              </a>

              <div className="admin-buttons">
                <button className="btn approve" onClick={() => aprovarPrestador(p.id)}>Aprovar</button>
                <button className="btn reject" onClick={() => recusarPrestador(p.id)}>Recusar</button>
              </div>
            </div>
          ))
        )}
      </section>

      {/* Reembolsos */}
      <section className="admin-section">
        <h2>Solicitações de Reembolso</h2>

        {reembolsos.length === 0 ? (
          <p className="empty">Nenhuma solicitação de reembolso.</p>
        ) : (
          reembolsos.map((r) => {
            const cliente = usuarios.find((u) => u.id === r.clienteId);
            const prestador = usuarios.find((u) => u.id === r.prestadorId);

            return (
              <div key={r.id} className="admin-card">
                <p><strong>Cliente:</strong> {cliente?.nome}</p>
                <p><strong>Prestador:</strong> {prestador?.nome}</p>
                <p><strong>Motivo:</strong> {r.motivo}</p>
                <p><strong>Valor:</strong> {r.valor}</p>
                <p><strong>Data:</strong> {r.data}</p>

                {r.evidenciaUrl && (
                  <a href={r.evidenciaUrl} target="_blank" className="view-link">
                    📎 Ver Evidência (foto)
                  </a>
                )}

                <div className="admin-buttons">
                  <button className="btn approve" onClick={() => aprovarReembolso(r.id)}>Aprovar</button>
                  <button className="btn reject" onClick={() => recusarReembolso(r.id)}>Recusar</button>
                </div>
              </div>
            );
          })
        )}
      </section>
    </main>
  );
}
