// src/api/refunds.ts
import type { Refund } from "../models/Reembolso";
import { apiGet, apiPost, apiPut } from "./client";

export async function listRefunds(): Promise<Refund[]> {
  return apiGet<Refund[]>('/refunds');
}

export async function getRefund(id: string): Promise<Refund> {
  return apiGet<Refund>(`/refunds/${id}`);
}

export async function createRefund(payload: Partial<Refund>): Promise<Refund> {
  return apiPost<Refund, Partial<Refund>>('/refunds', payload);
}

export async function updateRefund(id: string, payload: Partial<Refund>): Promise<Refund> {
  return apiPut<Refund, Partial<Refund>>(`/refunds/${id}`, payload);
}
