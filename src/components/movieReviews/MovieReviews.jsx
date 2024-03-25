import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getReviewsMovieById } from '../api/Api';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Loader from '../loader/Loader';

export default function MovieReviews() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [reviews, setReviews] = useState([]);

  const movieId = useParams();

  useEffect(() => {
    async function getData() {
      try {
        setIsLoading(true);
        setError(false);
        const data = await getReviewsMovieById(movieId.moviesId);
        setReviews(data);
      } catch (error) {
        setError(true);
      } finally {
        setIsLoading(false);
      }
    }

    getData();
  }, [movieId]);

  return (
    <div>
      <ul>
        {reviews
          ? reviews.map(review => (
              <li key={review.id}>
                <h2>{review.author}</h2>
                <p>{review.content}</p>
              </li>
            ))
          : undefined}
      </ul>
      {error && <ErrorMessage />}
      {isLoading && <Loader />}
    </div>
  );
}
