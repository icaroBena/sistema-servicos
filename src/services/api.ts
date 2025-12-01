const API_URL: string = import.meta.env.VITE_API_URL;

interface LoginResponse {
  success?: boolean;
  message?: string;
  token?: string;
  user?: {
    id: string;
    name: string;
    email: string;
    role?: string;
  };
}

export async function loginRequest(email: string, password: string): Promise<LoginResponse> {
  try {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    return await response.json();
  } catch (error) {
    console.error("Erro na requisição de login:", error);
    return { success: false, message: "Falha ao conectar com o servidor." };
  }
}

export async function registerRequest(username: string, email: string, password: string) {
  try {
    const response = await fetch(`${API_URL}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: username, email, password }),
    });

    return await response.json();
  } catch (error) {
    console.error("Erro na requisição de cadastro:", error);
    return { success: false, message: "Falha ao conectar com o servidor." };
  }
}

// ========================
// Pegar dados reais do usuário
// ========================
export async function getProfile(token: string) {
  const response = await fetch(`${API_URL}/users/me`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return await response.json();
}
