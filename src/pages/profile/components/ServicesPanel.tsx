import React from 'react';
import './base-profile-section.css';

// Falta codificar funcionalidade
const ServicesPanel: React.FC = () => {
  return (
    <div className="profile-section">
      <h2 className="section-title">Meus Serviços</h2>
      <p className="section-subtitle">
        Aqui você poderá visualizar, adicionar ou editar os serviços que oferece na plataforma WorkMatch.
      </p>

      <div className="section-content">
        <p>Nenhum serviço cadastrado ainda.</p>
        <button className="action-btn">+ Adicionar novo serviço</button>
      </div>
    </div>
  );
};

export default ServicesPanel;