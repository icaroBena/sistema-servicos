export interface Usuario {
  id: string;
  nome: string;
  email: string;
  telefone?: string;
  localizacao?: string;
  tipo: "prestador" | "cliente";
  verificado?: boolean;
  avaliacao?: number;
  disponibilidade?: "DISPONÍVEL" | "INDISPONÍVEL" | string;
  categorias: string[];
  certificacoes: string[];
  sobre?: string;
  foto?: string | null; // url local ou remoto
}