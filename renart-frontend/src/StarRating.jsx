import './StarRating.css';

const StarRating = ({ score }) => {
  const full = Math.floor(score);
  const partial = score % 1 > 0;
  const partialWidth = Math.round((score % 1) * 100);
  const empty = 5 - full - (partial ? 1 : 0);

  return (
    <div className="star-rating">
      {/* Dolu yıldızlar */}
      {Array.from({ length: full }, (_, i) => (
        <span key={`full-${i}`} className="star full">★</span>
      ))}

      {/* Kısmi yıldız */}
      {partial && (
        <span className="star-partial">
          <span className="star-fill" style={{ width: `${partialWidth}%` }}>★</span>
          <span className="star-back">★</span>
        </span>
      )}

      {/* Boş yıldızlar */}
      {Array.from({ length: empty }, (_, i) => (
        <span key={`empty-${i}`} className="star empty">★</span>
      ))}
    </div>
  );
};

export default StarRating;
