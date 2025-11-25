// src/api/bookings.ts
import type { Booking } from "../models/Agendamento";
import { apiGet, apiPost, apiPut } from "./client";

function mapStatusFromBackend(s: any): Booking["status"] {
  if (!s) return s;
  switch (String(s)) {
    case "negociacao":
    case "negotiation":
      return "negotiation";
    case "execucao":
    case "execução":
    case "execution":
      return "execution";
    case "concluido":
    case "finalizado":
    case "completed":
      return "completed";
    case "cancelado":
    case "cancelled":
      return "cancelled";
    case "disputa":
    case "disputed":
      return "disputed";
    default:
      return s as Booking["status"];
  }
}

function mapBookingFromBackend(raw: any): Booking {
  return {
    id: String(raw.id ?? raw._id ?? ""),
    title: raw.title ?? raw.titulo ?? raw.nome ?? "",
    description: raw.description ?? raw.descricao ?? null,
    price: Number(raw.price ?? raw.preco ?? raw.valor ?? 0),
    imageUrl: raw.imageUrl ?? raw.foto ?? raw.imagemUrl ?? null,
    status: mapStatusFromBackend(raw.status ?? raw.estado ?? raw.situacao),
    refundId: raw.refundId ?? raw.reembolsoId ?? null,
    createdAt: raw.createdAt ?? raw.criadoEm ?? raw.criado_em ?? new Date().toISOString(),
    updatedAt: raw.updatedAt ?? raw.updated_at ?? raw.atualizadoEm ?? raw.atualizado_em ?? undefined,
    clientId: raw.clientId ?? raw.clienteId ?? raw.cliente ?? undefined,
    providerId: raw.providerId ?? raw.prestadorId ?? raw.provider ?? undefined,
  } as Booking;
}

function mapBookingToBackend(payload: Partial<Booking>): any {
  const out: any = {};
  if (payload.title) out.titulo = payload.title;
  if (payload.description) out.descricao = payload.description;
  if (typeof payload.price === "number") out.preco = payload.price;
  if (payload.imageUrl) out.foto = payload.imageUrl;
  if (payload.status) out.status = payload.status; // preserve status as-is; backend may accept English values too
  if (payload.clientId) out.clienteId = payload.clientId;
  if (payload.providerId) out.prestadorId = payload.providerId;
  return out;
}

export async function listBookings(): Promise<Booking[]> {
  const raw = await apiGet<any[]>('/bookings');
  return (raw || []).map(mapBookingFromBackend);
}

export async function getBooking(id: string): Promise<Booking> {
  const raw = await apiGet<any>(`/bookings/${id}`);
  return mapBookingFromBackend(raw);
}

export async function createBooking(payload: Partial<Booking>): Promise<Booking> {
  const body = mapBookingToBackend(payload);
  const raw = await apiPost<any, Partial<Booking>>('/bookings', body);
  return mapBookingFromBackend(raw);
}

export async function updateBooking(id: string, payload: Partial<Booking>): Promise<Booking> {
  const body = mapBookingToBackend(payload);
  const raw = await apiPut<any, Partial<Booking>>(`/bookings/${id}`, body);
  return mapBookingFromBackend(raw);
}
