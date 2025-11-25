import type { User } from "../models/Usuario";

// Mocks com campos em inglês para uso interno (fallback local)
export const mockProvider: User = {
  id: "u1",
  name: "João Silva",
  email: "joao@workmatch.com",
  phone: "(92) 99999-0000",
  address: "Manaus, AM",
  type: "provider",
  verified: true,
  rating: 4.7,
  availability: "AVAILABLE",
  categories: ["Electrician", "AC Installer"],
  certifications: ["Advanced Electricity - SENAI", "NR10"],
  about: "Profissional com mais de 10 anos de experiência em instalações e manutenções residenciais.",
  photo: null,
};

export const mockClient: User = {
  id: "u2",
  name: "Bernardo da Silva",
  email: "berndslv@gmail.com",
  phone: "(92) 92564-0320",
  address: "Manaus, AM",
  type: "client",
  categories: [],
  certifications: [],
  photo: null,
};

export default mockProvider;
