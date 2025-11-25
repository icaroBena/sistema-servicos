// src/api/proposals.ts
import type { Proposal } from "../models/Proposta";
import { apiGet, apiPost, apiPut } from "./client";

function mapProposalFromBackend(raw: any): Proposal {
  return {
    id: String(raw.id ?? raw._id ?? ""),
    bookingId: raw.bookingId ?? raw.agendamentoId ?? raw.booking ?? "",
    providerId: raw.providerId ?? raw.prestadorId ?? raw.provider ?? "",
    clientId: raw.clientId ?? raw.clienteId ?? undefined,
    value: Number(raw.value ?? raw.valor ?? raw.price ?? 0),
    message: raw.message ?? raw.mensagem ?? raw.description ?? undefined,
    status: (raw.status ?? raw.estado ?? raw.situacao ?? "pending") as Proposal["status"],
    createdAt: raw.createdAt ?? raw.criadoEm ?? new Date().toISOString(),
    updatedAt: raw.updatedAt ?? raw.atualizadoEm ?? undefined,
  } as Proposal;
}

function mapProposalToBackend(payload: Partial<Proposal>): any {
  const out: any = {};
  if (payload.bookingId) out.bookingId = payload.bookingId;
  if (payload.providerId) out.prestadorId = payload.providerId;
  if (payload.clientId) out.clienteId = payload.clientId;
  if (typeof payload.value === "number") out.valor = payload.value;
  if (payload.message) out.mensagem = payload.message;
  if (payload.status) out.status = payload.status;
  return out;
}

export async function listProposals(): Promise<Proposal[]> {
  const raw = await apiGet<any[]>('/proposals');
  return (raw || []).map(mapProposalFromBackend);
}

export async function getProposal(id: string): Promise<Proposal> {
  const raw = await apiGet<any>(`/proposals/${id}`);
  return mapProposalFromBackend(raw);
}

export async function createProposal(payload: Partial<Proposal>): Promise<Proposal> {
  const body = mapProposalToBackend(payload);
  const raw = await apiPost<any, Partial<Proposal>>('/proposals', body);
  return mapProposalFromBackend(raw);
}

export async function updateProposal(id: string, payload: Partial<Proposal>): Promise<Proposal> {
  const body = mapProposalToBackend(payload);
  const raw = await apiPut<any, Partial<Proposal>>(`/proposals/${id}`, body);
  return mapProposalFromBackend(raw);
}
