// src/api/notifications.ts
import type { Notification } from "../models/Notificacao";
import { apiGet, apiPost, apiPut, apiDelete } from "./client";

export async function listNotifications(): Promise<Notification[]> {
  return apiGet<Notification[]>('/notifications');
}

export async function createNotification(payload: Partial<Notification>): Promise<Notification> {
  return apiPost<Notification, Partial<Notification>>('/notifications', payload);
}

export async function markAsRead(id: string): Promise<void> {
  await apiPut(`/notifications/${id}/read`);
}

export async function removeNotification(id: string): Promise<void> {
  await apiDelete(`/notifications/${id}`);
}
