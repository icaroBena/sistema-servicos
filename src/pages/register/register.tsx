import React, { useState } from 'react';
import type { ChangeEvent, FormEvent } from 'react';

import './register.css';
import { useNavigate } from "react-router-dom";

// Os dados de registração por enquanto são temporários, apenas para testes.
// Algo que notei é que algumas funções de login e cadastro podem ser generalizadas em um arquivo externo,
// assim evitamos de escrever várias vezes a mesma coisa. (usar import para chamar)
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

    // Manipulação genérica de campos
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { id, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [id]: type === 'checkbox' ? checked : value,
        });
    };

    // Manipula upload do prestador (mocado)
    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null;
        setVerificationFile(file);

        if (file) {
            setTimeout(() => {
                setDocumentValid(true);
            }, 1500);
        }
    };

    // Submissão (ainda sem backend)
    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();

        // Verifica se há campos vazios obrigatórios
        const requiredFields = ['username', 'email', 'password', 'confirmPassword'];
        const isEmpty = requiredFields.some(field => !formData[field as keyof typeof formData]);

        if (isEmpty || !formData.termsAccepted || !documentValid) {
            setMissingFields(true);
            return;
        }

        setMissingFields(false);

        console.log("Dados cadastrados:", {
            ...formData,
            verificationFile,
            fileValid: documentValid,
        });

        navigate("/home");
    };

    return (
        <div className="register-container">
            <div className="register-center-panel">
                <h2 className="register-title">Registrar</h2>
                <p className="register-subtitle">Preencha os dados abaixo em poucos passos</p>

                <form onSubmit={handleSubmit}>
                    <div className="form-row">
                        <div className="form-group">
                            <label htmlFor="username">Usuário</label>
                            <input type="text" id="username" placeholder="jhonasrodrigues" value={formData.username} onChange={handleChange} required />
                        </div>

                        <div className="form-group">
                            <label htmlFor="email">E-mail</label>
                            <input type="email" id="email" placeholder="seuemail@email.com" value={formData.email} onChange={handleChange} required />
                        </div>
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <label htmlFor="password">Senha</label>
                            <input type="password" id="password" placeholder="********" value={formData.password} onChange={handleChange} required />
                        </div>

                        <div className="form-group">
                            <label htmlFor="confirmPassword">Confirmar Senha</label>
                            <input type="password" id="confirmPassword" placeholder="********" value={formData.confirmPassword} onChange={handleChange} required />
                        </div>
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <label htmlFor="phone">Telefone</label>
                            <input type="text" id="phone" placeholder="(12) 12345-6789" value={formData.phone} onChange={handleChange} />
                        </div>

                        <div className="form-group">
                            <label htmlFor="cpf">CPF</label>
                            <input type="text" id="cpf" placeholder="123.123.123-90" value={formData.cpf} onChange={handleChange} />
                        </div>
                    </div>

                    <div className="form-group">
                        <label htmlFor="address">Endereço</label>
                        <input type="text" id="address" placeholder="Rua, Bairro, Número, CEP" value={formData.address} onChange={handleChange} />
                    </div>

                    <div className="form-group">
                        <p>Como deseja atuar na plataforma?</p>
                        <label>
                            <input type="radio" id="userType" value="cliente" checked={formData.userType === 'cliente'} onChange={() => setFormData({ ...formData, userType: 'cliente' })} />
                            Quero ser um Cliente
                        </label>
                        <label>
                            <input type="radio" id="userType" value="prestador" checked={formData.userType === 'prestador'} onChange={() => setFormData({ ...formData, userType: 'prestador' })} />
                            Quero ser um Prestador de Serviços
                        </label>
                    </div>

                    {formData.userType === 'prestador' && (
                        <div className="form-group">
                            <label htmlFor="verificationFile">Documento de verificação</label>
                            <input type="file" id="verificationFile" accept=".pdf,.jpg,.png" onChange={handleFileChange} />
                            {documentValid && <p className="verified-text">✅ Documento enviado!</p>}
                        </div>
                    )}

                    <div className="form-group terms">
                        <input type="checkbox" id="termsAccepted" checked={formData.termsAccepted} onChange={handleChange} />
                        <label htmlFor="termsAccepted">Aceito os termos de uso e política de privacidade</label>
                    </div>

                    {missingFields && (<p className="fill-alert">Você precisa preencher todos os campos!</p>)}

                    <div className="button-group">
                        <button type="button" className="btn cancel" onClick={() => navigate('/login')}>Já tenho uma conta</button>
                        <button type="submit" className="btn primary">Registrar</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Register;