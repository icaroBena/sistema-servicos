import "../styles/navbar.css";

export default function Navbar() {
  return (
    <header className="wm-navbar">
      <div className="wm-container">
        <h1 className="wm-brand">WorkMatch</h1>
        <nav className="wm-nav">
          <a href="#" className="wm-nav-link">Como Usar</a>
          <a href="#" className="wm-nav-link">Meu Perfil</a>
        </nav>
      </div>
    </header>
  );
}
