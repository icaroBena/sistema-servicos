const API_URL: string = import.meta.env.VITE_API_URL;

//
// Login — alinhado ao backend
//

interface LoginResponse {
  success: boolean;
  message?: string;
  token?: string;

  // Internally usamos `type` (inglês). Se o backend enviar `tipo`, fazemos o mapeamento.
  user?: {
    id: string;
    name: string;
    email: string;
    type: "client" | "provider" | "admin"; // mapeado para inglês internamente
    // podem existir campos adicionais como `cpf` dependendo do backend
    [k: string]: any;
  };
}

export async function loginRequest(
  email: string,
  password: string
): Promise<LoginResponse> {
  try {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    // Se o backend retornar `user.tipo`, mapeamos para `user.type` internamente
    if (data && data.user && typeof data.user.tipo === "string") {
      const t = data.user.tipo;
      data.user.type = t === "cliente" ? "client" : t === "prestador" ? "provider" : t;
      delete data.user.tipo;
    }

    return data;
  } catch (error) {
    console.error("Erro na requisição de login:", error);
    return {
      success: false,
      message: "Falha ao conectar com o servidor.",
    };
  }
}

//
// Register — alinhado ao backend + UML
//

interface RegisterPayload {
  name: string;
  email: string;
  password: string;
  cpf: string;
  userType: "client" | "provider"; // interno em inglês
  phone?: string;
}

export async function registerRequest(payload: RegisterPayload): Promise<LoginResponse> {
  try {
    // Mapeia para o formato que o backend espera (se necessário)
    const bodyToSend: any = {
      name: payload.name,
      email: payload.email,
      password: payload.password,
      cpf: payload.cpf,
      tipo: payload.userType === "client" ? "cliente" : "prestador",
    };

    if (payload.phone) bodyToSend.phone = payload.phone;

    const response = await fetch(`${API_URL}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(bodyToSend),
    });

    const data = await response.json();

    // Mapeia resposta para uso interno: se receber `user.tipo`, converte
    if (data && data.user && typeof data.user.tipo === "string") {
      const t = data.user.tipo;
      data.user.type = t === "cliente" ? "client" : t === "prestador" ? "provider" : t;
      delete data.user.tipo;
    }

    return data;
  } catch (error) {
    console.error("Erro na requisição de cadastro:", error);
    return {
      success: false,
      message: "Falha ao conectar com o servidor.",
    };
  }
}
