import type { Refund } from "../models/Refund";
import * as refundsApi from "../api/refunds";

let inMemory: Refund[] = [];

export const refundService = {
  async listByUser(userId: string) {
    try {
      const all = await refundsApi.listRefunds();
      return all.filter((r) => r.requesterId === userId);
    } catch (err) {
      return inMemory.filter((r) => r.requesterId === userId);
    }
  },

  async getByBooking(bookingId: string) {
    try {
      const all = await refundsApi.listRefunds();
      return all.find((r) => r.bookingId === bookingId);
    } catch (err) {
      return inMemory.find((r) => r.bookingId === bookingId);
    }
  },

  async get(id: string) {
    try {
      return await refundsApi.getRefund(id);
    } catch (err) {
      return inMemory.find((r) => r.id === id);
    }
  },

  async create(data: Partial<Refund>) {
    try {
      return await refundsApi.createRefund(data);
    } catch (err) {
      const novo: Refund = {
        id: "rb" + Date.now(),
        bookingId: data.bookingId || "",
        requesterId: data.requesterId || "",
        requesterType: (data.requesterType as any) || "client",
        requestedValue: data.requestedValue || 0,
        justification: data.justification || "",
        evidenceList: data.evidenceList || [],
        status: "pending",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      inMemory.push(novo);
      return novo;
    }
  },

  async updateStatus(id: string, status: Refund["status"]) {
    try {
      return await refundsApi.updateRefund(id, { status } as any);
    } catch (err) {
      inMemory = inMemory.map((r) =>
        r.id === id ? { ...r, status, updatedAt: new Date().toISOString() } : r
      );
    }
  },
};
