// src/models/Notificacao.tsx

export type StatusNotificacao =
  | "enviada"
  | "nao_lida"
  | "lida"
  | "removida";

export type TipoNotificacao =
  | "reembolso"
  | "agendamento"
  | "proposta"
  | "verificacao"
  | "sistema";

export interface Notificacao {
  id: string;
  tipo: TipoNotificacao;
  titulo: string;
  mensagem: string;

  /** redireciona o usuário quando ele clica */
  link?: string;

  criadaEm: string;

  status: StatusNotificacao;

  /** true = temporária (só aparece uma vez e some) */
  temporaria?: boolean;
}