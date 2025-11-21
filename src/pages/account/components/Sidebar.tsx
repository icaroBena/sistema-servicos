import React from 'react';
import './sidebar.css';

import { useNavigate } from "react-router-dom";
import { FaUser, FaCheckCircle, FaCog, FaBell, FaCreditCard, FaSignOutAlt, 
    FaHandshake, FaCalendarAlt, FaBriefcase, FaMoneyBill } from "react-icons/fa";

interface SidebarProps {
    active: string;
    onSelect: (section: string) => void;
    userType: string;
}

const Sidebar: React.FC<SidebarProps> = ({ active, onSelect, userType }) => {
    const navigate = useNavigate();
    const commonLinks = [
        { id: 'profile', icon: FaUser, label: 'Perfil' },
        { id: 'appointments', icon: FaCalendarAlt, label: 'Agendamentos' },
        { id: 'propositions', icon: FaHandshake, label: 'Propostas' },
        { id: 'notifications', icon: FaBell, label: 'Notificações' },
        { id: 'settings', icon: FaCog, label: 'Configurações' },
    ];

    const providerLinks = [
        { id: 'services', icon: FaBriefcase, label: 'Meus Serviços' },
        { id: 'verification', icon: FaCheckCircle, label: 'Verificação' },
        { id: 'payments', icon: FaCreditCard, label: 'Pagamentos' },
    ];

    const clientLinks = [
        { id: 'payments', icon: FaCreditCard, label: 'Carteira' },
        { id: 'refunds', icon: FaMoneyBill, label: 'Reembolso' },
    ];

    const linksToShow =
        userType === 'prestador'
            ? [...commonLinks.slice(0, 1), ...providerLinks, ...commonLinks.slice(1)]
            : [...commonLinks.slice(0, 1), ...clientLinks, ...commonLinks.slice(1)];

    return (
        <aside className="account-sidebar">
            <h2 className="sidebar-title">Conta</h2>

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