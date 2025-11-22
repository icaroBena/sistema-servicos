export interface Agendamento {
  id: string;
  titulo: string;
  descricao: string;
  preco: number;
  imagemUrl: string | null;
  status: "negociacao" | "execucao" | "concluido" | "cancelado";
  criadoEm: string;
  atualizadoEm: string;
  reembolsoId?: string;   // se houver um reembolso ativo
  reembolsoStatus?: string; // p/ exibir no card
}