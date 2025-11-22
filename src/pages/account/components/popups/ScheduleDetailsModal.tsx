import React, { useEffect, useRef } from "react";
import type { Agendamento } from "../../../../models/Agendamento";
import "./schedule-modal.css";

import type { Usuario } from "../../../../models/Usuario";

interface Props {
  item: Agendamento;
  usuario: Usuario;
  onClose: () => void;
  onCancel: (id: string) => void;
  onConclude: (id: string) => void;
  onGoNegotiation: (id: string) => void;
  onStartExecution: (id: string) => void;
}

const ScheduleDetailsModal: React.FC<Props> = ({
  item,
  usuario,
  onClose,
  onCancel,
  onConclude,
  onGoNegotiation,
  onStartExecution
}) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    modalRef.current?.focus();
  }, []);

  return (
    <div className="modal-backdrop" role="dialog" aria-modal="true">

      <div
        className="modal"
        tabIndex={0}
        ref={modalRef}
      >
        <h2>{item.titulo}</h2>
        <img src={item.imagemUrl ?? ""} className="modal-img" />

        <p>{item.descricao}</p>
        <p><b>Preço:</b> R$ {item.preco}</p>
        <p><b>Status:</b> {item.status}</p>

        <div className="modal-buttons">

          {/* CLIENTE — continuar negociação */}
          {usuario.tipo === "cliente" && item.status === "negociacao" && (
            <button className="btn primary" onClick={() => onGoNegotiation(item.id)}>
              Continuar Negociação
            </button>
          )}

          {/* PRESTADOR — iniciar execução */}
          {usuario.tipo === "prestador" && item.status === "negociacao" && (
            <button className="btn primary" onClick={() => onStartExecution(item.id)}>
              Iniciar Execução
            </button>
          )}

          {/* CLIENTE — concluir serviço */}
          {usuario.tipo === "cliente" && item.status === "execucao" && (
            <button className="btn primary" onClick={() => onConclude(item.id)}>
              Concluir Serviço
            </button>
          )}

          {/* Cancelar — ambos podem, se não concluído */}
          {item.status !== "concluido" && item.status !== "cancelado" && (
            <button className="btn danger" onClick={() => onCancel(item.id)}>
              Cancelar Serviço
            </button>
          )}

          {/* Cliente — abrir disputa */}
          {usuario.tipo === "cliente" && item.status === "concluido" && (
            <button className="btn outline">
              Abrir Reembolso
            </button>
          )}

          {/* FECHAR */}
          <button className="btn" onClick={onClose}>
            Fechar
          </button>
        </div>
      </div>

    </div>
  );
};

export default ScheduleDetailsModal;