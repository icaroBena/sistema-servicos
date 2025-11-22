// src/mocks/reembolsoMock.ts
import type { Reembolso } from "../models/Reembolso";

export const reembolsoMockList: Reembolso[] = [
  {
    id: "rb1",
    agendamentoId: "3",
    solicitanteId: "u2",
    tipoSolicitante: "cliente",
    valorSolicitado: 180,
    justificativa: "Serviço incompleto e peças faltando.",
    provas: [
      {
        id: "p1",
        url: "/Figures/reembolso-evidencia1.jpg",
        nomeArquivo: "evidencia1.jpg",
        enviadoEm: "2025-11-21T14:00:00"
      }
    ],
    status: "em_analise",
    criadoEm: "2025-11-21T13:50:00",
    atualizadoEm: "2025-11-21T14:00:00",
    escrowBloqueado: true
  }
];

export default reembolsoMockList;