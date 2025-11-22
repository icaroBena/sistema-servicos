import type { Agendamento } from "../models/Agendamento";

export const schedulesMock: Agendamento[] = [
  {
    id: "1",
    titulo: "Jardinagem e Limpeza",
    descricao: "Corte de grama, poda de árvores e limpeza geral do jardim.",
    preco: 120,
    imagemUrl: "/Figures/jardinagem.png",
    status: "negociacao",
    criadoEm: "2025-10-20T10:00:00",
    atualizadoEm: "2025-10-20T10:00:00",
  },
  {
    id: "2",
    titulo: "Diarista Maria",
    descricao: "Limpeza residencial completa!",
    preco: 250,
    imagemUrl: "/Figures/diarista.png",
    status: "execucao",
    criadoEm: "2025-10-18T14:00:00",
    atualizadoEm: "2025-10-19T08:30:00",
  },
  {
    id: "3",
    titulo: "Personal Thiago",
    descricao: "Musculação e treino funcional!",
    preco: 180,
    imagemUrl: "/Figures/personal_trainer.png",
    status: "concluido",
    criadoEm: "2025-10-15T09:00:00",
    atualizadoEm: "2025-10-16T16:00:00",
  }
];

export default schedulesMock;