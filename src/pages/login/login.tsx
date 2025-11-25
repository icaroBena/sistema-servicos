import "./login.css";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

// import centralizado (usa client em src/api)
import { login } from "../../api/auth";

const Login: React.FC = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [message, setMessage] = useState<string>("");

  const validateEmail = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleLogin = async () => {
    if (!email || !password) {
      setMessage("Preencha todos os campos!");
      return;
    }

    if (!validateEmail(email)) {
      setMessage("Formato de e-mail inválido!");
      return;
    }

    try {
      const response = await login(email, password);

      if (!response.success) {
        setMessage(response.message || "Credenciais inválidas.");
        return;
      }

      // Login bem-sucedido
      if (response.token && response.user) {
        localStorage.setItem("auth_token", response.token);
        localStorage.setItem("auth_user", JSON.stringify(response.user));
        navigate("/home");
        return;
      }

      setMessage("Erro inesperado ao fazer login.");
    } catch (error) {
      console.error("Erro no login:", error);
      setMessage("Falha ao conectar com o servidor.");
    }
  };

  const handleRegister = () => navigate("/register");

  return (
    <div className="login-container">
      {/* PAINEL ESQUERDO */}
      <div className="login-left-panel">
        <h1 className="welcome-title">Bem vindo ao WorkMatch</h1>

        <p className="welcome-text">
          WorkMatch conecta pessoas que precisam de serviços de manutenção,
          construção e reformas com profissionais qualificados.
        </p>

        <p className="welcome-text">
          Encontre o prestador ideal, negocie valores e resolva qualquer serviço
          com praticidade e segurança.
        </p>

        <p className="welcome-text-bold">Descubra como é fácil usar o WorkMatch!</p>
      </div>

      {/* PAINEL DIREITO */}
      <div className="login-right-panel">
        <h2 className="login-title">Faça o Login</h2>
        <p className="login-subtitle">Acesse sua conta para continuar</p>

        <div className="form-group">
          <label htmlFor="email">E-mail</label>
          <div className="input-group">
            <input
              type="email"
              id="email"
              placeholder="exemplo@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <span className="icon">👤</span>
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="password">Senha</label>
          <div className="input-group">
            <input
              type="password"
              id="password"
              placeholder="********"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <span className="icon">🔒</span>
          </div>
        </div>

        <div className="button-group">
          <button className="btn btn-primary" onClick={handleLogin}>
            ENTRAR
          </button>
          <button className="btn btn-secondary" onClick={handleRegister}>
            CADASTRAR
          </button>
        </div>

        {message && (
          <p className="login-message" style={{ color: "red" }}>
            {message}
          </p>
        )}
      </div>
    </div>
  );
};

export default Login;
