// Arquivo `Reembolso.tsx` — exporta tipos em inglês para reembolsos
export type RefundStatus =
  | "pending"
  | "under_review"
  | "awaiting_response"
  | "approved"
  | "rejected"
  | "refund_pending"
  | "refund_confirmed"
  | "refund_failed";

export interface RefundEvidence {
  id: string;
  url: string;
  fileName: string;
  uploadedAt: string;
}

export interface Refund {
  id: string;
  bookingId: string;
  requesterId: string;
  requesterType: "client" | "provider";
  requestedValue: number;
  justification: string;
  evidenceList: RefundEvidence[];
  status: RefundStatus;
  createdAt: string;
  updatedAt?: string;
  adminId?: string;
  adminNote?: string;
  decidedAt?: string;
  escrowLocked?: boolean;
  refundTransactionId?: string;
}

