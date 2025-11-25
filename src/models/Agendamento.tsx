// Arquivo `Agendamento.tsx` — exporta o tipo `Booking` em inglês
export type BookingStatus =
  | "negotiation"
  | "execution"
  | "completed"
  | "cancelled"
  | "disputed";

export interface Booking {
  id: string;
  title: string;
  description?: string;
  price: number;
  imageUrl?: string | null;
  status: BookingStatus;
  refundId?: string | null;
  createdAt: string;
  updatedAt?: string;
  clientId?: string;
  providerId?: string;
}

