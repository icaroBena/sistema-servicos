import "./login.css";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login: React.FC = () => {
  const navigate = useNavigate();

  // Estados do formulário
  const [email, setEmail] = useState<string>("");
  const [senha, setSenha] = useState<string>("");
  const [mensagem, setMensagem] = useState<string>("");

  // Função de login
  const handleEntrar = async () => {
    if (!email || !senha) {
      setMensagem("Preencha todos os campos!");
      return;
    }

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password: senha }),
      });

      const data = await response.json();

      if (data.token) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        setMensagem("Login realizado com sucesso!");
        navigate("/home");
      } else {
        setMensagem(data.message || "Usuário ou senha incorretos.");
      }
    } catch (error) {
      console.error("Erro na requisição de login:", error);
      setMensagem("Falha ao conectar com o servidor.");
    }
  };

  // Função para ir à tela de cadastro
  const handleCadastrar = () => {
    navigate("/register");
  };

  return (
    <div className="login-container">
      {/* Painel Esquerdo */}
      <div className="login-left-panel">
        <h1 className="welcome-title">Bem vindo ao WorkMatch</h1>
        <p className="welcome-text">
          WorkMatch é a plataforma que conecta pessoas que precisam de serviços
          de manutenção, construção e reformas com profissionais qualificados e
          de confiança.
        </p>
        <p className="welcome-text">
          Com ele, você pode encontrar o prestador ideal para sua necessidade,
          negociar valores dentro do seu orçamento e resolver desde pequenos
          reparos até grandes obras de forma simples e segura.
        </p>
        <p className="welcome-text-bold">
          Experimente agora e descubra como é fácil encontrar ou oferecer
          serviços no WorkMatch!
        </p>
      </div>

      {/* Painel Direito */}
      <div className="login-right-panel">
        <h2 className="login-title">Faça o Login em nossa Plataforma</h2>
        <p className="login-subtitle">Preencha os dados do login para acessar</p>

        <div className="form-group">
          <label htmlFor="username">E-mail</label>
          <div className="input-group">
            <input
              type="email"
              id="username"
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
              placeholder="senhaacesso"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
            />
            <span className="icon">🔒</span>
          </div>
        </div>

        <div className="button-group">
          <button className="btn btn-primary" onClick={handleEntrar}>
            ENTRAR
          </button>
          <button className="btn btn-secondary" onClick={handleCadastrar}>
            CADASTRAR
          </button>
        </div>

        {mensagem && <p className="login-message">{mensagem}</p>}
      </div>
    </div>
  );
};

export default Login;
