// src/pages/account/components/SettingsPanel.tsx

import React, { useState } from "react";
import "./base-account-tab.css";

const SettingsPanel: React.FC = () => {
  // Estado local — futuramente será carregado do backend
  const [emailNotifications, setEmailNotifications] = useState<boolean>(true);

  const handleSave = () => {
    // TODO: enviar para backend
    console.log("Preferências salvas:", {
      emailNotifications,
    });

    alert("Preferências salvas com sucesso!");
  };

  return (
    <div className="account-section">
      <h2 className="section-title">Configurações</h2>
      <p className="section-subtitle">
        Personalize sua conta e gerencie preferências do sistema.
      </p>

      <div className="section-content">

        {/* Notificações */}
        <div className="setting-group">
          <label className="checkbox-line">
            <input
              type="checkbox"
              checked={emailNotifications}
              onChange={() => setEmailNotifications(!emailNotifications)}
            />
            Receber notificações por e-mail
          </label>
        </div>

        {/* Botão de salvar */}
        <button className="action-btn" onClick={handleSave}>
          Salvar Preferências
        </button>
      </div>
    </div>
  );
};

export default SettingsPanel;
