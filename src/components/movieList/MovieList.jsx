import { Link, useLocation } from 'react-router-dom';
import css from './MovieList.module.css';

export default function MovieList({ movies }) {
  const location = useLocation();
  return (
    <ul className={css.moviesList}>
      {movies.map(movie => (
        <li key={movie.id}>
          <Link to={`/movies/${movie.id}`} state={location}>
            {movie.original_title}
          </Link>
        </li>
      ))}
    </ul>
  );
}
