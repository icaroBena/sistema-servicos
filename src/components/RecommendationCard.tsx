import "../styles/recommendationCard.css";

type RecommendationCardProps = {
  title: string;
  category: string;
  price: string;
  rating: number;
  phone: string;
  imgSrc: string;
};

export default function RecommendationCard({
  title,
  category,
  price,
  rating,
  phone,
  imgSrc
}: RecommendationCardProps) {
  return (
    <div className="recommendation-card">
      <img src={imgSrc} alt={title} className="recommendation-img" />
      <div className="recommendation-info">
        <h3 className="recommendation-title">{title}</h3>
        <p className="recommendation-category">{category}</p>
        <div className="recommendation-price">{price}</div>
        <div className="recommendation-rating">
          {"★".repeat(rating)}{"☆".repeat(5 - rating)} {/* Exibe estrelas */}
        </div>
        <div className="recommendation-contact">{phone}</div>
      </div>
    </div>
  );
}
