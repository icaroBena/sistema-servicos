// Arquivo `Proposta.tsx` — modelo em inglês internamente para propostas
export type ProposalStatus = "pending" | "accepted" | "rejected" | "counter";

export interface Proposal {
  id: string;
  bookingId: string;
  providerId: string;
  clientId?: string;
  value: number;
  message?: string;
  status: ProposalStatus;
  createdAt: string;
  updatedAt?: string;
}
