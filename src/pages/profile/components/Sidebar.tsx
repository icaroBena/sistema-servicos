import React from 'react';
import './sidebar.css';

import { FaUser, FaTools, FaCog, FaBell, FaSignOutAlt } from "react-icons/fa";

interface SidebarProps {
    active: string;
    onSelect: (section: string) => void;
    userType: 'cliente' | 'prestador';
}

const Sidebar: React.FC<SidebarProps> = ({ active, onSelect, userType }) => {
    return (
        <aside className="profile-sidebar">
            <h3 className="sidebar-title">Meu Perfil</h3>

            <ul className="sidebar-menu">
                <li className={active === 'profile' ? 'active' : ''} onClick={() => onSelect('profile')}>
                    <FaUser /> Informações
                </li>

                {userType === 'prestador' && (
                    <li className={active === 'services' ? 'active' : ''} onClick={() => onSelect('services')}>
                        <FaTools /> Meus Serviços
                    </li>
                )}

                <li className={active === 'settings' ? 'active' : ''} onClick={() => onSelect('settings')}>
                    <FaCog /> Configurações
                </li>

                <li className={active === 'notifications' ? 'active' : ''} onClick={() => onSelect('notifications')}>
                    <FaBell /> Notificações
                </li>
            </ul>

            <button className="logout-btn"><FaSignOutAlt /> Sair</button>
        </aside>
    );
};

export default Sidebar;