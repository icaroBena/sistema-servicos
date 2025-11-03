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

    const data: LoginResponse = await response.json();
    return data;
  } catch (error) {
    console.error("Erro na requisição de login:", error);
    return { success: false, message: "Falha ao conectar com o servidor." };
  }
}
