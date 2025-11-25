// src/components/popups/RefundRequestModal.tsx

import React, { useState } from "react";
import "../account-tabs-style.css";
import { refundService } from "../../../../services/reembolsoMockApi";
import type { RefundEvidence } from "../../../../models/Reembolso";

interface Props {
  agendamentoId: string;
  solicitanteId: string;
  requesterType: "client" | "provider";
  requestedValue: number;
  onClose: () => void;
  onCriado: (refundId: string) => void;
}

const RefundRequestModal: React.FC<Props> = ({
  agendamentoId,
  solicitanteId,
  requesterType,
  requestedValue,
  onClose,
  onCriado,
}) => {
  const [reason, setReason] = useState("");
  const [evidence, setEvidence] = useState<RefundEvidence[]>([]);

  /* ---------------- Upload de Evidências ---------------- */
  const handleUpload = (files: FileList | null) => {
    if (!files) return;

    const updated = [...evidence];

    Array.from(files).forEach((file) => {
      updated.push({
        id: "p" + Date.now(),
        fileName: file.name,
        url: URL.createObjectURL(file),
        uploadedAt: new Date().toISOString(),
      });
    });

    setEvidence(updated);
  };

  /* ---------------- Criar Reembolso ---------------- */
  const createRefund = async () => {
    if (reason.trim().length < 5) {
      alert("A justificativa deve conter pelo menos 5 caracteres.");
      return;
    }

    const novo = await refundService.create({
      bookingId: agendamentoId,
      requesterId: solicitanteId,
      requesterType: requesterType,
      requestedValue: requestedValue,
      justification: reason,
      evidenceList: evidence,
    } as any);

    onCriado(novo.id);
  };

  return (
    <div className="modal-backdrop">
      <div className="modal refund-modal">
        <h2>Abrir Reembolso</h2>

        <p>
          <b>Valor a ser reembolsado:</b> R$ {requestedValue}
        </p>

        {/* Justificativa */}
        <label>Justificativa do pedido</label>
        <textarea
          className="refund-textarea"
          placeholder="Explique por que está solicitando reembolso..."
          value={reason}
          onChange={(e) => setReason(e.target.value)}
        />

        {/* Upload de Provas */}
        <label>Evidências (imagens)</label>
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={(e) => handleUpload(e.target.files)}
        />

        <div className="evidence-list">
          {evidence.map((item) => (
            <img
              key={item.id}
              src={item.url}
              alt={item.fileName}
              className="evidence-thumbnail"
            />
          ))}
        </div>

        {/* Botões */}
        <div className="modal-buttons">
          <button className="btn primary" onClick={createRefund}>
            Enviar Solicitação
          </button>

          <button className="btn" onClick={onClose}>
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
};

export default RefundRequestModal;
