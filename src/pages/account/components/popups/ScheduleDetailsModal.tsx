import React, { useEffect, useRef, useState } from "react";
import type { Agendamento } from "../../../../models/Agendamento";
import type { Usuario } from "../../../../models/Usuario";
import "./schedule-modal.css";

import { reembolsoMockApi } from "../../../../services/reembolsoMockApi";
import RefundRequestModal from "./RefundRequestModal";
import RefundDetailsModal from "./RefundDetailsModal";
import RatingPopup from "./RatingPopup"; // <-- IMPORTANTE

interface Props {
  item: Agendamento;
  usuario: Usuario;
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

  const [abrirReembolso, setAbrirReembolso] = useState(false);
  const [verReembolso, setVerReembolso] = useState(false);
  const [reembolsoId, setReembolsoId] = useState<string | null>(null);

  const [showRating, setShowRating] = useState(false); // <-- NOVO

  useEffect(() => {
    const existente = reembolsoMockApi.obterPorAgendamento(item.id);
    setReembolsoId(existente ? existente.id : null);
  }, [item.id]);

  useEffect(() => {
    modalRef.current?.focus();
  }, []);

  const emDisputa = item.status === "disputando";

  return (
    <div className="modal-backdrop" role="dialog" aria-modal="true">
      <div className="modal" tabIndex={0} ref={modalRef}>

        <h2>{item.titulo}</h2>
        <img src={item.imagemUrl ?? ""} className="modal-img" />

        <p>{item.descricao}</p>
        <p><b>Preço:</b> R$ {item.preco}</p>
        <p><b>Status:</b> {item.status}</p>

        {reembolsoId && (
          <p>
            <span className="status-badge status-negociacao">
              Reembolso em andamento
            </span>
          </p>
        )}

        <div className="modal-buttons">
          {emDisputa ? (
            <>
              <p className="status-alert">
                Este serviço está em disputa. O pagamento está bloqueado até que o reembolso seja analisado.
              </p>

              {reembolsoId && (
                <button className="btn primary" onClick={() => setVerReembolso(true)}>
                  Ver Reembolso
                </button>
              )}

              <button className="btn" onClick={onClose}>Fechar</button>
            </>
          ) : (
            <>
              {usuario.tipo === "cliente" && item.status === "negociacao" && (
                <button className="btn primary" onClick={() => onGoNegotiation(item.id)}>
                  Continuar Negociação
                </button>
              )}

              {usuario.tipo === "prestador" && item.status === "negociacao" && (
                <button className="btn primary" onClick={() => onStartExecution(item.id)}>
                  Iniciar Execução
                </button>
              )}

              {/* AQUI ABRE O POPUP DE AVALIAÇÃO */}
              {usuario.tipo === "cliente" && item.status === "execucao" && (
                <button className="btn primary" onClick={() => setShowRating(true)}>
                  Concluir Serviço
                </button>
              )}

              {item.status !== "concluido" && item.status !== "cancelado" && (
                <button className="btn danger" onClick={() => onCancel(item.id)}>
                  Cancelar Serviço
                </button>
              )}

              {usuario.tipo === "cliente" && item.status === "concluido" && (
                <>
                  {!reembolsoId && (
                    <button className="btn outline" onClick={() => setAbrirReembolso(true)}>
                      Abrir Reembolso
                    </button>
                  )}

                  {reembolsoId && (
                    <button className="btn primary" onClick={() => setVerReembolso(true)}>
                      Ver Reembolso
                    </button>
                  )}
                </>
              )}

              <button className="btn" onClick={onClose}>Fechar</button>
            </>
          )}
        </div>
      </div>

      {abrirReembolso && (
        <RefundRequestModal
          agendamentoId={item.id}
          solicitanteId={usuario.id}
          tipoSolicitante={usuario.tipo}
          valor={item.preco}
          onClose={() => setAbrirReembolso(false)}
          onCriado={(novoId) => {
            setReembolsoId(novoId);
            onReembolsoCriado(item.id, novoId);
            setAbrirReembolso(false);
            setVerReembolso(true);
          }}
        />
      )}

      {verReembolso && reembolsoId && (
        <RefundDetailsModal refundId={reembolsoId} onClose={() => setVerReembolso(false)} />
      )}

      {/* POPUP DE AVALIAÇÃO */}
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
