import React from "react";
import "./verification-info-popup.css";

interface VerificationInfoPopupProps {
    onClose: () => void;
}

const VerificationInfoPopup: React.FC<VerificationInfoPopupProps> = ({ onClose }) => {
    return (
        <div className="info-modal">
            <div className="info-content scrollable">

                <h3>O que é um Documento de Verificação?</h3>

                <p className="intro-text">
                    O <strong>documento de verificação</strong> é um requisito essencial para quem deseja atuar
                    como prestador de serviços na plataforma <strong>WorkMatch</strong>.
                    Ele confirma sua identidade, profissionalismo e aumenta a segurança para os clientes.
                </p>

                <p className="type-warning">
                    O formato aceito é um <strong>PDF Único</strong> com:
                    <br />🔹 Portfólio profissional + 🔹 Comprovante de Antecedentes Criminais
                </p>

                {/* --- PORTFÓLIO --- */}
                <section className="info-section">
                    <div className="image-placeholder">
                        <img src="/Figures/portfolio-placeholder.png" alt="Exemplo de portfólio" />
                    </div>

                    <p>
                        O portfólio é a forma mais clara de demonstrar suas habilidades e experiências.
                        Ele ajuda os clientes a entenderem a qualidade do seu trabalho e aumenta suas chances
                        de contratação.
                    </p>

                    <ul>
                        <li>Certificados de cursos, formações e workshops</li>
                        <li>Projetos concluídos (imagens ou links)</li>
                        <li>Avaliações e feedbacks anteriores</li>
                        <li>Resumo das áreas de atuação</li>
                    </ul>
                </section>

                <hr />

                {/* --- ANTECEDENTES --- */}
                <section className="info-section">
                    <p>
                        O <strong>Comprovante de Antecedentes Criminais</strong> reforça a confiança entre os
                        usuários da plataforma.
                        Embora não seja obrigatório em todos os casos, é altamente recomendado, principalmente
                        em categorias com contato direto com clientes.
                    </p>

                    <div className="image-placeholder">
                        <img
                            src="/Figures/backgroundcheck-placeholder.png"
                            alt="Exemplo de comprovante de antecedentes criminais"
                        />
                    </div>

                    <ul>
                        <li>
                            Pode ser emitido no site da{" "}
                            <a
                                href="https://www.gov.br/pt-br/servicos/emitir-certidao-de-antecedentes-criminais"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Polícia Federal
                            </a>{" "}
                            ou por outro órgão oficial.
                        </li>
                        <li>Deve ter sido emitido há menos de 6 meses</li>
                        <li>Deve ser mesclado ao portfólio no PDF final</li>
                    </ul>

                    <p>
                        Esse documento será necessário para habilitar funcionalidades como:
                        <strong> publicar serviços, receber propostas e aceitar agendamentos.</strong>
                        <br />
                        Após a aprovação, você recebe um selo de verificação visível para os clientes.
                    </p>
                </section>

                <hr />

                {/* --- FECHAMENTO --- */}
                <section className="info-section">
                    <p className="closing-note">
                        Após o envio, sua documentação passará por uma análise interna.
                        <br />
                        Caso haja inconsistências, você será notificado para reenviar o PDF.
                    </p>
                </section>

                <button type="button" className="btn close" onClick={onClose}>
                    Fechar
                </button>
            </div>
        </div>
    );
};

export default VerificationInfoPopup;
