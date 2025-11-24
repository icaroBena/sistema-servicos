import React, { createContext, useContext, useState } from "react";
import { notificacaoMockApi } from "../services/notificacaoMockApi";
import type { Notificacao } from "../models/Notificacao";

interface Ctx {
  notificacoes: Notificacao[];
  atualizar: () => void;
  marcarLida: (id: string) => void;
  remover: (id: string) => void;
  limpar: () => void;
}

const NotificationContext = createContext<Ctx | null>(null);

export const NotificationProvider = ({ children }: any) => {
  const [notificacoes, setNotificacoes] = useState<Notificacao[]>(
    notificacaoMockApi.listar()
  );

  const atualizar = () =>
    setNotificacoes(notificacaoMockApi.listar());

  const marcarLida = (id: string) => {
    notificacaoMockApi.marcarComoLida(id);
    atualizar();
  };

  const remover = (id: string) => {
    notificacaoMockApi.remover(id);
    atualizar();
  };

  const limpar = () => {
    notificacaoMockApi.limparHistorico();
    atualizar();
  };

  return (
    <NotificationContext.Provider
      value={{ notificacoes, atualizar, marcarLida, remover, limpar }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotificacoes = () =>
  useContext(NotificationContext)!;