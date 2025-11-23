import React from "react";
import "./refund-info-popup.css";

interface Props {
    onClose: () => void;
}

const RefundInfoPopup: React.FC<Props> = ({ onClose }) => {
    return (
        <div className="info-modal">
            <div className="info-content">

                <h3>Como funciona o Reembolso?</h3>

                <p className="intro-text">
                    O reembolso é uma solicitação feita quando um serviço não foi
                    entregue conforme esperado. Ele passa por uma análise interna
                    antes de ser aprovado.
                </p>

                <section className="info-section">
                    <h4>Quando posso pedir?</h4>
                    <ul>
                        <li>Quando o serviço foi concluído, mas não entregue corretamente.</li>
                        <li>Quando houve falhas graves ou falta de entrega.</li>
                        <li>Dentro do período permitido após a conclusão.</li>
                    </ul>
                </section>

                <hr />

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

                <section className="info-section">
                    <h4>Como solicitar?</h4>
                    <p>
                        Passo 1: Acesse seu <strong>histórico de serviços</strong> na tela de <strong>“Agendamentos”</strong>.
                        Lá você verá todos os serviços concluídos.
                    </p>
                    <div className="image-placeholder">
                        <img src="/Figures/agendamento-historico.png" alt="Ilustração de agendamentos" />
                    </div>
                    <p>
                        Passo 2: Acesse o <strong>agendamento concluído</strong> e clique
                        no botão <strong>“Abrir Reembolso”</strong>.
                    </p>
                    <div className="image-placeholder">
                        <img src="/Figures/abrir-reembolso.png" alt="Ilustração de reembolso" />
                    </div>
                    <p>
                        Passo 3: Detalhe sua requisição de reembolso e se possível, anexar provas para melhorar a eligibilidade de sua disputa.
                    </p>
                    <p>
                        Após enviar, sua solicitação de reembolso aparecerá aqui.
                        A equipe analisará e entrará em contato o mais breve possível, verifique o status na tela de reembolsos para se manter atualizado.
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