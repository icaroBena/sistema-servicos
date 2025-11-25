// src/api/services.ts
import type { Service } from "../models/Servico";
import { apiGet, apiPost, apiPut, apiDelete } from "./client";

export async function listServices(): Promise<Service[]> {
  return apiGet<Service[]>('/services');
}

export async function getService(id: string): Promise<Service> {
  return apiGet<Service>(`/services/${id}`);
}

export async function createService(payload: Partial<Service>): Promise<Service> {
  return apiPost<Service, Partial<Service>>('/services', payload);
}

export async function updateService(id: string, payload: Partial<Service>): Promise<Service> {
  return apiPut<Service, Partial<Service>>(`/services/${id}`, payload);
}

export async function deleteService(id: string): Promise<void> {
  return apiDelete<void>(`/services/${id}`);
}
