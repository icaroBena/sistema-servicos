import React, { useEffect, useRef, useState } from "react";
import type { Booking } from "../../../../models/Agendamento";
import type { User } from "../../../../models/Usuario";

import "./schedule-modal.css";

import { refundService } from "../../../../services/reembolsoMockApi";
import RefundRequestModal from "./RefundRequestModal";
import RefundDetailsModal from "./RefundDetailsModal";
import RatingPopup from "./RatingPopup";

interface Props {
  item: Booking;
  usuario: User;
  onClose: () => void;
  onCancel: (id: string) => void;
  onConclude: (id: string) => void;
  onGoNegotiation: (id: string) => void;
  onStartExecution: (id: string) => void;
  onReembolsoCriado: (agendamentoId: string, refundId: string) => void;
}

const ScheduleDetailsModal: React.FC<Props> = ({
  item,
  usuario,
  onClose,
  onCancel,
  onConclude,
  onGoNegotiation,
  onStartExecution,
  onReembolsoCriado
}) => {
  const modalRef = useRef<HTMLDivElement>(null);

  const [openRefundRequest, setOpenRefundRequest] = useState(false);
  const [openRefundDetails, setOpenRefundDetails] = useState(false);

  const [refundId, setRefundId] = useState<string | null>(null);
  const [showRating, setShowRating] = useState(false);

  // Carregar reembolso existente (usa serviço async)
  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const existing = await refundService.getByBooking(item.id);
        if (mounted) setRefundId(existing ? existing.id : null);
      } catch (err) {
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
              {usuario.type === "client" && item.status === "negotiation" && (
                <button className="btn primary" onClick={() => onGoNegotiation(item.id)}>
                  Continuar Negociação
                </button>
              )}

              {/* Prestador inicia execução */}
              {usuario.type === "provider" && item.status === "negotiation" && (
                <button className="btn primary" onClick={() => onStartExecution(item.id)}>
                  Iniciar Execução
                </button>
              )}

              {/* Cliente finaliza serviço e abre avaliação */}
              {usuario.type === "client" && item.status === "execution" && (
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
              {usuario.type === "client" && item.status === "completed" && (
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
          agendamentoId={item.id}
          solicitanteId={usuario.id}
          requesterType={usuario.type as "client" | "provider"}
          requestedValue={item.price}
          onClose={() => setOpenRefundRequest(false)}
          onCriado={(newId) => {
            setRefundId(newId);
            onReembolsoCriado(item.id, newId);
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
