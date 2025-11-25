import "../styles/serviceCard.css";

export interface ServiceCardProps {
  title: string;
  imgSrc: string;
  buttonText?: string;
  onClick?: () => void;
}

const ServiceCard: React.FC<ServiceCardProps> = ({
  title,
  imgSrc,
  buttonText = "Ver Orçamentos",
  onClick,
}) => {
  return (
    <div className="wm-service-card" role="article" aria-label={title}>
      <img
        src={imgSrc}
        alt={title}
        className="wm-service-img"
        loading="lazy"
      />

      <h3 className="wm-service-title">{title}</h3>

      <button
        type="button"
        className="wm-btn-primary"
        onClick={onClick}
        aria-label={`Acessar detalhes de ${title}`}
      >
        {buttonText}
      </button>
    </div>
  );
};

export default ServiceCard;
