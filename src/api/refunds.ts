// src/api/refunds.ts
import type { Refund } from "../models/Reembolso";
import { apiGet, apiPost, apiPut } from "./client";

function mapRefundStatusFromBackend(s: any): Refund["status"] {
  if (!s) return s;
  switch (String(s)) {
    case "pendente":
    case "pending":
      return "pending";
    case "em_analise":
    case "under_review":
      return "under_review";
    case "aguardando_resposta":
    case "awaiting_response":
      return "awaiting_response";
    case "aprovado":
    case "approved":
      return "approved";
    case "recusado":
    case "rejected":
      return "rejected";
    case "refund_pending":
    case "reembolso_pendente":
      return "refund_pending";
    case "refund_confirmed":
    case "reembolso_confirmado":
      return "refund_confirmed";
    default:
      return s as Refund["status"];
  }
}

function mapRefundFromBackend(raw: any): Refund {
  return {
    id: String(raw.id ?? raw._id ?? ""),
    bookingId: raw.bookingId ?? raw.agendamentoId ?? raw.agendamento ?? "",
    requesterId: raw.requesterId ?? raw.solicitanteId ?? "",
    requesterType: raw.requesterType ?? raw.solicitanteTipo ?? raw.requesterType ?? "client",
    requestedValue: Number(raw.requestedValue ?? raw.valorSolicitado ?? raw.valor ?? 0),
    justification: raw.justification ?? raw.justificativa ?? "",
    evidenceList: raw.evidenceList ?? raw.evidencias ?? [],
    status: mapRefundStatusFromBackend(raw.status ?? raw.estado ?? raw.situacao),
    createdAt: raw.createdAt ?? raw.criadoEm ?? new Date().toISOString(),
    updatedAt: raw.updatedAt ?? raw.atualizadoEm ?? undefined,
    adminId: raw.adminId ?? raw.admin ?? undefined,
    adminNote: raw.adminNote ?? raw.adminNota ?? undefined,
    decidedAt: raw.decidedAt ?? raw.decididoEm ?? undefined,
    escrowLocked: raw.escrowLocked ?? raw.escrow_locked ?? raw.bloqueado ?? undefined,
    refundTransactionId: raw.refundTransactionId ?? raw.transacao_reembolso ?? undefined,
  } as Refund;
}

function mapRefundToBackend(payload: Partial<Refund>): any {
  const out: any = {};
  if (payload.bookingId) out.bookingId = payload.bookingId;
  if (payload.requesterId) out.requesterId = payload.requesterId;
  if (payload.requesterType) out.requesterType = payload.requesterType;
  if (typeof payload.requestedValue === "number") out.requestedValue = payload.requestedValue;
  if (payload.justification) out.justification = payload.justification;
  if (payload.evidenceList) out.evidenceList = payload.evidenceList;
  return out;
}

export async function listRefunds(): Promise<Refund[]> {
  const raw = await apiGet<any[]>('/refunds');
  return (raw || []).map(mapRefundFromBackend);
}

export async function getRefund(id: string): Promise<Refund> {
  const raw = await apiGet<any>(`/refunds/${id}`);
  return mapRefundFromBackend(raw);
}

export async function createRefund(payload: Partial<Refund>): Promise<Refund> {
  const body = mapRefundToBackend(payload);
  const raw = await apiPost<any, Partial<Refund>>('/refunds', body);
  return mapRefundFromBackend(raw);
}

export async function updateRefund(id: string, payload: Partial<Refund>): Promise<Refund> {
  const body = mapRefundToBackend(payload);
  const raw = await apiPut<any, Partial<Refund>>(`/refunds/${id}`, body);
  return mapRefundFromBackend(raw);
}
