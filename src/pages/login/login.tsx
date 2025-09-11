import React from 'react';
import './login.css';

// Importe as imagens que você vai usar
// Certifique-se de que os caminhos estão corretos
import WorkMatchLogo from '../../Figures/problema.png';
import ProfileImage from '../../Figures/parceria.png';

const Login = () => {
  return (
    <div className="login-container">
      {/* Painel Esquerdo */}
      <div className="login-left-panel">
        <h1 className="welcome-title">Bem vindo ao WorkMatch</h1>
        <p className="welcome-text">
          WorkMatch é a plataforma que conecta pessoas que precisam de serviços de manutenção, construção e reformas com profissionais qualificados e de confiança.
        </p>
        <div className="illustration-container">
          {/* Você pode substituir esta imagem pela sua */}
          <img src={WorkMatchLogo} alt="WorkMatch Illustration" className="illustration-image" />
        </div>
        <p className="welcome-text">
          Com ele, você pode encontrar o prestador ideal para sua necessidade, negociar valores dentro do seu orçamento e resolver desde pequenos reparos até grandes obras de forma simples e segura.
        </p>

         <div className="profile-image-container">
          <img src={ProfileImage} alt="Profile" className="profile-image" />
        </div>
        
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
            <input type="text" id="username" placeholder="jhonasrodrigues" />
            <span className="icon">👤</span>
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="password">Senha</label>
          <div className="input-group">
            <input type="password" id="password" placeholder="senhaacesso" />
            <span className="icon">🔒</span>
          </div>
          <a href="#" className="forgot-password">Esqueceu sua senha?</a>
        </div>

        <div className="button-group">
          <button className="btn btn-primary">ENTRAR</button>
          <button className="btn btn-secondary">REGISTRAR</button>
        </div>
      </div>
    </div>
  );
};

export default Login;