import React, { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";
import { notificacaoService } from "../services/notificacaoMockApi";
import type { Notification } from "../models/Notificacao";

interface NotificationContextType {
  // internal names in English
  notifications: Notification[];
  refresh: () => void;
  markAsRead: (id: string) => void;
  remove: (id: string) => void;
  clear: () => void;
}

const NotificationContext = createContext<NotificationContextType | null>(null);

interface ProviderProps {
  children: ReactNode;
}

export const NotificationProvider: React.FC<ProviderProps> = ({ children }) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  // initial load from service (falls back to in-memory)
  React.useEffect(() => {
    (async () => {
      const list = await notificacaoService.list();
      setNotifications(list as Notification[]);
    })();
  }, []);

  /* ---------------------- Funções do contexto ---------------------- */

  const refresh = async () => {
    const list = await notificacaoService.list();
    setNotifications(list as Notification[]);
  };

  const markAsRead = async (id: string) => {
    await notificacaoService.markAsRead(id);
    await refresh();
  };

  const remove = async (id: string) => {
    await notificacaoService.remove(id);
    await refresh();
  };

  const clear = async () => {
    // no API endpoint for clearing all notifications — fallback: mark each removed locally
    const list = await notificacaoService.list();
    for (const n of list) {
      await notificacaoService.remove(n.id);
    }
    await refresh();
  };

  /* --------------------------- Render ------------------------------ */

  return (
    <NotificationContext.Provider
      value={{ notifications, refresh, markAsRead, remove, clear }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

/* ------------------------ Hook personalizado ------------------------ */
export const useNotifications = (): NotificationContextType => {
  const ctx = useContext(NotificationContext);
  if (!ctx) {
    throw new Error("useNotifications deve ser usado dentro de <NotificationProvider>");
  }
  return ctx;
};

// backward-compatible alias in Portuguese (temporary)
export const useNotificacoes = useNotifications;
