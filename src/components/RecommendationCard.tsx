import "../styles/recommendationCard.css";

export interface RecommendationCardProps {
  title: string;
  category: string;
  price: string;
  rating: number;      // 0–5
  phone: string;
  imgSrc: string;
}

const RecommendationCard: React.FC<RecommendationCardProps> = ({
  title,
  category,
  price,
  rating,
  phone,
  imgSrc,
}) => {
  const stars = Math.max(0, Math.min(rating, 5)); // garante entre 0 e 5

  return (
    <div
      className="recommendation-card"
      role="article"
      aria-label={`Serviço recomendado: ${title}`}
    >
      <img
        src={imgSrc}
        alt={title}
        className="recommendation-img"
        loading="lazy"
      />

      <div className="recommendation-info">
        <h3 className="recommendation-title">{title}</h3>

        <p className="recommendation-category">{category}</p>

        <div className="recommendation-price">{price}</div>

        <div className="recommendation-rating">
          {"★".repeat(stars)}
          {"☆".repeat(5 - stars)}
        </div>

        <div className="recommendation-contact">{phone}</div>
      </div>
    </div>
  );
};

export default RecommendationCard;
