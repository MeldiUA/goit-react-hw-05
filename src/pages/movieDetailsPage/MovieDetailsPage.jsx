import {
  Link,
  NavLink,
  Outlet,
  useLocation,
  useParams,
} from 'react-router-dom';
import { getMovieById } from '../../components/api/Api';
import { useState, useEffect, Suspense, useRef } from 'react';
import css from './MovieDetailsPage.module.css';
import ErrorMessage from '../../components/errorMessage/ErrorMessage';
import Loader from '../../components/loader/Loader';

export default function MovieDetailsPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [movie, setMovie] = useState({});

  const location = useLocation();
  const backLinkRef = useRef(location.state ?? '/');

  const { moviesId } = useParams();

  useEffect(() => {
    async function getData() {
      try {
        setIsLoading(true);
        setError(false);
        const data = await getMovieById(moviesId);
        setMovie(data);
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
      <button>
        {' '}
        <Link to={backLinkRef.current}>Go back</Link>
      </button>

      <div className={css.containerCard}>
        <div className={css.backgrContainer}>
          <img
            className={css.backgrMovie}
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          />
        </div>
        <div>
          <h2>{movie.original_title}</h2>
          <p>User score: {movie.vote_average}</p>
          <h3>Overview</h3>
          <p>{movie.overview}</p>
          <h3>Genres</h3>
          <p>
            {movie.genres
              ? movie.genres.map(genre => genre.name).join(' ')
              : undefined}
          </p>
        </div>
      </div>
      <div>
        <h2>Additional informarion</h2>
        <ul>
          <li>
            <NavLink to="cast">Cast</NavLink>
          </li>
          <li>
            <NavLink to="reviews">Reviews</NavLink>
          </li>
        </ul>
        <Suspense fallback={<Loader />}>
          <Outlet />
        </Suspense>
      </div>
      {error && <ErrorMessage />}
      {isLoading && <Loader />}
    </div>
  );
}
