// src/pages/account/components/ProviderPanel.tsx

import React, { useState } from "react";
import "./account-tabs-style.css";

const ProviderPanel: React.FC = () => {
  const [verificationStatus, setVerificationStatus] = useState<
    "PENDENTE" | "APROVADO" | "NEGADO" | "EXPIRADO"
  >("NEGADO");

  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setUploadedFile(file);
  };

  const handleResend = () => {
    if (!uploadedFile) {
      alert("Selecione um documento antes de reenviar.");
      return;
    }

    alert(`Documento "${uploadedFile.name}" reenviado para verificação.`);
    setVerificationStatus("PENDENTE");
  };

  return (
    <div className="panel">
      <h3>Status de Verificação</h3>

      <p>
        <strong>Status atual: </strong>
        <span
          className={`status-badge status-${verificationStatus.toLowerCase()}`}
        >
          {verificationStatus}
        </span>
      </p>

      {(verificationStatus === "NEGADO" ||
        verificationStatus === "EXPIRADO") && (
        <div className="verification-actions">
          <p>Envie novamente seu documento de verificação.</p>

          <input type="file" accept=".pdf" onChange={handleFileChange} />

          <button className="btn primary" onClick={handleResend}>
            Reenviar Documento
          </button>
        </div>
      )}

      {verificationStatus === "PENDENTE" && (
        <p>Aguarde a análise dos documentos enviados.</p>
      )}

      {verificationStatus === "APROVADO" && (
        <p>✅ Sua conta foi verificada com sucesso!</p>
      )}

      <hr />
    </div>
  );
};

export default ProviderPanel;
