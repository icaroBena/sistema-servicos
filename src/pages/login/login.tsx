import './login.css';
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const handleEntrar = () => {
    // aqui você poderia validar usuário/senha antes…
    navigate("/home");
  };

  const handleCadastrar = () => {
    // Paulo: Adicionado função para acessar cadastro
    navigate("/register");
  };
  
  return (
    <div className="login-container">
      {/* Painel Esquerdo */}
      <div className="login-left-panel">
        <h1 className="welcome-title">Bem vindo ao WorkMatch</h1>
        <p className="welcome-text">
          WorkMatch é a plataforma que conecta pessoas que precisam de serviços de manutenção, construção e reformas com profissionais qualificados e de confiança.
        </p>
          {/* Você pode substituir esta imagem pela sua */}
          {/*<img src={ProblemaImagem} alt="WorkMatch Illustration" className="imagemproblema" />*/}
        
        <p className="welcome-text">
          Com ele, você pode encontrar o prestador ideal para sua necessidade, negociar valores dentro do seu orçamento e resolver desde pequenos reparos até grandes obras de forma simples e segura.
        </p>
          {/*<img src={ParceriaImagem} alt="Profile" className="imagemparceria" />*/}
        
        <p className="welcome-text-bold">
          Experimente agora e descubra como é fácil encontrar ou oferecer serviços no WorkMatch!
        </p>
      </div>

      {/* Painel Direito */}
      <div className="login-right-panel">
        <h2 className="login-title">Faça o Login em nossa Plataforma</h2>
        <p className="login-subtitle">Preencha os dados do login para acessar</p>
        
        <div className="form-group">
          <label htmlFor="username">Usuário</label>
          <div className="input-group">
            <input type="text" id="username" placeholder="nomeusuario" />
            <span className="icon">👤</span>
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="password">Senha</label>
          <div className="input-group">
            <input type="password" id="password" placeholder="senhaacesso" />
            <span className="icon">🔒</span>
          </div>
        </div>

        <div className="button-group">
          <button className="btn btn-primary" onClick={handleEntrar}>ENTRAR</button>
          <button className="btn btn-secondary" onClick={handleCadastrar} >CADASTRAR</button>
        </div>
      </div>
    </div>
  );
};

export default Login;