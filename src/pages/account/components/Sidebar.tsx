import React from 'react';
import './sidebar.css';

import { useNavigate } from "react-router-dom";
import { FaUser, FaCheckCircle, FaCog, FaBell, FaCreditCard, FaSignOutAlt, FaHandshake } from "react-icons/fa";

interface SidebarProps {
    active: string;
    onSelect: (section: string) => void;
    userType: string;
}

const Sidebar: React.FC<SidebarProps> = ({ active, onSelect, userType }) => {
    const navigate = useNavigate();
    const commonLinks = [
        { id: 'profile', icon: FaUser, label: 'Perfil' },
        { id: 'settings', icon: FaCog, label: 'Configurações' },
        { id: 'propositions', icon: FaHandshake, label: 'Propostas' },
        { id: 'notifications', icon: FaBell, label: 'Notificações' },
    ];

    const providerLinks = [
        { id: 'services', icon: FaBell, label: 'Meus Serviços' },
        { id: 'verification', icon: FaCheckCircle, label: 'Verificação' },
        { id: 'payments', icon: FaCreditCard, label: 'Pagamentos' },
    ];

    const clientLinks = [{ id: 'payments', icon: FaCreditCard, label: 'Carteira' }];

    const linksToShow =
        userType === 'prestador'
            ? [...commonLinks.slice(0, 1), ...providerLinks, ...commonLinks.slice(1)]
            : [...commonLinks.slice(0, 1), ...clientLinks, ...commonLinks.slice(1)];

    return (
        <aside className="account-sidebar">
            <h3 className="sidebar-title">Painel</h3>

            <ul className="sidebar-menu">
                {linksToShow.map((link) => (
                    <li
                        key={link.id}
                        className={active === link.id ? 'active' : ''}
                        onClick={() => onSelect(link.id)}
                    >
                        < link.icon /> {link.label}
                    </li>
                ))}
            </ul>

            <button className="logout-btn" onClick={() => navigate('/login')}> < FaSignOutAlt /> Sair</button>
        </aside>
    );
};

export default Sidebar;