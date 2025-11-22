// src/services/reembolsoMockApi.ts
import reembolsoMockList from "../mocks/reembolsoMock";
import type { Reembolso, ProvaReembolso } from "../models/Reembolso";

let reembolsos: Reembolso[] = [...reembolsoMockList];

export const reembolsoMockApi = {
  listarPorUsuario(userId: string): Reembolso[] {
    return reembolsos.filter(r => r.solicitanteId === userId);
  },

  obterPorAgendamento(agendamentoId: string): Reembolso | undefined {
    return reembolsos.find(r => r.agendamentoId === agendamentoId);
  },

  obter(id: string): Reembolso | undefined {
    return reembolsos.find(r => r.id === id);
  },

  criar(data: {
    agendamentoId: string;
    solicitanteId: string;
    tipoSolicitante: "cliente" | "prestador";
    valorSolicitado: number;
    justificativa: string;
    provas: ProvaReembolso[];
  }): Reembolso {
    const novo: Reembolso = {
      id: "rb" + Date.now(),
      criadoEm: new Date().toISOString(),
      atualizadoEm: new Date().toISOString(),
      status: "pendente",
      escrowBloqueado: true,
      ...data
    };

    reembolsos.push(novo);
    return novo;
  },

  // helpers de teste (opcionais)
  atualizarStatus(id: string, status: Reembolso["status"]) {
    reembolsos = reembolsos.map(r => r.id === id ? { ...r, status, atualizadoEm: new Date().toISOString() } : r);
  }
};