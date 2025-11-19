import "../styles/navbar.css";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  return (
    <header className="wm-navbar">
      <div className="wm-container">
        <h1 className="wm-brand">WorkMatch</h1>
        <nav className="wm-nav">
          <a href="#" className="wm-nav-link">Como Usar</a>
          <a href="#" className="wm-nav-link" onClick={() => navigate('/profile')}>Meu Perfil</a>
        </nav>
      </div>
    </header>
  );
}
