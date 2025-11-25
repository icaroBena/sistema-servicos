// src/pages/account/account.tsx

import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import "./account.css";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

import Sidebar from "./components/Sidebar";

// Panels (abas)
import ServicesPanel from "./components/ServicesPanel";
import SettingsPanel from "./components/SettingsPanel";
import NotificationsPanel from "./components/NotificationsPanel";
import PropositionsPanel from "./components/PropositionsPanel";
import SchedulesPanel from "./components/SchedulesPanel";
import RefundsPanel from "./components/RefundsPanel";
import ProviderPanel from "./components/ProviderPanel";
import PaymentMethodsPanel from "./components/PaymentMethodsPanel";

// User model já padronizado
import type { User } from "../../models/Usuario";

// Mocks temporários
import { mockClient } from "../../mocks/devUser";
import { carregarNotificacoesMock } from "../../mocks/notificacoesMock";
import { useNotificacoes } from "../../contexts/NotificationContext";

const Account: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>("profile");
  const [editMode, setEditMode] = useState<boolean>(false);

  // Estado do usuário (mock inicial)
  const [userData, setUserData] = useState<User>(mockClient as any);

  const location = useLocation();
  const navigate = useNavigate();
  const notificacaoCtx = useNotificacoes();

  // Carrega notificações mock
  useEffect(() => {
    const loaded = localStorage.getItem("mock_notifs_loaded");

    if (!loaded) {
      carregarNotificacoesMock();
      notificacaoCtx.refresh();
      localStorage.setItem("mock_notifs_loaded", "true");
    }
  }, []);

  // Atualiza aba ao mudar URL
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const tab = params.get("tab");

    if (tab) setActiveTab(tab);
  }, [location.search]);

  // Selecionar aba
  const handleTabSelect = (tab: string) => {
    navigate(`/account?tab=${tab}`);
    setActiveTab(tab);
  };

  // Salvar alterações
  const handleSave = (
    updated: User,
    passwordPayload?: { currentPassword: string; newPassword: string } | null
  ) => {
    setUserData(updated);
    setEditMode(false);

    if (passwordPayload) {
      alert("Solicitação de mudança de senha preparada (mock).");
      console.log("passwordPayload:", passwordPayload);
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case "profile":
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

      case "services":
        return userData.type === "provider" ? <ServicesPanel /> : <div />;

      case "verification":
        return userData.type === "provider" ? <ProviderPanel /> : <div />;

      case "refunds":
        return userData.type === "client" ? <RefundsPanel /> : <div />;

      case "appointments":
        return <SchedulesPanel />;

      case "propositions":
        return <PropositionsPanel />;

      case "payments":
        return userData.type === "client" || userData.type === "provider" ? (
          <PaymentMethodsPanel userType={userData.type as "client" | "provider"} />
        ) : (
          <div />
        );

      case "settings":
        return <SettingsPanel />;

      case "notifications":
        return <NotificationsPanel />;

      default:
        return null;
    }
  };

  // Se entrar em /account sem tab → redireciona para /account?tab=profile
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    if (!params.get("tab")) {
      navigate("/account?tab=profile", { replace: true });
    }
  }, []);

  return (
    <div className="wm-account">
      <Navbar />

      <div className="account-container">
        <Sidebar
          active={activeTab}
          onSelect={handleTabSelect}
          userType={userData.type}
        />

        <div className="account-content">{renderContent()}</div>
      </div>

      <Footer />
    </div>
  );
};

export default Account;

/* ===========================================================
   Subcomponentes
   =========================================================== */

interface HeaderProps {
  user: User;
}

const ProfileHeader: React.FC<HeaderProps> = ({ user }) => {
  const isProvider = user.type === "provider";
  const isAvailable = user.availability === "DISPONÍVEL" || user.availability === "AVAILABLE";

  return (
    <div className="profile-header">
      <img
        src={(user.photo as string) || "/Figures/default-user.png"}
        alt={`${user.name} avatar`}
        className="profile-avatar"
      />

      <div className="profile-header-text">
        <h2 className="profile-name">
          {user.name}
            {isProvider && user.verified && (
            <span className="verified-badge">✔ Verificado</span>
          )}
        </h2>

        {isProvider && (
          <>
            {user.about && <p className="profile-about">{user.about}</p>}
            <p className="profile-rating">⭐ {user.rating} / 5.0</p>

            <span className={`user-status ${isAvailable ? "available" : "unavailable"}`}>
              {user.availability}
            </span>
          </>
        )}
      </div>
    </div>
  );
};

/* ===========================================================
   VISUALIZAÇÃO DO PERFIL
   =========================================================== */

interface ViewProps {
  user: User;
  onEdit: () => void;
}

const ProfileView: React.FC<ViewProps> = ({ user, onEdit }) => {
  return (
    <div className="profile-view">
      <div className="profile-view-top">
        <div className="profile-basic">
          <h3>Informações Pessoais</h3>

          <div className="profile-row">
            <strong>Email:</strong>
            <span>{user.email}</span>
          </div>

          <div className="profile-row">
            <strong>Telefone:</strong>
            <span>{user.phone}</span>
          </div>

          <div className="profile-row">
            <strong>Localização:</strong>
            <span>{user.address}</span>
          </div>
        </div>

        <div className="profile-actions">
          <button className="btn primary" onClick={onEdit}>
            Editar Perfil
          </button>
        </div>
      </div>

      {user.type === "provider" && (
        <>
          <h3>Certificações</h3>
          <ul className="cert-list">
            {user.certifications.map((cert, i) => (
              <li key={i} className="cert-item">
                {cert}
              </li>
            ))}
          </ul>

          <h3>Categorias</h3>
          <p className="categories">
            {user.categories.map((cat, i) => (
              <span key={i} className="category-pill">
                {cat}
              </span>
            ))}
          </p>
        </>
      )}
    </div>
  );
};

/* ===========================================================
   FORMULÁRIO DE EDIÇÃO
   =========================================================== */

interface EditProps {
  user: User;
  onSave: (u: User, passwordPayload?: { currentPassword: string; newPassword: string } | null) => void;
  onCancel: () => void;
}

const ProfileEditForm: React.FC<EditProps> = ({
  user,
  onSave,
  onCancel,
}) => {
  const [form, setForm] = useState<User>({ ...user } as User);
  const [photoFile, setPhotoFile] = useState<File | null>(null);

  // Campos de senha (internals em inglês)
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Mocks temporários
  const mockCertifications = [
    "NR10",
    "Curso Avançado de Elétrica - SENAI",
    "Curso de Refrigeração - SENAI",
  ];

  const mockCategories = [
    "Eletricista",
    "Encanador",
    "Pintor",
    "Instalador de Ar",
    "Marceneiro",
  ];

  // Carrega imagem
  useEffect(() => {
    if (!photoFile) return;

    const previewUrl = URL.createObjectURL(photoFile);
    setForm((prev) => ({ ...prev, photo: previewUrl } as User));

    return () => URL.revokeObjectURL(previewUrl);
  }, [photoFile]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { id, value } = e.target;
    setForm((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (newPassword || confirmPassword || currentPassword) {
      if (!currentPassword) {
        alert("Informe a senha atual.");
        return;
      }
      if (newPassword.length < 8) {
        alert("A nova senha deve ter pelo menos 8 caracteres.");
        return;
      }
      if (newPassword !== confirmPassword) {
        alert("As senhas não conferem.");
        return;
      }
    }

    const updatedUser = { ...form, email: user.email } as User;
    const passwordPayload = newPassword ? { currentPassword, newPassword } : null;

    onSave(updatedUser, passwordPayload);
  };

  const removeCertification = (index: number) => {
    setForm({
      ...form,
      certifications: form.certifications.filter((_, i) => i !== index),
    });
  };

  const addCertification = (value: string) => {
    if (value && !form.certifications.includes(value)) {
      setForm({ ...form, certifications: [...form.certifications, value] });
    }
  };

  const removeCategory = (index: number) => {
    setForm({
      ...form,
      categories: form.categories.filter((_, i) => i !== index),
    });
  };

  const addCategory = (value: string) => {
    if (value && !form.categories.includes(value)) {
      setForm({ ...form, categories: [...form.categories, value] });
    }
  };

  return (
    <form className="profile-edit-form" onSubmit={handleSubmit}>
      <h3>Editar Informações</h3>

      {/* Foto */}
      <label>Foto de Perfil</label>
      <div className="avatar-upload">
        <img
          src={(form.photo as string) || "/Figures/default-user.png"}
          alt="Pré-visualização"
          className="avatar-preview"
        />

        <div>
          <input
            type="file"
            id="photo"
            accept="image/*"
            onChange={(e) => setPhotoFile(e.target.files?.[0] || null)}
          />
          <p className="small-text">
            Upload máximo local de 5MB. Persistência depende do backend.
          </p>
        </div>
      </div>

      {/* Campos */}
      <label>Nome</label>
      <input id="name" value={form.name} onChange={handleChange} />

      <label>Email (não editável)</label>
      <input id="email" value={form.email} disabled />

      <label>Telefone</label>
      <input id="phone" value={form.phone || ""} onChange={handleChange} />

      <label>Localização</label>
      <input id="address" value={(form.address as string) || ""} onChange={handleChange} />

      {form.type === "provider" && (
        <>
          <label>Sobre</label>
          <textarea id="about" value={(form.about as string) || ""} onChange={handleChange} rows={4} />

          <label>Disponibilidade</label>
          <select id="availability" value={(form.availability as string) || ""} onChange={handleChange}>
            <option value="AVAILABLE">AVAILABLE</option>
            <option value="UNAVAILABLE">UNAVAILABLE</option>
          </select>

          {/* Certificações */}
          <label>Certificações</label>
          <div className="tag-list">
            {form.certifications.map((cert, i) => (
              <span key={i} className="tag">
                {cert}
                <button
                  type="button"
                  className="tag-remove"
                  onClick={() => removeCertification(i)}
                >
                  ×
                </button>
              </span>
            ))}

            <select
              onChange={(e) => {
                addCertification(e.target.value);
                e.target.value = "";
              }}
            >
              <option value="">Adicionar...</option>
              {mockCertifications.map((cert) => (
                <option key={cert} value={cert}>
                  {cert}
                </option>
              ))}
            </select>
          </div>

          {/* Categorias */}
          <label>Categorias</label>
          <div className="tag-list">
            {form.categories.map((cat, i) => (
              <span key={i} className="tag">
                {cat}
                <button
                  type="button"
                  className="tag-remove"
                  onClick={() => removeCategory(i)}
                >
                  ×
                </button>
              </span>
            ))}

            <select
              onChange={(e) => {
                addCategory(e.target.value);
                e.target.value = "";
              }}
            >
              <option value="">Adicionar...</option>
              {mockCategories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>
        </>
      )}

      {/* Alteração de senha */}
      <hr />
      <h3>Alterar Senha</h3>

      <input
        type="password"
        placeholder="Senha atual"
        value={currentPassword}
        onChange={(e) => setCurrentPassword(e.target.value)}
      />
      <input
        type="password"
        placeholder="Nova senha (mín. 8 caracteres)"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
      />
      <input
        type="password"
        placeholder="Confirmar nova senha"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
      />

      {/* Ações */}
      <div className="edit-actions">
        <button type="button" className="btn cancel" onClick={onCancel}>
          Cancelar
        </button>

        <button type="submit" className="btn primary">
          Salvar
        </button>
      </div>
    </form>
  );
};
