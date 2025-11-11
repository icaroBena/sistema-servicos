import React, { useState, useRef } from 'react';
import type { ChangeEvent, FormEvent } from 'react';

import './register.css';
import Footer from "../../components/Footer.tsx";
import Navbar from "../../components/Navbar.tsx";
import VerificationInfoPopup from './components/VerificationInfoPopup';
import { useNavigate } from "react-router-dom";
import { registerRequest } from "../../services/api.ts"; 

import BackImage from '/Figures/register-prestadores.jpg';

const Register: React.FC = () => {
    const navigate = useNavigate();

    // Dados do formulário
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
        phone: '',
        address: '',
        cpf: '',
        userType: 'cliente', // cliente | prestador
        termsAccepted: false,
    });

    const [verificationFile, setVerificationFile] = useState<File | null>(null);
    const [documentValid, setDocumentValid] = useState(false);
    const [missingFields, setMissingFields] = useState(false);
    const [showInfo, setShowInfo] = useState(false);
    const fileInputRef = useRef<HTMLInputElement | null>(null);

    // Tipos de arquivos permitidos para a documentação:
    const allowedMimeTypes = ["application/pdf"];
    const allowedExtensions = ["pdf"];

    // Manipulação genérica de campos (com máscaras)
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { id, value, type, checked } = e.target;
        let formattedValue = value;

        // Máscara de telefone
        if (id === 'phone') {
            const digits = value.replace(/\D/g, '');
            if (digits.length <= 10) {
                formattedValue = digits
                    .replace(/^(\d{2})(\d)/, '($1) $2')
                    .replace(/(\d{4})(\d)/, '$1-$2');
            } else {
                formattedValue = digits
                    .replace(/^(\d{2})(\d{5})(\d{4}).*/, '($1) $2-$3');
            }
        }

        // Máscara de CPF
        if (id === 'cpf') {
            const digits = value.replace(/\D/g, '');
            formattedValue = digits
                .replace(/(\d{3})(\d)/, '$1.$2')
                .replace(/(\d{3})(\d)/, '$1.$2')
                .replace(/(\d{3})(\d{1,2})$/, '$1-$2');
        }

        setFormData({
            ...formData,
            [id]: type === 'checkbox' ? checked : formattedValue,
        });
    };

    // Manipula upload do prestador (mocado)
    const handleFileRemoval = () => {
        setVerificationFile(null);
        setDocumentValid(false);

        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null;

        if (!file) return;

        const fileExtension = file.name.split(".").pop()?.toLowerCase();
        const isValidType = allowedMimeTypes.includes(file.type) && fileExtension && allowedExtensions.includes(fileExtension);

        if (!isValidType) {
            alert("Formato inválido! Envie um arquivo PDF");
            handleFileRemoval();
            return;
        }

        setVerificationFile(file);
        setDocumentValid(true);
    };

    // Submissão integrada com backend
    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        const requiredFields = ['username', 'email', 'password', 'confirmPassword'];
        const isEmpty = requiredFields.some(field => !formData[field as keyof typeof formData]);

        if (isEmpty || !formData.termsAccepted) {
            setMissingFields(true);
            return;
        }

        if (formData.password !== formData.confirmPassword) {
            alert("As senhas não coincidem!");
            return;
        }

        try {
            const data = await registerRequest(formData.username, formData.email, formData.password);

            if (data.success) {
                alert("Cadastro realizado com sucesso!");
                navigate("/login");
            } else {
                alert(data.message || "Erro ao cadastrar usuário.");
            }
        } catch (error) {
            console.error("Erro no cadastro:", error);
            alert("Erro ao conectar com o servidor.");
        }
    };

    return (
        <div className="wm-register">
            <Navbar />

            <div
                className="register-background"
                style={{ backgroundImage: `url(${BackImage})` }}
            >
                <div className="register-overlay">
                    <div className="register-panel">
                        <h2 className="register-title">Se cadastre em poucos passos!</h2>
                        <p className="register-subtitle">Preencha os dados abaixo para criar sua conta</p>

                        <form onSubmit={handleSubmit}>
                            <div className="register-form-row">
                                <div className="register-form-group">
                                    <label htmlFor="username">Usuário</label>
                                    <input type="text" id="username" placeholder="jhonasrodrigues" value={formData.username}
                                        onChange={handleChange} required />
                                </div>

                                <div className="register-form-group">
                                    <label htmlFor="email">E-mail</label>
                                    <input type="email" id="email" placeholder="seuemail@email.com" value={formData.email}
                                        onChange={handleChange} required />
                                </div>
                            </div>

                            <div className="register-form-row">
                                <div className="register-form-group">
                                    <label htmlFor="password">Senha</label>
                                    <input type="password" id="password" placeholder="********" value={formData.password}
                                        onChange={handleChange} required />
                                </div>

                                <div className="register-form-group">
                                    <label htmlFor="confirmPassword">Confirmar Senha</label>
                                    <input type="password" id="confirmPassword" placeholder="********" value={formData.confirmPassword}
                                        onChange={handleChange} required />
                                </div>
                            </div>

                            <div className="register-form-row">
                                <div className="register-form-group">
                                    <label htmlFor="phone">Telefone</label>
                                    <input type="text" id="phone" placeholder="(12) 12345-6789" value={formData.phone}
                                        onChange={handleChange} />
                                </div>

                                <div className="register-form-group">
                                    <label htmlFor="cpf">CPF</label>
                                    <input type="text" id="cpf" placeholder="123.123.123-90" value={formData.cpf}
                                        onChange={handleChange} />
                                </div>
                            </div>

                            <div className="register-form-group">
                                <label htmlFor="address">Endereço</label>
                                <input type="text" id="address" placeholder="Rua, Bairro, Número, CEP" value={formData.address}
                                    onChange={handleChange} />
                            </div>

                            <div className="register-form-group">
                                <p>Como deseja atuar na plataforma?</p>
                                <label>
                                    <input type="radio" id="userType" value="cliente" checked={formData.userType === 'cliente'}
                                        onChange={() => setFormData({ ...formData, userType: 'cliente' })} />
                                    Quero ser um Cliente
                                </label>
                                <label>
                                    <input type="radio" id="userType" value="prestador" checked={formData.userType === 'prestador'}
                                        onChange={() => setFormData({ ...formData, userType: 'prestador' })} />
                                    Quero ser um Prestador de Serviços
                                </label>
                            </div>

                            {formData.userType === 'prestador' && (
                                <div className="register-form-group">
                                    <label htmlFor="verificationFile">
                                        {documentValid ? "✅ Documento de verificação enviado!" : "Documento de verificação"}
                                    </label>

                                    <div className="info-row">
                                        <input
                                            type="file"
                                            id="verificationFile"
                                            accept=".pdf"
                                            onChange={handleFileChange}
                                            ref={fileInputRef}
                                        />
                                        <button
                                            type="button"
                                            className="btn info"
                                            onClick={() => setShowInfo(true)}
                                        >
                                            O que é um documento de verificação?
                                        </button>
                                    </div>

                                    {documentValid && (
                                        <button
                                            type="button"
                                            className="btn remove"
                                            onClick={handleFileRemoval}
                                        >
                                            Remover Documento
                                        </button>
                                    )}

                                    {showInfo && <VerificationInfoPopup onClose={() => setShowInfo(false)} />}
                                </div>
                            )}

                            <div className="register-form-group terms">
                                <input type="checkbox" id="termsAccepted" checked={formData.termsAccepted} onChange={handleChange} />
                                <label htmlFor="termsAccepted">Aceito os termos de uso e política de privacidade</label>
                            </div>

                            {missingFields && (<p className="register-fill-alert">Você precisa preencher todos os campos!</p>)}

                            <div className="register-button-group">
                                <button type="submit" className="btn primary">Registrar</button>
                                <button type="button" className="btn cancel" onClick={() => navigate('/login')}>Já tenho uma conta</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            <div className="register-benefits">
                <h2>Por que se cadastrar?</h2>
                <div className="benefit-cards">
                    <div className="benefit-card">
                        <img src="/Figures/register-explorar.png" alt="Notificações" />
                        <p>Seus serviços são disponíveis para vários clientes diariamente</p>
                    </div>
                    <div className="benefit-card">
                        <img src="/Figures/register-negociar.avif" alt="Parceria" />
                        <p>Você negocia as propostas de forma direta e segura</p>
                    </div>
                    <div className="benefit-card">
                        <img src="/Figures/register-pagamento.jpg" alt="Lucro" />
                        <p>Pagamento sempre up-front, garantindo seu dinheiro!</p>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default Register;
