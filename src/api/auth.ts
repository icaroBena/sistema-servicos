// src/api/auth.ts
import type { User } from "../models/Usuario";
import { apiPost } from "./client";

// Utilities: map backend (Portuguese) user payloads <-> internal (English) User
function mapUserFromBackend(raw: any): User {
  if (!raw) return raw;

  // Accept both Portuguese and English fields — prefer Portuguese when available
  const name = raw.name ?? raw.nome ?? raw.fullName ?? "";
  const email = raw.email ?? raw.e_mail ?? "";
  const phone = raw.phone ?? raw.telefone ?? raw.telefone_celular ?? null;
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
    type,
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
  if (payload.certifications) out.certificacoes = payload.certifications;
  if (payload.categories) out.categorias = payload.categories;
  if (payload.about) out.sobre = payload.about;
  return out;
}

export interface LoginResponse {
  success: boolean;
  message?: string;
  token?: string;
  user?: User;
}

export async function login(email: string, password: string): Promise<LoginResponse> {
  try {
    const raw = await apiPost<any, { email: string; password: string }>("/auth/login", { email, password });

    // Map response user to internal naming
    if (raw && raw.user) raw.user = mapUserFromBackend(raw.user);

    return raw as LoginResponse;
  } catch (err) {
    return { success: false, message: String(err) };
  }
}

export async function register(payload: Partial<User> & { password: string }) {
  try {
    // Map payload to backend Portuguese fields
    const body = { ...mapUserToBackend(payload), password: payload.password, cpf: (payload as any).cpf };
    const raw = await apiPost<any, any>("/auth/register", body);

    if (raw && raw.user) raw.user = mapUserFromBackend(raw.user);

    return raw as LoginResponse;
  } catch (err) {
    return { success: false, message: String(err) };
  }
}

export async function getCurrentUser(): Promise<User | null> {
  try {
    const raw = await apiPost<any, {}>("/auth/me", {});
    if (!raw) return null;
    if (raw.user) return mapUserFromBackend(raw.user);
    // Some backends return the user directly
    return mapUserFromBackend(raw);
  } catch (err) {
    // No authenticated user or endpoint missing
    try {
      const stored = localStorage.getItem("auth_user");
      return stored ? JSON.parse(stored) : null;
    } catch (e) {
      return null;
    }
  }
}
