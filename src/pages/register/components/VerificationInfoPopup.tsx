import React from 'react';
import './verification-info-popup.css';

interface VerificationInfoPopupProps {
    onClose: () => void;
}

const VerificationInfoPopup: React.FC<VerificationInfoPopupProps> = ({ onClose }) => {
    return (
        <div className="info-modal">
            <div className="info-content scrollable">
                <h3>O que é um Documento de Verificação?</h3>
                <p className="intro-text">
                    O <strong>documento de verificação</strong> é um requisito essencial para quem deseja atuar como prestador de serviços na plataforma <strong>WorkMatch</strong>.
                    Ele confirma a sua identidade, profissionalismo e segurança para os clientes.
                </p>

                <p className="type-warning">
                    O formato é um PDF Único incluindo o <strong> Portfólio e Comprovante de Antecedentes </strong>
                </p>

                <section className="info-section">
                    <div className="image-placeholder">
                        <img src="/Figures/portfolio-placeholder.png" alt="..." />
                    </div>

                    <p>
                        O portfólio profissional é o principal meio de demonstrar suas habilidades e experiências.
                        Ele ajuda os clientes a conhecerem melhor a qualidade do seu trabalho e aumenta suas chances de contratação.
                    </p>

                    <ul>
                        <li> Certificados de cursos, formações ou workshops</li>
                        <li> Projetos concluídos (em imagem ou link)</li>
                        <li> Avaliações e feedbacks anteriores</li>
                        <li> Breve resumo da sua área de atuação</li>
                    </ul>
                </section>

                <hr />

                <section className="info-section">
                    <p>
                        O <strong> Comprovante de Antecedentes Criminais </strong> é uma forma de reforçar a confiança entre os usuários da plataforma.
                        Ele não é obrigatório em todos os casos, mas é altamente recomendado, principalmente para categorias que envolvem contato direto com clientes.
                    </p>

                    <div className="image-placeholder">
                        <img
                            src="/Figures/backgroundcheck-placeholder.png"
                            alt="Exemplo de comprovante de antecedentes"
                        />
                    </div>

                    <ul>
                        <li>
                            Pode ser emitido no site da{' '}
                            <a
                                href="https://www.gov.br/pt-br/servicos/emitir-certidao-de-antecedentes-criminais"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Polícia Federal
                            </a> ou outro portal válido
                        </li>
                        <li>Deve ser recente (emitido há menos de 6 meses)</li>
                        <li>Precisa ser mesclado com o portfólio no PDF final</li>
                    </ul>

                    <p>
                        Esse documento será necessário para que você possa utilizar funcionalidades 
                        como <strong>publicar, propostar e agendar serviços</strong>.

                        Quando aprovado, você ganhará um selo de verificação visível para todos os clientes.
                    </p>
                </section>

                <hr />

                <section className="info-section">
                    <p className="closing-note">
                        Após o envio, sua documentação passará por uma análise interna antes da aprovação.
                        Caso haja inconsistências, você será notificado para reenviar os arquivos.
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