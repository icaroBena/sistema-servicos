  import "./login.css";
  import React, { useState } from "react";
  import { useNavigate } from "react-router-dom";

  const Login: React.FC = () => {
    const navigate = useNavigate();

    const [email, setEmail] = useState<string>("");
    const [senha, setSenha] = useState<string>("");
    const [mensagem, setMensagem] = useState<string>("");

    const validarEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    const handleEntrar = async () => {
      if (!email || !senha) {
        setMensagem("Preencha todos os campos!");
        return;
      }

      if (!validarEmail(email)) {
        setMensagem("Formato de e-mail inválido!");
        return;
      }

      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/login`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password: senha }),
        });

        const data = await response.json();

        if (response.status === 404) {
          setMensagem("Usuário não encontrado!");
        } else if (response.status === 401) {
          setMensagem("Senha incorreta!");
        } else if (data.token) {
          localStorage.setItem("token", data.token);
          localStorage.setItem("user", JSON.stringify(data.user));
          navigate("/home");
        } else {
          setMensagem(data.message || "Erro desconhecido ao fazer login.");
        }
      } catch (error) {
        console.error("Erro na requisição de login:", error);
        setMensagem("Falha ao conectar com o servidor.");
      }
    };

    const handleCadastrar = () => navigate("/register");

    return (
      <div className="login-container">
        <div className="login-left-panel">
          <h1 className="welcome-title">Bem vindo ao WorkMatch</h1>
          <p className="welcome-text">
            WorkMatch é a plataforma que conecta pessoas que precisam de serviços de manutenção, construção e reformas com profissionais qualificados e de confiança.
          </p>
          <p className="welcome-text">
            Encontre o prestador ideal, negocie valores e resolva reparos ou grandes obras com praticidade e segurança.
          </p>
          <p className="welcome-text-bold">Descubra como é fácil usar o WorkMatch!</p>
        </div>

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

          {mensagem && <p className="login-message" style={{ color: "red" }}>{mensagem}</p>}
        </div>
      </div>
    );
  };

  export default Login;
