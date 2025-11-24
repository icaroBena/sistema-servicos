import { notificacaoMockApi } from "../services/notificacaoMockApi";

export function carregarNotificacoesMock() {
  notificacaoMockApi.criar({
    tipo: "proposta",
    titulo: "Nova proposta recebida",
    mensagem: "Você recebeu uma nova proposta para o serviço.",
    link: "/account?tab=propositions"
  });

  notificacaoMockApi.criar({
    tipo: "agendamento",
    titulo: "Agendamento atualizado",
    mensagem: "O prestador iniciou a execução do serviço.",
    link: "/account?tab=appointments"
  });

  notificacaoMockApi.criar({
    tipo: "sistema",
    titulo: "Bem-vindo ao WorkMatch!",
    mensagem: "Sua conta foi criada com sucesso."
  });
}