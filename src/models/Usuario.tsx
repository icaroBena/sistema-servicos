// Modelo `Usuario` (nome do ficheiro em português) — tipos internos em inglês
export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string | null;
  address?: string | null;
  type: "client" | "provider" | "admin";
  verified?: boolean;
  rating?: number;
  availability?: string | null;
  categories: string[];
  certifications: string[];
  about?: string | null;
  photo?: string | null;
}

// NOTE: export as a named type only (no default) to avoid TS config issues.
