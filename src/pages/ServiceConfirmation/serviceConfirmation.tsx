import React from "react";
import { useNavigate } from "react-router-dom";
import "./serviceConfirmation.css";

export default function ServiceConfirmation() {
  const navigate = useNavigate();

  // Função que será chamada ao clicar no botão
  const handleConfirmarServico = () => {
    navigate("/home"); // Navega para a tela home
  };

  return (
    <div className="confirmation-container">
      <h1 className="page-title">Confirmação de Serviço</h1>
      <p className="page-subtitle">
        Revise os detalhes do seu serviço antes de confirmar
      </p>

      <div className="confirmation-content">
        {/* COLUNA ESQUERDA */}
        <div className="left-column">

          {/* Prestador de Serviço */}
          <div className="card">
            <h2 className="section-title">Prestador de Serviço</h2>

            <div className="provider-box">
              <img
                src="https://via.placeholder.com/60"
                alt="Prestador"
                className="provider-avatar"
              />

              <div className="provider-info">
                <h3 className="provider-name">João Silva</h3>
                <p className="rating">⭐ 4.8 (127 avaliações)</p>
              </div>

              <span className="verified-badge">Verificado</span>
            </div>
          </div>

          {/* Detalhes do Serviço */}
          <div className="card">
            <h2 className="section-title">Detalhes do Serviço</h2>

            <div className="tag">Instalações Elétricas</div>

            <p className="service-description">
              Instalação de tomadas extras na sala e cozinha, incluindo verificação
              da rede elétrica existente e adequação às normas de segurança. Serviço
              inclui fornecimento de materiais básicos.
            </p>

            <div className="details-grid">
              <div>
                <p className="label">Endereço</p>
                <p className="value">
                  Rua das Flores, 123 – Centro <br />
                  <span className="distance">2.5km de distância</span>
                </p>
              </div>

              <div>
                <p className="label">Data e Horário</p>
                <p className="value">15/07/2025<br />14:00</p>
              </div>
            </div>
          </div>

        </div>

        {/* COLUNA DIREITA */}
        <div className="right-column">
          <div className="card">

            <h3 className="section-title">Resumo Financeiro</h3>

            <div className="price-row">
              <span>Valor do serviço</span>
              <strong>R$ 150.00</strong>
            </div>

            <div className="price-row">
              <span>Taxa da plataforma (15%)</span>
              <strong>R$ 22.50</strong>
            </div>

            <div className="divider"></div>

            <div className="price-row total">
              <span>Total</span>
              <span className="total-value">R$ 172.50</span>
            </div>

            <div className="info-box">
              O pagamento será processado após a conclusão do serviço
            </div>

            {/* Aqui está a navegação para a tela Home */}
            <button className="btn-primary" onClick={handleConfirmarServico}>
              Confirmar Serviço
            </button>

            <button className="btn-secondary" onClick={() => navigate(-1)}>
              Voltar e Editar
            </button>

            <p className="terms">
              Ao confirmar, você concorda com nossos <br />
              <a href="#">Termos de Serviço</a> e <a href="#">Política de Privacidade</a>
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
