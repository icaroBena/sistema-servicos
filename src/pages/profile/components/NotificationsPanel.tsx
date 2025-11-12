import React from 'react';
import './base-profile-section.css';

// Falta codificar funcionalidade
const NotificationsPanel: React.FC = () => {
  return (
    <div className="profile-section">
      <h2 className="section-title">Notificações</h2>
      <p className="section-subtitle">
        Veja suas notificações mais recentes, atualizações de pedidos e mensagens do sistema.
      </p>

      <div className="section-content">
        <p>Você ainda não possui notificações.</p>
      </div>
    </div>
  );
};

export default NotificationsPanel;
