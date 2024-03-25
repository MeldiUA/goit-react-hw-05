import { Form, Formik, Field } from 'formik';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { searchMovie } from '../../components/api/Api';
import MovieList from '../../components/movieList/MovieList';
import ErrorMessage from '../../components/errorMessage/ErrorMessage';
import Loader from '../../components/loader/Loader';

export default function MoviesPage() {
  const [params, setParams] = useSearchParams();
  const [searchMovies, setSearchMovies] = useState([]);
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const value = params.get('query') ?? '';

  useEffect(() => {
    async function getData() {
      try {
        setIsLoading(true);
        setError(false);
        const data = await searchMovie(value);
        setSearchMovies(data);
      } catch (error) {
        setError(true);
      } finally {
        setIsLoading(false);
      }
    }
    getData();
  }, [value]);

  return (
    <div>
      <Formik
        initialValues={{ query: '' }}
        onSubmit={(values, action) => {
          if (values.query !== '') {
            params.set('query', values.query);
            setParams(params);
            action.resetForm();
          }
        }}
      >
        <Form>
          {' '}
          <Field name="query" type="text"></Field>
          <button type="submit">Search</button>
        </Form>
      </Formik>
      {searchMovies.length > 0 && <MovieList movies={searchMovies} />}
      {error && <ErrorMessage />}
      {isLoading && <Loader />}
    </div>
  );
}
