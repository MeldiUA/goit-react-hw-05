import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getReviewsMovieById } from '../api/Api';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Loader from '../loader/Loader';

export default function MovieReviews() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [reviews, setReviews] = useState([]);

  const { moviesId } = useParams();
  useEffect(() => {
    async function getData() {
      try {
        setIsLoading(true);
        setError(false);
        const data = await getReviewsMovieById(moviesId);
        setReviews(data);
      } catch (error) {
        setError(true);
      } finally {
        setIsLoading(false);
      }
    }

    getData();
  }, [moviesId]);

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
      {reviews.length === 0 && !isLoading && !error && (
        <div>Reviews not found</div>
      )}
      {error && <ErrorMessage />}
      {isLoading && <Loader />}
    </div>
  );
}
