import React from 'react';
import './base-account-tab.css';

const PropositionsPanel: React.FC = () => {
  return (
    <div className="account-section">
      <h2 className="section-title">Minhas Propostas</h2>
      <p className="section-subtitle">
        Acompanhe as propostas enviadas e recebidas. Aqui você pode responder clientes e visualizar o andamento de negociações.
      </p>

      <div className="section-content">
        <p>Nenhuma proposta encontrada.</p>
      </div>
    </div>
  );
};

export default PropositionsPanel;
