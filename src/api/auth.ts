// src/api/auth.ts
import type { User } from "../models/Usuario";
import { apiPost } from "./client";

export interface LoginResponse {
  success: boolean;
  message?: string;
  token?: string;
  user?: User;
}

export async function login(email: string, password: string): Promise<LoginResponse> {
  try {
    return await apiPost<LoginResponse, { email: string; password: string }>("/auth/login", {
      email,
      password,
    });
  } catch (err) {
    return { success: false, message: String(err) };
  }
}

export async function register(payload: Partial<User> & { password: string }) {
  try {
    return await apiPost<LoginResponse, any>("/auth/register", payload);
  } catch (err) {
    return { success: false, message: String(err) };
  }
}
