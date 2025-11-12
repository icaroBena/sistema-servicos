import React, { useState } from 'react';
import './profile.css';
import Sidebar from './components/Sidebar';

// Diferentes abas
import ServicesPanel from './components/ServicesPanel';
import SettingsPanel from './components/SettingsPanel';
import NotificationsPanel from './components/NotificationsPanel';
import PropositionsPanel from './components/PropositionsPanel';
import ProviderPanel from './components/ProviderPanel';
import PaymentMethodsPanel from './components/PaymentMethodsPanel';

import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

const mockUser = {
    id: 'u1',
    nome: 'João Silva',
    email: 'joao@workmatch.com',
    telefone: '(92) 99999-0000',
    localizacao: 'Manaus, AM',
    tipo: 'prestador',
    verificado: true,
    avaliacao: 4.7,
    disponibilidade: 'DISPONÍVEL',
    categorias: ['Eletricista', 'Instalador de Ar'],
    certificacoes: ['Curso Avançado de Elétrica - SENAI', 'NR10'],
    sobre: 'Profissional com mais de 10 anos de experiência em instalações e manutenções residenciais.',
};

const Profile: React.FC = () => {
    const [activeTab, setActiveTab] = useState('profile');
    const [editMode, setEditMode] = useState(false);
    const [userData, setUserData] = useState(mockUser);

    const handleSave = (updatedData: typeof userData) => {
        setUserData(updatedData);
        setEditMode(false);
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
    user: typeof mockUser;
}

const ProfileHeader: React.FC<HeaderProps> = ({ user }) => {
    const isPrestador = user.tipo === "prestador";
    const isDisponivel = user.disponibilidade === "DISPONÍVEL";

    return (
        <div className="profile-header">
            <img
                src="/Figures/default-user.png"
                alt={`${user.nome} avatar`}
                className="profile-avatar"
            />

            <div className="profile-header-text">
                <h2 className="profile-name">
                    {user.nome}
                    {isPrestador && user.verificado && (
                        <span className="verified-badge">✔ Verificado</span>
                    )}
                </h2>

                {isPrestador && (
                    <>
                        {user.sobre && <p className="profile-about">{user.sobre}</p>}
                        <p className="profile-rating">⭐ {user.avaliacao} / 5.0</p>
                        <span
                            className={`user-status ${isDisponivel ? "available" : "unavailable"
                                }`}
                        >
                            {user.disponibilidade}
                        </span>
                    </>
                )}
            </div>
        </div>
    );
}

interface ViewProps { user: typeof mockUser; onEdit: () => void; }
const ProfileView: React.FC<ViewProps> = ({ user, onEdit }) => (
    <div className="profile-view">
        <h3>Informações Pessoais</h3>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Telefone:</strong> {user.telefone}</p>
        <p><strong>Localização:</strong> {user.localizacao}</p>

        {user.tipo === 'prestador' && (
            <>
                <h3>Certificações</h3>
                <ul>{user.certificacoes.map((c, i) => <li key={i}>{c}</li>)}</ul>

                <h3>Categorias</h3>
                <p>{user.categorias.join(', ')}</p>
            </>
        )}

        <button className="btn primary" onClick={onEdit}>Editar Perfil</button>
    </div>
);

interface EditProps {
    user: typeof mockUser;
    onSave: (u: typeof mockUser) => void;
    onCancel: () => void;
}
const ProfileEditForm: React.FC<EditProps> = ({ user, onSave, onCancel }) => {
    const [form, setForm] = useState(user);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { id, value } = e.target;
        setForm({ ...form, [id]: value });
    };

    return (
        <form className="profile-edit-form" onSubmit={(e) => { e.preventDefault(); onSave(form); }}>
            <h3>Editar Informações</h3>

            <label>Nome</label>
            <input id="nome" value={form.nome} onChange={handleChange} />

            <label>Email</label>
            <input id="email" value={form.email} onChange={handleChange} />

            <label>Telefone</label>
            <input id="telefone" value={form.telefone} onChange={handleChange} />

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