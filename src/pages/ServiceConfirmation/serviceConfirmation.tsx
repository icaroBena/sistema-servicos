import React from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import "./serviceConfirmation.css";


export default function ServiceConfirmation() {
  return (
    <div className="wm-home">
      <Navbar />

      <main className="wm-confirm-page">
        <header className="wm-confirm-header">
          <h1>Confirmação de Serviço</h1>
          <p>Revise os detalhes do seu serviço antes de confirmar</p>
        </header>

        <div className="wm-confirm-layout">
          {/* COLUNA ESQUERDA */}
          <div className="wm-confirm-left">

            {/* Prestador de Serviço */}
            <section className="wm-card">
              <div className="wm-card-header">
                <span className="wm-card-icon">👤</span>
                <h2>Prestador de Serviço</h2>
              </div>

              <div className="wm-provider-row">
                <div className="wm-provider-avatar">JS</div>
                <div className="wm-provider-info">
                  <p className="wm-provider-name">João Silva</p>
                  <p className="wm-provider-rating">
                    ⭐ 4.8 <span className="wm-muted">(127 avaliações)</span>
                  </p>
                </div>
                <span className="wm-badge-success">Verificado</span>
              </div>
            </section>

            {/* Detalhes do Serviço */}
            <section className="wm-card">
              <div className="wm-card-header">
                <span className="wm-card-icon">ℹ️</span>
                <h2>Detalhes do Serviço</h2>
              </div>

              <div className="wm-tag">Instalações Elétricas</div>

              <p className="wm-service-description">
                Instalação de tomadas extras na sala e cozinha, incluindo
                verificação da rede elétrica existente e adequação às normas
                de segurança. Serviço inclui fornecimento de materiais básicos.
              </p>

              <div className="wm-service-meta">
                <div className="wm-meta-item">
                  <span className="wm-meta-label">Endereço</span>
                  <span className="wm-meta-value">
                    Rua das Flores, 123 – Centro
                  </span>
                  <span className="wm-meta-extra">2.5km de distância</span>
                </div>

                <div className="wm-meta-item">
                  <span className="wm-meta-label">Data e Horário</span>
                  <span className="wm-meta-value">15/07/2025</span>
                  <span className="wm-meta-value">14:00</span>
                </div>
              </div>
            </section>
          </div>

          {/* COLUNA DIREITA – RESUMO FINANCEIRO */}
          <aside className="wm-confirm-right">
            <section className="wm-card wm-summary-card">
              <div className="wm-card-header">
                <span className="wm-card-icon">💳</span>
                <h2>Resumo Financeiro</h2>
              </div>

              <div className="wm-summary-row">
                <span>Valor do serviço</span>
                <span>R$ 150,00</span>
              </div>
              <div className="wm-summary-row">
                <span>Taxa da plataforma (15%)</span>
                <span>R$ 22,50</span>
              </div>

              <div className="wm-summary-divider" />

              <div className="wm-summary-row wm-summary-total">
                <span>Total</span>
                <span className="wm-summary-total-value">R$ 172,50</span>
              </div>

              <div className="wm-summary-info">
                <p>
                  ⓘ O pagamento será processado após a conclusão do serviço.
                </p>
              </div>

              <button className="btn-primary wm-summary-btn">
                Confirmar Serviço
              </button>

              <button className="btn-secondary wm-summary-btn-secondary">
                Voltar e Editar
              </button>

              <p className="wm-terms">
                Ao confirmar, você concorda com nossos{" "}
                <a href="#">Termos de Serviço</a> e{" "}
                <a href="#">Política de Privacidade</a>.
              </p>
            </section>
          </aside>
        </div>
      </main>

      <Footer />
    </div>
  );
}
