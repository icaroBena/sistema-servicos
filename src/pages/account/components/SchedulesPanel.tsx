// src/pages/account/components/SchedulesPanel.tsx

import React, { useEffect, useState } from "react";
import ScheduleCard from "../../../components/SchedulesCard";
import ScheduleDetailsModal from "./popups/ScheduleDetailsModal";

import type { Agendamento } from "../../../models/Agendamento";
import { useConfirm } from "../../../components/UseConfirm";
import { useNavigate } from "react-router-dom";

import "./account-tabs-style.css";

import { mockCliente } from "../../../mocks/devUser";
import { schedulesMock } from "../../../mocks/schedulesMock";

const usuario = mockCliente;

export const updateStatus = (
  list: Agendamento[],
  id: string,
  newStatus: Agendamento["status"],
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

export const filterActive = (list: Agendamento[]) =>
  list.filter(item => ["negociacao", "execucao"].includes(item.status));

export const filterHistory = (list: Agendamento[]) =>
  list.filter(item =>
    ["concluido", "cancelado", "disputando"].includes(item.status)
  );

const SchedulesPanel: React.FC = () => {
  const [items, setItems] = useState<Agendamento[]>([]);
  const [tab, setTab] = useState<"active" | "history">("active");
  const [selected, setSelected] = useState<Agendamento | null>(null);

  const confirm = useConfirm();
  const navigate = useNavigate();
  const testing = true;

  useEffect(() => {
    const saved = localStorage.getItem("schedules");

    if (saved && !testing) {
      try {
        setItems(JSON.parse(saved));
        return;
      } catch {}
    }

    setItems(schedulesMock);
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

    setItems(prev => updateStatus(prev, id, "cancelado"));
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

    setItems(prev => updateStatus(prev, id, "concluido"));
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

    setItems(prev => updateStatus(prev, id, "execucao"));
    setSelected(null);
  };

  const handleRefundCreated = (agendamentoId: string, refundId: string) => {
    setItems(prev => updateStatus(prev, agendamentoId, "disputando", refundId));
  };

  const list = tab === "active" ? filterActive(items) : filterHistory(items);

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
        {list.length === 0 && <p>Nenhum agendamento encontrado.</p>}

        {list.map(item => (
          <ScheduleCard key={item.id} item={item} onOpen={setSelected} />
        ))}
      </div>

      {selected && (
        <ScheduleDetailsModal
          item={selected}
          usuario={usuario}
          onClose={() => setSelected(null)}
          onCancel={handleCancel}
          onConclude={handleConclude}
          onGoNegotiation={handleGoNegotiation}
          onStartExecution={handleStartExecution}
          onReembolsoCriado={handleRefundCreated}
        />
      )}

      {confirm.Dialog}
    </div>
  );
};

export default SchedulesPanel;
