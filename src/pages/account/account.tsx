// Código de conta geral - A lógica de fronteira de gerenciar perfil
import { useLocation, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import "./account.css";
import Sidebar from "./components/Sidebar";

// Diferentes abas
import ServicesPanel from "./components/ServicesPanel";
import SettingsPanel from "./components/SettingsPanel";
import NotificationsPanel from "./components/NotificationsPanel";
import PropositionsPanel from "./components/PropositionsPanel";
import SchedulesPanel from "./components/SchedulesPanel";
import RefundsPanel from "./components/RefundsPanel";
import ProviderPanel from "./components/ProviderPanel";
import PaymentMethodsPanel from "./components/PaymentMethodsPanel";

import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

// Mocks leves para testar as duas perspectivas (cliente / prestador)
import type { Usuario } from "../../models/Usuario";
import { mockCliente, mockPrestador } from "../../mocks/devUser";
import { carregarNotificacoesMock } from "../../mocks/notificacoesMock";
import { useNotificacoes } from "../../contexts/NotificationContext";

const Account: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>("profile");
  const [editMode, setEditMode] = useState<boolean>(false);
  const [userData, setUserData] = useState<Usuario>(mockCliente);

  const location = useLocation();
  const notificacaoCtx = useNotificacoes();
  const navigate = useNavigate();

  // Testando notificações mock na primeira carga
  useEffect(() => {
    const jaCriado = localStorage.getItem("mock_notifs_carregadas");

    if (jaCriado) {
      carregarNotificacoesMock();
      notificacaoCtx.atualizar();
      localStorage.setItem("mock_notifs_carregadas", "true");
    }
  }, []);

  // Quando a URL mudar, atualizar a tab
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const tabFromUrl = params.get("tab");

    if (tabFromUrl) {
      setActiveTab(tabFromUrl);
    }
  }, [location.search]);

  // Quando user clicar na sidebar, atualizar a URL também
  const handleTabSelect = (tab: string) => {
    navigate(`/account?tab=${tab}`);
    setActiveTab(tab);
  };

  // salvar as alterações dos dados
  const handleSave = (updatedData: Usuario, passwordPayload?: { senhaAtual: string; novaSenha: string } | null) => {
    // Aqui você chamaria o backend para persistir profile e alteração de senha.
    setUserData(updatedData);
    setEditMode(false);

    if (passwordPayload) {
      // isso é apenas simulação de payloead por enquanto
      alert("Solicitação de alteração de senha preparada (envie ao servidor).");
      console.log("passwordPayload (simulação):", passwordPayload);
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
        return userData.tipo === "prestador" ? <ServicesPanel /> : <div />;
      case "verification":
        return userData.tipo === "prestador" ? <ProviderPanel /> : <div />;
      case "refunds":
        return userData.tipo === "cliente" ? <RefundsPanel /> : <div />;
      case "appointments":
        return <SchedulesPanel />;
      case "propositions":
        return <PropositionsPanel />;
      case "payments":
        return <PaymentMethodsPanel userType={userData.tipo} />;
      case "settings":
        return <SettingsPanel />;
      case "notifications":
        return <NotificationsPanel />;
      default:
        return null;
    }
  };

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
        <Sidebar active={activeTab} onSelect={handleTabSelect} userType={userData.tipo} />
        <div className="account-content">{renderContent()}</div>
      </div>
      <Footer />
    </div>
  );
};

export default Account;

/* ================= Subcomponentes internos ================= */

interface HeaderProps {
  user: Usuario;
}

const ProfileHeader: React.FC<HeaderProps> = ({ user }) => {
  const isPrestador = user.tipo === "prestador";
  const isDisponivel = user.disponibilidade === "DISPONÍVEL";

  return (
    <div className="profile-header">
      <img
        src={user.foto || "/Figures/default-user.png"}
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
            <span className={`user-status ${isDisponivel ? "available" : "unavailable"}`}>
              {user.disponibilidade}
            </span>
          </>
        )}
      </div>
    </div>
  );
};

interface ViewProps {
  user: Usuario;
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
            <span>{user.telefone}</span>
          </div>
          <div className="profile-row">
            <strong>Localização:</strong>
            <span>{user.localizacao}</span>
          </div>
        </div>

        <div className="profile-actions">
          <button className="btn primary" onClick={onEdit}>
            Editar Perfil
          </button>
        </div>
      </div>

      {user.tipo === "prestador" && (
        <>
          <h3>Certificações</h3>
          <ul className="cert-list">
            {user.certificacoes.map((c, i) => (
              <li key={i} className="cert-item">
                {c}
              </li>
            ))}
          </ul>

          <h3>Categorias</h3>
          <p className="categories">
            {user.categorias.map((c, i) => (
              <span key={i} className="category-pill">
                {c}
              </span>
            ))}
          </p>
        </>
      )}
    </div>
  );
};

interface EditProps {
  user: Usuario;
  onSave: (u: Usuario, passwordPayload?: { senhaAtual: string; novaSenha: string } | null) => void;
  onCancel: () => void;
}

const ProfileEditForm: React.FC<EditProps> = ({ user, onSave, onCancel }) => {
  const [form, setForm] = useState<Usuario>({ ...user });
  const [fotoFile, setFotoFile] = useState<File | null>(null);

  // campos para alteração de senha (local)
  const [senhaAtual, setSenhaAtual] = useState<string>("");
  const [novaSenha, setNovaSenha] = useState<string>("");
  const [confirmarSenha, setConfirmarSenha] = useState<string>("");

  // mocks para seleção de categorias/certificações
  const mockCerts = ["NR10", "Curso Avançado de Elétrica - SENAI", "Curso de Refrigeração - SENAI"];
  const mockCategs = ["Eletricista", "Encanador", "Pintor", "Instalador de Ar", "Marceneiro"];

  useEffect(() => {
    // quando selecionar arquivo, gerar preview
    if (!fotoFile) return;
    const url = URL.createObjectURL(fotoFile);
    setForm((s) => ({ ...s, foto: url }));

    return () => {
      URL.revokeObjectURL(form.foto || "");
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fotoFile]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { id, value } = e.target;
    setForm((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // validações simples
    if (novaSenha || confirmarSenha || senhaAtual) {
      if (!senhaAtual) {
        alert("Para alterar a senha, informe a senha atual.");
        return;
      }
      if (novaSenha.length < 8) {
        alert("A nova senha deve ter ao menos 8 caracteres.");
        return;
      }
      if (novaSenha !== confirmarSenha) {
        alert("A confirmação da nova senha não confere.");
        return;
      }
    }

    // Prevenção: garantir que o email não foi alterado
    const payloadUser = { ...form, email: user.email };

    const passwordPayload = novaSenha ? { senhaAtual, novaSenha } : null;

    // Observação: persistir imagem e senha no backend (aqui apenas atualização local)
    onSave(payloadUser, passwordPayload);
  };

  const removeCertification = (idx: number) => {
    setForm({ ...form, certificacoes: form.certificacoes.filter((_, i) => i !== idx) });
  };

  const addCertification = (value: string) => {
    if (!value) return;
    if (!form.certificacoes.includes(value)) setForm({ ...form, certificacoes: [...form.certificacoes, value] });
  };

  const removeCategory = (idx: number) => {
    setForm({ ...form, categorias: form.categorias.filter((_, i) => i !== idx) });
  };

  const addCategory = (value: string) => {
    if (!value) return;
    if (!form.categorias.includes(value)) setForm({ ...form, categorias: [...form.categorias, value] });
  };

  return (
    <form className="profile-edit-form" onSubmit={handleSubmit}>
      <h3>Editar Informações</h3>

      <label>Foto de Perfil</label>
      <div className="avatar-upload">
        <img
          src={form.foto || "/Figures/default-user.png"}
          alt="Pré-visualização"
          className="avatar-preview"
        />
        <div>
          <input
            type="file"
            id="foto"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files?.[0] || null;
              if (file) setFotoFile(file);
            }}
          />
          <p className="small-text">Tamanho máximo (cliente-side): 5MB. Envie para backend para persistir.</p>
        </div>
      </div>

      <label>Nome</label>
      <input id="nome" value={form.nome} onChange={handleChange} />

      <label>Email (não editável)</label>
      <input id="email" value={form.email} disabled />

      <label>Telefone</label>
      <input id="telefone" value={form.telefone} onChange={handleChange} />

      <label>Localização</label>
      <input id="localizacao" value={form.localizacao} onChange={handleChange} />

      {form.tipo === "prestador" && (
        <>
          <label>Sobre</label>
          <textarea id="sobre" value={form.sobre} onChange={handleChange} rows={4} />

          <label>Disponibilidade</label>
          <select id="disponibilidade" value={form.disponibilidade} onChange={handleChange}>
            <option value="DISPONÍVEL">DISPONÍVEL</option>
            <option value="INDISPONÍVEL">INDISPONÍVEL</option>
          </select>

          <label>Certificações</label>
          <div className="tag-list">
            {form.certificacoes.map((c, i) => (
              <span key={i} className="tag">
                {c}{" "}
                <button
                  type="button"
                  className="tag-remove"
                  onClick={() => removeCertification(i)}
                  aria-label={`Remover certificação ${c}`}
                >
                  ×
                </button>
              </span>
            ))}

            <select
              aria-label="Adicionar certificação"
              onChange={(e) => {
                addCertification(e.target.value);
                // reset select
                (e.target as HTMLSelectElement).value = "";
              }}
            >
              <option value="">Adicionar...</option>
              {mockCerts.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          <label>Categorias</label>
          <div className="tag-list">
            {form.categorias.map((c, i) => (
              <span key={i} className="tag">
                {c}{" "}
                <button
                  type="button"
                  className="tag-remove"
                  onClick={() => removeCategory(i)}
                  aria-label={`Remover categoria ${c}`}
                >
                  ×
                </button>
              </span>
            ))}

            <select
              aria-label="Adicionar categoria"
              onChange={(e) => {
                addCategory(e.target.value);
                (e.target as HTMLSelectElement).value = "";
              }}
            >
              <option value="">Adicionar...</option>
              {mockCategs.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>
        </>
      )}

      <hr />

      <h3>Alterar Senha</h3>
      <input
        type="password"
        placeholder="Senha atual"
        value={senhaAtual}
        onChange={(e) => setSenhaAtual(e.target.value)}
      />
      <input
        type="password"
        placeholder="Nova senha (mín. 8 caracteres)"
        value={novaSenha}
        onChange={(e) => setNovaSenha(e.target.value)}
      />
      <input
        type="password"
        placeholder="Confirmar nova senha"
        value={confirmarSenha}
        onChange={(e) => setConfirmarSenha(e.target.value)}
      />

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