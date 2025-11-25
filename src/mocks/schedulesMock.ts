import type { Booking } from "../models/Agendamento";

// Mock de bookings (campos internos em inglês) — usado como fallback local
export const schedulesMock: Booking[] = [
  {
    id: "1",
    title: "Jardinagem e Limpeza",
    description: "Corte de grama, poda de árvores e limpeza geral do jardim.",
    price: 120,
    imageUrl: "/Figures/jardinagem.png",
    status: "negotiation",
    createdAt: "2025-10-20T10:00:00",
    updatedAt: "2025-10-20T10:00:00",
  },
  {
    id: "2",
    title: "Diarista Maria",
    description: "Limpeza residencial completa!",
    price: 250,
    imageUrl: "/Figures/diarista.png",
    status: "execution",
    createdAt: "2025-10-18T14:00:00",
    updatedAt: "2025-10-19T08:30:00",
  },
  {
    id: "3",
    title: "Personal Thiago",
    description: "Musculação e treino funcional!",
    price: 180,
    imageUrl: "/Figures/personal_trainer.png",
    status: "disputed",
    createdAt: "2025-10-15T09:00:00",
    updatedAt: "2025-10-16T16:00:00",
    refundId: "r1",
  },
  {
    id: "4",
    title: "Serviço de Negócios",
    description: "Consultoria empresarial e análise de mercado.",
    price: 300,
    imageUrl: "/Figures/cool-handshake.jpeg",
    status: "completed",
    createdAt: "2025-10-22T09:00:00",
    updatedAt: "2025-10-27T16:00:00",
  },
];

export default schedulesMock;