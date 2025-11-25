// src/pages/account/components/SchedulesPanel.tsx

import React, { useEffect, useState } from "react";
import ScheduleCard from "../../../components/SchedulesCard";
import ScheduleDetailsModal from "./popups/ScheduleDetailsModal";

import type { Booking } from "../../../models/Agendamento";
import * as bookingsApi from "../../../api/bookings";
import { useConfirm } from "../../../components/UseConfirm";
import { useNavigate } from "react-router-dom";

import "./account-tabs-style.css";

// User info for UI actions — read from localStorage 'auth_user' if available
const storedUserRaw = typeof window !== "undefined" ? localStorage.getItem("auth_user") : null;
const user = storedUserRaw ? JSON.parse(storedUserRaw) : { id: "", name: "", email: "", type: "client", categories: [], certifications: [] };

export const updateStatus = (
  list: Booking[],
  id: string,
  newStatus: Booking["status"],
  refundId?: string
) => {
  return list.map(item =>
    item.id === id
      ? {
          ...item,
          status: newStatus,
          refundId: refundId ?? item.refundId,
          updatedAt: new Date().toISOString(),
        }
      : item
  );
};

export const filterActive = (list: Booking[]) =>
  list.filter(item => ["negotiation", "execution"].includes(item.status));

export const filterHistory = (list: Booking[]) =>
  list.filter(item => ["completed", "cancelled", "disputed"].includes(item.status));

const SchedulesPanel: React.FC = () => {
  const [items, setItems] = useState<Booking[]>([]);
  const [tab, setTab] = useState<"active" | "history">("active");
  const [selected, setSelected] = useState<Booking | null>(null);

  const confirm = useConfirm();
  const navigate = useNavigate();

  useEffect(() => {
    let mounted = true;
    (async () => {
      // Tenta carregar pela API de bookings; se falhar, fallback para mock local
      try {
        const list = await bookingsApi.listBookings();
        if (!mounted) return;
        setItems(list || []);
        return;
      } catch (err) {
        // fallback para localStorage
      }

      if (mounted) {
        try {
          const raw = localStorage.getItem("fallback_bookings");
          const list = raw ? JSON.parse(raw) : [];
          setItems(list);
        } catch (e) {
          setItems([]);
        }
      }
    })();

    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    localStorage.setItem("schedules", JSON.stringify(items));
  }, [items]);

  // -------------------- AÇÕES ---------------------

  const handleCancel = async (id: string) => {
    const ok = await confirm.show({
      title: "Cancelar serviço?",
      message:
        "O valor será reembolsado para sua forma de pagamento. A devolução pode levar de 2 a 5 dias úteis.",
      confirmLabel: "Sim, cancelar",
      cancelLabel: "Voltar",
    });

    if (!ok) return;

    setItems(prev => updateStatus(prev, id, "cancelled"));
    setSelected(null);
  };

  const handleConclude = async (id: string) => {
    const ok = await confirm.show({
      title: "Finalizar serviço?",
      message:
        "Ao finalizar, o pagamento será liberado ao prestador. Confirme apenas se o serviço foi entregue corretamente.",
      confirmLabel: "Concluir Serviço",
      cancelLabel: "Cancelar",
    });

    if (!ok) return;

    setItems(prev => updateStatus(prev, id, "completed"));
    setSelected(null);
  };

  const handleGoNegotiation = async (id: string) => {
    const ok = await confirm.show({
      title: "Continuar negociação?",
      message:
        "Você será redirecionado para finalizar a negociação antes da execução do serviço.",
      confirmLabel: "Ir para negociação",
      cancelLabel: "Cancelar",
    });

    if (!ok) return;

    navigate(`/negotiation/${id}`);
  };

  const handleStartExecution = async (id: string) => {
    const ok = await confirm.show({
      title: "Iniciar execução?",
      message:
        "O serviço será marcado como 'em execução'. Confirme apenas se já iniciou o atendimento.",
      confirmLabel: "Iniciar Execução",
      cancelLabel: "Cancelar",
    });

    if (!ok) return;

    setItems(prev => updateStatus(prev, id, "execution"));
    setSelected(null);
  };

  const handleRefundCreated = (bookingId: string, refundId: string) => {
    setItems(prev => updateStatus(prev, bookingId, "disputed", refundId));
  };

  const displayList = tab === "active" ? filterActive(items) : filterHistory(items);

  return (
    <div className="panel">
      <h3>Agendamentos</h3>

      <div className="tabs">
        <button
          className={tab === "active" ? "tab active" : "tab"}
          onClick={() => setTab("active")}
        >
          Em andamento
        </button>

        <button
          className={tab === "history" ? "tab active" : "tab"}
          onClick={() => setTab("history")}
        >
          Histórico
        </button>
      </div>

      <div className="srv-list">
        {displayList.length === 0 && <p>Nenhum agendamento encontrado.</p>}

        {displayList.map(item => (
          <ScheduleCard key={item.id} item={item} onOpen={setSelected} />
        ))}
      </div>

      {selected && (
        <ScheduleDetailsModal
          item={selected}
          user={user}
          onClose={() => setSelected(null)}
          onCancel={handleCancel}
          onConclude={handleConclude}
          onGoNegotiation={handleGoNegotiation}
          onStartExecution={handleStartExecution}
          onRefundCreated={handleRefundCreated}
        />
      )}

      {confirm.Dialog}
    </div>
  );
};

export default SchedulesPanel;
