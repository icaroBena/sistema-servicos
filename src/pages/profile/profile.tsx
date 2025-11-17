import React, { useState, useEffect } from 'react';
import './profile.css';
import Sidebar from './components/Sidebar';


import ServicesPanel from './components/ServicesPanel';
import SettingsPanel from './components/SettingsPanel';
import NotificationsPanel from './components/NotificationsPanel';
import PropositionsPanel from './components/PropositionsPanel';
import ProviderPanel from './components/ProviderPanel';
import PaymentMethodsPanel from './components/PaymentMethodsPanel';

import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

const Profile: React.FC = () => {
    const [activeTab, setActiveTab] = useState('profile');
    const [editMode, setEditMode] = useState(false);
    const [userData, setUserData] = useState<any>(null);

    // =======================
    // 1. Carregar perfil real
    // =======================
    useEffect(() => {
        async function loadUser() {
            try {
                const response = await fetch("http://localhost:5000/api/users/me", {
                    headers: {
                        Authorization: "Bearer " + localStorage.getItem("token")
                    }
                });

                const data = await response.json();
                setUserData(data.data);
            } catch (err) {
                console.error("Erro ao carregar perfil:", err);
            }
        }

        loadUser();
    }, []);

    if (!userData) return <p>Carregando perfil...</p>;

    // ==================================
    // 2. Salvar edição no backend (PUT)
    // ==================================
    const handleSave = async (updatedData: typeof userData) => {
        try {
            const response = await fetch("http://localhost:5000/api/users/me", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + localStorage.getItem("token")
                },
                body: JSON.stringify(updatedData)
            });

            const result = await response.json();
            setUserData(result.data);
            setEditMode(false);
        } catch (err) {
            console.error("Erro ao salvar perfil:", err);
        }
    };

    const renderContent = () => {
        switch (activeTab) {
            case 'profile':
                return (
                    <div className="profile-tab">
                        <ProfileHeader user={userData} />
                        {editMode ? (
                            <ProfileEditForm
                                user={userData}
                                onSave={handleSave}
                                onCancel={() => setEditMode(false)}
                            />
                        ) : (
                            <ProfileView user={userData} onEdit={() => setEditMode(true)} />
                        )}
                    </div>
                );

            case 'services':
                return userData.tipo === 'prestador' && <ServicesPanel />;

            case 'verification':
                return userData.tipo === 'prestador' && <ProviderPanel />;

            case 'propositions':
                return <PropositionsPanel />;

            case 'payments':
                return <PaymentMethodsPanel userType={userData.tipo} />;

            case 'settings':
                return <SettingsPanel />;

            case 'notifications':
                return <NotificationsPanel />;

            default:
                return null;
        }
    };

    return (
        <div className="wm-profile">
            <Navbar />
            <div className="profile-container">
                <Sidebar active={activeTab} onSelect={setActiveTab} userType={userData.tipo} />
                <div className="profile-content">{renderContent()}</div>
            </div>
            <Footer />
        </div>
    );
};

export default Profile;

//
// ===== Subcomponentes internos =====
//

interface HeaderProps {
    user: any;
}

const ProfileHeader: React.FC<HeaderProps> = ({ user }) => {
    const isPrestador = user.tipo === "prestador";
    const isDisponivel = user.disponibilidade === "DISPONÍVEL";

    return (
        <div className="profile-header">
            <img
                src="/Figures/default-user.png"
                alt={`${user.name} avatar`}
                className="profile-avatar"
            />

            <div className="profile-header-text">
                <h2 className="profile-name">
                    {user.name}
                    {isPrestador && user.verificado && (
                        <span className="verified-badge">✔ Verificado</span>
                    )}
                </h2>

                {isPrestador && (
                    <>
                        {user.sobre && <p className="profile-about">{user.sobre}</p>}
                        <p className="profile-rating">⭐ {user.avaliacao} / 5.0</p>
                        <span
                            className={`user-status ${isDisponivel ? "available" : "unavailable"}`}
                        >
                            {user.disponibilidade}
                        </span>
                    </>
                )}
            </div>
        </div>
    );
};

interface ViewProps { user: any; onEdit: () => void; }
const ProfileView: React.FC<ViewProps> = ({ user, onEdit }) => (
    <div className="profile-view">
        <h3>Informações Pessoais</h3>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Telefone:</strong> {user.phone}</p>
        <p><strong>Localização:</strong> {user.localizacao}</p>

        {user.tipo === 'prestador' && (
            <>
                <h3>Certificações</h3>
                <ul>{user.certificacoes.map((c: string, i: number) => <li key={i}>{c}</li>)}</ul>

                <h3>Categorias</h3>
                <p>{user.categorias.join(', ')}</p>
            </>
        )}

        <button className="btn primary" onClick={onEdit}>Editar Perfil</button>
    </div>
);

interface EditProps {
    user: any;
    onSave: (u: any) => void;
    onCancel: () => void;
}

const ProfileEditForm: React.FC<EditProps> = ({ user, onSave, onCancel }) => {
    const [form, setForm] = useState(user);

    const handleChange = (e: any) => {
        const { id, value } = e.target;
        setForm({ ...form, [id]: value });
    };

    return (
        <form className="profile-edit-form" onSubmit={(e) => { e.preventDefault(); onSave(form); }}>
            <h3>Editar Informações</h3>

            <label>Nome</label>
            <input id="name" value={form.name} onChange={handleChange} />

            <label>Email</label>
            <input id="email" value={form.email} disabled />

            <label>Telefone</label>
            <input id="phone" value={form.phone} onChange={handleChange} />

            <label>Localização</label>
            <input id="localizacao" value={form.localizacao} onChange={handleChange} />

            {form.tipo === 'prestador' && (
                <>
                    <label>Sobre</label>
                    <textarea id="sobre" value={form.sobre} onChange={handleChange} rows={4} />

                    <label>Disponibilidade</label>
                    <select id="disponibilidade" value={form.disponibilidade} onChange={handleChange}>
                        <option value="DISPONÍVEL">DISPONÍVEL</option>
                        <option value="INDISPONÍVEL">INDISPONÍVEL</option>
                    </select>
                </>
            )}

            <div className="edit-actions">
                <button type="button" className="btn cancel" onClick={onCancel}>Cancelar</button>
                <button type="submit" className="btn primary">Salvar</button>
            </div>
        </form>
    );
};
