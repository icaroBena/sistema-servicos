// src/api/bookings.ts
import type { Booking } from "../models/Agendamento";
import { apiGet, apiPost, apiPut } from "./client";

export async function listBookings(): Promise<Booking[]> {
  return apiGet<Booking[]>('/bookings');
}

export async function getBooking(id: string): Promise<Booking> {
  return apiGet<Booking>(`/bookings/${id}`);
}

export async function createBooking(payload: Partial<Booking>): Promise<Booking> {
  return apiPost<Booking, Partial<Booking>>('/bookings', payload);
}

export async function updateBooking(id: string, payload: Partial<Booking>): Promise<Booking> {
  return apiPut<Booking, Partial<Booking>>(`/bookings/${id}`, payload);
}
