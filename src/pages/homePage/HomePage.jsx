import { useState, useEffect } from 'react';
import { getTrendingMovies } from '../../components/api/Api';
import MovieList from '../../components/movieList/MovieList';
import ErrorMessage from '../../components/errorMessage/ErrorMessage';
import Loader from '../../components/loader/Loader';

export default function HomePage() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [totalPage, setTotalPage] = useState(1);
  const [page, setPage] = useState(1);

  useEffect(() => {
    async function getMovies() {
      try {
        setIsLoading(true);
        setError(false);
        const data = await getTrendingMovies(page);
        setTotalPage(data.total_pages);
        setMovies(data.results);
      } catch (error) {
        setError(true);
      } finally {
        setIsLoading(false);
      }
    }
    getMovies();
  }, [page]);

  return (
    <div>
      <h1>Trending films</h1>
      <MovieList movies={movies} />
      {error && <ErrorMessage />}
      {isLoading && <Loader />}
    </div>
  );
}
