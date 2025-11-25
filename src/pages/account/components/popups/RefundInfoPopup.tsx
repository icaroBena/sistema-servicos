import React from "react";
import "./refund-info-popup.css";

interface Props {
  onClose: () => void;
}

const RefundInfoPopup: React.FC<Props> = ({ onClose }) => {
  return (
    <div className="info-modal" role="dialog" aria-modal="true">
      <div className="info-content">

        <h3>Como funciona o Reembolso?</h3>

        <p className="intro-text">
          O reembolso é uma solicitação feita quando um serviço não foi entregue
          conforme o esperado. Ele passa por uma análise interna antes de ser aprovado.
        </p>

        {/* QUANDO PEDIR */}
        <section className="info-section">
          <h4>Quando posso pedir?</h4>
          <ul>
            <li>Quando o serviço foi concluído, mas não entregue corretamente.</li>
            <li>Quando houve falhas graves ou falta de entrega.</li>
            <li>Dentro do período permitido após a conclusão.</li>
          </ul>
        </section>

        <hr />

        {/* O QUE ENVIAR */}
        <section className="info-section">
          <h4>O que devo enviar?</h4>
          <p>Ao solicitar reembolso, inclua:</p>

          <ul>
            <li>Descrição detalhada do problema.</li>
            <li>Imagens ou prints que comprovem o ocorrido.</li>
            <li>(Opcional) Documentos adicionais.</li>
          </ul>
        </section>

        <hr />

        {/* COMO SOLICITAR */}
        <section className="info-section">
          <h4>Como solicitar?</h4>

          <p>
            <strong>Passo 1:</strong> Acesse seu <strong>Histórico de Serviços</strong>
            na tela de <strong>Agendamentos</strong>.
          </p>

          <div className="image-placeholder">
            <img
              src="/Figures/agendamento-historico.png"
              alt="Ilustração de agendamentos"
            />
          </div>

          <p>
            <strong>Passo 2:</strong> Abra o <strong>agendamento concluído</strong> e
            clique no botão <strong>“Abrir Reembolso”</strong>.
          </p>

          <div className="image-placeholder">
            <img
              src="/Figures/abrir-reembolso.png"
              alt="Ilustração de reembolso"
            />
          </div>

          <p>
            <strong>Passo 3:</strong> Detalhe sua solicitação e, se possível,
            anexe evidências para melhorar a elegibilidade da disputa.
          </p>

          <p>
            Após enviar, sua solicitação aparecerá aqui.
            A equipe analisará e entrará em contato o mais breve possível.
            Verifique o status na tela de reembolsos para acompanhar.
          </p>
        </section>

        <button className="btn close" onClick={onClose}>
          Fechar
        </button>
      </div>
    </div>
  );
};

export default RefundInfoPopup;
