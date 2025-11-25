// Arquivo `Notificacao.tsx` — exporta tipos em inglês para notificações
export type NotificationStatus = "sent" | "unread" | "read" | "removed";

export type NotificationType =
  | "refund"
  | "booking"
  | "proposal"
  | "verification"
  | "system";

export interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  link?: string;
  createdAt: string;
  status: NotificationStatus;
  temporary?: boolean;
}

