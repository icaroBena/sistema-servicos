import "../styles/serviceCard.css";

type ServiceCardProps = {
  title: string;
  imgSrc: string;
  buttonText: string;
};

export default function ServiceCard({ title, imgSrc, buttonText }: ServiceCardProps) {
  return (
    <div className="wm-service-card">
      <img src={imgSrc} alt={title} className="wm-service-img" />
      <h3>{title}</h3>
      <button className="wm-btn wm-btn-primary">{buttonText}</button>
    </div>
  );
}
