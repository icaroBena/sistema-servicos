import React from 'react';
import './base-account-tab.css';

// Falta codificar funcionalidade
const SettingsPanel: React.FC = () => {
  return (
    <div className="account-section">
      <h2 className="section-title">Configurações</h2>
      <p className="section-subtitle">
        Personalize sua conta, gerencie notificações e defina preferências do sistema.
      </p>

      <div className="section-content">
        <div className="setting-group">
          <label>
            <input type="checkbox" /> Receber notificações por e-mail
          </label>
        </div>

        <button className="action-btn">Salvar Preferências</button>
      </div>
    </div>
  );
};

export default SettingsPanel;
