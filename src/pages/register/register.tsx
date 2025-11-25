import React, { useState, useRef } from 'react';
import type { ChangeEvent, FormEvent } from 'react';

import './register.css';
import Footer from "../../components/Footer.tsx";
import VerificationInfoPopup from './components/VerificationInfoPopup';
import { useNavigate } from "react-router-dom";
import { register } from "../../api/auth"; 

import BackImage from '/Figures/register-prestadores.jpg';

const Register: React.FC = () => {
    const navigate = useNavigate();

    // Estado interno com atributos em inglês (camelCase)
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
        phone: '',
        address: '',
        cpf: '',
        userType: 'client', // internas em inglês: 'client' | 'provider'
        termsAccepted: false,
    });

    const [verificationFile, setVerificationFile] = useState<File | null>(null);
    const [documentValid, setDocumentValid] = useState(false);
    const [missingFields, setMissingFields] = useState(false);
    const [showInfo, setShowInfo] = useState(false);
    const fileInputRef = useRef<HTMLInputElement | null>(null);

    // verificationFile is referenced in the UI when present (shows filename)

    const allowedMimeTypes = ["application/pdf"];
    const allowedExtensions = ["pdf"];

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { id, value, type, checked } = e.target;
        let formattedValue = value;

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

        if (id === 'cpf') {
            const digits = value.replace(/\D/g, '').slice(0, 11); 
            formattedValue = digits
                .replace(/(\d{3})(\d)/, '$1.$2')
                .replace(/(\d{3})(\d)/, '$1.$2')
                .replace(/(\d{3})(\d{1,2})$/, '$1-$2')
                .slice(0, 14); 
        }

        setFormData({
            ...formData,
            [id]: type === 'checkbox' ? checked : formattedValue,
        });
    };

    const handleFileRemoval = () => {
        setVerificationFile(null);
        setDocumentValid(false);
        if (fileInputRef.current) fileInputRef.current.value = '';
    };

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null;

        if (!file) return;

        const fileExtension = file.name.split(".").pop()?.toLowerCase();
        const isValidType =
            allowedMimeTypes.includes(file.type) &&
            fileExtension &&
            allowedExtensions.includes(fileExtension);

        if (!isValidType) {
            alert("Formato inválido! Envie um PDF.");
            handleFileRemoval();
            return;
        }

        setVerificationFile(file);
        setDocumentValid(true);
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        const requiredFields = ["username", "email", "password", "confirmPassword", "cpf"];
        const emptyFields = requiredFields.some((f) => !formData[f as keyof typeof formData]);

        if (emptyFields || !formData.termsAccepted) {
            setMissingFields(true);
            return;
        }

        if (formData.password !== formData.confirmPassword) {
            alert("As senhas não coincidem!");
            return;
        }
        // Monta o payload com atributos internos em inglês e delega para API central
        const payload = {
            name: formData.username,
            email: formData.email,
            password: formData.password,
            cpf: formData.cpf.replace(/\D/g, ""),
            type: formData.userType, // interno em inglês
            phone: formData.phone,
        };

        try {
            const data = await register(payload as any);

            if (data.success) {
                alert("Cadastro realizado com sucesso!");
                navigate("/login");
            } else {
                alert(data.message || "Erro ao cadastrar.");
            }
        } catch (err) {
            console.error(err);
            alert("Erro ao conectar com o servidor.");
        }
    };

    return (
        <div className="wm-register">
            <div
                className="register-background"
                style={{ backgroundImage: `url(${BackImage})` }}
            >
                <div className="register-overlay">
                    <div className="register-panel">
                        <h2 className="register-title">Se cadastre em poucos passos!</h2>
                        <p className="register-subtitle">Preencha os dados abaixo</p>

                        <form onSubmit={handleSubmit}>
                            <div className="register-form-row">
                                <div className="register-form-group">
                                    <label htmlFor="username">Usuário</label>
                                    <input
                                        type="text"
                                        id="username"
                                        value={formData.username}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <div className="register-form-group">
                                    <label htmlFor="email">E-mail</label>
                                    <input
                                        type="email"
                                        id="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                            </div>

                            <div className="register-form-row">
                                <div className="register-form-group">
                                    <label htmlFor="password">Senha</label>
                                    <input
                                        type="password"
                                        id="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <div className="register-form-group">
                                    <label htmlFor="confirmPassword">Confirmar Senha</label>
                                    <input
                                        type="password"
                                        id="confirmPassword"
                                        value={formData.confirmPassword}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                            </div>

                            <div className="register-form-row">
                                <div className="register-form-group">
                                    <label htmlFor="phone">Telefone</label>
                                    <input
                                        type="text"
                                        id="phone"
                                        value={formData.phone}
                                        onChange={handleChange}
                                    />
                                </div>

                                <div className="register-form-group">
                                    <label htmlFor="cpf">CPF</label>
                                    <input
                                        type="text"
                                        id="cpf"
                                        value={formData.cpf}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>

                            <div className="register-form-group">
                                <p>Como deseja atuar?</p>

                                <label>
                                    <input
                                        type="radio"
                                        value="client"
                                        checked={formData.userType === "client"}
                                        onChange={() => setFormData({ ...formData, userType: "client" })}
                                    />
                                    Cliente
                                </label>

                                <label>
                                    <input
                                        type="radio"
                                        value="provider"
                                        checked={formData.userType === "provider"}
                                        onChange={() => setFormData({ ...formData, userType: "provider" })}
                                    />
                                    Prestador
                                </label>
                            </div>

                            {formData.userType === "provider" && (
                                <div className="register-form-group">
                                    <label htmlFor="verificationFile">
                                        {documentValid
                                            ? `✅ Documento enviado${verificationFile ? ": " + verificationFile.name : "!"}`
                                            : "Documento de verificação"}
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
                                            O que é isso?
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

                                    {showInfo && (
                                        <VerificationInfoPopup
                                            onClose={() => setShowInfo(false)}
                                        />
                                    )}
                                </div>
                            )}

                            <div className="register-form-group terms">
                                <input
                                    type="checkbox"
                                    id="termsAccepted"
                                    checked={formData.termsAccepted}
                                    onChange={handleChange}
                                />
                                <label htmlFor="termsAccepted">
                                    Aceito os termos de uso
                                </label>
                            </div>

                            {missingFields && (
                                <p className="register-fill-alert">
                                    Preencha todos os campos obrigatórios!
                                </p>
                            )}

                            <div className="register-button-group">
                                <button type="submit" className="btn primary">
                                    Registrar
                                </button>

                                <button
                                    type="button"
                                    className="btn cancel"
                                    onClick={() => navigate("/login")}
                                >
                                    Já tenho conta
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default Register;
