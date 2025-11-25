// src/api/users.ts
import type { User } from "../models/Usuario";
import { apiGet, apiPut, apiDelete } from "./client";

function mapUserFromBackend(raw: any): User {
  if (!raw) return (raw as User);
  const name = raw.name ?? raw.nome ?? "";
  const email = raw.email ?? raw.e_mail ?? "";
  const phone = raw.phone ?? raw.telefone ?? null;
  const address = raw.address ?? raw.endereco ?? null;
  const photo = raw.photo ?? raw.foto ?? null;
  const typeRaw = raw.type ?? raw.tipo ?? "client";
  const type = typeRaw === "cliente" ? "client" : typeRaw === "prestador" ? "provider" : typeRaw;

  return {
    id: String(raw.id ?? raw._id ?? ""),
    name,
    email,
    phone,
    address,
    type: type as User["type"],
    verified: raw.verified ?? raw.verificado ?? false,
    rating: raw.rating ?? raw.avaliacao ?? 0,
    availability: raw.availability ?? raw.disponibilidade ?? null,
    categories: raw.categories ?? raw.categorias ?? [],
    certifications: raw.certifications ?? raw.certificacoes ?? [],
    about: raw.about ?? raw.sobre ?? null,
    photo: photo,
  } as User;
}

function mapUserToBackend(payload: Partial<User>): any {
  const out: any = {};
  if (payload.name) out.nome = payload.name;
  if (payload.email) out.email = payload.email;
  if (payload.phone) out.telefone = payload.phone;
  if (payload.address) out.endereco = payload.address;
  if (payload.photo) out.foto = payload.photo;
  if (payload.type) out.tipo = payload.type === "client" ? "cliente" : payload.type === "provider" ? "prestador" : payload.type;
  if (typeof payload.verified === "boolean") out.verified = payload.verified;
  if (payload.certifications) out.certificacoes = payload.certifications;
  if (payload.categories) out.categorias = payload.categories;
  if (payload.about) out.sobre = payload.about;
  return out;
}

export async function listUsers(): Promise<User[]> {
  const raw = await apiGet<any[]>('/users');
  return (raw || []).map(mapUserFromBackend);
}

export async function getUser(id: string): Promise<User> {
  const raw = await apiGet<any>(`/users/${id}`);
  return mapUserFromBackend(raw);
}

export async function updateUser(id: string, payload: Partial<User>): Promise<User> {
  const body = mapUserToBackend(payload);
  const raw = await apiPut<any, Partial<User>>(`/users/${id}`, body);
  return mapUserFromBackend(raw);
}

export async function deleteUser(id: string): Promise<void> {
  await apiDelete<void>(`/users/${id}`);
}

export default { listUsers, getUser, updateUser, deleteUser };
