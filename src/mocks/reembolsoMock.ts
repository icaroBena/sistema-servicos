// src/mocks/reembolsoMock.ts
import type { Refund } from "../models/Reembolso";

// Mock de reembolsos (campos internos em inglês) — fallback
export const reembolsoMockList: Refund[] = [
  {
    id: "rb1",
    bookingId: "3",
    requesterId: "u2",
    requesterType: "client",
    requestedValue: 180,
    justification: "Serviço incompleto e peças faltando.",
    evidenceList: [
      {
        id: "p1",
        url: "/Figures/reembolso-evidencia1.jpg",
        fileName: "evidencia1.jpg",
        uploadedAt: "2025-11-21T14:00:00",
      },
    ],
    status: "under_review",
    createdAt: "2025-11-21T13:50:00",
    updatedAt: "2025-11-21T14:00:00",
    escrowLocked: true,
  },
];

export default reembolsoMockList;