import { notificacaoService } from "../services/notificacaoMockApi";

// Carrega notificações de exemplo (fallback local para demo)
export function carregarNotificacoesMock() {
  notificacaoService.create({
    type: "proposal",
    title: "Nova proposta recebida",
    message: "Você recebeu uma nova proposta para o serviço.",
    link: "/account?tab=propositions",
  });

  notificacaoService.create({
    type: "booking",
    title: "Agendamento atualizado",
    message: "O prestador iniciou a execução do serviço.",
    link: "/account?tab=appointments",
  });

  notificacaoService.create({
    type: "system",
    title: "Bem-vindo ao WorkMatch!",
    message: "Sua conta foi criada com sucesso.",
  });
}