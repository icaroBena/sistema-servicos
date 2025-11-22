import type { Usuario } from "../models/Usuario";

export const mockPrestador: Usuario = {
  id: "u1",
  nome: "João Silva",
  email: "joao@workmatch.com",
  telefone: "(92) 99999-0000",
  localizacao: "Manaus, AM",
  tipo: "prestador",
  verificado: true,
  avaliacao: 4.7,
  disponibilidade: "DISPONÍVEL",
  categorias: ["Eletricista", "Instalador de Ar"],
  certificacoes: ["Curso Avançado de Elétrica - SENAI", "NR10"],
  sobre: "Profissional com mais de 10 anos de experiência em instalações e manutenções residenciais.",
  foto: null,
};

export const mockCliente: Usuario = {
  id: "u2",
  nome: "Bernardo da Silva",
  email: "berndslv@gmail.com",
  telefone: "(92) 92564-0320",
  localizacao: "Manaus, AM",
  tipo: "cliente",
  categorias: [],
  certificacoes: [],
  foto: null,
};

export default mockPrestador;
