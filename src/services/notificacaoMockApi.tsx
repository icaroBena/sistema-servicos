import type { Notificacao, StatusNotificacao } from "../models/Notificacao";

let notificacoes: Notificacao[] = [];

export const notificacaoMockApi = {
  criar(data: Omit<Notificacao, "id" | "status" | "criadaEm">) {
    const nova: Notificacao = {
      id: "n" + crypto.randomUUID(),
      status: "nao_lida",
      criadaEm: new Date().toISOString(),
      ...data
    };

    notificacoes.unshift(nova); // ordem cronológica
    return nova;
  },

  listar() {
    return notificacoes.filter(n => n.status !== "removida");
  },

  filtrar(status: StatusNotificacao) {
    return notificacoes.filter(n => n.status === status);
  },

  marcarComoLida(id: string) {
    notificacoes = notificacoes.map(n =>
      n.id === id ? { ...n, status: "lida" } : n
    );
  },

  remover(id: string) {
    notificacoes = notificacoes.map(n =>
      n.id === id ? { ...n, status: "removida" } : n
    );
  },

  limparHistorico() {
    notificacoes = notificacoes.map(n => ({ ...n, status: "removida" }));
  },

  countNaoLidas() {
    return notificacoes.filter(n => n.status === "nao_lida").length;
  }
};
