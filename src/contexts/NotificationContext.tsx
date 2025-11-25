import React, { createContext, useContext, useRef, useState } from "react";
import type { ReactNode } from "react";
import * as notificationsApi from "../api/notifications";
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

  // in-memory fallback storage when backend isn't available (persisted across renders)
  const inMemoryRef = useRef<Notification[]>([]);

  // initial load from service (falls back to in-memory)
  React.useEffect(() => {
    (async () => {
      try {
        const list = await notificationsApi.listNotifications();
        setNotifications(list as Notification[]);
      } catch (err) {
        // seed with example notifications once per device (localStorage)
        const loaded = localStorage.getItem("mock_notifs_loaded");
        if (!loaded) {
          const sample: Partial<Notification>[] = [
            { type: "proposal", title: "Nova proposta recebida", message: "Você recebeu uma nova proposta para o serviço.", link: "/account?tab=propositions" },
            { type: "booking", title: "Agendamento atualizado", message: "O prestador iniciou a execução do serviço.", link: "/account?tab=appointments" },
            { type: "system", title: "Bem-vindo ao WorkMatch!", message: "Sua conta foi criada com sucesso." },
          ];

          for (const s of sample) {
            const created = await (async () => {
              try {
                return await notificationsApi.createNotification(s as any);
              } catch (e) {
                const n: Notification = {
                  id: "n" + Date.now().toString(),
                  status: "unread",
                  createdAt: new Date().toISOString(),
                  type: (s.type as any) || "system",
                  title: s.title || "",
                  message: s.message || "",
                  temporary: true,
                };
                inMemoryRef.current.unshift(n);
                return n;
              }
            })();

            // if API succeeded, keep it in-memory as well for consistent UI updates
            if (created) inMemoryRef.current.unshift(created as Notification);
          }

          localStorage.setItem("mock_notifs_loaded", "true");
          setNotifications(inMemoryRef.current.slice());
        } else {
          setNotifications(inMemoryRef.current.slice());
        }
      }
    })();
  }, []);

  /* ---------------------- Funções do contexto ---------------------- */

  const refresh = async () => {
    try {
      const list = await notificationsApi.listNotifications();
      setNotifications(list as Notification[]);
    } catch (err) {
      setNotifications(inMemoryRef.current.slice());
    }
  };

  const markAsRead = async (id: string) => {
    try {
      await notificationsApi.markAsRead(id);
    } catch (err) {
      inMemoryRef.current = inMemoryRef.current.map((n) =>
        n.id === id ? { ...n, status: "read" } : n
      );
    }

    await refresh();
  };

  const remove = async (id: string) => {
    try {
      await notificationsApi.removeNotification(id);
    } catch (err) {
      inMemoryRef.current = inMemoryRef.current.map((n) =>
        n.id === id ? { ...n, status: "removed" } : n
      );
    }

    await refresh();
  };

  const clear = async () => {
    // no API endpoint for clearing all notifications — fallback: mark each removed locally
    try {
      const list = await notificationsApi.listNotifications();
      for (const n of list) {
        try {
          await notificationsApi.removeNotification(n.id);
        } catch (e) {
          // if remove fails for an item, mark as removed in-memory
          inMemoryRef.current = inMemoryRef.current.map((m) => (m.id === n.id ? { ...m, status: "removed" } : m));
        }
      }
    } catch (err) {
      // no backend — mark all in-memory as removed
      inMemoryRef.current = inMemoryRef.current.map((m) => ({ ...m, status: "removed" }));
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
