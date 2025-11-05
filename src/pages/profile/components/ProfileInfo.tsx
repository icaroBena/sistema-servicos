import React, { useState } from 'react';
import './profile-info.css';

const ProfileInfo: React.FC = () => {
    const [userData, setUserData] = useState({
        profileImage: '/Figures/default-user.png', // caminho padrão
        name: 'Sara',
        fullName: 'Tancredi',
        email: 'sara.tancredi@gmail.com',
        phone: '+55 11 91234-5678',
        location: 'São Paulo, Brasil',
        postal: '04567-000',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        setUserData((prev) => ({ ...prev, [id]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Dados atualizados:', userData);
        alert('Alterações salvas com sucesso!');
    };

    return (
        <div className="profile-info">
            <div className="profile-header">
                <img
                    src={userData.profileImage}
                    alt="Foto de perfil"
                    className="profile-avatar"
                />
                <div className="profile-header-text">
                    <h2>{userData.name} {userData.fullName}</h2>
                    <p>{userData.location}</p>
                </div>
            </div>

            <form className="profile-form" onSubmit={handleSubmit}>
                <div className="profile-form-row">
                    <div className="profile-input-group">
                        <label htmlFor="name">Nome</label>
                        <input
                            type="text"
                            id="name"
                            value={userData.name}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="profile-input-group">
                        <label htmlFor="fullName">Sobrenome</label>
                        <input
                            type="text"
                            id="fullName"
                            value={userData.fullName}
                            onChange={handleChange}
                        />
                    </div>
                </div>

                <div className="profile-form-row">
                    <div className="profile-input-group">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            value={userData.email}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="profile-input-group">
                        <label htmlFor="phone">Telefone</label>
                        <input
                            type="text"
                            id="phone"
                            value={userData.phone}
                            onChange={handleChange}
                        />
                    </div>
                </div>

                <div className="profile-form-row">
                    <div className="profile-input-group">
                        <label htmlFor="location">Localização</label>
                        <input
                            type="text"
                            id="location"
                            value={userData.location}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="profile-input-group">
                        <label htmlFor="postal">CEP</label>
                        <input
                            type="text"
                            id="postal"
                            value={userData.postal}
                            onChange={handleChange}
                        />
                    </div>
                </div>

                <button type="submit" className="save-btn">
                    Salvar Alterações
                </button>
            </form>
        </div>
    );
};

export default ProfileInfo;