import './StarRating.css';

const StarRating = ({ score }) => {
  const fullStars = Math.floor(score);
  const partial = score - fullStars;
  const totalStars = 5;

  const stars = [];

  for (let i = 0; i < fullStars; i++) {
    stars.push(<span className="star full" key={`full-${i}`}>★</span>);
  }

  if (partial > 0) {
    stars.push(
      <span
        className="star partial"
        key="partial"
        style={{
          background: `linear-gradient(to right, #facc15 ${partial * 100}%, #e5e7eb ${partial * 100}%)`,
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent'
        }}
      >
        ★
      </span>
    );
  }

  const remaining = totalStars - fullStars - (partial > 0 ? 1 : 0);
  for (let i = 0; i < remaining; i++) {
    stars.push(<span className="star empty" key={`empty-${i}`}>☆</span>);
  }

  return <div className="star-rating">{stars}</div>;
};

export default StarRating;
