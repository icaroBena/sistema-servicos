// src/models/Reembolso.tsx
export type StatusReembolso =
  | "pendente"
  | "em_analise"
  | "aguardando_resposta"
  | "aprovado"
  | "recusado"
  | "estorno_pendente"
  | "estorno_confirmado"
  | "falha_estorno";

export interface ProvaReembolso {
  id: string;
  url: string;
  nomeArquivo: string;
  enviadoEm: string;
}

export interface Reembolso {
  id: string;
  agendamentoId: string;
  solicitanteId: string; // quem abriu
  tipoSolicitante: "cliente" | "prestador";

  valorSolicitado: number;
  justificativa: string;
  provas: ProvaReembolso[];

  status: StatusReembolso;

  criadoEm: string;
  atualizadoEm: string;

  // admin
  adminId?: string;
  notaAdmin?: string;
  decididoEm?: string;

  // financeiro
  escrowBloqueado: boolean;
  txEstorno?: string;
}