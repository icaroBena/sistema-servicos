import React, { useEffect, useRef, useState } from "react";
import type { Booking } from "../../../../models/Agendamento";
import type { User } from "../../../../models/Usuario";

import "./schedule-modal.css";

import * as refundsApi from "../../../../api/refunds";
import RefundRequestModal from "./RefundRequestModal";
import RefundDetailsModal from "./RefundDetailsModal";
import RatingPopup from "./RatingPopup";

interface Props {
  item: Booking;
  user: User;
  onClose: () => void;
  onCancel: (id: string) => void;
  onConclude: (id: string) => void;
  onGoNegotiation: (id: string) => void;
  onStartExecution: (id: string) => void;
  onRefundCreated: (bookingId: string, refundId: string) => void;
}

const ScheduleDetailsModal: React.FC<Props> = ({
  item,
  user,
  onClose,
  onCancel,
  onConclude,
  onGoNegotiation,
  onStartExecution,
  onRefundCreated
}) => {
  const modalRef = useRef<HTMLDivElement>(null);

  const [openRefundRequest, setOpenRefundRequest] = useState(false);
  const [openRefundDetails, setOpenRefundDetails] = useState(false);

  const [refundId, setRefundId] = useState<string | null>(null);
  const [showRating, setShowRating] = useState(false);

  // Carregar reembolso existente (usa API; fallback local no catch)
  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const list = await refundsApi.listRefunds();
        const existing = list?.find((r) => r.bookingId === item.id) ?? null;
        if (mounted) setRefundId(existing ? existing.id : null);
      } catch (err) {
        // backend not reachable — nothing found locally by default (components manage in-memory create)
        if (mounted) setRefundId(null);
      }
    })();

    return () => {
      mounted = false;
    };
  }, [item.id]);

  // Focar modal ao abrir
  useEffect(() => {
    modalRef.current?.focus();
  }, []);

  const isInDispute = item.status === "disputed";

  return (
    <div className="modal-backdrop" role="dialog" aria-modal="true">
      <div className="modal" tabIndex={0} ref={modalRef}>
        
        <h2>{item.title}</h2>

        <img src={item.imageUrl ?? ""} className="modal-img" />

        <p>{item.description}</p>
        <p><b>Preço:</b> R$ {item.price}</p>
        <p><b>Status:</b> {item.status}</p>

        {refundId && (
          <p>
            <span className="status-badge status-negociacao">
              Reembolso em andamento
            </span>
          </p>
        )}

        <div className="modal-buttons">
          {isInDispute ? (
            <>
              <p className="status-alert">
                Este serviço está em disputa. O pagamento está bloqueado até que o reembolso seja analisado.
              </p>

              {refundId && (
                <button className="btn primary" onClick={() => setOpenRefundDetails(true)}>
                  Ver Reembolso
                </button>
              )}

              <button className="btn" onClick={onClose}>
                Fechar
              </button>
            </>
          ) : (
            <>
              {/* Cliente deve continuar negociação */}
              {user.type === "client" && item.status === "negotiation" && (
                <button className="btn primary" onClick={() => onGoNegotiation(item.id)}>
                  Continuar Negociação
                </button>
              )}

              {/* Prestador inicia execução */}
              {user.type === "provider" && item.status === "negotiation" && (
                <button className="btn primary" onClick={() => onStartExecution(item.id)}>
                  Iniciar Execução
                </button>
              )}

              {/* Cliente finaliza serviço e abre avaliação */}
              {user.type === "client" && item.status === "execution" && (
                <button className="btn primary" onClick={() => setShowRating(true)}>
                  Concluir Serviço
                </button>
              )}

              {/* Cancelar serviço (ambos) */}
              {item.status !== "completed" && item.status !== "cancelled" && (
                <button className="btn danger" onClick={() => onCancel(item.id)}>
                  Cancelar Serviço
                </button>
              )}

              {/* Área de reembolso */}
              {user.type === "client" && item.status === "completed" && (
                <>
                  {!refundId && (
                    <button className="btn outline" onClick={() => setOpenRefundRequest(true)}>
                      Abrir Reembolso
                    </button>
                  )}

                  {refundId && (
                    <button className="btn primary" onClick={() => setOpenRefundDetails(true)}>
                      Ver Reembolso
                    </button>
                  )}
                </>
              )}

              <button className="btn" onClick={onClose}>
                Fechar
              </button>
            </>
          )}
        </div>
      </div>

      {/* Modal de Abrir Reembolso */}
      {openRefundRequest && (
        <RefundRequestModal
          bookingId={item.id}
          requesterId={user.id}
          requesterType={user.type as "client" | "provider"}
          requestedValue={item.price}
          onClose={() => setOpenRefundRequest(false)}
          onCreated={(newId: string) => {
            setRefundId(newId);
            onRefundCreated(item.id, newId);
            setOpenRefundRequest(false);
            setOpenRefundDetails(true);
          }}
        />
      )}

      {/* Modal de Detalhes do Reembolso */}
      {openRefundDetails && refundId && (
        <RefundDetailsModal
          refundId={refundId}
          onClose={() => setOpenRefundDetails(false)}
        />
      )}

      {/* Popup de Avaliação */}
      <RatingPopup
        isOpen={showRating}
        onClose={() => setShowRating(false)}
        onSubmit={(rating) => {
          console.log("Avaliação enviada:", rating);
          onConclude(item.id);
        }}
      />
    </div>
  );
};

export default ScheduleDetailsModal;
