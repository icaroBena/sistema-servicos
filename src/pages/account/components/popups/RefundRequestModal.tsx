// src/components/popups/RefundRequestModal.tsx

import React, { useState } from "react";
import { loadFromLocal, saveToLocal } from "../../../../utils/localFallback";
import "../account-tabs-style.css";
import * as refundsApi from "../../../../api/refunds";
import type { Refund } from "../../../../models/Reembolso";
import type { RefundEvidence } from "../../../../models/Reembolso";

interface Props {
  bookingId: string;
  requesterId: string;
  requesterType: "client" | "provider";
  requestedValue: number;
  onClose: () => void;
  onCreated: (refundId: string) => void;
}

const RefundRequestModal: React.FC<Props> = ({
  bookingId,
  requesterId,
  requesterType,
  requestedValue,
  onClose,
  onCreated,
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

    let novo: Refund | null = null as any;
    try {
      novo = await refundsApi.createRefund({
      bookingId: bookingId,
      requesterId: requesterId,
      requesterType: requesterType,
      requestedValue: requestedValue,
      justification: reason,
      evidenceList: evidence,
      } as any);
    } catch (err) {
      // fallback in-memory
      novo = {
        id: "rb" + Date.now().toString(),
        bookingId: bookingId,
        requesterId: requesterId,
        requesterType: requesterType,
        requestedValue: requestedValue,
        justification: reason,
        evidenceList: evidence,
        status: "pending",
        createdAt: new Date().toISOString(),
      } as Refund;
      // persist fallback in localStorage so other components can read it
      const key = "fallback_refunds";
      try {
        const list = loadFromLocal<Refund[]>(key, []);
        list.unshift(novo);
        saveToLocal(key, list);
      } catch (e) {
        // ignore storage errors
      }
    }
    onCreated(novo!.id);
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
