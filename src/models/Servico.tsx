// Arquivo `Servico.tsx` — exporta tipos em inglês para uso interno
export interface Service {
  id: string;
  title: string;
  description?: string;
  category: string;
  price: number;
  imageUrl?: string | null;
  createdAt?: string;
  providerId?: string;
}

// export named only
