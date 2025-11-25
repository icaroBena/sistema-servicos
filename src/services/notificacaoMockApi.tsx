import type { Notification } from "../models/Notification";
import * as notificationsApi from "../api/notifications";

let inMemory: Notification[] = [];

export const notificacaoService = {
  async create(data: Partial<Notification>) {
    try {
      return await notificationsApi.createNotification(data as Partial<Notification>);
    } catch (err) {
      const nova: Notification = {
        id: "n" + (crypto?.randomUUID ? crypto.randomUUID() : Date.now().toString()),
        status: "unread",
        createdAt: new Date().toISOString(),
        type: (data.type as any) || "system",
        title: data.title || "",
        message: data.message || "",
        ...data,
      } as Notification;
      inMemory.unshift(nova);
      return nova;
    }
  },

  async list() {
    try {
      return await notificationsApi.listNotifications();
    } catch (err) {
      return inMemory.filter((n) => n.status !== "removed");
    }
  },

  async markAsRead(id: string) {
    try {
      await notificationsApi.markAsRead(id);
    } catch (err) {
      inMemory = inMemory.map((n) => (n.id === id ? { ...n, status: "read" } : n));
    }
  },

  async remove(id: string) {
    try {
      await notificationsApi.removeNotification(id);
    } catch (err) {
      inMemory = inMemory.map((n) => (n.id === id ? { ...n, status: "removed" } : n));
    }
  },

  async countUnread() {
    try {
      const list = await this.list();
      return list.filter((n) => n.status === "unread").length;
    } catch (err) {
      return inMemory.filter((n) => n.status === "unread").length;
    }
  },
};
