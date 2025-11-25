// src/api/notifications.ts
import type { Notification } from "../models/Notificacao";
import { apiGet, apiPost, apiPut, apiDelete } from "./client";

function mapNotificationFromBackend(raw: any): Notification {
  const typeRaw = raw.type ?? raw.tipo ?? "system";
  const type =
    typeRaw === "reembolso" ? "refund" :
    typeRaw === "agendamento" ? "booking" :
    typeRaw === "proposta" ? "proposal" :
    typeRaw === "verificacao" ? "verification" :
    "system";

  const statusRaw = raw.status ?? raw.estado ?? raw.situacao ?? "sent";
  const status = statusRaw === "nao_lido" || statusRaw === "não_lido" || statusRaw === "unread" ? "unread" : statusRaw === "lido" || statusRaw === "read" ? "read" : statusRaw;

  return {
    id: String(raw.id ?? raw._id ?? ""),
    type,
    title: raw.title ?? raw.titulo ?? "",
    message: raw.message ?? raw.mensagem ?? "",
    link: raw.link ?? raw.url ?? undefined,
    createdAt: raw.createdAt ?? raw.criadoEm ?? new Date().toISOString(),
    status: status as Notification["status"],
    temporary: raw.temporary ?? raw.temporario ?? false,
  } as Notification;
}

function mapNotificationToBackend(payload: Partial<Notification>): any {
  const out: any = {};
  if (payload.type) out.tipo = payload.type === "refund" ? "reembolso" : payload.type === "booking" ? "agendamento" : payload.type === "proposal" ? "proposta" : payload.type === "verification" ? "verificacao" : "system";
  if (payload.title) out.titulo = payload.title;
  if (payload.message) out.mensagem = payload.message;
  if (payload.link) out.link = payload.link;
  if (payload.status) out.status = payload.status;
  return out;
}

export async function listNotifications(): Promise<Notification[]> {
  const raw = await apiGet<any[]>('/notifications');
  return (raw || []).map(mapNotificationFromBackend);
}

export async function createNotification(payload: Partial<Notification>): Promise<Notification> {
  const body = mapNotificationToBackend(payload);
  const raw = await apiPost<any, Partial<Notification>>('/notifications', body);
  return mapNotificationFromBackend(raw);
}

export async function markAsRead(id: string): Promise<void> {
  await apiPut(`/notifications/${id}/read`);
}

export async function removeNotification(id: string): Promise<void> {
  await apiDelete(`/notifications/${id}`);
}
