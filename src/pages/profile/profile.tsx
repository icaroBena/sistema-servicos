import React, { useState } from 'react';
import './profile.css';
import Sidebar from './components/Sidebar';
import ProfileInfo from './components/ProfileInfo';
{/*import ServicesPanel from './components/ServicesPanel';
import SettingsPanel from './components/SettingsPanel';
import NotificationsPanel from './components/NotificationsPanel.tsx';*/}
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

const Profile: React.FC = () => {
    const [activeSection, setActiveSection] = useState('profile'); // controle da aba ativa
    const userType = 'prestador'; // futuramente vindo do backend ou contexto global

    const renderSection = () => {
        switch (activeSection) {
            case 'profile':
                return <ProfileInfo />;
                {/*case 'services':
        return <ServicesPanel />;
      case 'settings':
        return <SettingsPanel />;
      case 'notifications':
        return <NotificationsPanel />;*/}
            default:
                return <ProfileInfo />;
        }
    };

    return (
        <div className="wm-profile">
            <Navbar />

            <div className="profile-container">
                <Sidebar active={activeSection} onSelect={setActiveSection} userType={userType} />
                <div className="profile-content">{renderSection()}</div>
            </div>

            <Footer />
        </div>
    );
};

export default Profile;
