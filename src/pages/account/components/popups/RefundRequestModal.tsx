// src/components/popups/RefundRequestModal.tsx

import React, { useState } from "react";
import "../account-tabs-style.css";
import { reembolsoMockApi } from "../../../../services/reembolsoMockApi";
import type { ProvaReembolso } from "../../../../models/Reembolso";

interface Props {
  agendamentoId: string;
  solicitanteId: string;
  tipoSolicitante: "cliente" | "prestador";
  valor: number;
  onClose: () => void;
  onCriado: (reembolsoId: string) => void;
}

const RefundRequestModal: React.FC<Props> = ({
  agendamentoId,
  solicitanteId,
  tipoSolicitante,
  valor,
  onClose,
  onCriado
}) => {
  const [justificativa, setJustificativa] = useState("");
  const [provas, setProvas] = useState<ProvaReembolso[]>([]);

  /** Recebe arquivos e os adiciona como provas */
  const handleUpload = (files: FileList | null) => {
    if (!files) return;

    const novasProvas = [...provas];

    Array.from(files).forEach((file) => {
      novasProvas.push({
        id: "p" + Date.now(),
        nomeArquivo: file.name,
        url: URL.createObjectURL(file),
        enviadoEm: new Date().toISOString(),
      });
    });

    setProvas(novasProvas);
  };

  /** Envia o reembolso para o mockApi */
  const criarReembolso = () => {
    if (justificativa.trim().length < 5) {
      alert("A justificativa deve conter pelo menos 5 caracteres.");
      return;
    }

    const novo = reembolsoMockApi.criar({
      agendamentoId,
      solicitanteId,
      tipoSolicitante,
      valorSolicitado: valor,
      justificativa,
      provas,
    });

    onCriado(novo.id);
  };

  return (
    <div className="modal-backdrop">

      <div className="modal refund-modal">
        <h2>Abrir Reembolso</h2>

        <p><b>Valor a ser reembolsado:</b> R$ {valor}</p>

        <label>Justificativa do pedido</label>
        <textarea
          className="refund-textarea"
          placeholder="Explique por que está solicitando reembolso..."
          value={justificativa}
          onChange={(e) => setJustificativa(e.target.value)}
        />

        <label>Provas (imagens)</label>
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={(e) => handleUpload(e.target.files)}
        />

        <div className="evidence-list">
          {provas.map((p) => (
            <img
              key={p.id}
              src={p.url}
              alt={p.nomeArquivo}
              className="evidence-thumbnail"
            />
          ))}
        </div>

        <div className="modal-buttons">
          <button className="btn primary" onClick={criarReembolso}>
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