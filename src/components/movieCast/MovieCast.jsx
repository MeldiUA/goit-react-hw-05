import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getCastMovieById } from '../api/Api';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Loader from '../loader/Loader';

export default function MovieCast() {
  const searchId = useParams();
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [cast, setCast] = useState([]);

  useEffect(() => {
    async function getCast() {
      try {
        setIsLoading(true);
        setError(false);
        const response = await getCastMovieById(searchId.moviesId);
        setCast(response.cast);
      } catch (error) {
        setError(true);
      } finally {
        setIsLoading(false);
      }
    }
    getCast();
  }, [searchId]);

  return (
    <div>
      <ul>
        {cast.map(actor => (
          <li key={actor.cast_id}>
            <img
              src={`https://image.tmdb.org/t/p/w500${actor.profile_path}`}
              width="120px"
              height="200px"
            />
            <p>Name: {actor.name}</p>
            <p>Character: {actor.character}</p>
          </li>
        ))}
      </ul>
      {error && <ErrorMessage />}
      {isLoading && <Loader />}
    </div>
  );
}
