import "../styles/serviceCard.css";

export type ServiceCardProps = {
  title: string;
  imgSrc: string;
  buttonText?: string;
  onClick?: () => void; // <- camelCase e opcional
};

export default function ServiceCard({
  title,
  imgSrc,
  buttonText = "Ver Orçamentos",
  onClick,
}: ServiceCardProps) {
  return (
    <div className="wm-service-card">
      <img src={imgSrc} alt={title} className="wm-service-img" />
      <h3>{title}</h3>
      <button
        type="button"
        className="wm-btn-primary"   // use a classe que você já estilizou
        onClick={onClick}            // <- conecta aqui
      >
        {buttonText}
      </button>
    </div>
  );
}
