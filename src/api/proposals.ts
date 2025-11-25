// src/api/proposals.ts
import type { Proposal } from "../models/Proposta";
import { apiGet, apiPost, apiPut } from "./client";

export async function listProposals(): Promise<Proposal[]> {
  return apiGet<Proposal[]>('/proposals');
}

export async function getProposal(id: string): Promise<Proposal> {
  return apiGet<Proposal>(`/proposals/${id}`);
}

export async function createProposal(payload: Partial<Proposal>): Promise<Proposal> {
  return apiPost<Proposal, Partial<Proposal>>('/proposals', payload);
}

export async function updateProposal(id: string, payload: Partial<Proposal>): Promise<Proposal> {
  return apiPut<Proposal, Partial<Proposal>>(`/proposals/${id}`, payload);
}
