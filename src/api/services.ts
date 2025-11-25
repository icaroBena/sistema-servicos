// src/api/services.ts
import type { Service } from "../models/Servico";
import { apiGet, apiPost, apiPut, apiDelete } from "./client";

function mapServiceFromBackend(raw: any): Service {
  return {
    id: String(raw.id ?? raw._id ?? ""),
    title: raw.title ?? raw.titulo ?? raw.nome ?? "",
    description: raw.description ?? raw.descricao ?? null,
    category: raw.category ?? raw.categoria ?? "",
    price: Number(raw.price ?? raw.preco ?? raw.valor ?? 0),
    imageUrl: raw.imageUrl ?? raw.foto ?? raw.imagemUrl ?? null,
    createdAt: raw.createdAt ?? raw.criadoEm ?? undefined,
    providerId: raw.providerId ?? raw.prestadorId ?? undefined,
  } as Service;
}

function mapServiceToBackend(payload: Partial<Service>): any {
  const out: any = {};
  if (payload.title) out.titulo = payload.title;
  if (payload.description) out.descricao = payload.description;
  if (payload.category) out.categoria = payload.category;
  if (typeof payload.price === "number") out.preco = payload.price;
  if (payload.imageUrl) out.foto = payload.imageUrl;
  if (payload.providerId) out.prestadorId = payload.providerId;
  return out;
}

export async function listServices(): Promise<Service[]> {
  const raw = await apiGet<any[]>('/services');
  return (raw || []).map(mapServiceFromBackend);
}

export async function getService(id: string): Promise<Service> {
  const raw = await apiGet<any>(`/services/${id}`);
  return mapServiceFromBackend(raw);
}

export async function createService(payload: Partial<Service>): Promise<Service> {
  const body = mapServiceToBackend(payload);
  const raw = await apiPost<any, Partial<Service>>('/services', body);
  return mapServiceFromBackend(raw);
}

export async function updateService(id: string, payload: Partial<Service>): Promise<Service> {
  const body = mapServiceToBackend(payload);
  const raw = await apiPut<any, Partial<Service>>(`/services/${id}`, body);
  return mapServiceFromBackend(raw);
}

export async function deleteService(id: string): Promise<void> {
  return apiDelete<void>(`/services/${id}`);
}
