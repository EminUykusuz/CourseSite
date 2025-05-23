import React, { useState, useEffect } from 'react';
import axios from 'axios';

const RatingComponent = ({ userId, courseId }) => {
  const [owned, setOwned] = useState(false);
  const [rating, setRating] = useState(0);

  useEffect(() => {
    axios.get(`/api/ownership/${userId}/${courseId}`)
      .then(res => setOwned(res.data.owned));
  }, [userId, courseId]);

  const handleRatingChange = (value) => {
    setRating(value);
    axios.post('/api/rate', { userId, courseId, rating: value })
      .then(() => alert("Puanınız kaydedildi."))
      .catch(() => alert("Hata oluştu."));
  };

  if (!owned) return <p>Bu kursa puan verebilmek için önce satın almalısınız.</p>;

  return (
    <div className="rating">
      {[5, 4, 3, 2, 1].map((val) => (
        <React.Fragment key={val}>
          <input
            value={val}
            name="rating"
            id={`star${val}`}
            type="radio"
            checked={rating === val}
            onChange={() => handleRatingChange(val)}
          />
          <label htmlFor={`star${val}`}></label>
        </React.Fragment>
      ))}
    </div>
  );
};

export default RatingComponent;
